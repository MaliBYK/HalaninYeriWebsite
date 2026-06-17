'use client';
import { HERO, CONTACT } from '../../../lib/content';
import { WHATSAPP_NUMBER } from '../../../lib/config';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function HeroOverlay() {
  return (
    <section id="hero" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Badge */}
        <p className="font-body text-[#D4870A] text-sm tracking-[0.25em] uppercase mb-6 section-fade">
          {HERO.badge}
        </p>

        {/* Main title */}
        <h1
          className="font-display text-center text-cream leading-none tracking-tight section-fade"
          style={{ fontSize: 'clamp(3.2rem, 8vw, 7.5rem)' }}
        >
          Hala&apos;nın Yeri
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-cream/70 text-center mt-6 max-w-lg leading-relaxed section-fade"
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
        >
          {HERO.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 section-fade">
          <a
            href={getWhatsAppUrl('🏕️ Merhaba, rezervasyon yapmak istiyorum')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-[#D4870A] hover:bg-[#E89B1A] text-white font-body font-700 rounded-full transition-colors duration-200 text-center pointer-events-auto"
          >
            🏕️ {HERO.cta}
          </a>
          <button
            onClick={() => {
              document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 glass text-cream/80 hover:text-cream font-body rounded-full transition-colors duration-200 pointer-events-auto"
          >
            Keşfet ↓
          </button>
        </div>

        {/* Rating badge */}
        <div className="mt-8 glass px-5 py-2.5 rounded-full flex items-center gap-2 section-fade pointer-events-auto cursor-pointer"
          onClick={() => document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-[#D4870A] text-sm font-body">{HERO.rating}</span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 scroll-pulse">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#D4870A]/60 to-transparent" />
          <span className="font-body text-xs text-cream/40 tracking-widest uppercase">scroll</span>
        </div>
      </div>
    </section>
  );
}
