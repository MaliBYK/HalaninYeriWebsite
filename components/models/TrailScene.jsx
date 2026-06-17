'use client';
import { DoubleSide } from 'three';

// ── Main A-frame tent ─────────────────────────────────────────────────────────
// Camera enters through the front opening (z = pos[2] + half-depth).
// DoubleSide materials let camera see the interior once inside.
function MainTent({ position = [0, 0, -5.5] }) {
  const W = 2.3;   // half-width of base
  const H = 2.8;   // ridge height
  const L = 2.1;   // half-length along z
  const panelLen   = Math.sqrt(W * W + H * H);
  const tiltAngle  = Math.atan2(W, H);

  const fabricColor  = '#7B6830';
  const fabricDark   = '#6A5820';
  const woodColor    = '#3A2A10';

  return (
    <group position={position}>
      {/* Left roof panel */}
      <mesh position={[-W / 2, H / 2, 0]} rotation={[0, 0, tiltAngle]} castShadow>
        <planeGeometry args={[panelLen, L * 2]} />
        <meshLambertMaterial color={fabricColor} side={DoubleSide} />
      </mesh>

      {/* Right roof panel */}
      <mesh position={[W / 2, H / 2, 0]} rotation={[0, 0, -tiltAngle]} castShadow>
        <planeGeometry args={[panelLen, L * 2]} />
        <meshLambertMaterial color={fabricColor} side={DoubleSide} />
      </mesh>

      {/* Back gable — triangular end (two planes meeting at ridge) */}
      <mesh position={[-W / 2, H / 2, -L]} rotation={[0, 0, tiltAngle]}>
        <planeGeometry args={[panelLen, 0.08]} />
        <meshLambertMaterial color={fabricDark} side={DoubleSide} />
      </mesh>
      <mesh position={[W / 2, H / 2, -L]} rotation={[0, 0, -tiltAngle]}>
        <planeGeometry args={[panelLen, 0.08]} />
        <meshLambertMaterial color={fabricDark} side={DoubleSide} />
      </mesh>

      {/* Rear wall (back face of tent) */}
      <mesh position={[0, H / 3, -L]}>
        <planeGeometry args={[W * 2, H * 0.65]} />
        <meshLambertMaterial color={fabricDark} side={DoubleSide} />
      </mesh>

      {/* Ridge pole */}
      <mesh position={[0, H + 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, L * 2, 5]} />
        <meshLambertMaterial color={woodColor} />
      </mesh>

      {/* Corner upright poles */}
      {[[-W, -L], [W, -L], [-W, L], [W, L]].map(([x, z], i) => (
        <mesh key={i} position={[x, H / 2, z]}>
          <cylinderGeometry args={[0.04, 0.04, H, 4]} />
          <meshLambertMaterial color={woodColor} />
        </mesh>
      ))}

      {/* Ground floor inside tent */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W * 2.1, L * 2]} />
        <meshLambertMaterial color="#3A2810" />
      </mesh>

      {/* Guy-rope stakes */}
      {[[-W - 0.6, -L - 0.4], [W + 0.6, -L - 0.4],
        [-W - 0.6,  L + 0.4], [W + 0.6,  L + 0.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.24, 4]} />
          <meshLambertMaterial color="#8A7A50" />
        </mesh>
      ))}
    </group>
  );
}

// ── Stone ring around campfire ────────────────────────────────────────────────
function FireRing() {
  const STONES = 9;
  return (
    <group position={[0, 0, 0]}>
      {Array.from({ length: STONES }).map((_, i) => {
        const angle = (i / STONES) * Math.PI * 2;
        const r = 0.42;
        const size = 0.08 + Math.sin(i * 1.7) * 0.03;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, size / 2, Math.sin(angle) * r]}>
            <boxGeometry args={[size * 1.4, size, size * 1.2]} />
            <meshLambertMaterial color={i % 2 === 0 ? '#4A4A42' : '#3A3830'} />
          </mesh>
        );
      })}
      {/* Ash/ember bed */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 10]} />
        <meshLambertMaterial color="#1A1810" />
      </mesh>
    </group>
  );
}

// ── Log bench ─────────────────────────────────────────────────────────────────
function LogBench({ pos, rot }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 1.6, 7]} />
        <meshLambertMaterial color="#4A3218" />
      </mesh>
    </group>
  );
}

// ── Scattered outdoor gear around the tent ────────────────────────────────────
function OutdoorProps() {
  return (
    <group>
      {/* Backpack against tent */}
      <mesh position={[2.8, 0.35, -4.0]} rotation={[0, 0.4, 0.1]}>
        <boxGeometry args={[0.4, 0.7, 0.25]} />
        <meshLambertMaterial color="#4A5A2A" />
      </mesh>
      {/* Lantern on ground */}
      <group position={[-2.6, 0, -3.5]}>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.36, 7]} />
          <meshLambertMaterial color="#C47820" emissive="#FF9820" emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Water jug */}
      <mesh position={[1.4, 0.2, -3.2]}>
        <cylinderGeometry args={[0.12, 0.11, 0.4, 7]} />
        <meshLambertMaterial color="#3A6880" />
      </mesh>
      {/* Chopped wood pile */}
      {[0, 0.18, 0.36].map((y, i) => (
        <mesh key={i} position={[-1.5, 0.1 + y, 1.8]} rotation={[0, i * 0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.7, 6]} />
          <meshLambertMaterial color="#4A2E14" />
        </mesh>
      ))}
    </group>
  );
}

export default function TrailScene() {
  return (
    <group>
      <MainTent />
      <FireRing />
      <LogBench pos={[1.8, 0, 1.4]} rot={-0.6} />
      <LogBench pos={[-1.6, 0, 1.5]} rot={0.5} />
      <OutdoorProps />
    </group>
  );
}
