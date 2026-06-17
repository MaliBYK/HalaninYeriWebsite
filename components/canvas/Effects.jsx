'use client';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import useStore from '../../store/useStore';

export default function Effects() {
  const tier = useStore((s) => s.qualityTier);
  if (tier === 'low') return null;

  return (
    <EffectComposer multisampling={tier === 'high' ? 4 : 0}>
      <Bloom
        luminanceThreshold={0.42}
        luminanceSmoothing={0.35}
        intensity={tier === 'high' ? 1.3 : 0.75}
        mipmapBlur={tier === 'high'}
      />
    </EffectComposer>
  );
}
