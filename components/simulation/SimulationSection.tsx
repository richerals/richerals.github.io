"use client";

import { SimulationCanvas } from "./SimulationCanvas";
import { SimulationSidebar } from "./SimulationSidebar";
import { MagnetLegend } from "./MagnetLegend";
import { useSimulation } from "@/context/SimulationContext";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SimulationSection() {
  const { resetParticles, clearTrails, mode } = useSimulation();

  return (
    <section id="simulation" className="scroll-mt-20 border-t border-border px-5 py-12">
      <div className="mx-auto max-w-[1100px]">
      <SectionHeader
        label="Section 1"
        title="Live simulation"
        intro="Real-time particle, trail, and magnet dynamics from RK4 integration."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="min-h-[400px] overflow-hidden rounded border border-border bg-[#050505] lg:min-h-[480px]">
          <SimulationCanvas />
        </div>
        <SimulationSidebar onClearTrails={clearTrails} onReset={() => resetParticles()} />
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
