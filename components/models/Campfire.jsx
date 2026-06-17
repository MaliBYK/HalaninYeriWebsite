'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute } from 'three';
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

export default function Campfire() {
  const tier = useStore((s) => s.qualityTier);
  const COUNT = QUALITY_CONFIG[tier]?.fireParticles ?? 500;

  const { positions, phases, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.18;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(a) * r;
      phases[i] = Math.random();
      speeds[i] = 0.45 + Math.random() * 0.85;
    }
    return { positions, phases, speeds };
  }, [COUNT]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    if (lightRef.current) {
      lightRef.current.intensity = 4.2 + Math.sin(t * 4.2) * 0.9 + Math.sin(t * 7.5) * 0.35;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Logs */}
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.85, 6]} />
        <meshLambertMaterial color="#38180A" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]} position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.85, 6]} />
        <meshLambertMaterial color="#3A1A0C" />
      </mesh>

      {/* Embers glow */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.25, 0.2, 0.08, 8]} />
        <meshBasicMaterial color="#FF4800" transparent opacity={0.6} />
      </mesh>

      {/* Fire particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aPhase" count={COUNT} array={phases} itemSize={1} />
          <bufferAttribute attach="attributes-aSpeed" count={COUNT} array={speeds} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>

      {/* Animated point light */}
      <pointLight ref={lightRef} color="#FF6018" intensity={4.5} distance={20} decay={2} />
    </group>
  );
}
