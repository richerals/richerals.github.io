window.MP = window.MP || {};

window.MP.Renderer = (function () {
  const WORLD = { scale: 72, anchor: { x: 0, y: 0 } };

  function PendulumRenderer(canvas, sim, getParams, getMagnets) {
    const ctx = canvas.getContext("2d");

    function worldToCanvas(wx, wy) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      return { x: w * 0.5 + wx * WORLD.scale, y: h * 0.5 - wy * WORLD.scale };
    }

    function canvasToWorld(cx, cy) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      return {
        x: (cx - w * 0.5) / WORLD.scale,
        y: (h * 0.5 - cy) / WORLD.scale,
      };
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function drawField() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const step = 14;
      for (let px = step; px < w; px += step) {
        for (let py = step; py < h; py += step) {
          const { x, y } = canvasToWorld(px, py);
          const { ux, uy } = sim.fieldAt(x, y);
          const mag = Math.hypot(ux, uy);
          if (mag < 1e-6) continue;
          const alpha = Math.min(0.22, mag * 0.04);
          const angle = Math.atan2(-uy, ux);
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-3, 0);
          ctx.lineTo(3, 0);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    function drawTrail() {
      const trail = sim.trail;
      if (trail.length < 2) return;
      const n = trail.length;
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const a = 0.08 + 0.75 * t;
        const p0 = worldToCanvas(trail[i - 1].x, trail[i - 1].y);
        const p1 = worldToCanvas(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(147, 197, 253, ${a})`;
        ctx.lineWidth = 1.2 + t * 1.8;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    }

    function drawMagnet(m) {
      const p = worldToCanvas(m.x, m.y);
      const grad = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, 16);
      grad.addColorStop(0, "rgba(248, 113, 113, 0.95)");
      grad.addColorStop(1, "rgba(185, 28, 28, 0.35)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(254, 202, 202, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px var(--font, sans-serif)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("N", p.x, p.y + 0.5);
    }

    function drawBob() {
      const [x, y] = sim.state;
      const bob = worldToCanvas(x, y);
      const anchor = worldToCanvas(WORLD.anchor.x, WORLD.anchor.y);

      ctx.strokeStyle = "rgba(203, 213, 225, 0.55)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(anchor.x, anchor.y);
      ctx.lineTo(bob.x, bob.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
      ctx.beginPath();
      ctx.arc(anchor.x, anchor.y, 5, 0, Math.PI * 2);
      ctx.fill();

      const glow = ctx.createRadialGradient(bob.x, bob.y, 2, bob.x, bob.y, 18);
      glow.addColorStop(0, "rgba(96, 165, 250, 0.9)");
      glow.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(bob.x, bob.y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#e0f2fe";
      ctx.strokeStyle = "#93c5fd";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bob.x, bob.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    function draw() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(8, 14, 28, 0.35)";
      ctx.fillRect(0, 0, w, h);
      drawField();
      drawTrail();
      getMagnets().forEach(drawMagnet);
      drawBob();
    }

    function hitTest(wx, wy) {
      const [px, py] = sim.state;
      if (Math.hypot(wx - px, wy - py) < 0.18) return { type: "bob" };
      for (const m of getMagnets()) {
        if (Math.hypot(wx - m.x, wy - m.y) < 0.2) return { type: "magnet", magnet: m };
      }
      return null;
    }

    return {
      resize,
      draw,
      worldToCanvas,
      canvasToWorld,
      hitTest,
      WORLD,
    };
  }

  return { PendulumRenderer };
})();
