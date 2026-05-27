import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export function ProjectList() {
  const others = PROJECTS.filter((p) => p.id !== "nonlinear-systems");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {others.map((p) => (
        <article
          key={p.id}
          className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-muted/50"
        >
          <h3 className="font-serif text-lg font-semibold text-text">{p.title}</h3>
          <p className="mt-2 text-sm text-muted">{p.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
          {p.href ? (
            <Link href={p.href} className="mt-4 inline-block text-sm text-accentBlue hover:underline">
              View →
            </Link>
          ) : (
            <p className="mt-4 text-xs text-muted">Coming soon</p>
          )}
        </article>
      ))}
    </div>
  );
}
