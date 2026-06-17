'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStore from '../store/useStore';
import { SECTIONS, BOOKING_START } from '../lib/config';

gsap.registerPlugin(ScrollTrigger);

// Section start positions used as snap targets
const SNAP_POINTS = SECTIONS.map((s) => s.start); // [0, 0.214, 0.467, 0.733]

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function useLenisScroll() {
  const lenisRef = useRef(null);
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const setActiveSection = useStore((s) => s.setActiveSection);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      autoRaf: false,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let snapTimer = null;
    let isSnapping = false;
    let lastP = 0;

    const snapToNearest = (p) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const nearest = SNAP_POINTS.reduce((a, b) =>
        Math.abs(b - p) < Math.abs(a - p) ? b : a
      );

      // Skip if already close enough
      if (Math.abs(nearest - p) < 0.006) {
        isSnapping = false;
        return;
      }

      isSnapping = true;
      lenis.scrollTo(nearest * maxScroll, { duration: 1.1, easing: easeOutExpo });
      setTimeout(() => { isSnapping = false; }, 1400);
    };

    const onScroll = ({ progress }) => {
      const p = Math.max(0, Math.min(1, progress));
      lastP = p;
      setScrollProgress(p);
      const active = SECTIONS.find((s) => p >= s.start && p < s.end);
      if (active) setActiveSection(active.id);

      // Snap only outside the last (booking) section so it stays freely scrollable
      if (!isSnapping && p < BOOKING_START) {
        clearTimeout(snapTimer);
        snapTimer = setTimeout(() => snapToNearest(lastP), 220);
      }
    };

    lenis.on('scroll', onScroll);
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(snapTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lenisRef;
}
