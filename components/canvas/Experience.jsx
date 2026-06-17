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
import TentInterior from '../models/TentInterior';
import BookingScene from '../models/BookingScene';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

// Trees start opening at this progress, fully open by TREE_OPEN_END
const TREE_OPEN_START = 0.05;
const TREE_OPEN_END   = 0.28;

// Show tent interior when camera is approaching (gallery section = inside tent)
const INTERIOR_SHOW_AT = 0.44;

function SceneContent() {
  const progress = useStore((s) => s.scrollProgress);

  const openProgress = Math.min(
    1,
    Math.max(0, (progress - TREE_OPEN_START) / (TREE_OPEN_END - TREE_OPEN_START)),
  );

  return (
    <>
      <CameraRig />
      <Lights />
      <Atmosphere />
      <Trees openProgress={openProgress} />
      <Campfire />
      <TrailScene />
      <group visible={progress >= INTERIOR_SHOW_AT}>
        <TentInterior />
      </group>
      {/* Booking scene visible during aerial view */}
      <group visible={progress >= 0.72}>
        <BookingScene />
      </group>
      <Effects />
    </>
  );
}

export default function Experience() {
  const tier           = useStore((s) => s.qualityTier);
  const setQualityTier = useStore((s) => s.setQualityTier);
  const activeSection  = useStore((s) => s.activeSection);
  const config         = QUALITY_CONFIG[tier] ?? QUALITY_CONFIG.mid;

  const canvasPointerEvents = activeSection === 'booking' ? 'auto' : 'none';

  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: canvasPointerEvents }}
      dpr={config.dpr}
      camera={{ position: [0, 1.8, 20], fov: 64, near: 0.08, far: 600 }}
      shadows
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
