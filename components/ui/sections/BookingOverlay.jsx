'use client';
import { BOOKING, CONTACT, LOCATION } from '../../../lib/content';
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, GOOGLE_MAPS_URL } from '../../../lib/config';
import useStore from '../../../store/useStore';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function BookingOverlay() {
  const isActive = useStore((s) => s.activeSection === 'booking');

  return (
    <div
      className="h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{
        opacity: isActive ? 1 : 0.6,
        transform: isActive ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* Main CTA card */}
        <div className="glass rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-4 sm:gap-6">
          <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase">
            Rezervasyon
          </p>
          <h2 className="font-display text-cream text-3xl sm:text-4xl">{BOOKING.title}</h2>
          <p className="font-body text-cream/60 text-sm max-w-xs">
            {BOOKING.subtitle}
          </p>
          <a
            href={getWhatsAppUrl(BOOKING.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#D4870A] hover:bg-[#E89B1A] text-white font-body font-semibold rounded-full transition-colors duration-200 pointer-events-auto text-base flex items-center justify-center gap-2"
          >
            📲 {BOOKING.cta}
          </a>
          <a
            href={getWhatsAppUrl(BOOKING.infoMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-cream/50 hover:text-cream/80 text-sm transition-colors pointer-events-auto"
          >
            Sadece bilgi almak istiyorum →
          </a>
        </div>

        {/* Right column: contact + location — tablet/desktop only */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-cream text-xl mb-4">İletişim</h3>
            <div className="flex flex-col gap-3">
              <a href={getWhatsAppUrl(BOOKING.infoMessage)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-cream/80 hover:text-cream transition-colors duration-200 pointer-events-auto"
              >
                <span className="text-xl">📱</span>
                <div>
                  <p className="font-body text-sm font-semibold">WhatsApp</p>
                  <p className="font-body text-xs text-cream/50">{CONTACT.whatsapp}</p>
                </div>
              </a>
              <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-cream/80 hover:text-cream transition-colors duration-200 pointer-events-auto"
              >
                <span className="text-xl">📸</span>
                <div>
                  <p className="font-body text-sm font-semibold">Instagram</p>
                  <p className="font-body text-xs text-cream/50">@{INSTAGRAM_HANDLE}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-cream text-xl mb-3">Konum</h3>
            <div className="flex flex-col gap-2">
              {LOCATION.items.slice(0, 4).map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <p className="font-body text-cream/65 text-xs">{item.text}</p>
                </div>
              ))}
            </div>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 font-body text-sm text-[#D4870A] hover:text-[#E89B1A] transition-colors duration-200 pointer-events-auto"
            >
              Google Maps&apos;te Aç →
            </a>
          </div>

          <p className="font-body text-cream/25 text-xs text-center">
            © 2025 Hala&apos;nın Yeri Camping · Olympos, Antalya
          </p>
        </div>

      </div>
    </div>
  );
}
