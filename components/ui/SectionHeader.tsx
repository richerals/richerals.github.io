import type { ReactNode } from "react";

export function SectionHeader({
  id,
  label,
  title,
  intro,
}: {
  id?: string;
  label?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div id={id} className="mb-8 scroll-mt-20">
      {label && <p className="text-xs uppercase tracking-widest text-muted">{label}</p>}
      <h2 className="mt-1 font-serif text-2xl font-semibold text-text md:text-3xl">{title}</h2>
      {intro && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
