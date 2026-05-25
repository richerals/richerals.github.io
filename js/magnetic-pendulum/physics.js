/**
 * 2D magnetic pendulum ODEs — independent implementation.
 * ẍ + b ẋ + x = Σ (x_n - x) / (|x_n - x|² + h²)^(5/2)
 */
window.MP = window.MP || {};

window.MP.Physics = (function () {
  const DT = 0.008;
  const SUBSTEPS = 6;
  const TRAIL_MAX = 6000;

  function defaultMagnets() {
    return [
      { x: -1.1, y: -0.2, id: 1 },
      { x: 1.1, y: -0.2, id: 2 },
      { x: 0, y: 1.05, id: 3 },
      { x: -0.65, y: 0.75, id: 4 },
      { x: 0.65, y: 0.75, id: 5 },
    ];
  }

  function defaultState() {
    return [0.35, 0.85, 0.02, -0.01];
  }

  function createSim(getParams, getMagnets) {
    let state = defaultState();
    let trail = [];

    function acceleration(x, y, vx, vy) {
      const { b, h, strength } = getParams();
      const magnets = getMagnets();
      let ax = -b * vx - x;
      let ay = -b * vy - y;

      for (const m of magnets) {
        const dx = m.x - x;
        const dy = m.y - y;
        const r2 = dx * dx + dy * dy + h * h;
        const inv = strength / Math.pow(r2, 2.5);
        ax += dx * inv;
        ay += dy * inv;
      }
      return [ax, ay];
    }

    function derivatives(s) {
      const [x, y, vx, vy] = s;
      const [ax, ay] = acceleration(x, y, vx, vy);
      return [vx, vy, ax, ay];
    }

    function addState(s, k, scale) {
      return s.map((v, i) => v + scale * k[i]);
    }

    function rk4Step(s, dt) {
      const k1 = derivatives(s);
      const k2 = derivatives(addState(s, k1, dt * 0.5));
      const k3 = derivatives(addState(s, k2, dt * 0.5));
      const k4 = derivatives(addState(s, k3, dt));
      return s.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }

    function step() {
      for (let i = 0; i < SUBSTEPS; i++) {
        state = rk4Step(state, DT);
      }
      const [x, y] = state;
      const { trailLen } = getParams();
      trail.push({ x, y });
      const cap = Math.min(trailLen, TRAIL_MAX);
      if (trail.length > cap) trail.shift();
    }

    return {
      get state() {
        return state;
      },
      set state(s) {
        state = s.slice();
      },
      get trail() {
        return trail;
      },
      clearTrail() {
        trail = [];
      },
      reset() {
        state = defaultState();
        trail = [];
      },
      setBobPosition(x, y, zeroVelocity = true) {
        state[0] = x;
        state[1] = y;
        if (zeroVelocity) {
          state[2] = 0;
          state[3] = 0;
        }
      },
      step,
      fieldAt(x, y) {
        const { h, strength } = getParams();
        const magnets = getMagnets();
        let ux = 0;
        let uy = 0;
        for (const m of magnets) {
          const dx = m.x - x;
          const dy = m.y - y;
          const r2 = dx * dx + dy * dy + h * h;
          const inv = strength / Math.pow(r2, 2.5);
          ux += dx * inv;
          uy += dy * inv;
        }
        return { ux, uy };
      },
    };
  }

  return { defaultMagnets, defaultState, createSim, DT, SUBSTEPS };
})();
