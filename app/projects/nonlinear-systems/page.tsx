import { SimulationProvider } from "@/context/SimulationContext";
import { SimulationSection } from "@/components/simulation/SimulationSection";
import { PotentialSection } from "@/components/potential/PotentialSection";
import { EquationsSection } from "@/components/math/EquationsSection";
import { BasinSection } from "@/components/chaos/BasinSection";

export const metadata = {
  title: "Nonlinear Systems — Zhiyao Chen",
  description: "Magnetic pendulum RK4 simulation, potential landscape, and basins of attraction.",
};

export default function NonlinearSystemsPage() {
  return (
    <SimulationProvider>
      <main className="px-5 py-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-xs uppercase tracking-widest text-muted">Project</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-text md:text-4xl">Nonlinear Systems</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Chaotic magnetic pendulum on a signed multi-magnet potential—RK4 trajectories, compare mode, 3D
            landscape, and basin maps.
          </p>
        </div>
        <SimulationSection />
        <PotentialSection />
        <EquationsSection />
        <BasinSection />
      </main>
    </SimulationProvider>
  );
}
