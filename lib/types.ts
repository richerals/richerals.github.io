export type Polarity = 1 | -1;

export type Magnet = {
  id: string;
  x: number;
  y: number;
  polarity: Polarity;
};

export type SimParams = {
  b: number;
  h: number;
  m: number;
  strength: number;
  dt: number;
  trailLen: number;
  v0: number;
};

export type ParticleState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export type SimMode = "single" | "compare";

export type PotentialMode = "total" | "magnetic" | "gravitational";

export type PlotRange = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export const DEFAULT_PARAMS: SimParams = {
  b: 0.1,
  h: 0.5,
  m: 1,
  strength: 1,
  dt: 0.01,
  trailLen: 1500,
  v0: 0,
};

export const DEFAULT_PLOT_RANGE: PlotRange = {
  xMin: -2.5,
  xMax: 2.5,
  yMin: -2.5,
  yMax: 2.5,
};
