'use client';

// Night factor caps at what the scene looks like at 7 PM (dusk, not full dark).
// Keeps the scene legible while still showing a beautiful evening atmosphere.
export const NIGHT_MAX = 0.33;

export function nightFactor(tod) {
  if (tod >= 19 || tod <= 4)    return NIGHT_MAX;                      // 7 PM – 4 AM: steady dusk
  if (tod > 18 && tod < 19)     return (tod - 18) * NIGHT_MAX;         // 6–7 PM: sunset ramp
  if (tod > 4  && tod < 7)      return NIGHT_MAX * (1 - (tod - 4) / 3); // 4–7 AM: dawn
  return 0;
}
