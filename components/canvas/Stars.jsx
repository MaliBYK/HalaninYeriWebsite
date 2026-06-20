'use client';
import { useMemo } from 'react';
import useStore from '../../store/useStore';

function nightFactor(tod) {
  if (tod >= 21 || tod <= 4) return 1;
  if (tod > 18 && tod < 21) return (tod - 18) / 3;
  if (tod > 4 && tod < 7)  return 1 - (tod - 4) / 3;
  return 0;
}

const STAR_COUNT = 1400;

export default function Stars() {
  const tod   = useStore((s) => s.timeOfDay);
  const night = nightFactor(tod);

  const positions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI * 0.48; // upper hemisphere only
      const r     = 155 + Math.random() * 25;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  if (night < 0.02) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={STAR_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#EEEEFF"
        size={1.4}
        sizeAttenuation={false}
        transparent
        opacity={night * 0.88}
        depthWrite={false}
        fog={false}
      />
    </points>
  );
}
