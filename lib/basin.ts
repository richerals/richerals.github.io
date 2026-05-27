import type { Magnet, SimParams } from "./types";
import { integrateToEquilibrium } from "./physics";

export const BASIN_COLORS: [number, number, number][] = [
  [229, 57, 53],
  [30, 136, 229],
  [67, 160, 71],
  [251, 192, 45],
  [171, 71, 188],
  [236, 64, 122],
  [38, 198, 218],
  [255, 152, 0],
];

export function computeBasinGrid(
  magnets: Magnet[],
  params: SimParams,
  grid: number,
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
  onProgress?: (pct: number) => void
): Uint8Array {
  const data = new Uint8Array(grid * grid);
  let row = 0;

  for (let j = 0; j < grid; j++) {
    for (let i = 0; i < grid; i++) {
      const x0 = bounds.xMin + ((i + 0.5) / grid) * (bounds.xMax - bounds.xMin);
      const y0 = bounds.yMin + ((j + 0.5) / grid) * (bounds.yMax - bounds.yMin);
      const result = integrateToEquilibrium(x0, y0, magnets, params, {
        maxSteps: 4000,
        speedTol: 0.03,
      });
      data[j * grid + i] = result.magnet % BASIN_COLORS.length;
    }
    row++;
    onProgress?.(row / grid);
  }

  return data;
}

export async function computeBasinGridAsync(
  magnets: Magnet[],
  params: SimParams,
  grid: number,
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
  onProgress?: (pct: number) => void
): Promise<Uint8Array> {
  const data = new Uint8Array(grid * grid);
  let j = 0;

  return new Promise((resolve) => {
    function chunk() {
      const rowsPerFrame = 2;
      for (let r = 0; r < rowsPerFrame && j < grid; r++, j++) {
        for (let i = 0; i < grid; i++) {
          const x0 = bounds.xMin + ((i + 0.5) / grid) * (bounds.xMax - bounds.xMin);
          const y0 = bounds.yMin + ((j + 0.5) / grid) * (bounds.yMax - bounds.yMin);
          const result = integrateToEquilibrium(x0, y0, magnets, params, {
            maxSteps: 4000,
            speedTol: 0.03,
          });
          data[j * grid + i] = result.magnet % BASIN_COLORS.length;
        }
        onProgress?.(j / grid);
      }
      if (j < grid) requestAnimationFrame(chunk);
      else resolve(data);
    }
    requestAnimationFrame(chunk);
  });
}
