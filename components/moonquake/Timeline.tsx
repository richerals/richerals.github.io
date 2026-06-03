"use client";

import { useMoonquake } from "@/context/MoonquakeContext";
import { Button } from "@/components/ui/Button";

export function Timeline() {
  const { yearRange, setYearFrom, setYearTo, resetFilters, filteredEvents, events } = useMoonquake();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
      <div className="flex flex-wrap items-end gap-3">
        <p className="w-full font-mono text-[0.7rem] uppercase tracking-widest text-muted sm:w-auto sm:pb-1.5">
          Timeline · {yearRange.min}–{yearRange.max}
        </p>
        <label className="text-[11px] uppercase tracking-wide text-muted">
          From
          <input
            type="number"
            min={yearRange.min}
            max={yearRange.to}
            value={yearRange.from}
            onChange={(e) => setYearFrom(parseInt(e.target.value || `${yearRange.min}`, 10))}
            className="mt-1 block w-24 rounded border border-border bg-bg px-2 py-1 font-mono text-sm text-text"
          />
        </label>
        <label className="text-[11px] uppercase tracking-wide text-muted">
          To
          <input
            type="number"
            min={yearRange.from}
            max={yearRange.max}
            value={yearRange.to}
            onChange={(e) => setYearTo(parseInt(e.target.value || `${yearRange.max}`, 10))}
            className="mt-1 block w-24 rounded border border-border bg-bg px-2 py-1 font-mono text-sm text-text"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-accentBlue">
          {filteredEvents.length} / {events.length} events
        </span>
        <Button onClick={resetFilters} variant="ghost">
          Reset filters
        </Button>
      </div>
    </div>
  );
}
