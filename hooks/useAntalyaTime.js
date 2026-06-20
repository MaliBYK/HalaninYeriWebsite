'use client';
import { useEffect } from 'react';
import useStore from '../store/useStore';

// Turkey is UTC+3, no daylight saving
export function useAntalyaTime() {
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const tod = ((now.getUTCHours() + 3) % 24) + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
      useStore.getState().setTimeOfDay(tod);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
}
