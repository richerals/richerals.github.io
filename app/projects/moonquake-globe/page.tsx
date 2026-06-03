"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MoonquakeProvider } from "@/context/MoonquakeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tooltip } from "@/components/moonquake/Tooltip";
import { EventPanel } from "@/components/moonquake/EventPanel";
import { GlobeControlDeck } from "@/components/moonquake/GlobeControlDeck";
import { ClassificationReference } from "@/components/moonquake/ClassificationReference";
import { MathBlock, MathInline } from "@/components/math/Katex";
import { APOLLO_STATIONS } from "@/lib/moonquake/eventTypes";
import { CATALOG_READING_NOTES } from "@/lib/moonquake/classificationContent";

const MoonScene = dynamic(() => import("@/components/moonquake/MoonScene").then((m) => m.MoonScene), {
  ssr: false,
  loading: () => <div className="h-[520px] animate-pulse rounded border border-border bg-surface lg:h-[560px]" />,
});

const contextStats = [
  { label: "Network span", value: "1969-1977" },
  { label: "Primary geometry", value: "Nearside" },
  { label: "Event sources", value: "Moonquakes + impacts" },
];

const locationEstimationSteps = [
  "Arrival-time differences across Apollo stations constrain the event epicenter.",
  "Travel-time curves and lunar velocity models estimate source depth.",
  "Waveform similarity helps group repeated deep moonquake clusters.",
  "Large scattering and nearside station geometry keep many locations uncertain.",
];

const networkConstraints = [
  { label: "Station geometry", value: "Nearside cluster" },
  { label: "Depth estimates", value: "Model-derived" },
  { label: "Waveforms", value: "Strongly scattered" },
];

const pipelineSteps = [
  {
    label: "Raw CSV",
    text: "Catalog row with type, date, latitude, longitude, depth, and uncertainty fields.",
  },
  {
    label: "Type parser",
    text: "Raw labels become deep, shallow, impact, thermal, or artificial classes.",
  },
  {
    label: "Coordinates",
    text: "Latitude and longitude are converted from degrees to radians.",
  },
  {
    label: "3D marker",
    text: "Spherical coordinates place a colored marker on the Moon surface.",
  },
  {
    label: "Metadata panel",
    text: "Selecting a marker reveals the original catalog interpretation.",
  },
];

const uncertaintyFields = [
  {
    label: "deltaA",
    text: "Major-axis angular uncertainty in the location solution.",
  },
  {
    label: "deltaB",
    text: "Minor-axis angular uncertainty, paired with deltaA.",
  },
  {
    label: "depthErrKm",
    text: "Approximate depth uncertainty in kilometers.",
  },
];

const futureCards = [
  {
    title: "Farside seismicity",
    text: "A farside station would test whether Apollo's nearside catalog missed source regions hidden by network geometry.",
  },
  {
    title: "South Pole monitoring",
    text: "Artemis-era stations near polar terrain can measure a region that Apollo never sampled directly.",
  },
  {
    title: "Global inversion",
    text: "Multiple long-lived stations improve constraints on crustal thickness, mantle layering, core size, and attenuation.",
  },
];

