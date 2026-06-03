"use client";

import { useMoonquake } from "@/context/MoonquakeContext";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function EventPanel() {
  const { selectedEvent, filteredEvents, events } = useMoonquake();

  return (
    <div className="rounded border border-border bg-surface p-5 lg:sticky lg:top-20">
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Event metadata</p>
        <span className="font-mono text-xs text-accentBlue">
          {filteredEvents.length}/{events.length}
        </span>
      </div>
      {!selectedEvent ? (
        <p className="mt-4 text-sm text-muted">
          Click a moonquake marker to inspect date, coordinates, type, and metadata.
        </p>
      ) : (
        <dl className="mt-4 space-y-4">
          <div className="border-b border-border pb-4">
            <dt className="text-xs uppercase tracking-wide text-muted">Selected event</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold leading-tight text-text">
              {selectedEvent.label}
            </dd>
            <dd className="mt-1 font-mono text-sm text-accentBlue">{fmtDate(selectedEvent.originTime)}</dd>
          </div>
          <div className="grid gap-3">
            <div className="rounded border border-border bg-bg/40 p-3">
              <dt className="text-xs uppercase tracking-wide text-muted">Coordinates</dt>
              <dd className="mt-1 font-mono text-base text-text">
                {selectedEvent.lat.toFixed(2)}°, {selectedEvent.lon.toFixed(2)}°
              </dd>
            </div>
            <div className="rounded border border-border bg-bg/40 p-3">
              <dt className="text-xs uppercase tracking-wide text-muted">Depth</dt>
              <dd className="mt-1 font-mono text-base text-text">{selectedEvent.depthKm.toFixed(0)} km</dd>
            </div>
            <div className="rounded border border-border bg-bg/40 p-3">
              <dt className="text-xs uppercase tracking-wide text-muted">Nearest station</dt>
              <dd className="mt-1 text-base text-text">{selectedEvent.nearestStation ?? "N/A"}</dd>
            </div>
            <div className="rounded border border-border bg-bg/40 p-3">
              <dt className="text-xs uppercase tracking-wide text-muted">Uncertainty</dt>
              <dd className="mt-1 text-sm text-text">
                Δa {selectedEvent.deltaA.toFixed(1)}°, Δb {selectedEvent.deltaB.toFixed(1)}°, depth err{" "}
                {selectedEvent.depthErrKm.toFixed(0)} km
              </dd>
            </div>
          </div>
        </dl>
      )}
    </div>
  );
}
