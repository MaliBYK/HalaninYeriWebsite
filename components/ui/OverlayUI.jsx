'use client';
import { useRef, useLayoutEffect } from 'react';
import useStore from '../../store/useStore';
import { SECTIONS } from '../../lib/config';
import HeroOverlay from './sections/HeroOverlay';
import AboutOverlay from './sections/AboutOverlay';
import GalleryOverlay from './sections/GalleryOverlay';
import BookingOverlay from './sections/BookingOverlay';

// Cross-fade zone width around each section boundary
const FADE = 0.04;

function clamp01(x) { return Math.max(0, Math.min(1, x)); }

function getSectionOpacity(sec, progress) {
  const { start: S, end: E } = sec;
  if (progress < S - FADE || progress >= E) return 0;
  if (S > 0 && progress < S) return clamp01((progress - (S - FADE)) / FADE);
  if (E < 1.0 && progress >= E - FADE) return clamp01((E - progress) / FADE);
  return 1;
}

// Fixed-position layer for each section, visibility driven by scrollProgress.
// Uses the HTML `inert` attribute (not CSS pointer-events) so that child
// elements with pointer-events:auto cannot override the block.
// Inactive layers are fully excluded from hit-testing → clicks fall through.
function SectionLayer({ sectionId, children }) {
  const progress      = useStore((s) => s.scrollProgress);
  const activeSection = useStore((s) => s.activeSection);
  const layerRef      = useRef(null);

  const sec     = SECTIONS.find((s) => s.id === sectionId);
  const opacity = getSectionOpacity(sec, progress);
  const isActive = activeSection === sectionId;

  // useLayoutEffect runs before paint → inert is applied on the very first frame.
  useLayoutEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    if (isActive) {
      el.removeAttribute('inert');
    } else {
      el.setAttribute('inert', '');
    }
  }, [isActive]);

  let ty = 0;
  if (sec.start > 0 && progress < sec.start) {
    ty = 28 * (1 - opacity);
  } else if (sec.end < 1.0 && progress >= sec.end - FADE && progress < sec.end) {
    ty = -28 * (1 - opacity);
  }

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 z-10"
      style={{
        opacity,
        transform: `translateY(${ty}px)`,
        userSelect: 'none',
        cursor: 'default',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

// Right-edge dot navigation
function NavDots() {
  const progress = useStore((s) => s.scrollProgress);
  const goTo     = useStore((s) => s.goTo);
  const currentIdx = SECTIONS.reduce((acc, s, i) => (progress >= s.start ? i : acc), 0);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pointer-events-auto"
    >
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          aria-label={`Go to ${s.id} section`}
          onClick={() => goTo?.(i)}
          className="rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
          style={{
            width:      i === currentIdx ? 10 : 7,
            height:     i === currentIdx ? 10 : 7,
            background: i === currentIdx ? '#D4870A' : 'rgba(245,236,215,0.35)',
            boxShadow:  i === currentIdx ? '0 0 8px #D4870A99' : 'none',
          }}
        />
      ))}
    </nav>
  );
}

export default function OverlayUI() {
  return (
    <>
      <SectionLayer sectionId="hero"><HeroOverlay /></SectionLayer>
      <SectionLayer sectionId="about"><AboutOverlay /></SectionLayer>
      <SectionLayer sectionId="gallery"><GalleryOverlay /></SectionLayer>
      <SectionLayer sectionId="booking"><BookingOverlay /></SectionLayer>
      <NavDots />
    </>
  );
}
