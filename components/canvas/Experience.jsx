'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import CameraRig from './CameraRig';
import Lights from './Lights';
import Atmosphere from './Atmosphere';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

function SceneContent() {
  return (
    <>
      <CameraRig />
      <Lights />
      <Atmosphere />
    </>
  );
}

export default function Experience() {
  const tier = useStore((s) => s.qualityTier);
  const setQualityTier = useStore((s) => s.setQualityTier);
  const config = QUALITY_CONFIG[tier] ?? QUALITY_CONFIG.mid;

  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      dpr={config.dpr}
      camera={{ position: [0, 2.5, 14], fov: 60, near: 0.1, far: 600 }}
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
      >
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
