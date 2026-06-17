const BOKEH = [
  { id: 0, size: 220, left: 8,  bottom: 12, duration: 16, delay: 0, gold: true  },
  { id: 1, size: 160, left: 68, bottom: 55, duration: 20, delay: 4, gold: false },
  { id: 2, size: 200, left: 38, bottom: 5,  duration: 24, delay: 8, gold: true  },
  { id: 3, size: 140, left: 82, bottom: 38, duration: 18, delay: 6, gold: false },
  { id: 4, size: 180, left: 20, bottom: 68, duration: 22, delay: 2, gold: true  },
  { id: 5, size: 120, left: 55, bottom: 20, duration: 26, delay: 10, gold: false },
];

const FIREFLIES = [
  { id: 0, left: 7,  duration: 9,    delay: 0   },
  { id: 1, left: 18, duration: 11,   delay: 2   },
  { id: 2, left: 31, duration: 8,    delay: 4   },
  { id: 3, left: 46, duration: 12.5, delay: 1   },
  { id: 4, left: 58, duration: 10,   delay: 3   },
  { id: 5, left: 72, duration: 9.5,  delay: 5.5 },
  { id: 6, left: 84, duration: 11.5, delay: 7   },
  { id: 7, left: 93, duration: 8.5,  delay: 2.5 },
];

function AnimatedBg() {
  return (
    <>
      {/* Layer 1: slow-shifting gradient — forest dusk palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0d1a0a 0%, #2C1A0E 30%, #2d4a1a 60%, #4A2E1A 100%)',
          backgroundSize: '300% 300%',
          animation: 'heroShift 18s ease-in-out infinite',
        }}
      />

      {/* Layer 2: bokeh orbs — blurred gold & forest blobs drifting slowly */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BOKEH.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              bottom: `${b.bottom}%`,
              background: b.gold
                ? 'rgba(212,135,10,0.07)'
                : 'rgba(90,122,58,0.09)',
              filter: 'blur(55px)',
              animation: `bokehFloat ${b.duration}s ${b.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: firefly particles — tiny glowing dots floating upward */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FIREFLIES.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              left: `${f.left}%`,
              bottom: '4%',
              background: 'rgba(212,135,10,0.9)',
              boxShadow: '0 0 8px 3px rgba(212,135,10,0.35)',
              animation: `fireflyFloat ${f.duration}s ${f.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 4: vignette — frames the center content */}
      <div
        className="absolute inset-0 animate-vignette-breath"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 20%, rgba(10,20,8,0.82) 100%)',
        }}
      />
    </>
  );
}

export default AnimatedBg;
