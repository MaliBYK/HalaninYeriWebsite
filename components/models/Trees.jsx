'use client';
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useStore from '../../store/useStore';

const TREE_COUNTS = { low: 10, mid: 35, high: 55 };

// Fence perimeter bounds (must match FencePerimeter.jsx)
const FENCE_X1 = -8, FENCE_X2 = 8, FENCE_Z_NEAR = 4, FENCE_Z_FAR = -13;

function genPositions(count) {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const spots = [];
  for (let i = 0; i < count * 6 && spots.length < count; i++) {
    const r = Math.sqrt(i / (count * 6)) * 20 + 3;
    const theta = i * ((2 * Math.PI) / (PHI * PHI));
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r - 7;
    // Must be inside the fence (it's an orange grove)
    if (x < FENCE_X1 || x > FENCE_X2 || z < FENCE_Z_FAR || z > FENCE_Z_NEAR) continue;
    // Keep immediate campfire area clear
    if (x * x + z * z < 8) continue;
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
