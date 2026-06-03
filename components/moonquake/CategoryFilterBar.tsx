"use client";

import Link from "next/link";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/moonquake/eventTypes";
import {
  CLASSIFICATION_ORDER,
  categoryEventCount,
} from "@/lib/moonquake/classificationContent";
import { useMoonquake } from "@/context/MoonquakeContext";

export function CategoryFilterBar() {
  const { activeCategories, toggleCategory, events } = useMoonquake();

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Event classes</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {CLASSIFICATION_ORDER.map((cat) => {
          const enabled = activeCategories[cat];
          const count = categoryEventCount(events, cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                enabled
                  ? "border-border bg-bg/50 text-text"
                  : "border-border/40 bg-bg/10 text-muted opacity-60"
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: CATEGORY_COLORS[cat] }}
              />
              <span>{CATEGORY_LABELS[cat]}</span>
              <span className="font-mono text-xs text-muted">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        Toggle classes on the globe ·{" "}
        <Link href="#classification" className="text-accentBlue hover:underline">
          Waveform classification ↓
        </Link>
      </p>
    </div>
  );
}
