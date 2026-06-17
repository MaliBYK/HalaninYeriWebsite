'use client';
import { useState } from 'react';
import { BOOKING, CONTACT, LOCATION } from '../../../lib/content';
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, GOOGLE_MAPS_URL } from '../../../lib/config';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function buildReservationMessage({ name, checkIn, checkOut, guests }) {
  let msg = '🏕️ Merhaba, rezervasyon yapmak istiyorum.\n';
  if (name) msg += `İsim: ${name}\n`;
  if (checkIn) msg += `Giriş: ${checkIn}\n`;
  if (checkOut) msg += `Çıkış: ${checkOut}\n`;
  if (guests) msg += `Kişi sayısı: ${guests}\n`;
  return msg.trim();
}

export default function BookingOverlay() {
  const [form, setForm] = useState({ name: '', checkIn: '', checkOut: '', guests: 2 });

  const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleBook = () => {
    const url = getWhatsAppUrl(buildReservationMessage(form));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="booking-section" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Booking form */}
          <div className="glass rounded-2xl p-8">
            <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-2">
              Rezervasyon
            </p>
            <h2 className="font-display text-cream text-3xl mb-6">{BOOKING.title}</h2>
            <p className="font-body text-cream/60 text-sm mb-6">{BOOKING.subtitle}</p>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Ad Soyad"
                value={form.name}
                onChange={update('name')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-body text-cream/50 text-xs mb-1 block">Giriş Tarihi</label>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={update('checkIn')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-cream text-sm focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="font-body text-cream/50 text-xs mb-1 block">Çıkış Tarihi</label>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={update('checkOut')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-cream text-sm focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-cream/50 text-xs mb-1 block">Kişi Sayısı</label>
                <select
                  value={form.guests}
                  onChange={update('guests')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-cream text-sm focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto [color-scheme:dark]"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} Kişi</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleBook}
                className="w-full py-4 bg-[#D4870A] hover:bg-[#E89B1A] text-white font-body font-semibold rounded-full transition-colors duration-200 pointer-events-auto mt-2"
              >
                📲 {BOOKING.cta}
              </button>
            </div>
          </div>

          {/* Contact + location info */}
          <div className="flex flex-col gap-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-cream text-xl mb-4">İletişim</h3>
              <div className="flex flex-col gap-3">
                <a
                  href={getWhatsAppUrl(BOOKING.infoMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream/80 hover:text-cream transition-colors duration-200 pointer-events-auto"
                >
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="font-body text-sm font-semibold">WhatsApp</p>
                    <p className="font-body text-xs text-cream/50">{CONTACT.whatsapp}</p>
                  </div>
                </a>
                <a
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
              <h3 className="font-display text-cream text-xl mb-4">Konum</h3>
              <div className="flex flex-col gap-2">
                {LOCATION.items.slice(0, 4).map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <p className="font-body text-cream/65 text-xs">{item.text}</p>
                  </div>
                ))}
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-body text-sm text-[#D4870A] hover:text-[#E89B1A] transition-colors duration-200 pointer-events-auto"
              >
                Google Maps&apos;te Aç →
              </a>
            </div>

            {/* Footer note */}
            <p className="font-body text-cream/30 text-xs text-center">
              © 2025 Hala&apos;nın Yeri Camping · Olympos, Antalya
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
