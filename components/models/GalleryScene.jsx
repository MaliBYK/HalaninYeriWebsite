'use client';
import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, MeshBasicMaterial } from 'three';
import { REVIEWS } from '../../lib/content';

// Polaroid card layout around GALLERY_CENTER [0, 2.5, -9]
const LAYOUT = [
  { pos: [-2.8, 2.6, -9.2], rot: [0.08, 0.35, -0.1], baseY: 2.6 },
  { pos: [3.2, 2.2, -8.8], rot: [-0.05, -0.22, 0.13], baseY: 2.2 },
  { pos: [-0.6, 3.4, -11.2], rot: [0.14, 0.52, 0.07], baseY: 3.4 },
  { pos: [3.8, 3.0, -10.2], rot: [0.0, -0.18, -0.12], baseY: 3.0 },
  { pos: [-4.0, 2.5, -8.6], rot: [0.11, 0.44, 0.14], baseY: 2.5 },
  { pos: [1.0, 2.0, -12.5], rot: [-0.09, -0.28, -0.07], baseY: 2.0 },
];

function drawPolaroid(review) {
  const W = 280, H = 350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // White frame
  ctx.fillStyle = '#FDFBF5';
  ctx.fillRect(0, 0, W, H);

  // Photo gradient
  const grad = ctx.createLinearGradient(0, 0, W, 200);
  grad.addColorStop(0, '#1A380A');
  grad.addColorStop(0.5, '#2D5A16');
  grad.addColorStop(1, '#3A6B20');
  ctx.fillStyle = grad;
  ctx.fillRect(18, 18, W - 36, 200);

  // Sun halo
  const sg = ctx.createRadialGradient(210, 35, 0, 210, 35, 70);
  sg.addColorStop(0, 'rgba(255,160,30,0.55)');
  sg.addColorStop(1, 'rgba(255,160,30,0)');
  ctx.fillStyle = sg;
  ctx.fillRect(18, 18, W - 36, 200);

  // Stars
  ctx.fillStyle = '#D4870A';
  ctx.font = 'bold 14px serif';
  ctx.textAlign = 'center';
  ctx.fillText('★'.repeat(review.rating), W / 2, 238);

  // Name
  ctx.fillStyle = '#2C1A0E';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('— ' + review.name, W / 2, 256);

  // Review text (wrap)
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#4A3020';
  const words = review.text.split(' ');
  let line = '', y = 276;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > W - 40 && line !== '') {
      ctx.fillText(line.trim(), W / 2, y);
      line = word + ' ';
      y += 14;
      if (y > H - 12) break;
    } else {
      line = test;
    }
  }
  if (line.trim() && y <= H - 12) ctx.fillText(line.trim(), W / 2, y);

  return canvas;
}

export default function GalleryScene() {
  const groupRef = useRef();
  const textures = useMemo(() => {
    if (typeof document === 'undefined') return REVIEWS.map(() => null);
    return REVIEWS.map((r) => new CanvasTexture(drawPolaroid(r)));
  }, []);

  useEffect(() => () => textures.forEach((t) => t?.dispose()), [textures]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const base = LAYOUT[i];
      child.position.y = base.baseY + Math.sin(t * 0.48 + i * 1.1) * 0.065;
      child.rotation.z = base.rot[2] + Math.sin(t * 0.33 + i * 0.9) * 0.018;
      child.rotation.y = base.rot[1] + Math.sin(t * 0.22 + i * 0.7) * 0.012;
    });
  });

  return (
    <group ref={groupRef}>
      {REVIEWS.map((review, i) => {
        const layout = LAYOUT[i];
        return (
          <group
            key={i}
            position={layout.pos}
            rotation={layout.rot}
          >
            {/* Front face — polaroid with texture */}
            <mesh>
              <planeGeometry args={[1.6, 2.0]} />
              <meshBasicMaterial map={textures[i]} transparent />
            </mesh>
            {/* Thin card body */}
            <mesh position={[0, 0, -0.015]}>
              <boxGeometry args={[1.62, 2.02, 0.03]} />
              <meshLambertMaterial color="#FDFBF5" />
            </mesh>
            {/* Subtle shadow plane below */}
            <mesh position={[0.08, -0.12, -0.08]} rotation={[-Math.PI / 8, 0, 0]}>
              <planeGeometry args={[1.55, 1.95]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.18} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
