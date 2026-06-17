'use client';

// Wooden platforms with tents on top, kitchen table, and campfire sitters.
// Camera path runs from z≈+14 down to z≈-4 (campfire at origin).

const PLATFORM_DEFS = [
  { pos: [-4.5, 0, -5],  rot: 0.2,  tentColor: '#8B6914' },
  { pos: [5.5,  0, -8],  rot: -0.15, tentColor: '#7A5A10' },
  { pos: [-3.5, 0, -11], rot: 0.35, tentColor: '#6B4A18' },
];

const LEG_OFFSETS = [
  [-0.95, -0.95], [-0.95, 0.95], [0.95, -0.95], [0.95, 0.95],
];

// Deck top is at y = 0.38 + 0.07 = 0.45 (center + half-height)
const DECK_TOP = 0.45;

function Tent({ color }) {
  return (
    <group position={[0, DECK_TOP, 0]}>
      {/* Main cone body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <coneGeometry args={[1.0, 1.8, 6]} />
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Door flap */}
      <mesh position={[0, 0.55, 0.88]}>
        <coneGeometry args={[0.28, 0.6, 5]} />
        <meshLambertMaterial color="#4A3208" />
      </mesh>
      {/* Guy-rope stakes */}
      {[0.6, 1.8, 3.0, 4.2].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 1.55, -DECK_TOP + 0.12, Math.sin(a) * 1.55]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.24, 4]} />
          <meshLambertMaterial color="#8A7A50" />
        </mesh>
      ))}
    </group>
  );
}

function Platform({ pos, rot, tentColor }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      {/* Deck */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.14, 2.6]} />
        <meshLambertMaterial color="#7A5228" />
      </mesh>
      {/* Plank detail */}
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
      {/* Tent sitting on top of the deck */}
      <Tent color={tentColor} />
    </group>
  );
}

function KitchenArea() {
  return (
    <group position={[-2.5, 0, -7.5]}>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.1, 0.85]} />
        <meshLambertMaterial color="#7A5228" />
      </mesh>
      {[[-0.75, -0.35], [-0.75, 0.35], [0.75, -0.35], [0.75, 0.35]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.72, 4]} />
          <meshLambertMaterial color="#5A3818" />
        </mesh>
      ))}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.18, 8]} />
        <meshLambertMaterial color="#2A2A2A" />
      </mesh>
    </group>
  );
}

// Simple low-poly people seated around the campfire (campfire is at world origin)
const SITTER_ANGLES = [0.5, 2.2, 3.9, 5.2];

function CampSitter({ angle }) {
  const radius = 1.55;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const rotY = Math.PI + angle; // face toward fire at origin

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      {/* Torso */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.28, 0.44, 0.22]} />
        <meshLambertMaterial color="#3C2814" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.13, 6, 5]} />
        <meshLambertMaterial color="#B87840" />
      </mesh>
      {/* Arms reaching toward fire (local -Z faces the fire) */}
      <mesh position={[0, 0.40, -0.25]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.26, 0.09, 0.30]} />
        <meshLambertMaterial color="#2E1E0E" />
      </mesh>
    </group>
  );
}

export default function TrailScene() {
  return (
    <group>
      {PLATFORM_DEFS.map((p, i) => <Platform key={i} {...p} />)}
      <KitchenArea />
      {SITTER_ANGLES.map((a, i) => <CampSitter key={i} angle={a} />)}
    </group>
  );
}
