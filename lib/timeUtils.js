'use client';

// Exported so any component can use the same capped night factor.
// MAX = 0.83 ≈ 8:30 PM level — darkness never exceeds this.
export const NIGHT_MAX = 0.83;

export function nightFactor(tod) {
  if (tod >= 20.5 || tod <= 4)    return NIGHT_MAX;
  if (tod > 18 && tod < 20.5)     return Math.min((tod - 18) / 3, NIGHT_MAX);
  if (tod > 4  && tod < 7)        return NIGHT_MAX * (1 - (tod - 4) / 3);
  return 0;
}
