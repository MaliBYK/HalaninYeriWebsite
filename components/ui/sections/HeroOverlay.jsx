'use client';
import { HERO } from '../../../lib/content';
import { WHATSAPP_NUMBER } from '../../../lib/config';
import { nav } from '../../../hooks/useLenisScroll';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function HeroOverlay() {
  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">

      {/* Dark centre veil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 46%, rgba(4,10,3,0.65) 0%, rgba(4,10,3,0.25) 55%, transparent 100%)',
        }}
      />

      {/* Badge */}
      <p className="relative font-body text-[#D4870A] text-xs tracking-[0.25em] uppercase mb-3 sm:mb-6 section-fade">
        {HERO.badge}
      </p>

      {/* Main title */}
      <h1
        className="relative font-display text-center text-cream leading-none tracking-tight section-fade px-4"
        style={{
          fontSize: 'clamp(2.6rem, 8vw, 7.5rem)',
          textShadow: '0 2px 24px rgba(0,0,0,0.85), 0 0 48px rgba(0,0,0,0.5)',
        }}
      >
        Hala&apos;nın Yeri
      </h1>

      {/* Subtitle */}
      <p
        className="relative font-body text-cream/90 text-center mt-3 sm:mt-6 max-w-[88vw] sm:max-w-lg leading-relaxed section-fade px-2"
        style={{
          fontSize: 'clamp(0.85rem, 1.5vw, 1.2rem)',
          textShadow: '0 1px 16px rgba(0,0,0,0.85)',
        }}
      >
        {HERO.subtitle}
      </p>

      {/* CTAs */}
      <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10 section-fade w-full max-w-xs sm:max-w-none px-6 sm:px-0">
        <a
          href={getWhatsAppUrl('🏕️ Merhaba, rezervasyon yapmak istiyorum')}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 sm:py-3.5 px-8 bg-[#D4870A] hover:bg-[#E89B1A] text-white font-body font-700 rounded-full transition-colors duration-200 text-center pointer-events-auto text-sm sm:text-base"
        >
          🏕️ {HERO.cta}
        </a>
        <button
          onClick={() => nav.goTo?.(1)}
          className="py-3 sm:py-3.5 px-8 glass text-cream/90 hover:text-cream font-body rounded-full transition-colors duration-200 pointer-events-auto text-sm sm:text-base"
        >
          Keşfet ↓
        </button>
      </div>

      {/* Rating badge */}
      <div
        className="relative mt-4 sm:mt-8 glass px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 section-fade pointer-events-auto cursor-pointer"
        onClick={() => nav.goTo?.(2)}
      >
        <span className="text-[#D4870A] text-xs sm:text-sm font-body">{HERO.rating}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center gap-2 scroll-pulse">
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-transparent via-[#D4870A]/60 to-transparent" />
        <span className="font-body text-xs text-cream/50 tracking-widest uppercase">scroll</span>
      </div>
    </div>
  );
}
