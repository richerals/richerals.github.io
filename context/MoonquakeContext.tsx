"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { APOLLO_STATIONS, type MoonquakeCategory, type MoonquakeEvent } from "@/lib/moonquake/eventTypes";
import { loadMoonquakeCatalog } from "@/lib/moonquake/dataLoader";

type TooltipState = {
  event: MoonquakeEvent;
  x: number;
  y: number;
};

type MoonquakeContextValue = {
  loading: boolean;
  error: string | null;
  events: MoonquakeEvent[];
  filteredEvents: MoonquakeEvent[];
  selectedEvent: MoonquakeEvent | null;
  tooltip: TooltipState | null;
  activeCategories: Record<MoonquakeCategory, boolean>;
  yearRange: { min: number; max: number; from: number; to: number };
  setSelectedEvent: (event: MoonquakeEvent | null) => void;
  setTooltip: (state: TooltipState | null) => void;
  toggleCategory: (category: MoonquakeCategory) => void;
  setYearFrom: (year: number) => void;
  setYearTo: (year: number) => void;
  resetFilters: () => void;
};

const MoonquakeContext = createContext<MoonquakeContextValue | null>(null);

const DEFAULT_CATEGORY_STATE: Record<MoonquakeCategory, boolean> = {
  deep: true,
  shallow: true,
  meteoroid: true,
  thermal: true,
  artificial: true,
};

export function MoonquakeProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<MoonquakeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<MoonquakeEvent | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activeCategories, setActiveCategories] =
    useState<Record<MoonquakeCategory, boolean>>(DEFAULT_CATEGORY_STATE);
  const [yearFrom, setYearFromState] = useState(1969);
  const [yearTo, setYearToState] = useState(1977);

  useEffect(() => {
    let mounted = true;
    loadMoonquakeCatalog()
      .then((rows) => {
        if (!mounted) return;
        setEvents(rows);
        setSelectedEvent(rows.find((event) => event.category === "deep") ?? rows[0] ?? null);
        const years = rows.map((r) => r.originTime.getUTCFullYear());
        if (years.length) {
          const min = Math.min(...years);
          const max = Math.max(...years);
          setYearFromState(min);
          setYearToState(max);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load moonquake data.");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const yearRange = useMemo(() => {
    if (events.length === 0) return { min: 1969, max: 1977, from: yearFrom, to: yearTo };
    const years = events.map((r) => r.originTime.getUTCFullYear());
    const min = Math.min(...years);
    const max = Math.max(...years);
    const from = Math.max(min, Math.min(yearFrom, yearTo));
    const to = Math.min(max, Math.max(yearFrom, yearTo));
    return {
      min,
      max,
      from,
      to,
    };
  }, [events, yearFrom, yearTo]);

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          activeCategories[event.category] &&
          event.originTime.getUTCFullYear() >= yearRange.from &&
          event.originTime.getUTCFullYear() <= yearRange.to
      ),
    [events, activeCategories, yearRange.from, yearRange.to]
  );

  const setYearFrom = (year: number) => {
    setYearFromState(() => {
      const bounded = Math.max(yearRange.min, Math.min(yearRange.max, year));
      return Math.min(bounded, yearTo);
    });
  };

  const setYearTo = (year: number) => {
    setYearToState(() => {
      const bounded = Math.max(yearRange.min, Math.min(yearRange.max, year));
      return Math.max(bounded, yearFrom);
    });
  };

  const toggleCategory = (category: MoonquakeCategory) => {
    setActiveCategories((prev) => {
      const nextValue = !prev[category];
      return category === "meteoroid"
        ? { ...prev, meteoroid: nextValue, artificial: nextValue }
        : { ...prev, [category]: nextValue };
    });
  };

  const resetFilters = () => {
    setActiveCategories(DEFAULT_CATEGORY_STATE);
    setYearFromState(yearRange.min);
    setYearToState(yearRange.max);
    setSelectedEvent(events.find((event) => event.category === "deep") ?? events[0] ?? null);
  };

  const value: MoonquakeContextValue = {
    loading,
    error,
    events,
    filteredEvents,
    selectedEvent,
    tooltip,
    activeCategories,
    yearRange,
    setSelectedEvent,
    setTooltip,
    toggleCategory,
    setYearFrom,
    setYearTo,
    resetFilters,
  };

  return <MoonquakeContext.Provider value={value}>{children}</MoonquakeContext.Provider>;
}

export function useMoonquake() {
  const ctx = useContext(MoonquakeContext);
  if (!ctx) throw new Error("useMoonquake must be used within MoonquakeProvider");
  return ctx;
}

export { APOLLO_STATIONS };
