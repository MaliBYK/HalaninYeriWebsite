'use client';
import { ABOUT, AMENITIES } from '../../../lib/content';
import useStore from '../../../store/useStore';

export default function AboutOverlay() {
  const isActive = useStore((s) => s.activeSection === 'about');

  return (
    <div
      className="h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{
        opacity: isActive ? 1 : 0.6,
        transform: isActive ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* About card */}
        <div className="glass rounded-2xl p-5 sm:p-8">
          <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-2 sm:mb-3">
            {ABOUT.label}
          </p>
          <h2 className="font-display text-cream text-2xl sm:text-3xl leading-snug mb-3 sm:mb-5">
            {ABOUT.title}
          </h2>
          <p className="font-body text-cream/65 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
            {ABOUT.text}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {ABOUT.features.map((f) => (
              <div key={f.title} className="flex items-start gap-2">
                <span className="text-base sm:text-lg mt-0.5">{f.icon}</span>
                <div>
                  <p className="font-body text-cream text-xs sm:text-sm font-semibold">{f.title}</p>
                  <p className="font-body text-cream/50 text-xs hidden sm:block">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick amenity chips — mobile only */}
          <div className="flex flex-wrap gap-1.5 mb-4 lg:hidden">
            {AMENITIES.slice(0, 6).map((a) => (
              <span key={a.title} className="glass text-cream/70 text-xs px-2.5 py-1 rounded-full">
                {a.icon} {a.title}
              </span>
            ))}
          </div>

        </div>

        {/* Full amenities card — desktop only */}
        <div className="glass rounded-2xl p-5 sm:p-8 hidden lg:block">
          <h2 className="font-display text-cream text-2xl mb-5">
            Konforunuz İçin Her Şey
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {AMENITIES.map((a) => (
              <div key={a.title} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{a.icon}</span>
                <div>
                  <p className="font-body text-cream text-sm font-semibold">{a.title}</p>
                  <p className="font-body text-cream/50 text-xs">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
