'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStore from '../store/useStore';
import { SECTIONS } from '../lib/config';

gsap.registerPlugin(ScrollTrigger);

const SNAP_POINTS = SECTIONS.map((s) => s.start); // [0, 0.214, 0.467, 0.733]
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Shared ref so any component can trigger a section jump
export const nav = { goTo: null };

export function useLenisScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, autoRaf: false, syncTouch: false });
    lenisRef.current = lenis;

    let isSnapping = false;
    let sectionIdx = 0;

    const goToSection = (idx) => {
      const target = Math.max(0, Math.min(SNAP_POINTS.length - 1, idx));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      isSnapping = true;
      sectionIdx = target;
      useStore.getState().setSectionIndex(target);
      lenis.scrollTo(SNAP_POINTS[target] * maxScroll, {
        duration: 1.1,
        easing: easeOutExpo,
      });
      setTimeout(() => { isSnapping = false; }, 1500);
    };

    nav.goTo = goToSection;

    const onScroll = ({ progress }) => {
      const p = Math.max(0, Math.min(1, progress));
      useStore.getState().setScrollProgress(p);
      const active = SECTIONS.find((s) => p >= s.start && p < s.end);
      if (active) useStore.getState().setActiveSection(active.id);
      for (let i = 0; i < SNAP_POINTS.length; i++) {
        if (p >= SNAP_POINTS[i]) sectionIdx = i;
      }
    };

    lenis.on('scroll', onScroll);
    lenis.on('scroll', ScrollTrigger.update);

    const onWheel = (e) => {
      if (isSnapping) return;
      if (Math.abs(e.deltaY) < 5) return;
      goToSection(sectionIdx + (e.deltaY > 0 ? 1 : -1));
    };

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
      if (isSnapping) return;
      const diff = touchY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      goToSection(sectionIdx + (diff > 0 ? 1 : -1));
    };

    const onKeyDown = (e) => {
      if (isSnapping) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goToSection(sectionIdx + 1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goToSection(sectionIdx - 1);
      }
    };

    window.addEventListener('wheel',      onWheel,      { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    window.addEventListener('keydown',    onKeyDown);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('keydown',    onKeyDown);
      gsap.ticker.remove(tick);
      lenis.destroy();
      nav.goTo = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lenisRef;
}
