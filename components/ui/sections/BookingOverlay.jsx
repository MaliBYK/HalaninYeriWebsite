'use client';
import { useState, useRef, useEffect } from 'react';
import { CONTACT, PLATFORM_SPOTS } from '../../../lib/content';
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, GOOGLE_MAPS_URL } from '../../../lib/config';
import useStore from '../../../store/useStore';
import { TRANSLATIONS } from '../../../lib/translations';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function CustomSelect({ value, options, onChange, label }) {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const block = (e) => {
      e.stopPropagation();
    };

    el.addEventListener('wheel', block, { passive: true });
    el.addEventListener('touchstart', block, { passive: true });
    el.addEventListener('touchmove', block, { passive: true });
    el.addEventListener('touchend', block, { passive: true });

    return () => {
      el.removeEventListener('wheel', block);
      el.removeEventListener('touchstart', block);
      el.removeEventListener('touchmove', block);
      el.removeEventListener('touchend', block);
    };
  }, [open]);

  return (
    <div className="relative w-full text-left">
      {label && <label className="font-body text-cream/50 text-xs mb-1 block">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-cream text-sm text-left flex items-center justify-between focus:outline-none focus:border-[#D4870A]/50 transition-all pointer-events-auto cursor-pointer"
      >
        <span>{options[value] !== undefined ? options[value] : value}</span>
        <span className="text-[10px] text-cream/50 transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {open && (
        <>
          {/* Click outside backdrop */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown list */}
          <div
            ref={listRef}
            className="absolute top-full left-0 right-0 mt-1.5 glass rounded-xl py-1 z-50 flex flex-col shadow-2xl border border-white/10 overflow-hidden max-h-48 overflow-y-auto scrollbar-hide pointer-events-auto"
          >
            {options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(idx);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 font-body text-xs sm:text-sm hover:bg-white/10 transition-colors cursor-pointer ${
                  idx === value ? 'text-[#D4870A] font-semibold bg-white/5' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function buildReservationMessage({ name, checkIn, checkOut, guests, tents, platform }, t) {
  let msg = t.booking.whatsappMsgTemplate;
  if (name)     msg += `${t.booking.whatsappNameLabel}: ${name}\n`;
  if (checkIn)  msg += `${t.booking.whatsappCheckInLabel}: ${checkIn}\n`;
  if (checkOut) msg += `${t.booking.whatsappCheckOutLabel}: ${checkOut}\n`;
  
  const guestsText = t.booking.guestsOptions[guests - 1] || `${guests} ${t.booking.formGuestsOption}`;
  msg += `${t.booking.whatsappGuestsLabel}: ${guestsText}\n`;
  
  const tentsText = t.booking.tentsOptions[tents] || (tents === 0 ? 'Çadırım Yok' : `${tents} Çadır`);
  msg += `${t.booking.whatsappTentsLabel}: ${tentsText}\n`;

  if (platform) msg += `${t.booking.whatsappPlatformLabel}: ${platform}\n`;
  return msg.trim();
}

function FAQAccordion({ faq }) {
  const [openIdx, setOpenIdx] = useState(null);

  if (!faq || !faq.questions) return null;

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 text-left pointer-events-auto">
      <h3 className="font-display text-cream text-lg sm:text-xl mb-4">{faq.title}</h3>
      <div className="flex flex-col gap-2">
        {faq.questions.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border-b border-white/5 last:border-b-0 pb-2 last:pb-0"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left font-body text-cream hover:text-[#D4870A] text-sm py-2 flex items-center justify-between transition-colors focus:outline-none cursor-pointer"
              >
                <span className="font-semibold pr-4">{item.q}</span>
                <span
                  className="text-xs text-cream/50 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                >
                  ▼
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen ? '250px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? '4px' : '0px',
                }}
              >
                <p className="font-body text-cream/70 text-xs sm:text-sm leading-relaxed pb-2">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingOverlay() {
  const [form, setForm] = useState({ name: '', checkIn: '', checkOut: '', guests: 2, tents: 0 });
  const selectedPlatformId = useStore((s) => s.selectedPlatformId);
  const selectedSpot = PLATFORM_SPOTS.find((p) => p.id === selectedPlatformId);
  const isActive = useStore((s) => s.activeSection === 'booking');
  const lang = useStore((s) => s.language);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.tr;
  const BOOKING = t.booking;
  const LOCATION = t.location;

  const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleBook = () => {
    const url = getWhatsAppUrl(
      buildReservationMessage({ ...form, platform: selectedSpot?.label }, t),
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{
        opacity: isActive ? 1 : 0.6,
        transform: isActive ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* Scrollable container to capture inner scroll progress and support smaller screens */}
      <div className="w-full max-w-4xl max-h-[85vh] md:max-h-[92vh] overflow-y-auto scrollbar-hide py-4 px-1 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {/* Booking form */}
          <div className="glass rounded-2xl p-5 sm:p-8">
            <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-1 sm:mb-2">
              {lang === 'ru' ? 'БРОНИРОВАНИЕ' : lang === 'en' ? 'RESERVATION' : 'REZERVASYON'}
            </p>
            <h2 className="font-display text-cream text-2xl sm:text-3xl mb-1 sm:mb-2">{BOOKING.title}</h2>
            <p className="font-body text-cream/60 text-sm mb-4 sm:mb-5">{BOOKING.subtitle}</p>

            {selectedSpot && (
              <div className="mb-3 sm:mb-4 flex items-center gap-2 bg-[#3FA828]/15 border border-[#3FA828]/30 rounded-lg px-4 py-2.5">
                <span className="text-[#3FA828] text-sm">✓</span>
                <span className="font-body text-cream text-sm">{selectedSpot.label} {BOOKING.formSelectedPlatform}</span>
                <button
                  onClick={() => useStore.getState().setSelectedPlatform(null)}
                  className="ml-auto font-body text-cream/40 text-xs hover:text-cream/70 pointer-events-auto"
                >✕</button>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder={BOOKING.formNamePlaceholder}
                value={form.name}
                onChange={update('name')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-body text-cream/50 text-xs mb-1 block">{BOOKING.formCheckInLabel}</label>
                  <input type="date" value={form.checkIn} onChange={update('checkIn')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 sm:py-3 font-body text-cream text-sm focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="font-body text-cream/50 text-xs mb-1 block">{BOOKING.formCheckOutLabel}</label>
                  <input type="date" value={form.checkOut} onChange={update('checkOut')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 sm:py-3 font-body text-cream text-sm focus:outline-none focus:border-[#D4870A]/50 pointer-events-auto [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <CustomSelect
                  label={BOOKING.formGuestsLabel}
                  value={form.guests - 1}
                  options={BOOKING.guestsOptions}
                  onChange={(idx) => setForm((p) => ({ ...p, guests: idx + 1 }))}
                />
                <CustomSelect
                  label={BOOKING.formTentsLabel}
                  value={form.tents}
                  options={BOOKING.tentsOptions}
                  onChange={(idx) => setForm((p) => ({ ...p, tents: idx }))}
                />
              </div>
              <button
                onClick={handleBook}
                className="w-full py-3.5 sm:py-4 bg-[#D4870A] hover:bg-[#E89B1A] text-white font-body font-semibold rounded-full transition-colors duration-200 pointer-events-auto mt-1 cursor-pointer"
              >
                📲 {BOOKING.cta}
              </button>
            </div>

            {/* Compact contact links — mobile only (right column hidden) */}
            <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
              <a href={getWhatsAppUrl(BOOKING.infoMessage)} target="_blank" rel="noopener noreferrer"
                className="font-body text-cream/60 hover:text-cream text-xs transition-colors pointer-events-auto">
                📱 {CONTACT.whatsapp}
              </a>
              <span className="text-cream/20">·</span>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                className="font-body text-[#D4870A] hover:text-[#E89B1A] text-xs transition-colors pointer-events-auto">
                📍 {lang === 'ru' ? 'Карта' : lang === 'en' ? 'Map' : 'Harita'}
              </a>
            </div>
          </div>

          {/* Mobile FAQ section */}
          <div className="md:hidden mt-2">
            <FAQAccordion faq={BOOKING.faq} />
          </div>

          {/* Right column: contact + location + FAQ — tablet/desktop only */}
          <div className="hidden md:flex flex-col gap-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-cream text-xl mb-4">{BOOKING.contactTitle}</h3>
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
              <h3 className="font-display text-cream text-xl mb-3">{BOOKING.locationTitle}</h3>
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
                {BOOKING.mapsCta}
              </a>
            </div>

            {/* Desktop FAQ section */}
            <FAQAccordion faq={BOOKING.faq} />

            <p className="font-body text-cream/25 text-xs text-center">
              {BOOKING.footerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
