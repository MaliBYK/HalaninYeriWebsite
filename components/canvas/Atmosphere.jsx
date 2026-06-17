'use client';

// Scattered ground stones — pre-computed for stable render
const STONES = Array.from({ length: 28 }, (_, i) => ({
  x: Math.sin(i * 2.61) * (4 + (i % 6) * 3),
  z: Math.cos(i * 1.83) * (4 + (i % 5) * 4) - 7,
  s: 0.12 + (i % 5) * 0.06,
  ry: i * 1.1,
}));

export default function Atmosphere() {
  return (
    <>
      <color attach="background" args={['#060F05']} />
      <fog attach="fog" args={['#0C1B07', 22, 140]} />

      {/* Large ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -8]} receiveShadow>
        <planeGeometry args={[350, 350]} />
        <meshLambertMaterial color="#1C3210" />
      </mesh>

      {/* Scattered stones */}
      {STONES.map((s, i) => (
        <mesh key={i} position={[s.x, 0, s.z]} rotation={[0, s.ry, 0]} castShadow>
          <dodecahedronGeometry args={[s.s, 0]} />
          <meshLambertMaterial color="#252218" />
        </mesh>
      ))}
    </>
  );
}
