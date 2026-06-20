'use client';
import useStore from '../../store/useStore';

const STONES = Array.from({ length: 28 }, (_, i) => ({
  x: Math.sin(i * 2.61) * (4 + (i % 6) * 3),
  z: Math.cos(i * 1.83) * (4 + (i % 5) * 4) - 7,
  s: 0.12 + (i % 5) * 0.06,
  ry: i * 1.1,
}));

function nightFactor(tod) {
  if (tod >= 21 || tod <= 4) return 1;
  if (tod > 18 && tod < 21) return (tod - 18) / 3;
  if (tod > 4 && tod < 7)  return 1 - (tod - 4) / 3;
  return 0;
}

// Multi-stop color interpolation for sky (day → dusk → night)
function skyColor(nf) {
  const day   = [122, 184, 216];
  const dusk  = [185,  55,  15];
  const night = [  2,   8,  18];
  const [a, b, t] = nf < 0.5 ? [day, dusk, nf * 2] : [dusk, night, (nf - 0.5) * 2];
  return `rgb(${a.map((v,i) => Math.round(v + (b[i]-v)*t)).join(',')})`;
}

function fogColor(nf) {
  const day   = [168, 206, 234];
  const night = [  2,   8,  18];
  return `rgb(${day.map((v,i) => Math.round(v + (night[i]-v)*nf)).join(',')})`;
}

function groundColor(nf) {
  const day   = [ 74, 128,  40];
  const night = [ 12,  22,   6];
  return `rgb(${day.map((v,i) => Math.round(v + (night[i]-v)*nf)).join(',')})`;
}

function stoneColor(nf) {
  const day   = [138, 122,  96];
  const night = [ 50,  44,  36];
  return `rgb(${day.map((v,i) => Math.round(v + (night[i]-v)*nf)).join(',')})`;
}

export default function Atmosphere() {
  const tod = useStore((s) => s.timeOfDay);
  const nf  = nightFactor(tod);
  const sky = skyColor(nf);
  const fog = fogColor(nf);
  const gnd = groundColor(nf);
  const stn = stoneColor(nf);

  return (
    <>
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[fog, 35, 160]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -8]} receiveShadow>
        <planeGeometry args={[350, 350]} />
        <meshLambertMaterial color={gnd} />
      </mesh>

      {/* Sun disc — fades out at night */}
      {nf < 0.95 && (
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

      {/* Moon disc — fades in at night */}
      {nf > 0.05 && (
        <mesh position={[-45, 65, -90]}>
          <sphereGeometry args={[4.5, 16, 16]} />
          <meshBasicMaterial color="#DEE8FF" transparent opacity={nf * 0.92} />
        </mesh>
      )}

      {/* Scattered ground stones */}
      {STONES.map((s, i) => (
        <mesh key={i} position={[s.x, 0, s.z]} rotation={[0, s.ry, 0]} castShadow>
          <dodecahedronGeometry args={[s.s, 0]} />
          <meshLambertMaterial color={stn} />
        </mesh>
      ))}
    </>
  );
}
