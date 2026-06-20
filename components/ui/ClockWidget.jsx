'use client';
import useStore from '../../store/useStore';

function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

// 0 = full day, 1 = full night
function nightFactor(tod) {
  if (tod >= 21 || tod <= 4) return 1;
  if (tod > 18 && tod < 21) return (tod - 18) / 3;
  if (tod > 4 && tod < 7)  return 1 - (tod - 4) / 3;
  return 0;
}

export default function ClockWidget() {
  const tod = useStore((s) => s.timeOfDay);
  const nf  = nightFactor(tod);
  const h   = Math.floor(tod) % 24;
  const m   = Math.floor((tod % 1) * 60);
  const pct = (tod / 24) * 100;

  const icon     = nf > 0.5 ? '🌙' : tod < 7 ? '🌅' : '☀️';
  const dotColor = nf > 0.5 ? '#8899DD' : '#D4870A';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5">
      {/* Clock */}
      <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2">
        <span className="text-sm leading-none">{icon}</span>
        <span className="font-body text-cream text-sm tabular-nums tracking-widest">
          {pad(h)}:{pad(m)}
        </span>
        <span className="font-body text-cream/40 text-[10px] uppercase tracking-wider">Antalya</span>
      </div>

      {/* Time bar — 00:00 left, 24:00 right */}
      <div className="w-32 sm:w-44 flex flex-col gap-0.5">
        <div className="relative h-1 bg-white/10 rounded-full">
          {/* Filled portion */}
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: dotColor, transition: 'width 1s linear' }}
          />
          {/* Indicator dot */}
          <div
            className="absolute top-1/2 w-3 h-3 rounded-full border-2"
            style={{
              left: `${pct}%`,
              transform: 'translate(-50%, -50%)',
              borderColor: dotColor,
              background: 'rgba(0,0,0,0.6)',
              transition: 'left 1s linear',
            }}
          />
        </div>
        <div className="flex justify-between px-0.5">
          <span className="font-body text-cream/25 text-[9px]">00:00</span>
          <span className="font-body text-cream/25 text-[9px]">24:00</span>
        </div>
      </div>
    </div>
  );
}
