"use client";

import { SimulationCanvas } from "./SimulationCanvas";
import { SimulationSidebar } from "./SimulationSidebar";
import { MagnetLegend } from "./MagnetLegend";
import { useSimulation } from "@/context/SimulationContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

function MobilePlaybackControls({
  onClearTrails,
  onReset,
}: {
  onClearTrails: () => void;
  onReset: () => void;
}) {
  const { running, setRunning } = useSimulation();

  return (
    <div className="rounded border border-border bg-surface p-4 lg:hidden">
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-widest text-muted">Playback</p>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="primary" onClick={() => setRunning(true)} disabled={running}>
          Play
        </Button>
        <Button onClick={() => setRunning(false)} disabled={!running}>
          Pause
        </Button>
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onClearTrails}>Clear trails</Button>
      </div>
    </div>
  );
}

export function SimulationSection() {
  const { resetParticles, clearTrails, mode } = useSimulation();

  return (
    <section id="simulation" className="scroll-mt-20 border-t border-border px-5 py-10">
      <div className="mx-auto max-w-[1100px]">
      <SectionHeader
        label="Section 1"
        title="Live simulation"
        intro="Real-time particle, trail, and magnet dynamics from RK4 integration."
      />
      <article className="mb-3 rounded border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
        <div className="grid gap-3 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-muted">Physical setup</p>
            <p className="mt-1.5">
              A magnet is suspended from a string above a non-magnetic base. Fixed magnets on the base attract it,
              and the motion changes as the parameters change.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <p className="rounded border border-border bg-bg/40 p-2.5">
              <span className="block text-xs uppercase tracking-wide text-muted">Default base</span>
              <span className="text-text">Five positive magnets on a dashed ring</span>
            </p>
            <p className="rounded border border-border bg-bg/40 p-2.5">
              <span className="block text-xs uppercase tracking-wide text-muted">Release point</span>
              <span className="whitespace-nowrap text-text">(2, −1.6)</span>
            </p>
            <p className="rounded border border-border bg-bg/40 p-2.5">
              <span className="block text-xs uppercase tracking-wide text-muted">Interaction</span>
              <span className="text-text">Drag bob · double-click magnet polarity</span>
            </p>
          </div>
        </div>
      </article>
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="min-h-[320px] overflow-hidden rounded border border-border bg-[#050505] lg:min-h-[420px]">
          <SimulationCanvas />
        </div>
        <MobilePlaybackControls onClearTrails={clearTrails} onReset={() => resetParticles()} />
        <SimulationSidebar onClearTrails={clearTrails} onReset={() => resetParticles()} showPlayback />
      </div>
      <MagnetLegend />
      {mode === "compare" && (
        <p className="mt-4 text-center text-xs italic text-muted">
          Small differences in initial conditions lead to dramatically different outcomes.
        </p>
      )}
      </div>
    </section>
  );
}
