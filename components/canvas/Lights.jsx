'use client';
import { MathUtils } from 'three';
import useStore from '../../store/useStore';
import { QUALITY_CONFIG } from '../../lib/config';

function nightFactor(tod) {
  if (tod >= 21 || tod <= 4) return 1;
  if (tod > 18 && tod < 21) return (tod - 18) / 3;
  if (tod > 4 && tod < 7)  return 1 - (tod - 4) / 3;
  return 0;
}

function lerpHex(a, b, t) {
  const p = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const ca = p(a), cb = p(b);
  return '#' + ca.map((v,i) => Math.round(v + (cb[i]-v)*t).toString(16).padStart(2,'0')).join('');
}

export default function Lights() {
  const tier       = useStore((s) => s.qualityTier);
  const tod        = useStore((s) => s.timeOfDay);
  const shadowSize = QUALITY_CONFIG[tier]?.shadowMapSize ?? 1024;
  const nf         = nightFactor(tod);

  const ambientIntensity = MathUtils.lerp(0.55, 0.06, nf);
  const ambientColor     = lerpHex('#FFF8E8', '#1A2060', nf);
  const sunIntensity     = MathUtils.lerp(2.8, 0.0, nf);
  const moonIntensity    = MathUtils.lerp(0.0, 0.4, nf);
  const fillIntensity    = MathUtils.lerp(0.45, 0.0, nf);
  const hemSkyColor      = lerpHex('#87CEEB', '#080E30', nf);
  const hemGroundColor   = lerpHex('#6A8A30', '#050A05', nf);
  const hemIntensity     = MathUtils.lerp(0.50, 0.12, nf);

  return (
    <>
      <ambientLight intensity={ambientIntensity} color={ambientColor} />

      {/* Sun — fades to zero at night */}
      <directionalLight
        position={[25, 38, 20]}
        intensity={sunIntensity}
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

      {/* Moon — fades in at night */}
      <directionalLight position={[-20, 35, -15]} intensity={moonIntensity} color="#8899DD" />

      {/* Sky fill — day only */}
      <directionalLight position={[-18, 12, -15]} intensity={fillIntensity} color="#C8DFF5" />

      {/* Hemisphere */}
      <hemisphereLight color={hemSkyColor} groundColor={hemGroundColor} intensity={hemIntensity} />
    </>
  );
}
