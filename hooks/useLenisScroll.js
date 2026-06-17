'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useStore from '../store/useStore';
import { SECTIONS } from '../lib/config';

gsap.registerPlugin(ScrollTrigger);

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

    const onScroll = ({ progress }) => {
      const p = Math.max(0, Math.min(1, progress));
      setScrollProgress(p);
      const active = SECTIONS.find((s) => p >= s.start && p < s.end);
      if (active) setActiveSection(active.id);
    };

    lenis.on('scroll', onScroll);
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lenisRef;
}
