'use client';
import { useRef, useEffect, useCallback } from 'react';
import useStore from '../../store/useStore';
import { nightFactor } from '../../lib/timeUtils';

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

export default function ClockWidget() {
  const tod      = useStore((s) => s.timeOfDay);
  const barRef   = useRef(null);
  const dragging = useRef(false);

  // Start at 19:00 (7 PM) — dusk / torch & campfire lighting hour
  useEffect(() => {
    useStore.getState().setTimeOfDay(19);
  }, []);

  const applyX = useCallback((clientX) => {
    if (!barRef.current) return;
    const { left, width } = barRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - left) / width));
    useStore.getState().setTimeOfDay(pct * 24);
  }, []);

  // Mouse drag
  const onMouseDown = (e) => { dragging.current = true; applyX(e.clientX); };

  const onMouseMove = useCallback((e) => {
    if (dragging.current) applyX(e.clientX);
  }, [applyX]);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // Touch drag (horizontal — won't trigger vertical section scroll)
  const onTouchStart = (e) => { dragging.current = true; applyX(e.touches[0].clientX); };
  const onTouchMove  = (e) => { if (dragging.current) applyX(e.touches[0].clientX); };
  const onTouchEnd   = ()  => { dragging.current = false; };

  const nf       = nightFactor(tod);
  const h        = Math.floor(tod) % 24;
  const m        = Math.floor((tod % 1) * 60);
  const pct      = (tod / 24) * 100;
  const icon     = nf > 0.5 ? '🌙' : tod < 7 ? '🌅' : '☀️';
  const accent   = nf > 0.5 ? '#8899DD' : '#D4870A';

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-auto select-none"
    >
      {/* Clock display */}
      <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2">
        <span className="text-sm leading-none">{icon}</span>
        <span className="font-body text-cream text-sm tabular-nums tracking-widest">
          {pad(h)}:{pad(m)}
        </span>
        <span className="font-body text-cream/35 text-[10px] uppercase tracking-wider">Antalya</span>
      </div>

      {/* Draggable time bar */}
      <div
        ref={barRef}
        className="w-36 sm:w-48 cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div className="relative h-5 flex items-center">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: accent }}
            />
          </div>
          {/* Drag handle */}
          <div
            className="absolute w-4 h-4 rounded-full border-2 shadow-lg"
            style={{
              left: `${pct}%`,
              transform: 'translateX(-50%)',
              borderColor: accent,
              background: 'rgba(8,8,12,0.85)',
              boxShadow: `0 0 10px ${accent}99`,
            }}
          />
        </div>
        <div className="flex justify-between px-0.5 -mt-0.5">
          <span className="font-body text-cream/25 text-[9px]">00:00</span>
          <span className="font-body text-cream/25 text-[9px]">24:00</span>
        </div>
      </div>
    </div>
  );
}
