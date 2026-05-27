import type { Magnet, PotentialMode, SimParams } from "./types";

export function vGravitational(x: number, y: number): number {
  return 0.5 * (x * x + y * y);
}

export function vMagnetic(
  x: number,
  y: number,
  magnets: Magnet[],
  h: number,
  strength: number,
  v0: number
): number {
  let sum = 0;
  for (const m of magnets) {
    const dx = x - m.x;
    const dy = y - m.y;
    const r2 = dx * dx + dy * dy + h * h;
    sum += (m.polarity * strength) / Math.pow(r2, 1.5);
  }
  return -(1 / 3) * sum + v0;
}

export function potentialAt(
  x: number,
  y: number,
  magnets: Magnet[],
  params: SimParams,
  mode: PotentialMode
): number {
  const vG = vGravitational(x, y);
  const vM = vMagnetic(x, y, magnets, params.h, params.strength, params.v0);
  if (mode === "gravitational") return vG;
  if (mode === "magnetic") return vM;
  return vG + vM;
}
