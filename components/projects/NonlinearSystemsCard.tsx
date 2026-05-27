import Link from "next/link";
import { NONLINEAR_BLURB } from "@/lib/projects";
import { BasinPreview } from "./BasinPreview";

const FEATURES = [
  {
    title: "Nonlinear Dynamics",
    desc: "Sensitivity to initial conditions",
    icon: "∿",
  },
  {
    title: "Magnetic Landscapes",
    desc: "Complex potential fields",
    icon: "◎",
  },
  {
    title: "Scientific Visualization",
    desc: "Interactive tools",
    icon: "▣",
  },
];

export function NonlinearSystemsCard() {
  return (
    <article className="rounded-lg border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Featured project</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-text">Nonlinear Systems</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{NONLINEAR_BLURB}</p>
          <Link
            href="/projects/nonlinear-systems/"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accentBlue hover:underline"
          >
            Open Simulation →
          </Link>
        </div>
        <div className="aspect-square overflow-hidden rounded border border-border bg-bg">
          <BasinPreview grid={64} />
        </div>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <li key={f.title} className="flex gap-3 text-sm">
            <span className="font-mono text-lg text-accentRed" aria-hidden>
              {f.icon}
            </span>
            <div>
              <p className="font-medium text-text">{f.title}</p>
              <p className="text-muted">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