export default function MoonquakeGlobePage() {
  return (
    <MoonquakeProvider>
      <main className="px-5 py-10">
        <div className="mx-auto max-w-[1100px]">
          <section className="border-b border-border pb-12">
            <p className="text-xs uppercase tracking-widest text-muted">Planetary geophysics</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-text md:text-5xl">
              Apollo Moonquake Interactive Globe
            </h1>
            <p className="mt-2 text-sm uppercase tracking-wide text-muted">
              Planetary Seismology &amp; Scientific Visualization
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
              Interactive visualization of Apollo passive seismic experiment data using NASA-derived lunar catalogs and
              WebGL rendering.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link href="#interactive-globe" className="rounded border border-accentBlue/60 px-4 py-2 text-sm text-accentBlue hover:bg-accentBlue/10">
                Open Visualization
              </Link>
              <span className="text-xs text-muted">Dark, scientific, and computation-first interface.</span>
            </div>
          </section>

          <section id="historical-context" className="scroll-mt-20 py-14">
            <SectionHeader
              label="Section 1"
              title="Historical context"
              intro="Apollo's passive seismic stations created the first long-running seismic dataset from another planetary body."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <article className="space-y-4 rounded border border-border bg-surface p-6 text-sm leading-relaxed text-muted">
                  <p>
                    The Apollo Passive Seismic Experiment placed seismometers on the lunar nearside between 1969 and
                    1972. Apollo 11 operated briefly, while Apollo 12, 14, 15, and 16 formed a network that recorded
                    nearly continuously until 1977.
                  </p>
                  <p>
                    That network detected deep moonquakes, shallow moonquakes, meteoroid impacts, artificial impacts
                    from mission hardware, and thermal signals. The catalog links event time, source type, interpreted
                    location, depth, and uncertainty to the Moon's interior structure.
                  </p>
                </article>
                <article className="rounded border border-border bg-surface p-5">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">From waveform to location</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {locationEstimationSteps.map((step) => (
                      <li key={step} className="rounded border border-border bg-bg/30 p-3">
                        {step}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="space-y-4">
                <article className="rounded border border-border bg-surface p-5">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">Apollo seismic network</p>
                  <div className="mt-4 grid gap-2">
                    {APOLLO_STATIONS.map((station) => (
                      <div key={station.id} className="rounded border border-border bg-bg/30 p-3 text-sm">
                        <p className="flex items-center justify-between gap-3 text-text">
                          <span>{station.mission}</span>
                          <span className="font-mono text-xs text-muted">{station.id}</span>
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{station.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="rounded border border-border bg-surface p-5">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">Network constraints</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[...contextStats, ...networkConstraints].map((stat) => (
                      <div key={stat.label} className="rounded border border-border bg-bg/30 p-3">
                        <p className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">{stat.label}</p>
                        <p className="mt-1 text-sm text-text">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Lunar seismology constrains crust, mantle, and core structure, but Apollo locations remain tied to
                    limited station coverage and strongly scattered lunar waveforms.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section id="interactive-globe" className="scroll-mt-20 border-t border-border py-14">
            <SectionHeader
              label="Section 2"
              title="Interactive moon globe"
              intro={
                <>
                  Rotate the Moon, filter by event class and year, then click a marker to inspect catalog metadata.{" "}
                  <Link href="#classification" className="text-accentBlue hover:underline">
                    Waveform classification ↓
                  </Link>
                </>
              }
            />
            <div className="grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
              <div className="relative min-w-0">
                <MoonScene />
                <Tooltip />
              </div>
              <EventPanel />
            </div>
            <GlobeControlDeck />
          </section>

          <section id="model" className="scroll-mt-20 border-t border-border py-14">
            <SectionHeader
              label="Section 3"
              title="Catalog to globe mapping"
              intro="The visualization turns each catalog row into a class-colored marker on a textured lunar sphere."
            />
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded border border-border bg-surface p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">Coordinate projection</p>
                <div className="mt-4 space-y-3">
                  <MathBlock tex={String.raw`x = r \cos(\phi)\cos(\lambda)`} />
                  <MathBlock tex={String.raw`y = r \sin(\phi)`} />
                  <MathBlock tex={String.raw`z = r \cos(\phi)\sin(\lambda)`} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  where <MathInline tex={String.raw`\phi`} /> is latitude and{" "}
                  <MathInline tex={String.raw`\lambda`} /> is longitude in radians.
                </p>
              </div>
              <article className="rounded border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">Data pipeline</p>
                <ol className="mt-4 grid gap-3 lg:grid-cols-5">
                  {pipelineSteps.map((step, index) => (
                    <li key={step.label} className="relative rounded border border-border bg-bg/30 p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-accentBlue">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-text">{step.label}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{step.text}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-4">
                  Location fields place the marker; the parsed event type sets its color; the selected event panel
                  exposes depth, nearest Apollo station, and uncertainty fields from the same row.
                </p>
                <p>
                  The uncertainty values <span className="font-mono text-text">deltaA</span>,{" "}
                  <span className="font-mono text-text">deltaB</span>, and{" "}
                  <span className="font-mono text-text">depthErrKm</span> remind the viewer that catalog points are
                  interpreted locations, not perfect ground truth.
                </p>
              </article>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
              <article className="rounded border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  {CATALOG_READING_NOTES.title}
                </p>
                <div className="mt-4 space-y-3">
                  {CATALOG_READING_NOTES.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </article>
              <article className="rounded border border-border bg-surface p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">Uncertainty fields</p>
                <div className="mt-4 grid gap-3">
                  {uncertaintyFields.map((field) => (
                    <div key={field.label} className="rounded border border-border bg-bg/30 p-3">
                      <p className="font-mono text-xs text-accentBlue">{field.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{field.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section id="classification" className="scroll-mt-20 border-t border-border py-14">
            <SectionHeader
              label="Section 4"
              title="Seismic classification"
              intro="Classification is inferred from source mechanism, depth, recurrence, and waveform character, using real Apollo seismic traces as evidence."
            />
            <ClassificationReference />
          </section>

          <section id="future" className="scroll-mt-20 border-t border-border py-14">
            <SectionHeader
              label="Section 5"
              title="Future lunar seismology"
              intro="Artemis-era exploration can extend lunar seismic networks and sharpen planetary interior models."
            />
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <article className="space-y-4 rounded border border-border bg-surface p-6 text-sm leading-relaxed text-muted">
                <p>
                  Apollo proved that the Moon is seismically active, but the network was concentrated on the nearside
                  and near equatorial landing sites. That geometry limits farside seismicity, polar structure, and
                  fully global interior inversions.
                </p>
                <p>
                  Future stations from Artemis, CLPS payloads, the Farside Seismic Suite, and proposed Lunar
                  Geophysical Network concepts can widen station coverage, operate for years, and combine seismology
                  with heat-flow and electromagnetic measurements.
                </p>
                <p>
                  The same interface can evolve from an Apollo archive viewer into a comparative platform for new
                  lunar catalogs, updated event locations, and mission-era hazard assessment.
                </p>
              </article>
              <div className="grid gap-3">
                {futureCards.map((card) => (
                  <article key={card.title} className="rounded border border-border bg-surface p-4">
                    <h3 className="font-serif text-lg font-semibold text-text">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </MoonquakeProvider>
  );
}
