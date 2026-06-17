'use client';
import { useEffect } from 'react';
import useStore from '../store/useStore';

function detectTier() {
  if (typeof navigator === 'undefined') return 'mid';
  const memory = navigator.deviceMemory || 4;
  const dpr = window.devicePixelRatio || 1;
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua);
  if (isMobile || memory <= 2 || dpr < 1.5) return 'low';
  if (memory >= 8 && dpr >= 2) return 'high';
  return 'mid';
}

export function useQualityTier() {
  const setQualityTier = useStore((s) => s.setQualityTier);

  useEffect(() => {
    setQualityTier(detectTier());
  }, [setQualityTier]);
}
