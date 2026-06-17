'use client';
import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

const DECK_TOP = 0.45; // y of platform deck surface (center 0.38 + half 0.07)

const LEG_OFFSETS = [[-0.95, -0.95], [-0.95, 0.95], [0.95, -0.95], [0.95, 0.95]];

// Each platform: position, rotation, which tent scene to clone, stump nearby
const PLATFORM_DEFS = [
  { pos: [-4.5, 0, -5],  rot: 0.2,   tentKey: 'closed', stumpOff: [1.8, 0,  1.4] },
  { pos: [5.5,  0, -8],  rot: -0.15, tentKey: 'open',   stumpOff: [-2.0, 0,  1.2] },
  { pos: [-3.5, 0, -11], rot: 0.35,  tentKey: 'closed', stumpOff: [2.0, 0, -1.2] },
];


function Platform({ pos, rot, tentClone, stumpClone, stumpOff }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      {/* Deck */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.14, 2.6]} />
        <meshLambertMaterial color="#7A5228" />
      </mesh>
      {/* Plank details */}
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
      {/* Real tent on deck */}
      <primitive object={tentClone} position={[0, DECK_TOP, 0]} scale={2.2} />
      {/* Stump beside platform */}
      <primitive object={stumpClone} position={stumpOff} />
    </group>
  );
}

export default function TrailScene() {
  const { scene: tentClosedScene }    = useGLTF('/models/tent_detailedClosed.glb');
  const { scene: tentOpenScene }      = useGLTF('/models/tent_detailedOpen.glb');
  const { scene: logStackScene }      = useGLTF('/models/log_stack.glb');
  const { scene: logStackLargeScene } = useGLTF('/models/log_stackLarge.glb');
  const { scene: stumpDetScene }      = useGLTF('/models/stump_roundDetailed.glb');
  const { scene: canoeScene }         = useGLTF('/models/canoe.glb');

  // One clone per platform tent + stump
  const tentClones = useMemo(() => PLATFORM_DEFS.map((p) =>
    (p.tentKey === 'open' ? tentOpenScene : tentClosedScene).clone(true)
  ), [tentClosedScene, tentOpenScene]);

  const stumpDetClones = useMemo(() =>
    PLATFORM_DEFS.map(() => stumpDetScene.clone(true)),
    [stumpDetScene],
  );

  const logStackClone      = useMemo(() => logStackScene.clone(true),      [logStackScene]);
  const logStackLargeClone = useMemo(() => logStackLargeScene.clone(true), [logStackLargeScene]);
  const canoeClone         = useMemo(() => canoeScene.clone(true),         [canoeScene]);

  return (
    <group>
      {/* Platforms with real tents */}
      {PLATFORM_DEFS.map((p, i) => (
        <Platform
          key={i}
          pos={p.pos}
          rot={p.rot}
          tentClone={tentClones[i]}
          stumpClone={stumpDetClones[i]}
          stumpOff={p.stumpOff}
        />
      ))}

      {/* Kitchen area */}
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

      {/* Firewood piles */}
      <primitive object={logStackClone}      position={[-3.2, 0,  0.6]} rotation-y={0.4} />
      <primitive object={logStackLargeClone} position={[2.6,  0,  1.5]} rotation-y={-0.3} />

      {/* Canoe resting on the ground to the right */}
      <primitive object={canoeClone} position={[8.5, 0, -4.2]} rotation-y={1.1} scale={1.2} />

    </group>
  );
}

useGLTF.preload('/models/tent_detailedClosed.glb');
useGLTF.preload('/models/tent_detailedOpen.glb');
useGLTF.preload('/models/log_stack.glb');
useGLTF.preload('/models/log_stackLarge.glb');
useGLTF.preload('/models/stump_roundDetailed.glb');
useGLTF.preload('/models/canoe.glb');
