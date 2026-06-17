'use client';
import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function Loader() {
  const { progress, total, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Dismiss when fully loaded OR when no assets are queued (procedural-only scene)
  useEffect(() => {
    const noAssets = !active && total === 0;
    const fullyLoaded = progress >= 100;
    if (fullyLoaded || noAssets) {
      const t = setTimeout(() => setVisible(false), fullyLoaded ? 700 : 400);
      return () => clearTimeout(t);
    }
  }, [progress, total, active]);

  // Hard fallback: always dismiss after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Animate progress bar to 100 when there are no assets to load
  useEffect(() => {
    if (!active && total === 0) {
      setDisplayProgress(100);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, total, active]);

  if (!visible) return null;

  const isDone = displayProgress >= 100;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #050D04 0%, #0D1F08 50%, #1A0E04 100%)',
        transition: 'opacity 0.6s ease',
        opacity: isDone ? 0 : 1,
      }}
    >
      <p className="font-body text-[#D4870A] text-xs tracking-[0.3em] uppercase mb-5">
        ✦ Olympos, Antalya ✦
      </p>
      <h1 className="font-display text-cream text-5xl mb-10 tracking-tight">
        Hala&apos;nın Yeri
      </h1>
      <div className="w-56 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#D4870A] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <p className="font-body text-cream/40 text-xs mt-3">{Math.round(displayProgress)}%</p>
    </div>
  );
}
