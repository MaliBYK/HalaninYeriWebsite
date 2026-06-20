'use client';
import useStore from '../../store/useStore';
import { nightFactor } from '../../lib/timeUtils';

export default function GrainVignette() {
  const tod = useStore((s) => s.timeOfDay);
  const nf  = nightFactor(tod);

  // During the day: very subtle edges. At night: stronger vignette.
  const vigOpacity = 0.22 + nf * 0.65; // 0.22 at noon, 0.87 at night

  return (
    <>
      {/* Radial vignette — lighter in daylight */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: vigOpacity,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 46%, rgba(2,6,2,0.50) 76%, rgba(0,4,0,0.80) 100%)',
        }}
      />

      {/* Film grain */}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.038,
          mixBlendMode: 'overlay',
        }}
      >
        <filter id="hny-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hny-grain)" />
      </svg>

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '22vh',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.5 + nf * 0.4,
          background: 'linear-gradient(to top, rgba(2,6,2,0.6) 0%, transparent 100%)',
        }}
      />
    </>
  );
}
