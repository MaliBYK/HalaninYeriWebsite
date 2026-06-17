'use client';
import { ABOUT, AMENITIES } from '../../../lib/content';
import { WHATSAPP_NUMBER } from '../../../lib/config';
import useStore from '../../../store/useStore';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function AboutOverlay() {
  const activeSection = useStore((s) => s.activeSection);
  const isActive = activeSection === 'about';

  return (
    <section id="about-section" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div
          className="w-full max-w-4xl transition-all duration-700"
          style={{
            opacity: isActive ? 1 : 0.5,
            transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* About card */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-3">
                {ABOUT.label}
              </p>
              <h2 className="font-display text-cream text-2xl sm:text-3xl leading-snug mb-5">
                {ABOUT.title}
              </h2>
              <p className="font-body text-cream/65 text-sm leading-relaxed mb-6">
                {ABOUT.text}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {ABOUT.features.map((f) => (
                  <div key={f.title} className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">{f.icon}</span>
                    <div>
                      <p className="font-body text-cream text-sm font-semibold">{f.title}</p>
                      <p className="font-body text-cream/50 text-xs">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={getWhatsAppUrl('🏕️ Merhaba, rezervasyon yapmak istiyorum')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#D4870A] hover:bg-[#E89B1A] text-white font-body text-sm rounded-full transition-colors duration-200 pointer-events-auto"
              >
                {ABOUT.cta}
              </a>
            </div>

            {/* Amenities card */}
            <div className="glass rounded-2xl p-6 sm:p-8">
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
      </div>
    </section>
  );
}
