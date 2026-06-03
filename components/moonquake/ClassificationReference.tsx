"use client";

import {
  APOLLO_WAVEFORM_FIGURE,
  CLASSIFICATION_DETAILS,
  CLASSIFICATION_MATRIX_ORDER,
  CLASSIFICATION_METHODOLOGY,
  CLASSIFICATION_REFERENCES,
  TRACE_READING_GUIDE,
  categoryEventCount,
} from "@/lib/moonquake/classificationContent";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/moonquake/eventTypes";
import { useMoonquake } from "@/context/MoonquakeContext";

export function ClassificationReference() {
  const { events } = useMoonquake();

  return (
    <div className="space-y-8">
      <figure className="overflow-hidden rounded border border-border bg-surface">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={APOLLO_WAVEFORM_FIGURE.src}
              alt={APOLLO_WAVEFORM_FIGURE.alt}
              className="w-full object-contain"
            />
          </div>
          <figcaption className="border-t border-border p-5 text-sm leading-relaxed text-muted lg:border-l lg:border-t-0">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">Real Apollo waveform evidence</p>
            <p className="mt-3">{APOLLO_WAVEFORM_FIGURE.caption}</p>
            <p className="mt-3 text-xs">
              Source:{" "}
              <a
                href={APOLLO_WAVEFORM_FIGURE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accentBlue hover:underline"
              >
                {APOLLO_WAVEFORM_FIGURE.source}
              </a>
              . The different y-axis scales mean the panels compare morphology, not absolute amplitude.
            </p>
          </figcaption>
        </div>
      </figure>

      <article className="rounded border border-border bg-surface p-6">
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">
          {CLASSIFICATION_METHODOLOGY.title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          {CLASSIFICATION_METHODOLOGY.intro}
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {CLASSIFICATION_METHODOLOGY.steps.map((step, index) => (
            <li key={step.label} className="rounded border border-border bg-bg/30 p-4">
              <p className="font-mono text-xs text-accentBlue">
                {String(index + 1).padStart(2, "0")} · {step.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 rounded border border-border/70 bg-bg/20 px-4 py-3 text-sm leading-relaxed text-muted">
          {CLASSIFICATION_METHODOLOGY.lunarNote}
        </p>
      </article>

      <article className="rounded border border-border bg-surface p-6">
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">How to read waveform features</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRACE_READING_GUIDE.map((item) => (
            <div key={item.label} className="rounded border border-border bg-bg/30 p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-text">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </article>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wide text-muted">Source class comparison</h3>
        <div className="mt-4 overflow-hidden rounded border border-border bg-surface">
          <div className="hidden border-b border-border bg-bg/30 px-4 py-3 text-xs uppercase tracking-wide text-muted lg:grid lg:grid-cols-[1.05fr_0.8fr_1.35fr_1.35fr_1.05fr] lg:gap-4">
            <span>Class</span>
            <span>Depth / source</span>
            <span>Waveform clue</span>
            <span>Classification reason</span>
            <span>Main caveat</span>
          </div>
          <div className="divide-y divide-border">
            {CLASSIFICATION_MATRIX_ORDER.map((cat) => {
            const details = CLASSIFICATION_DETAILS[cat];
            const count = categoryEventCount(events, cat);
            return (
              <article
                key={cat}
                className="grid gap-4 p-4 text-sm leading-relaxed text-muted lg:grid-cols-[1.05fr_0.8fr_1.35fr_1.35fr_1.05fr] lg:items-start"
              >
                <div>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wide text-muted lg:hidden">
                    Class
                  </p>
                  <div className="flex items-center justify-between gap-3 lg:block">
                    <h4 className="inline-flex items-center gap-2 font-serif text-lg font-semibold leading-tight text-text">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: CATEGORY_COLORS[cat] }}
                      />
                      {CATEGORY_LABELS[cat]}
                    </h4>
                    <span className="font-mono text-xs text-muted lg:mt-2 lg:block">{count} events</span>
                  </div>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wide text-muted lg:hidden">
                    Depth / source
                  </p>
                  <p>{details.basis}</p>
                  <p className="mt-2 font-mono text-xs text-accentBlue">{details.typicalDuration}</p>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wide text-muted lg:hidden">
                    Waveform clue
                  </p>
                  <p>{details.waveformFeatures}</p>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wide text-muted lg:hidden">
                    Classification reason
                  </p>
                  <p>{details.classificationReason}</p>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wide text-muted lg:hidden">
                    Main caveat
                  </p>
                  <p>{details.limitations}</p>
                </div>
              </article>
            );
          })}
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Thermal moonquakes are not shown in the Nunn et al. waveform comparison figure; their class is supported
          mainly by timing, locality, and thermal-cycle recurrence. Artificial impacts share the meteoroid impact color
          on the globe but are identified by mission metadata.
        </p>
      </section>

      <article className="rounded border border-border bg-surface p-6 text-sm leading-relaxed text-muted">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">References</p>
        <ul className="mt-3 space-y-2">
          {CLASSIFICATION_REFERENCES.map((ref) => (
            <li key={ref.href}>
              <a
                className="text-accentBlue hover:underline"
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ref.label}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
