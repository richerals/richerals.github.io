"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useSimulation } from "@/context/SimulationContext";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { MathInline } from "@/components/math/Katex";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PotentialMode } from "@/lib/types";

const PotentialSurface = dynamic(
  () => import("./PotentialSurface").then((m) => m.PotentialSurface),
  { ssr: false, loading: () => <div className="h-[420px] animate-pulse rounded border border-border bg-surface" /> }
);

const MODES: { id: PotentialMode; tex: string }[] = [
  { id: "total", tex: String.raw`\text{Total } V(x,y)` },
  { id: "magnetic", tex: String.raw`\text{Magnetic } V_{\mathrm{mag}}(x,y)` },
  { id: "gravitational", tex: String.raw`\text{Gravitational } V_{\mathrm{gra}}(x,y)` },
];

export function PotentialSection() {
  const { potentialMode, setPotentialMode, plotRange, setPlotRange } = useSimulation();
  const [resetToken, setResetToken] = useState(0);
  const [vMin, setVMin] = useState(-2.5);
  const [vMax, setVMax] = useState(-0.5);

  return (
    <section id="potential" className="scroll-mt-20 border-t border-border px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          label="Section 2"
          title="Energy surface"
          intro="Rotate, zoom, and pan. The mesh rebuilds when magnets or parameters change in the simulation above."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
          <div>
            <PotentialSurface
              resetToken={resetToken}
              onRange={(min, max) => {
                setVMin(min);
                setVMax(max);
              }}
            />
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted">
              <MathInline tex="x" />
              <span aria-hidden>·</span>
              <MathInline tex="y" />
              <span aria-hidden>·</span>
              <MathInline tex="V(x,y)" />
            </p>
            <div className="mx-auto mt-4 flex max-w-xs items-center gap-2">
              <span className="font-mono text-xs text-muted">{vMin.toFixed(2)}</span>
              <div
                className="h-3 flex-1 rounded"
                style={{
                  background: "linear-gradient(90deg, #1e88e5, #7e57c2, #e53935)",
                }}
                aria-hidden
              />
              <span className="font-mono text-xs text-muted">{vMax.toFixed(2)}</span>
            </div>
          </div>
          <Panel title="Display">
            <div className="space-y-2">
              {MODES.map((m) => (
                <label key={m.id} className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                  <input
                    type="radio"
                    name="pot-mode"
                    checked={potentialMode === m.id}
                    onChange={() => setPotentialMode(m.id)}
                    className="shrink-0 accent-accentBlue"
                  />
                  <MathInline tex={m.tex} />
                </label>
              ))}
            </div>
            <p className="mb-2 mt-6 text-xs font-medium uppercase text-muted">Plot range</p>
            {(["xMin", "xMax", "yMin", "yMax"] as const).map((key) => (
              <label key={key} className="mb-2 block text-xs text-muted">
                {key}
                <input
                  type="number"
                  step="0.1"
                  value={plotRange[key]}
                  onChange={(e) => setPlotRange({ [key]: parseFloat(e.target.value) || 0 })}
                  className="mt-0.5 w-full rounded border border-border bg-bg px-2 py-1 font-mono text-sm text-text"
                />
              </label>
            ))}
            <Button className="mt-4 w-full" variant="ghost" onClick={() => setResetToken((t) => t + 1)}>
              Reset View
            </Button>
          </Panel>
        </div>
      </div>
    </section>
  );
}
