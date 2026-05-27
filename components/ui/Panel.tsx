import type { ReactNode } from "react";

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded border border-border bg-surface p-4">
      {title && (
        <h3 className="mb-3 font-mono text-[0.7rem] uppercase tracking-widest text-muted">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
