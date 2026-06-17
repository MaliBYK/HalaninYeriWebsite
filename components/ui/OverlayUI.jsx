'use client';
import useStore from '../../store/useStore';
import { nav } from '../../hooks/useLenisScroll';
import HeroOverlay from './sections/HeroOverlay';
import AboutOverlay from './sections/AboutOverlay';
import GalleryOverlay from './sections/GalleryOverlay';
import BookingOverlay from './sections/BookingOverlay';

const SECTION_IDS = ['hero', 'about', 'gallery', 'booking'];

// Wraps each section with fixed-position + fade/slide transition
function SectionLayer({ sectionIdx, children }) {
  const currentIdx = useStore((s) => s.sectionIndex);
  const isActive   = sectionIdx === currentIdx;
  const offset     = sectionIdx - currentIdx; // <0 = above (past), >0 = below (upcoming)

  return (
    <div
      className="fixed inset-0 z-10"
      style={{
        opacity:   isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : `translateY(${offset > 0 ? 52 : -52}px)`,
        transition: 'opacity 0.65s ease, transform 0.65s ease',
        pointerEvents: isActive ? 'auto' : 'none',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

// Section dot navigation on the right edge
function NavDots() {
  const currentIdx = useStore((s) => s.sectionIndex);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pointer-events-auto"
    >
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          aria-label={`Go to ${id} section`}
          onClick={() => nav.goTo?.(i)}
          className="rounded-full transition-all duration-300 focus:outline-none"
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
      <SectionLayer sectionIdx={0}><HeroOverlay /></SectionLayer>
      <SectionLayer sectionIdx={1}><AboutOverlay /></SectionLayer>
      <SectionLayer sectionIdx={2}><GalleryOverlay /></SectionLayer>
      <SectionLayer sectionIdx={3}><BookingOverlay /></SectionLayer>
      <NavDots />
    </>
  );
}
