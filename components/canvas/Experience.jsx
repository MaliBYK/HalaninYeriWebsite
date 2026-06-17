'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import CameraRig from './CameraRig';
import Lights from './Lights';
import Atmosphere from './Atmosphere';
import Effects from './Effects';
import Trees from '../models/Trees';
import Campfire from '../models/Campfire';
import TrailScene from '../models/TrailScene';
import GalleryScene from '../models/GalleryScene';
import BookingScene from '../models/BookingScene';
import SceneProps from '../models/SceneProps';
import FencePerimeter from '../models/FencePerimeter';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

function SceneContent() {
  const progress = useStore((s) => s.scrollProgress);

  return (
    <>
      <CameraRig />
      <Lights />
      <Atmosphere />
      <Trees />
      <Campfire />
      <TrailScene />
      <SceneProps />
      <FencePerimeter />
      {/* Reveal gallery and booking scenes progressively */}
      <group visible={progress >= 0.40}>
        <GalleryScene />
      </group>
      <group visible={progress >= 0.70}>
        <BookingScene />
      </group>
      <Effects />
    </>
  );
}

export default function Experience() {
  const tier = useStore((s) => s.qualityTier);
  const setQualityTier = useStore((s) => s.setQualityTier);
  const activeSection = useStore((s) => s.activeSection);
  const config = QUALITY_CONFIG[tier] ?? QUALITY_CONFIG.mid;

  // Only allow canvas pointer events in booking section for 3D platform selection
  const canvasPointerEvents = activeSection === 'booking' ? 'auto' : 'none';

  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: canvasPointerEvents,
      }}
      dpr={config.dpr}
      camera={{ position: [0, 2.5, 14], fov: 60, near: 0.1, far: 600 }}
      shadows={tier !== 'low'}
      gl={{
        antialias: tier !== 'low',
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
    >
      <PerformanceMonitor
        onDecline={() => setQualityTier('low')}
        onIncline={() => tier === 'low' && setQualityTier('mid')}
        flipflops={3}
        threshold={0.75}
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
