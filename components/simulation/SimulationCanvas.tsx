"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { DEFAULT_BOB, DEFAULT_BOB_COMPARE, MAGNET_RING, particleToState, stateToParticle, stepState } from "@/lib/physics";
import type { State4 } from "@/lib/rk4";

const SCALE = 72;
const TRAIL_MAX = 8000;

type Trail = { x: number; y: number }[];

export function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsA = useRef<Trail>([]);
  const trailsB = useRef<Trail>([]);
  const stateA = useRef<State4>([DEFAULT_BOB.x, DEFAULT_BOB.y, 0, 0]);
  const stateB = useRef<State4>([DEFAULT_BOB_COMPARE.x, DEFAULT_BOB_COMPARE.y, 0, 0]);
  const dragRef = useRef<"bobA" | "bobB" | "magnet" | null>(null);
  const dragMagnetId = useRef<string | null>(null);
  const magnetDragStart = useRef({ x: 0, y: 0 });
  const blockPolarityToggle = useRef(false);

  const {
    magnets,
    params,
    mode,
    particleA,
    particleB,
    running,
    selectedMagnetId,
    setSelectedMagnetId,
    updateMagnet,
    toggleMagnetPolarity,
    setParticleA,
    setParticleB,
    bumpVersion,
    clearTrailsNonce,
  } = useSimulation();

  const worldToCanvas = useCallback((wx: number, wy: number, w: number, h: number) => {
    return { x: w * 0.5 + wx * SCALE, y: h * 0.5 - wy * SCALE };
  }, []);

  const canvasToWorld = useCallback((cx: number, cy: number, w: number, h: number) => {
    return { x: (cx - w * 0.5) / SCALE, y: (h * 0.5 - cy) / SCALE };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    const drawTrail = (trail: Trail, color: string) => {
      if (trail.length < 2) return;
      const n = trail.length;
      for (let i = 1; i < n; i++) {
        const t = i / n;
        ctx.strokeStyle = color.replace("ALPHA", String(0.15 + 0.75 * t));
        ctx.lineWidth = 1 + t * 1.5;
        const p0 = worldToCanvas(trail[i - 1].x, trail[i - 1].y, w, h);
        const p1 = worldToCanvas(trail[i].x, trail[i].y, w, h);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    };

    drawTrail(trailsA.current, "rgba(255,255,255,ALPHA)");
    if (mode === "compare") drawTrail(trailsB.current, "rgba(76,175,80,ALPHA)");

    const ringCenter = worldToCanvas(MAGNET_RING.cx, MAGNET_RING.cy, w, h);
    const ringEdge = worldToCanvas(MAGNET_RING.cx + MAGNET_RING.radius, MAGNET_RING.cy, w, h);
    const ringPx = Math.hypot(ringEdge.x - ringCenter.x, ringEdge.y - ringCenter.y);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.arc(ringCenter.x, ringCenter.y, ringPx, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const m of magnets) {
      const p = worldToCanvas(m.x, m.y, w, h);
      const isRed = m.polarity === 1;
      const selected = m.id === selectedMagnetId;
      const glow = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, 22);
      glow.addColorStop(0, isRed ? "rgba(229,57,53,0.5)" : "rgba(30,136,229,0.5)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isRed ? "#e53935" : "#1e88e5";
      ctx.beginPath();
      ctx.arc(p.x, p.y, selected ? 14 : 12, 0, Math.PI * 2);
      ctx.fill();
      if (selected) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const drawBob = (s: State4, fill: string) => {
      const p = worldToCanvas(s[0], s[1], w, h);
      const anchor = worldToCanvas(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(anchor.x, anchor.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    drawBob(stateA.current, "#f5f5f5");
    if (mode === "compare") drawBob(stateB.current, "#4caf50");
  }, [magnets, mode, selectedMagnetId, worldToCanvas]);

  useEffect(() => {
    stateA.current = particleToState(particleA);
    stateB.current = particleToState(particleB);
    draw();
  }, [particleA, particleB, draw]);

  useEffect(() => {
    trailsA.current = [];
    trailsB.current = [];
    draw();
  }, [clearTrailsNonce, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  useEffect(() => {
    let id: number;
    const loop = () => {
      if (running) {
        stateA.current = stepState(stateA.current, magnets, params, 4);
        const [x, y] = stateA.current;
        trailsA.current.push({ x, y });
        if (trailsA.current.length > Math.min(params.trailLen, TRAIL_MAX)) trailsA.current.shift();

        if (mode === "compare") {
          stateB.current = stepState(stateB.current, magnets, params, 4);
          trailsB.current.push({ x: stateB.current[0], y: stateB.current[1] });
          if (trailsB.current.length > Math.min(params.trailLen, TRAIL_MAX)) trailsB.current.shift();
        }
      }
      draw();
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [running, magnets, params, mode, draw]);

  const hitTest = (wx: number, wy: number) => {
    const [ax, ay] = stateA.current;
    if (Math.hypot(wx - ax, wy - ay) < 0.18) return { type: "bobA" as const };
    if (mode === "compare") {
      const [bx, by] = stateB.current;
      if (Math.hypot(wx - bx, wy - by) < 0.18) return { type: "bobB" as const };
    }
    for (const m of magnets) {
      if (Math.hypot(wx - m.x, wy - m.y) < 0.22) return { type: "magnet" as const, id: m.id };
    }
    return null;
  };

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-crosshair touch-none"
      aria-label="Magnetic pendulum simulation"
      onPointerDown={(e) => {
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const { x, y } = canvasToWorld(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
        const hit = hitTest(x, y);
        if (!hit) return;
        canvas.setPointerCapture(e.pointerId);
        if (hit.type === "bobA") {
          dragRef.current = "bobA";
          stateA.current = [x, y, 0, 0];
          setParticleA(stateToParticle(stateA.current));
          trailsA.current = [];
        } else if (hit.type === "bobB") {
          dragRef.current = "bobB";
          stateB.current = [x, y, 0, 0];
          setParticleB(stateToParticle(stateB.current));
          trailsB.current = [];
        } else if (hit.type === "magnet") {
          dragRef.current = "magnet";
          dragMagnetId.current = hit.id!;
          magnetDragStart.current = { x, y };
          blockPolarityToggle.current = false;
          setSelectedMagnetId(hit.id!);
        }
      }}
      onDoubleClick={(e) => {
        if (blockPolarityToggle.current) {
          blockPolarityToggle.current = false;
          return;
        }
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const { x, y } = canvasToWorld(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
        const hit = hitTest(x, y);
        if (hit?.type === "magnet") {
          e.preventDefault();
          toggleMagnetPolarity(hit.id);
        }
      }}
      onPointerMove={(e) => {
        if (!dragRef.current) return;
        const canvas = canvasRef.current!;
        const rect = canvas.getBoundingClientRect();
        const { x, y } = canvasToWorld(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
        if (dragRef.current === "bobA") {
          stateA.current = [x, y, 0, 0];
          setParticleA(stateToParticle(stateA.current));
        } else if (dragRef.current === "bobB") {
          stateB.current = [x, y, 0, 0];
          setParticleB(stateToParticle(stateB.current));
        } else if (dragRef.current === "magnet" && dragMagnetId.current) {
          const { x: sx, y: sy } = magnetDragStart.current;
          if (Math.hypot(x - sx, y - sy) > 0.05) blockPolarityToggle.current = true;
          updateMagnet(dragMagnetId.current, x, y);
        }
        draw();
      }}
      onPointerUp={() => {
        dragRef.current = null;
        dragMagnetId.current = null;
        bumpVersion();
      }}
    />
  );
}
