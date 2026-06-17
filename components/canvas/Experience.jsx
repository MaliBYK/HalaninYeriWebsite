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

// Module-level constants — stable references that never change.
// If these were object literals inside the component, a new object would be
// created on every render (tier change, section change, etc.) and R3F would
// teardown + rebuild the WebGL context / shadow maps → black flash.
const GL_CONFIG = {
  antialias: false, // post-processing handles AA for mid/high via EffectComposer
  alpha: false,
  powerPreference: 'high-performance',
  stencil: false,
};
const CAMERA = { position: [0, 2.5, 14], fov: 60, near: 0.1, far: 600 };

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
  const tier         = useStore((s) => s.qualityTier);
  const setQualityTier = useStore((s) => s.setQualityTier);
  const activeSection  = useStore((s) => s.activeSection);
  const config = QUALITY_CONFIG[tier] ?? QUALITY_CONFIG.mid;

  const canvasPointerEvents = activeSection === 'booking' ? 'auto' : 'none';

  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: canvasPointerEvents }}
      dpr={config.dpr}
      camera={CAMERA}
      shadows
      gl={GL_CONFIG}
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
