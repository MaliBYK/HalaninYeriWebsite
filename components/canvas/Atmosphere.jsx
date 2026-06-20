'use client';
import useStore from '../../store/useStore';
import { nightFactor } from '../../lib/timeUtils';

const STONES = Array.from({ length: 28 }, (_, i) => ({
  x: Math.sin(i * 2.61) * (4 + (i % 6) * 3),
  z: Math.cos(i * 1.83) * (4 + (i % 5) * 4) - 7,
  s: 0.12 + (i % 5) * 0.06,
  ry: i * 1.1,
}));

function lerp3(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}
function rgb(c) { return `rgb(${c.join(',')})`; }

// Sky: day (bright blue) → dusk (orange-red) → capped night (deep navy)
function skyColor(nf) {
  const day   = [122, 184, 216];
  const dusk  = [180,  55,  15];
  const night = [ 10,  18,  45];
  const [a, b, t] = nf < 0.5 ? [day, dusk, nf * 2] : [dusk, night, (nf - 0.5) * 2];
  return rgb(lerp3(a, b, t));
}
function fogColor(nf) {
  return rgb(lerp3([168, 206, 234], [8, 14, 35], nf));
}
function groundColor(nf) {
  return rgb(lerp3([74, 128, 40], [14, 26, 8], nf));
}
function stoneColor(nf) {
  return rgb(lerp3([138, 122, 96], [55, 50, 40], nf));
}

export default function Atmosphere() {
  const tod = useStore((s) => s.timeOfDay);
  const nf  = nightFactor(tod);

  return (
    <>
      <color attach="background" args={[skyColor(nf)]} />
      <fog attach="fog" args={[fogColor(nf), 35, 160]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -8]} receiveShadow>
        <planeGeometry args={[350, 350]} />
        <meshLambertMaterial color={groundColor(nf)} />
      </mesh>

      {/* Sun disc */}
      {nf < 0.92 && (
        <group>
          <mesh position={[55, 52, 28]}>
            <sphereGeometry args={[3.2, 14, 14]} />
            <meshBasicMaterial color="#FFF8B0" transparent opacity={1 - nf} />
          </mesh>
          <mesh position={[55, 52, 28]}>
            <sphereGeometry args={[5.5, 14, 14]} />
            <meshBasicMaterial color="#FFE870" transparent opacity={(1 - nf) * 0.12} />
          </mesh>
        </group>
      )}

      {/* Moon disc */}
      {nf > 0.05 && (
        <mesh position={[-45, 65, -90]}>
          <sphereGeometry args={[4.5, 16, 16]} />
          <meshBasicMaterial color="#DEE8FF" transparent opacity={nf * 0.92} />
        </mesh>
      )}

      {STONES.map((s, i) => (
        <mesh key={i} position={[s.x, 0, s.z]} rotation={[0, s.ry, 0]} castShadow>
          <dodecahedronGeometry args={[s.s, 0]} />
          <meshLambertMaterial color={stoneColor(nf)} />
        </mesh>
      ))}
    </>
  );
}
