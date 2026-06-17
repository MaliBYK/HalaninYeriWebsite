'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import useStore from '../store/useStore';
import { SECTIONS } from '../lib/config';

const TARGETS = SECTIONS.map((s) => s.start); // [0, 0.214, 0.467, 0.733]

// Shared ref so any component can trigger a section jump
export const nav = { goTo: null };

export function useLenisScroll() {
  useEffect(() => {
    const proxy = { value: 0 };
    let idx   = 0;
    let tween = null;

    const goTo = (target) => {
      target = Math.max(0, Math.min(TARGETS.length - 1, target));
      if (target === idx && tween?.isActive()) return;
      idx = target;

      // Update section indicator immediately for instant UI response
      useStore.getState().setSectionIndex(target);

      tween?.kill();
      tween = gsap.to(proxy, {
        value: TARGETS[target],
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate() {
          useStore.getState().setScrollProgress(proxy.value);
          const sec = SECTIONS.find((s) => proxy.value >= s.start && proxy.value < s.end);
          if (sec) useStore.getState().setActiveSection(sec.id);
        },
      });
    };

    nav.goTo = goTo;

    // ── Input handlers ────────────────────────────────────────────────────────
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 5) return;
      goTo(idx + (e.deltaY > 0 ? 1 : -1));
    };

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      goTo(idx + (diff > 0 ? 1 : -1));
    };

    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault(); goTo(idx + 1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goTo(idx - 1);
      }
    };

    window.addEventListener('wheel',      onWheel,      { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    window.addEventListener('keydown',    onKey);

    return () => {
      tween?.kill();
      nav.goTo = null;
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('keydown',    onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
