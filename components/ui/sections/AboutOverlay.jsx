'use client';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ABOUT, AMENITIES, GALLERY_PHOTOS } from '../../../lib/content';
import useStore from '../../../store/useStore';

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    if (!photo) return;
    const block = (e) => e.stopImmediatePropagation();
    window.addEventListener('wheel',      block, { capture: true });
    window.addEventListener('touchstart', block, { capture: true, passive: true });
    window.addEventListener('touchend',   block, { capture: true, passive: true });
    return () => {
      window.removeEventListener('wheel',      block, { capture: true });
      window.removeEventListener('touchstart', block, { capture: true });
      window.removeEventListener('touchend',   block, { capture: true });
    };
  }, [photo]);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photo, onClose]);

  if (!photo) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        style={{ maxWidth: 'min(70vw, 820px)', maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="rounded-2xl object-contain shadow-2xl"
          style={{ maxWidth: 'min(70vw, 820px)', maxHeight: '75vh', display: 'block' }}
        />
        <p className="mt-2 text-center font-body text-cream/60 text-xs tracking-wide">
          {photo.alt}
        </p>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full glass text-cream flex items-center justify-center text-base hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function AboutOverlay() {
  const isActive = useStore((s) => s.activeSection === 'about');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const openPhoto  = useCallback((photo) => setLightboxPhoto(photo), []);
  const closePhoto = useCallback(() => setLightboxPhoto(null), []);

  return (
    <>
      <div
        className="h-screen flex flex-col items-center justify-center px-4 sm:px-6 gap-4 sm:gap-6 py-6"
        style={{
          opacity:    isActive ? 1 : 0.6,
          transform:  isActive ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* About card — includes photo strip at bottom */}
          <div className="glass rounded-2xl p-5 sm:p-8 flex flex-col">
            <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-2 sm:mb-3">
              {ABOUT.label}
            </p>
            <h2 className="font-display text-cream text-2xl sm:text-3xl leading-snug mb-3 sm:mb-5">
              {ABOUT.title}
            </h2>
            <p className="font-body text-cream/65 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
              {ABOUT.text}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
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

            {/* ── Photo strip (inside the card) ── */}
            <div className="border-t border-white/10 pt-4 mt-auto">
              <p className="font-body text-[#D4870A] text-xs tracking-[0.22em] uppercase mb-3">
                Anlarımızdan
              </p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                {GALLERY_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => openPhoto(photo)}
                    className="flex-shrink-0 w-[64px] h-[64px] sm:w-20 sm:h-20 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#D4870A]/60 hover:scale-105 transition-all duration-200 focus:outline-none bg-white/5"
                    aria-label={photo.alt}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                    />
                  </button>
                ))}
              </div>
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

          {/* Mobile: quick amenity chips below the about card */}
          <div className="flex flex-wrap gap-1.5 lg:hidden">
            {AMENITIES.slice(0, 6).map((a) => (
              <span key={a.title} className="glass text-cream/70 text-xs px-2.5 py-1 rounded-full">
                {a.icon} {a.title}
              </span>
            ))}
          </div>

        </div>
      </div>

      <Lightbox photo={lightboxPhoto} onClose={closePhoto} />
    </>
  );
}
