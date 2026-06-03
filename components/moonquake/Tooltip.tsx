"use client";

import { useMoonquake } from "@/context/MoonquakeContext";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function Tooltip() {
  const { tooltip } = useMoonquake();
  if (!tooltip) return null;

  return (
    <div
      className="pointer-events-none absolute z-20 w-56 rounded border border-border bg-surface/95 p-2 text-xs text-text shadow-lg"
      style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
    >
      <p className="font-medium">{tooltip.event.label}</p>
      <p className="text-muted">{fmtDate(tooltip.event.originTime)}</p>
      <p className="mt-1 text-muted">
        {tooltip.event.lat.toFixed(2)}°, {tooltip.event.lon.toFixed(2)}°
      </p>
    </div>
  );
}
