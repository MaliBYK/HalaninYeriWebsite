'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { AdditiveBlending } from 'three';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

const VERT = /* glsl */`
  uniform float uTime;
  attribute float aPhase;
  attribute float aSpeed;
  varying float vLife;

  void main() {
    float life = mod(aPhase + uTime * aSpeed, 1.0);
    vLife = life;
    vec3 pos = position;
    pos.y += life * 2.6;
    pos.x += sin(life * 6.2832 + aPhase * 3.7) * 0.16 * life;
    pos.z += cos(life * 4.7124 + aPhase * 2.3) * 0.11 * life;
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    float sz = (1.0 - life * 0.85) * 26.0 + 1.5;
    gl_PointSize = clamp(sz * (200.0 / -mvPos.z), 1.0, 40.0);
  }
`;

const FRAG = /* glsl */`
  varying float vLife;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv) * 2.0;
    if (dist > 1.0) discard;
    vec3 col = mix(vec3(1.0, 0.96, 0.55), vec3(1.0, 0.38, 0.04), smoothstep(0.0, 0.55, vLife));
    col = mix(col, vec3(0.38, 0.02, 0.0), smoothstep(0.55, 1.0, vLife));
    float alpha = (1.0 - dist * dist) * (1.0 - vLife * 0.88) * 0.72;
    gl_FragColor = vec4(col, alpha);
  }
`;

const STUMP_ANGLES = [0.4, 2.0, 3.7, 5.1];

export default function Campfire() {
  const tier  = useStore((s) => s.qualityTier);
  const tod   = useStore((s) => s.timeOfDay);
  const COUNT = QUALITY_CONFIG[tier]?.fireParticles ?? 500;

  // Fire is lit from 19:00 (7 PM) to 04:00 (4 AM)
  const isLit = tod >= 19 || tod < 4;

  const { scene: fireScene }  = useGLTF('/models/campfire_stones.glb');
  const { scene: stumpScene } = useGLTF('/models/stump_round.glb');

  const fireClone   = useMemo(() => fireScene.clone(true),  [fireScene]);
  const stumpClones = useMemo(
    () => STUMP_ANGLES.map(() => stumpScene.clone(true)),
    [stumpScene],
  );

  const { positions, phases, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const ph  = new Float32Array(COUNT);
    const sp  = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.18;
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = Math.sin(a) * r;
      ph[i] = Math.random();
      sp[i] = 0.45 + Math.random() * 0.85;
    }
    return { positions: pos, phases: ph, speeds: sp };
  }, [COUNT]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const lightRef = useRef();

  useFrame(({ clock }) => {
    if (!isLit) {
      if (lightRef.current) lightRef.current.intensity = 0;
      return;
    }
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    if (lightRef.current)
      lightRef.current.intensity = 4.2 + Math.sin(t * 4.2) * 0.9 + Math.sin(t * 7.5) * 0.35;
  });

  return (
    <group>
      {/* Stone ring + logs — always visible */}
      <primitive object={fireClone} />

      {/* Stump seating around fire — always visible */}
      {STUMP_ANGLES.map((angle, i) => (
        <primitive
          key={i}
          object={stumpClones[i]}
          position={[Math.sin(angle) * 1.85, 0, Math.cos(angle) * 1.85]}
          rotation-y={Math.PI + angle}
        />
      ))}

      {/* Fire particles — only when lit */}
      {isLit && (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-aPhase"   count={COUNT} array={phases}    itemSize={1} />
            <bufferAttribute attach="attributes-aSpeed"   count={COUNT} array={speeds}    itemSize={1} />
          </bufferGeometry>
          <shaderMaterial
            vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms}
            transparent depthWrite={false} blending={AdditiveBlending}
          />
        </points>
      )}

      {/* Flickering fire light — always mounted, intensity set to 0 when unlit */}
      <pointLight ref={lightRef} color="#FF6018" intensity={isLit ? 4.5 : 0} distance={20} decay={2} />
    </group>
  );
}

useGLTF.preload('/models/campfire_stones.glb');
useGLTF.preload('/models/stump_round.glb');
