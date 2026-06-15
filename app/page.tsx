import Link from "next/link";
import { NonlinearSystemsCard } from "@/components/projects/NonlinearSystemsCard";
import { ProjectList } from "@/components/projects/ProjectList";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FOCUS_AREAS = [
  "Nonlinear dynamics",
  "Planetary geophysics",
  "Scientific visualization",
  "Computational modeling",
];

const CURRENT_WORK = [
  {
    label: "Interactive systems",
    text: "Browser-based simulations that make equations inspectable.",
  },
  {
    label: "Lunar seismology",
    text: "Apollo moonquake data mapped into a spatial research interface.",
  },
  {
    label: "Physics storytelling",
    text: "Short written context paired with runnable models and figures.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-border px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">University of Pennsylvania · VIPER</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-text md:text-6xl">
              Zhiyao Chen
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted md:text-xl">
              Physics &amp; geophysics through simulation, visualization, and code.
            </p>
            <p className="mt-5 max-w-2xl font-serif text-base leading-relaxed text-text/90 md:text-lg">
              I care about making complex physical behavior legible: models you can run, figures you can reason with,
              and written context that connects the computation back to the physics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="rounded border border-text bg-text px-4 py-2 text-sm font-medium text-bg hover:bg-text/90"
              >
                View projects
              </Link>
              <Link
                href="#about"
                className="rounded border border-border px-4 py-2 text-sm text-text hover:border-muted"
              >
                About me
              </Link>
              <a
                href="https://github.com/richerals"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-4 py-2 text-sm text-muted hover:text-text"
              >
                GitHub
              </a>
            </div>
          </div>
          <aside className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Current focus</p>
            <div className="mt-4 space-y-3">
              {CURRENT_WORK.map((item) => (
                <div key={item.label} className="rounded border border-border bg-bg/40 p-3">
                  <p className="text-sm font-medium text-text">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="about" className="px-5 py-14">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeader label="About" title="About me" />
          <div className="grid gap-4 rounded-lg border border-border bg-surface p-6 md:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                I am an incoming student in the VIPER program at the University of Pennsylvania, interested in
                nonlinear systems, geophysics, scientific visualization, and computational modeling.
              </p>
              <p>
                My work explores how physical systems can be understood through simulation, animation, and
                interactive computation—turning equations into pictures you can reason about and models you can
                run.
              </p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2" aria-label="Research interests">
              {FOCUS_AREAS.map((t) => (
                <li key={t} className="rounded border border-border bg-bg/40 px-3 py-2 text-xs text-text">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-14">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeader
            label="Research & visualization"
            title="Projects"
            intro="Each topic pairs written context with simulations and figures as they are added."
          />
          <NonlinearSystemsCard />
          <div className="mt-8">
            <ProjectList />
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border px-5 py-14">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeader label="Say hello" title="Contact" intro="Collaborations on modeling, geophysics, and visualization welcome." />
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="mailto:zhiyaoc@seas.upenn.edu"
              className="rounded-lg border border-border bg-surface p-4 hover:border-muted"
            >
              <span className="block text-xs text-muted">Email</span>
              <span className="mt-1 block text-sm text-text">zhiyaoc@seas.upenn.edu</span>
            </a>
            <a
              href="https://github.com/richerals"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-surface p-4 hover:border-muted"
            >
              <span className="block text-xs text-muted">GitHub</span>
              <span className="mt-1 block text-sm text-text">richerals</span>
            </a>
            <a
              href="https://www.linkedin.com/in/zhiyao-chen-14032b321/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-surface p-4 hover:border-muted"
            >
              <span className="block text-xs text-muted">LinkedIn</span>
              <span className="mt-1 block text-sm text-text">zhiyao-chen</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
