'use client';
import { useEffect, useRef } from 'react';

export function usePointerParallax() {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pointerRef;
}
