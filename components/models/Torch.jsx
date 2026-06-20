'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';
import useStore from '../../store/useStore';

const COUNT = 30;

// Compact version of the campfire shader — same colour palette, smaller geometry.
const VERT = /* glsl */`
  uniform float uTime;
  attribute float aPhase;
  attribute float aSpeed;
  varying float vLife;

  void main() {
    float life = mod(aPhase + uTime * aSpeed, 1.0);
    vLife = life;
    vec3 pos = position;
    pos.y += life * 0.32;
    pos.x += sin(life * 6.2832 + aPhase * 3.7) * 0.04 * life;
    pos.z += cos(life * 4.7124 + aPhase * 2.3) * 0.03 * life;
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    float sz = (1.0 - life * 0.85) * 7.0 + 1.0;
    gl_PointSize = clamp(sz * (200.0 / -mvPos.z), 1.0, 24.0);
  }
`;

const FRAG = /* glsl */`
  varying float vLife;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    if (length(uv) * 2.0 > 1.0) discard;
    vec3 col = mix(vec3(1.0, 0.96, 0.55), vec3(1.0, 0.38, 0.04), smoothstep(0.0, 0.55, vLife));
    col = mix(col, vec3(0.38, 0.02, 0.0), smoothstep(0.55, 1.0, vLife));
    float alpha = (1.0 - length(uv)*2.0 * length(uv)*2.0) * (1.0 - vLife * 0.88) * 0.75;
    gl_FragColor = vec4(col, alpha);
  }
`;

// Positions inside the fence near orange trees, visible through the gate.
// Each entry: [x, y(ground), z]
export const TORCH_POSITIONS = [
  [-4.2,  0,  2.8],
  [ 4.5,  0,  2.5],
  [-3.0,  0, -0.5],
  [ 3.8,  0, -1.2],
];

function TorchInstance({ position, isLit, phaseOffset = 0 }) {
  const lightRef = useRef();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const { positions, phases, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const ph  = new Float32Array(COUNT);
    const sp  = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const a = (i / COUNT) * Math.PI * 2;
      const r = Math.random() * 0.025;
      pos[i * 3]     = Math.cos(a) * r;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(a) * r;
      ph[i] = Math.random();
      sp[i] = 0.55 + Math.random() * 0.9;
    }
    return { positions: pos, phases: ph, speeds: sp };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!isLit) {
      if (lightRef.current) lightRef.current.intensity = 0;
      return;
    }
    uniforms.uTime.value = t;
    if (lightRef.current)
      lightRef.current.intensity = 1.8 + Math.sin(t * 7.3 + phaseOffset) * 0.4
                                       + Math.sin(t * 13.1 + phaseOffset * 2) * 0.15;
  });

  return (
    <group position={position}>
      {/* Wooden pole */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.024, 0.03, 1.44, 6]} />
        <meshLambertMaterial color="#5A3010" />
      </mesh>
      {/* Cloth head */}
      <mesh position={[0, 1.46, 0]}>
        <cylinderGeometry args={[0.058, 0.042, 0.14, 8]} />
        <meshLambertMaterial color="#7A4018" />
      </mesh>

      {/* Flame + warm light — only when lit */}
      {isLit && (
        <group position={[0, 1.5, 0]}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
              <bufferAttribute attach="attributes-aPhase"   count={COUNT} array={phases}    itemSize={1} />
              <bufferAttribute attach="attributes-aSpeed"   count={COUNT} array={speeds}    itemSize={1} />
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
          <pointLight
            ref={lightRef}
            color="#FF8820"
            intensity={isLit ? 1.8 : 0}
            distance={7}
            decay={2}
          />
        </group>
      )}
    </group>
  );
}

export default function Torches() {
  const tod   = useStore((s) => s.timeOfDay);
  const isLit = tod >= 19 || tod < 4;

  return (
    <>
      {TORCH_POSITIONS.map((pos, i) => (
        <TorchInstance
          key={i}
          position={pos}
          isLit={isLit}
          phaseOffset={i * 1.57}
        />
      ))}
    </>
  );
}
