'use client';
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useStore from '../../store/useStore';

const TREE_COUNTS = { low: 10, mid: 35, high: 55 };

function genPositions(count) {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const spots = [];
  for (let i = 0; i < count * 4 && spots.length < count; i++) {
    const r = Math.sqrt(i / (count * 4)) * 30 + 4;
    const theta = i * ((2 * Math.PI) / (PHI * PHI));
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r - 7;
    // Keep the path clear
    if (Math.abs(x) < 2.5 && z > -5 && z < 3) continue;
    spots.push({
      x,
      z,
      scale: 0.9 + Math.abs(Math.sin(i * 2.37)) * 0.8,
      rotY:  i * 1.618,
    });
  }
  return spots;
}

export default function Trees() {
  const tier      = useStore((s) => s.qualityTier);
  const count     = TREE_COUNTS[tier] ?? 35;
  const { scene } = useGLTF('/models/Orange_4.glb');

  const positions = useMemo(() => genPositions(count), [count]);

  // Clone the whole scene for each tree; geometry + materials are shared (not duplicated)
  const clones = useMemo(
    () => positions.map(() => scene.clone(true)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scene, count],
  );

  return (
    <>
      {positions.map((p, i) => (
        <primitive
          key={i}
          object={clones[i]}
          position={[p.x, 0, p.z]}
          scale={p.scale}
          rotation-y={p.rotY}
          castShadow
        />
      ))}
    </>
  );
}

useGLTF.preload('/models/Orange_4.glb');
