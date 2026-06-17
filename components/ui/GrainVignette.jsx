'use client';

export default function GrainVignette() {
  return (
    <>
      {/* Radial vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(2,6,2,0.55) 75%, rgba(0,4,0,0.82) 100%)',
        }}
      />

      {/* Film grain via inline SVG feTurbulence */}
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

      {/* Bottom gradient — scene fades into darkness */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '28vh',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(2,6,2,0.7) 0%, transparent 100%)',
        }}
      />
    </>
  );
}
