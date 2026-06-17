'use client';
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import useStore from '../../store/useStore';

// Deterministic LCG — no Math.random() for SSR safety
function rng(seed) {
  let s = (seed * 1664525 + 1013904223) & 0x7fffffff;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function scatter(count, seedBase, rMin, rMax, zCenter = -6, clearPath = true) {
  const rand = rng(seedBase);
  const PHI  = (1 + Math.sqrt(5)) / 2;
  const out  = [];
  let   attempt = 0;
  while (out.length < count && attempt < count * 10) {
    attempt++;
    const r     = rMin + rand() * (rMax - rMin);
    const theta = attempt * (Math.PI * 2 / (PHI * PHI));
    const x     = Math.cos(theta) * r + (rand() - 0.5) * 4;
    const z     = Math.sin(theta) * r + zCenter + (rand() - 0.5) * 4;
    if (clearPath && Math.abs(x) < 2.8 && z > -7 && z < 2) continue; // keep camera path clear
    if (x * x + (z * z) < 6.25) continue;                             // keep campfire area clear
    out.push({ x, z, scale: 0.7 + rand() * 0.6, rotY: rand() * Math.PI * 2 });
  }
  return out;
}

const MODELS = [
  '/models/tree_palm.glb',
  '/models/tree_palmBend.glb',
  '/models/rock_smallA.glb',
  '/models/rock_smallB.glb',
  '/models/rock_smallC.glb',
  '/models/rock_largeA.glb',
  '/models/rock_largeB.glb',
  '/models/rock_largeC.glb',
  '/models/plant_bush.glb',
  '/models/plant_bushLarge.glb',
  '/models/flower_purpleA.glb',
  '/models/flower_redA.glb',
  '/models/flower_yellowA.glb',
];

const COUNTS = {
  low:  { palm: 2, palmB: 1, rsm: 4,  rlg: 2, bush: 3, bushL: 1, flower: 0 },
  mid:  { palm: 5, palmB: 3, rsm: 14, rlg: 5, bush: 9, bushL: 4, flower: 7 },
  high: { palm: 7, palmB: 4, rsm: 18, rlg: 7, bush: 12,bushL: 6, flower: 12 },
};

export default function SceneProps() {
  const tier = useStore((s) => s.qualityTier);
  const C    = COUNTS[tier] ?? COUNTS.mid;

  const { scene: palmS }    = useGLTF('/models/tree_palm.glb');
  const { scene: palmBS }   = useGLTF('/models/tree_palmBend.glb');
  const { scene: rSmAS }    = useGLTF('/models/rock_smallA.glb');
  const { scene: rSmBS }    = useGLTF('/models/rock_smallB.glb');
  const { scene: rSmCS }    = useGLTF('/models/rock_smallC.glb');
  const { scene: rLgAS }    = useGLTF('/models/rock_largeA.glb');
  const { scene: rLgBS }    = useGLTF('/models/rock_largeB.glb');
  const { scene: rLgCS }    = useGLTF('/models/rock_largeC.glb');
  const { scene: bushS }    = useGLTF('/models/plant_bush.glb');
  const { scene: bushLS }   = useGLTF('/models/plant_bushLarge.glb');
  const { scene: flPurS }   = useGLTF('/models/flower_purpleA.glb');
  const { scene: flRedS }   = useGLTF('/models/flower_redA.glb');
  const { scene: flYelS }   = useGLTF('/models/flower_yellowA.glb');

  // Scatter positions (stable — seeds are constants)
  const palmPos   = useMemo(() => scatter(C.palm,   11, 7,  22), [C.palm]);
  const palmBPos  = useMemo(() => scatter(C.palmB,  22, 9,  25), [C.palmB]);
  const rSmPos    = useMemo(() => scatter(C.rsm,    33, 2,  26), [C.rsm]);
  const rLgPos    = useMemo(() => scatter(C.rlg,    44, 12, 28), [C.rlg]);
  const bushPos   = useMemo(() => scatter(C.bush,   55, 3,  20), [C.bush]);
  const bushLPos  = useMemo(() => scatter(C.bushL,  66, 7,  24), [C.bushL]);
  const flowerPos = useMemo(() => scatter(C.flower, 77, 2,  14), [C.flower]);

  const rSmSrc    = [rSmAS, rSmBS, rSmCS];
  const rLgSrc    = [rLgAS, rLgBS, rLgCS];
  const flSrc     = [flPurS, flRedS, flYelS];

  const palmClones   = useMemo(() => palmPos.map(()    => palmS.clone(true)),            [palmS,  palmPos.length]);  // eslint-disable-line
  const palmBClones  = useMemo(() => palmBPos.map(()   => palmBS.clone(true)),           [palmBS, palmBPos.length]); // eslint-disable-line
  const rSmClones    = useMemo(() => rSmPos.map((_,i)  => rSmSrc[i%3].clone(true)),      [rSmAS, rSmBS, rSmCS, rSmPos.length]);  // eslint-disable-line
  const rLgClones    = useMemo(() => rLgPos.map((_,i)  => rLgSrc[i%3].clone(true)),      [rLgAS, rLgBS, rLgCS, rLgPos.length]);  // eslint-disable-line
  const bushClones   = useMemo(() => bushPos.map(()    => bushS.clone(true)),             [bushS,  bushPos.length]);  // eslint-disable-line
  const bushLClones  = useMemo(() => bushLPos.map(()   => bushLS.clone(true)),            [bushLS, bushLPos.length]); // eslint-disable-line
  const flClones     = useMemo(() => flowerPos.map((_,i) => flSrc[i%3].clone(true)),     [flPurS, flRedS, flYelS, flowerPos.length]); // eslint-disable-line

  return (
    <group>
      {palmPos.map((p, i)   => <primitive key={`pa${i}`}  object={palmClones[i]}  position={[p.x,0,p.z]} scale={p.scale*1.3} rotation-y={p.rotY} castShadow />)}
      {palmBPos.map((p, i)  => <primitive key={`pb${i}`}  object={palmBClones[i]} position={[p.x,0,p.z]} scale={p.scale*1.3} rotation-y={p.rotY} castShadow />)}
      {rSmPos.map((p, i)    => <primitive key={`rs${i}`}  object={rSmClones[i]}   position={[p.x,0,p.z]} scale={p.scale*0.8} rotation-y={p.rotY} castShadow />)}
      {rLgPos.map((p, i)    => <primitive key={`rl${i}`}  object={rLgClones[i]}   position={[p.x,0,p.z]} scale={p.scale*1.4} rotation-y={p.rotY} castShadow />)}
      {bushPos.map((p, i)   => <primitive key={`bu${i}`}  object={bushClones[i]}  position={[p.x,0,p.z]} scale={p.scale}     rotation-y={p.rotY} />)}
      {bushLPos.map((p, i)  => <primitive key={`bl${i}`}  object={bushLClones[i]} position={[p.x,0,p.z]} scale={p.scale*1.2} rotation-y={p.rotY} />)}
      {flowerPos.map((p, i) => <primitive key={`fl${i}`}  object={flClones[i]}    position={[p.x,0,p.z]} scale={p.scale*0.7} rotation-y={p.rotY} />)}
    </group>
  );
}

MODELS.forEach((p) => useGLTF.preload(p));
