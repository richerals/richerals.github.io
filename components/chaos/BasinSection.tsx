"use client";

import { useCallback, useRef, useState } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { BASIN_COLORS, computeBasinGridAsync } from "@/lib/basin";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const CHAOS_GRID = 128;

export function BasinSection() {
  const { magnets, params } = useSimulation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [computing, setComputing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const drawBasin = useCallback((data: Uint8Array, grid: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = grid;
    canvas.height = grid;
    const img = ctx.createImageData(grid, grid);
    for (let j = 0; j < grid; j++) {
      for (let i = 0; i < grid; i++) {
        const ci = data[j * grid + i] % BASIN_COLORS.length;
        const [r, g, b] = BASIN_COLORS[ci];
        const p = (j * grid + i) * 4;
        img.data[p] = r;
        img.data[p + 1] = g;
        img.data[p + 2] = b;
        img.data[p + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    setDone(true);
  }, []);

  const compute = useCallback(async () => {
    setComputing(true);
    setProgress(0);
    setDone(false);
    const bounds = { xMin: -2.2, xMax: 2.2, yMin: -2.2, yMax: 2.2 };
    const data = await computeBasinGridAsync(magnets, params, CHAOS_GRID, bounds, setProgress);
    drawBasin(data, CHAOS_GRID);
    setComputing(false);
  }, [magnets, params, drawBasin]);

  return (
    <section id="chaos" className="scroll-mt-20 border-t border-border px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          label="Section 4"
          title="Basin of attraction"
          intro="Each pixel is an initial position integrated to equilibrium; color indicates which magnet index wins."
        />
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={compute} disabled={computing}>
              {computing ? `Computing… ${Math.round(progress * 100)}%` : done ? "Recompute current basin" : "Compute current basin"}
            </Button>
          </div>
          <div className="mt-6 overflow-hidden rounded border border-border bg-bg">
            <div className="relative">
              {!done && (
                <img
                  src="/nonlinear/default-basin.svg"
                  alt="Precomputed default basin of attraction map"
                  className={`mx-auto block aspect-square max-h-[480px] w-full object-contain image-pixelated ${
                    computing ? "opacity-45" : ""
                  }`}
                />
              )}
              <canvas
                ref={canvasRef}
                className={`mx-auto max-h-[480px] w-full object-contain image-pixelated ${done ? "block" : "hidden"}`}
                aria-label="Basin of attraction map"
              />
              {computing && (
                <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-muted">
                  Computing current basin...
                </p>
              )}
            </div>
          </div>
          <ul className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
            {magnets.slice(0, 6).map((m, i) => (
              <li key={m.id} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{
                    background: `rgb(${BASIN_COLORS[i % BASIN_COLORS.length].join(",")})`,
                  }}
                />
                Magnet {i + 1} ({m.polarity > 0 ? "+" : "−"})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
