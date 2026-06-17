'use client';

const STONES = Array.from({ length: 28 }, (_, i) => ({
  x: Math.sin(i * 2.61) * (4 + (i % 6) * 3),
  z: Math.cos(i * 1.83) * (4 + (i % 5) * 4) - 7,
  s: 0.12 + (i % 5) * 0.06,
  ry: i * 1.1,
}));

export default function Atmosphere() {
  return (
    <>
      {/* Bright Mediterranean afternoon sky */}
      <color attach="background" args={['#7AB8D8']} />

      {/* Warm distance haze matching sky — makes far trees fade naturally */}
      <fog attach="fog" args={['#A8CEEA', 35, 160]} />

      {/* Ground — bright summer grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -8]} receiveShadow>
        <planeGeometry args={[350, 350]} />
        <meshLambertMaterial color="#4A8028" />
      </mesh>

      {/* Sun disc in the sky */}
      <mesh position={[55, 52, 28]}>
        <sphereGeometry args={[3.2, 14, 14]} />
        <meshBasicMaterial color="#FFF8B0" />
      </mesh>
      {/* Sun halo glow */}
      <mesh position={[55, 52, 28]}>
        <sphereGeometry args={[5.5, 14, 14]} />
        <meshBasicMaterial color="#FFE870" transparent opacity={0.12} />
      </mesh>

      {/* Scattered ground stones (lighter in daylight) */}
      {STONES.map((s, i) => (
        <mesh key={i} position={[s.x, 0, s.z]} rotation={[0, s.ry, 0]} castShadow>
          <dodecahedronGeometry args={[s.s, 0]} />
          <meshLambertMaterial color="#8A7A60" />
        </mesh>
      ))}
    </>
  );
}
