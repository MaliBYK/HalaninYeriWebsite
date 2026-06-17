'use client';

// Primitive-based trail: wooden platforms, tents, kitchen table
// Positioned along camera path (approximately z = -4 to z = -12)
// Replace meshes with loaded .glb later via components/models/GLBLoader.jsx

const PLATFORMS = [
  { pos: [-4.5, 0, -5], rot: 0.2 },
  { pos: [5.5, 0, -8], rot: -0.15 },
  { pos: [-3.5, 0, -11], rot: 0.35 },
];

const TENTS = [
  { pos: [4.5, 0, -6.5], rot: 0.3, color: '#8B6914' },
  { pos: [-6, 0, -9.5], rot: -0.2, color: '#7A5A10' },
];

const LEG_OFFSETS = [
  [-0.95, -0.95],
  [-0.95, 0.95],
  [0.95, -0.95],
  [0.95, 0.95],
];

function Platform({ pos, rot }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      {/* Deck */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.14, 2.6]} />
        <meshLambertMaterial color="#7A5228" />
      </mesh>
      {/* Planks detail (thin boxes) */}
      {[0, 0.35, 0.7, -0.35, -0.7].map((xo, k) => (
        <mesh key={k} position={[xo, 0.46, 0]}>
          <boxGeometry args={[0.12, 0.04, 2.55]} />
          <meshLambertMaterial color="#6A4420" />
        </mesh>
      ))}
      {/* Legs */}
      {LEG_OFFSETS.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.17, z]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 0.48, 4]} />
          <meshLambertMaterial color="#5A3218" />
        </mesh>
      ))}
    </group>
  );
}

function Tent({ pos, rot, color }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      {/* Main body - cone */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <coneGeometry args={[1.2, 1.8, 6]} />
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Door overlap */}
      <mesh position={[0, 0.6, 1.05]}>
        <coneGeometry args={[0.35, 0.7, 5]} />
        <meshLambertMaterial color="#4A3208" />
      </mesh>
      {/* Floor mat */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.04, 6]} />
        <meshLambertMaterial color="#5A4A20" />
      </mesh>
      {/* Guy-rope stakes */}
      {[0.6, 1.8, 3.0, 4.2].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 1.6, 0.15, Math.sin(a) * 1.6]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 4]} />
          <meshLambertMaterial color="#8A7A50" />
        </mesh>
      ))}
    </group>
  );
}

function KitchenArea() {
  return (
    <group position={[-2.5, 0, -7.5]}>
      {/* Table top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.1, 0.85]} />
        <meshLambertMaterial color="#7A5228" />
      </mesh>
      {/* Table legs */}
      {[[-0.75, -0.35], [-0.75, 0.35], [0.75, -0.35], [0.75, 0.35]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.72, 4]} />
          <meshLambertMaterial color="#5A3818" />
        </mesh>
      ))}
      {/* Cooking pot placeholder */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.18, 8]} />
        <meshLambertMaterial color="#2A2A2A" />
      </mesh>
    </group>
  );
}

export default function TrailScene() {
  return (
    <group>
      {PLATFORMS.map((p, i) => <Platform key={i} {...p} />)}
      {TENTS.map((t, i) => <Tent key={i} {...t} />)}
      <KitchenArea />
    </group>
  );
}
