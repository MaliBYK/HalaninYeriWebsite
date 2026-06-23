'use client';
import { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ANIMAL_CONFIGS = [
  // Deers (grazing outside the left fence)
  { id: 'deer1', model: 'deer', cx: -11, cz: -4, rx: 2.5, rz: 2.0, speed: 0.18, scale: 0.85, yOffset: 0 },
  { id: 'deer2', model: 'deer', cx: -13, cz: -9, rx: 2.0, rz: 2.5, speed: 0.14, scale: 0.80, yOffset: 0 },
  
  // Cows (grazing outside the right fence)
  { id: 'cow1', model: 'cow', cx: 12, cz: -5, rx: 2.0, rz: 1.8, speed: 0.10, scale: 1.05, yOffset: 0 },
  { id: 'cow2', model: 'cow', cx: 10, cz: -10, rx: 1.8, rz: 2.2, speed: 0.08, scale: 1.00, yOffset: 0 },
  
  // Bunny (hopping around the left tents inside the camp)
  { id: 'bunny1', model: 'bunny', cx: -5.2, cz: -6.5, rx: 1.4, rz: 1.1, speed: 0.32, scale: 0.45, yOffset: 0 },
  
  // Chickens (waddling/pecking on the right side of the camp)
  { id: 'chick1', model: 'chick', cx: 4.5, cz: -7.0, rx: 1.1, rz: 0.9, speed: 0.26, scale: 0.38, yOffset: 0 },
  { id: 'chick2', model: 'chick', cx: 5.5, cz: -4.5, rx: 0.9, rz: 1.1, speed: 0.30, scale: 0.42, yOffset: 0 },
];

const BEE_CONFIGS = [
  // Bees (flying around the camp and flowers)
  { id: 'bee1', model: 'bee', cx: 0, cz: -3, cy: 1.7, rx: 3.0, rz: 2.2, ry: 0.3, speed: 0.70, scale: 0.22 },
  { id: 'bee2', model: 'bee', cx: -4, cz: -8, cy: 2.0, rx: 2.2, rz: 3.0, ry: 0.4, speed: 0.60, scale: 0.22 },
];

export default function Animals() {
  const { scene: deerScene }  = useGLTF('/models/animal-deer.glb');
  const { scene: cowScene }   = useGLTF('/models/animal-cow.glb');
  const { scene: bunnyScene } = useGLTF('/models/animal-bunny.glb');
  const { scene: chickScene } = useGLTF('/models/animal-chick.glb');
  const { scene: beeScene }   = useGLTF('/models/animal-bee.glb');

  const scenes = useMemo(() => ({
    deer: deerScene,
    cow: cowScene,
    bunny: bunnyScene,
    chick: chickScene,
    bee: beeScene,
  }), [deerScene, cowScene, bunnyScene, chickScene, beeScene]);

  // Clone scenes for independent positioning/rotation
  const clones = useMemo(() => {
    const map = {};
    ANIMAL_CONFIGS.forEach((c) => {
      map[c.id] = scenes[c.model].clone(true);
    });
    BEE_CONFIGS.forEach((c) => {
      map[c.id] = scenes[c.model].clone(true);
    });
    return map;
  }, [scenes]);

  const refs = useRef({});

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Animate ground animals
    ANIMAL_CONFIGS.forEach((c, i) => {
      const ref = refs.current[c.id];
      if (!ref) return;

      const offset = i * 7.89;
      const angleSpeed = t * c.speed + offset;

      // Smooth Lissajous curve paths
      const x = c.cx + Math.sin(angleSpeed) * c.rx;
      const z = c.cz + Math.cos(angleSpeed * 0.7) * c.rz;

      // Heading rotation angle
      const dx = Math.cos(angleSpeed) * c.rx * c.speed;
      const dz = -Math.sin(angleSpeed * 0.7) * c.rz * 0.7 * c.speed;
      const heading = Math.atan2(dx, dz);

      ref.position.set(x, c.yOffset || 0, z);
      ref.rotation.y = heading;

      // Hopping bounce animation for the bunny
      if (c.model === 'bunny') {
        const bounce = Math.abs(Math.sin(angleSpeed * 4.0)) * 0.22;
        ref.position.y = bounce;
      }
      
      // Pecking/waddling bounce animation for the chickens
      if (c.model === 'chick') {
        const bounce = Math.abs(Math.sin(angleSpeed * 3.0)) * 0.08;
        ref.position.y = bounce;
        ref.rotation.x = Math.sin(angleSpeed * 6.0) * 0.12; // Pecking rotation
      }
    });

    // 2. Animate flying bees
    BEE_CONFIGS.forEach((c, i) => {
      const ref = refs.current[c.id];
      if (!ref) return;

      const offset = i * 13.45;
      const angleSpeed = t * c.speed + offset;

      const x = c.cx + Math.sin(angleSpeed) * c.rx;
      const z = c.cz + Math.cos(angleSpeed * 0.8) * c.rz;
      const y = c.cy + Math.sin(angleSpeed * 1.5) * c.ry;

      const dx = Math.cos(angleSpeed) * c.rx * c.speed;
      const dz = -Math.sin(angleSpeed * 0.8) * c.rz * 0.8 * c.speed;
      const heading = Math.atan2(dx, dz);

      ref.position.set(x, y, z);
      ref.rotation.y = heading;

      // Bank/tilt in direction of flight
      ref.rotation.z = Math.sin(angleSpeed * 2.0) * 0.15;
    });
  });

  return (
    <group>
      {ANIMAL_CONFIGS.map((c) => (
        <primitive
          key={c.id}
          object={clones[c.id]}
          ref={(el) => (refs.current[c.id] = el)}
          scale={c.scale}
          castShadow
          receiveShadow
        />
      ))}
      {BEE_CONFIGS.map((c) => (
        <primitive
          key={c.id}
          object={clones[c.id]}
          ref={(el) => (refs.current[c.id] = el)}
          scale={c.scale}
          castShadow
        />
      ))}
    </group>
  );
}

// Preload GLTF assets to prevent frame stuttering on load
useGLTF.preload('/models/animal-deer.glb');
useGLTF.preload('/models/animal-cow.glb');
useGLTF.preload('/models/animal-bunny.glb');
useGLTF.preload('/models/animal-chick.glb');
useGLTF.preload('/models/animal-bee.glb');
