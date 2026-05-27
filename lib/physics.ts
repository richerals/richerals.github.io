import type { Magnet, ParticleState, SimParams } from "./types";
import { rk4Step, type State4 } from "./rk4";

/** Fixed magnets are placed on this circle (guide drawn in the simulation). */
export const MAGNET_RING = { cx: 0, cy: 0, radius: 1 };

export const DEFAULT_BOB: ParticleState = { x: 2, y: -1.6, vx: 0, vy: 0 };
export const DEFAULT_BOB_COMPARE: ParticleState = { x: 2.002, y: -1.598, vx: 0, vy: 0 };

export function defaultMagnets(): Magnet[] {
  const { cx, cy, radius } = MAGNET_RING;
  const count = 5;
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return {
      id: String(i + 1),
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      polarity: 1 as const,
    };
  });
}

export function particleToState(p: ParticleState): State4 {
  return [p.x, p.y, p.vx, p.vy];
}

export function stateToParticle(s: State4): ParticleState {
  return { x: s[0], y: s[1], vx: s[2], vy: s[3] };
}

export function magnetForce(x: number, y: number, magnets: Magnet[], h: number, strength: number) {
  let fx = 0;
  let fy = 0;
  for (const m of magnets) {
    const dx = m.x - x;
    const dy = m.y - y;
    const r2 = dx * dx + dy * dy + h * h;
    const inv = (m.polarity * strength) / Math.pow(r2, 2.5);
    fx += dx * inv;
    fy += dy * inv;
  }
  return { fx, fy };
}

export function acceleration(
  x: number,
  y: number,
  vx: number,
  vy: number,
  magnets: Magnet[],
  params: SimParams
): [number, number] {
  const { b, h, m, strength } = params;
  let ax = (-b * vx - x) / m;
  let ay = (-b * vy - y) / m;
  const { fx, fy } = magnetForce(x, y, magnets, h, strength);
  ax += fx / m;
  ay += fy / m;
  return [ax, ay];
}

function derivatives(s: State4, magnets: Magnet[], params: SimParams): State4 {
  const [x, y, vx, vy] = s;
  const [ax, ay] = acceleration(x, y, vx, vy, magnets, params);
  return [vx, vy, ax, ay];
}

export function stepState(
  s: State4,
  magnets: Magnet[],
  params: SimParams,
  substeps = 4
): State4 {
  const dt = Math.min(params.dt, 0.02);
  let state = s;
  const f = (st: State4) => derivatives(st, magnets, params);
  for (let i = 0; i < substeps; i++) {
    state = rk4Step(state, dt, f);
  }
  return state;
}

export function nearestMagnetIndex(x: number, y: number, magnets: Magnet[]): number {
  let best = 0;
  let bestD = Infinity;
  magnets.forEach((m, i) => {
    const d = (x - m.x) ** 2 + (y - m.y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

export function integrateToEquilibrium(
  x0: number,
  y0: number,
  magnets: Magnet[],
  params: SimParams,
  options?: { maxSteps?: number; speedTol?: number; bounds?: number }
) {
  const maxSteps = options?.maxSteps ?? 5000;
  const speedTol = options?.speedTol ?? 0.025;
  const bounds = options?.bounds ?? 3.5;
  let state: State4 = [x0, y0, 0, 0];

  for (let i = 0; i < maxSteps; i++) {
    state = stepState(state, magnets, params, 4);
    const [, , vx, vy] = state;
    if (Math.hypot(vx, vy) < speedTol) break;
    if (Math.abs(state[0]) > bounds || Math.abs(state[1]) > bounds) break;
  }

  return {
    x: state[0],
    y: state[1],
    magnet: nearestMagnetIndex(state[0], state[1], magnets),
  };
}
