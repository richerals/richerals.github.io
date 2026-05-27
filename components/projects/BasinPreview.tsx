"use client";

import { useEffect, useRef, useState } from "react";
import { BASIN_COLORS, computeBasinGridAsync } from "@/lib/basin";
import { defaultMagnets } from "@/lib/physics";
import { DEFAULT_PARAMS } from "@/lib/types";

export function BasinPreview({ grid = 64 }: { grid?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const bounds = { xMin: -2.2, xMax: 2.2, yMin: -2.2, yMax: 2.2 };
    computeBasinGridAsync(defaultMagnets(), DEFAULT_PARAMS, grid, bounds).then((data) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = ctx.createImageData(grid, grid);
      for (let j = 0; j < grid; j++) {
        for (let i = 0; i < grid; i++) {
          const idx = (j * grid + i) % BASIN_COLORS.length;
          const [r, g, b] = BASIN_COLORS[data[j * grid + i] ?? idx];
          const p = (j * grid + i) * 4;
          img.data[p] = r;
          img.data[p + 1] = g;
          img.data[p + 2] = b;
          img.data[p + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [grid]);

  return (
    <canvas
      ref={canvasRef}
      width={grid}
      height={grid}
      className={`h-full w-full object-cover image-pixelated ${ready ? "opacity-100" : "opacity-40"} transition-opacity`}
      aria-label="Basin of attraction preview"
    />
  );
}
