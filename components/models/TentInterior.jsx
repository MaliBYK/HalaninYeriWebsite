'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Everything positioned relative to the tent's world position [0,0,-5.5]
export default function TentInterior() {
  const lanternRef  = useRef();
  const lightRef    = useRef();

  // Gently flicker the lantern
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = 1 + Math.sin(t * 3.1) * 0.12 + Math.sin(t * 7.3) * 0.06;
    if (lightRef.current)  lightRef.current.intensity = 3.5 * flicker;
    if (lanternRef.current) {
      lanternRef.current.material.emissiveIntensity = 0.7 * flicker;
    }
  });

  return (
    <group position={[0, 0, -5.5]}>

      {/* ── Hanging lantern at ridge ───────────────────── */}
      <group position={[0, 2.3, 0]}>
        {/* Hang wire */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.007, 0.007, 0.3, 4]} />
          <meshLambertMaterial color="#8A7040" />
        </mesh>
        {/* Lantern body */}
        <mesh ref={lanternRef} position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.13, 0.10, 0.32, 8]} />
          <meshLambertMaterial color="#C47820" emissive="#FF9820" emissiveIntensity={0.7} />
        </mesh>
        {/* Lantern cap */}
        <mesh position={[0, 0.19, 0]}>
          <coneGeometry args={[0.14, 0.16, 8]} />
          <meshLambertMaterial color="#A06010" />
        </mesh>
        {/* Light source */}
        <pointLight ref={lightRef} color="#FF9830" intensity={3.5} distance={7} decay={2} />
      </group>

      {/* ── Floor mat ─────────────────────────────────── */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.8, 3.2]} />
        <meshLambertMaterial color="#5A4830" />
      </mesh>

      {/* ── Left sleeping bag ─────────────────────────── */}
      <mesh position={[-0.9, 0.18, -0.5]} rotation={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.23, 1.7, 4, 8]} />
        <meshLambertMaterial color="#4A5A2A" />
      </mesh>
      {/* Pillow */}
      <mesh position={[-0.9, 0.3, -1.5]} rotation={[0.1, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshLambertMaterial color="#C8B888" />
      </mesh>

      {/* ── Right sleeping bag ────────────────────────── */}
      <mesh position={[0.85, 0.18, -0.4]} rotation={[0, -0.12, 0]}>
        <capsuleGeometry args={[0.23, 1.7, 4, 8]} />
        <meshLambertMaterial color="#3A4A6A" />
      </mesh>
      {/* Pillow */}
      <mesh position={[0.85, 0.3, -1.45]} rotation={[0.1, -0.12, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshLambertMaterial color="#C8B888" />
      </mesh>

      {/* ── Small table/crate in corner ───────────────── */}
      <group position={[1.5, 0, 0.8]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.5, 0.55, 0.5]} />
          <meshLambertMaterial color="#5A3818" />
        </mesh>
        {/* Book on crate */}
        <mesh position={[0, 0.6, 0.05]} rotation={[0.05, 0.2, 0]}>
          <boxGeometry args={[0.22, 0.03, 0.30]} />
          <meshLambertMaterial color="#3A2870" />
        </mesh>
        {/* Small cup */}
        <mesh position={[-0.1, 0.62, -0.1]}>
          <cylinderGeometry args={[0.055, 0.045, 0.1, 7]} />
          <meshLambertMaterial color="#8A6840" />
        </mesh>
      </group>

      {/* ── Backpack near entrance ────────────────────── */}
      <mesh position={[-1.7, 0.35, 1.2]} rotation={[0, -0.4, 0.12]}>
        <boxGeometry args={[0.38, 0.65, 0.22]} />
        <meshLambertMaterial color="#4A5A2A" />
      </mesh>

      {/* ── Boots pair ────────────────────────────────── */}
      {[-0.15, 0.15].map((xOff, i) => (
        <mesh key={i} position={[xOff - 1.9, 0.1, 1.6]} rotation={[0, i === 0 ? 0.2 : -0.2, 0]}>
          <boxGeometry args={[0.12, 0.20, 0.32]} />
          <meshLambertMaterial color="#2A1A08" />
        </mesh>
      ))}

    </group>
  );
}
