export type State4 = [number, number, number, number];

export function addState(s: State4, k: State4, scale: number): State4 {
  return [s[0] + scale * k[0], s[1] + scale * k[1], s[2] + scale * k[2], s[3] + scale * k[3]];
}

export function rk4Step(
  s: State4,
  dt: number,
  deriv: (state: State4) => State4
): State4 {
  const k1 = deriv(s);
  const k2 = deriv(addState(s, k1, dt * 0.5));
  const k3 = deriv(addState(s, k2, dt * 0.5));
  const k4 = deriv(addState(s, k3, dt));
  return [
    s[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
    s[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
    s[2] + (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]),
    s[3] + (dt / 6) * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]),
  ];
}
