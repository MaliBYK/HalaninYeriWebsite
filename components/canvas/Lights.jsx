'use client';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

export default function Lights() {
  const tier = useStore((s) => s.qualityTier);
  const shadowSize = QUALITY_CONFIG[tier]?.shadowMapSize ?? 1024;

  return (
    <>
      {/* Bright midday ambient — fills shadows softly */}
      <ambientLight intensity={0.55} color="#FFF8E8" />

      {/* Main sun — high in the sky, warm white */}
      <directionalLight
        position={[25, 38, 20]}
        intensity={2.8}
        color="#FFF8D0"
        castShadow
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-near={0.5}
        shadow-camera-far={140}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={55}
        shadow-camera-bottom={-55}
      />

      {/* Soft sky fill from opposite side */}
      <directionalLight
        position={[-18, 12, -15]}
        intensity={0.45}
        color="#C8DFF5"
      />

      {/* Hemisphere — sky blue above, warm earth below */}
      <hemisphereLight args={['#87CEEB', '#6A8A30', 0.50]} />
    </>
  );
}
