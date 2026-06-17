'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

// Ground grid of stones / grass patches procedurally scattered
const STONES = Array.from({ length: 30 }, (_, i) => ({
  x: (Math.sin(i * 2.6) * 0.5 + 0.5) * 40 - 20,
  z: (Math.cos(i * 1.8) * 0.5 + 0.5) * 60 - 50,
  s: 0.15 + (i % 5) * 0.06,
}));

function CampfireEmbers() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.intensity = 3.8 + Math.sin(t * 4.1) * 0.8 + Math.sin(t * 7.3) * 0.4;
  });
  return <pointLight ref={ref} position={[0, 1.1, 0]} color="#FF5C10" distance={18} decay={2} />;
}

function FireVisual() {
  // Simple cone stack simulating campfire
  return (
    <group position={[0, 0, 0]}>
      {/* Log base */}
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 6]} />
        <meshLambertMaterial color="#3A1F0A" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]} position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 6]} />
        <meshLambertMaterial color="#3A1F0A" />
      </mesh>
      {/* Flame cones */}
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.18, 0.55, 6]} />
        <meshBasicMaterial color="#FF5500" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.11, 0.40, 6]} />
        <meshBasicMaterial color="#FFAA00" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.05, 0.25, 5]} />
        <meshBasicMaterial color="#FFEE88" transparent opacity={0.60} />
      </mesh>
    </group>
  );
}

function Trees() {
  // Procedural trees: cylinder trunk + low-poly icosahedron canopy
  const positions = Array.from({ length: 60 }, (_, i) => ({
    x: Math.sin(i * 2.399) * (6 + (i % 4) * 3),
    z: Math.cos(i * 2.399) * (6 + (i % 4) * 3) - 5,
    h: 2.5 + (i % 5) * 0.8,
    r: 0.9 + (i % 4) * 0.3,
    isOrange: i % 3 === 0,
  }));

  return (
    <group>
      {positions.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          <mesh position={[0, t.h / 2, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.14, t.h, 5]} />
            <meshLambertMaterial color="#3D1F0A" />
          </mesh>
          <mesh position={[0, t.h + t.r * 0.6, 0]} castShadow>
            <icosahedronGeometry args={[t.r, 1]} />
            <meshLambertMaterial
              color={t.isOrange ? '#4A6B1A' : '#3A5A14'}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Atmosphere() {
  return (
    <>
      {/* Sky */}
      <color attach="background" args={['#060F05']} />

      {/* Atmospheric depth fog */}
      <fog attach="fog" args={['#0D1F08', 25, 160]} />

      {/* Large ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -10]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshLambertMaterial color="#1E3410" />
      </mesh>

      {/* Scattered ground stones */}
      {STONES.map((s, i) => (
        <mesh key={i} position={[s.x, 0, s.z]} castShadow>
          <dodecahedronGeometry args={[s.s, 0]} />
          <meshLambertMaterial color="#2A2218" />
        </mesh>
      ))}

      {/* Trees */}
      <Trees />

      {/* Campfire */}
      <FireVisual />
      <CampfireEmbers />
    </>
  );
}
