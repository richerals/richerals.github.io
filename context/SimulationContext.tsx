"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_BOB, DEFAULT_BOB_COMPARE, defaultMagnets } from "@/lib/physics";
import {
  DEFAULT_PARAMS,
  DEFAULT_PLOT_RANGE,
  type Magnet,
  type PlotRange,
  type Polarity,
  type PotentialMode,
  type SimMode,
  type SimParams,
  type ParticleState,
} from "@/lib/types";

type SimulationContextValue = {
  magnets: Magnet[];
  params: SimParams;
  setParams: (patch: Partial<SimParams>) => void;
  mode: SimMode;
  setMode: (m: SimMode) => void;
  particleA: ParticleState;
  particleB: ParticleState;
  setParticleA: (p: Partial<ParticleState>) => void;
  setParticleB: (p: Partial<ParticleState>) => void;
  running: boolean;
  setRunning: (v: boolean) => void;
  selectedMagnetId: string | null;
  setSelectedMagnetId: (id: string | null) => void;
  potentialMode: PotentialMode;
  setPotentialMode: (m: PotentialMode) => void;
  plotRange: PlotRange;
  setPlotRange: (p: Partial<PlotRange>) => void;
  addMagnet: (polarity: Polarity) => void;
  removeSelectedMagnet: () => void;
  updateMagnet: (id: string, x: number, y: number) => void;
  toggleMagnetPolarity: (id: string) => void;
  resetParticles: () => void;
  version: number;
  bumpVersion: () => void;
  clearTrailsNonce: number;
  clearTrails: () => void;
};

const defaultA = DEFAULT_BOB;
const defaultB = DEFAULT_BOB_COMPARE;

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [magnets, setMagnets] = useState<Magnet[]>(defaultMagnets);
  const [params, setParamsState] = useState<SimParams>(DEFAULT_PARAMS);
  const [mode, setMode] = useState<SimMode>("single");
  const [particleA, setParticleAState] = useState<ParticleState>(defaultA);
  const [particleB, setParticleBState] = useState<ParticleState>(defaultB);
  const [running, setRunning] = useState(false);
  const [selectedMagnetId, setSelectedMagnetId] = useState<string | null>(null);
  const [potentialMode, setPotentialMode] = useState<PotentialMode>("total");
  const [plotRange, setPlotRangeState] = useState<PlotRange>(DEFAULT_PLOT_RANGE);
  const [version, setVersion] = useState(0);
  const [clearTrailsNonce, setClearTrailsNonce] = useState(0);

  const bumpVersion = useCallback(() => setVersion((v) => v + 1), []);
  const clearTrails = useCallback(() => setClearTrailsNonce((v) => v + 1), []);

  const setParams = useCallback((patch: Partial<SimParams>) => {
    setParamsState((p) => ({ ...p, ...patch }));
    bumpVersion();
  }, [bumpVersion]);

  const setPlotRange = useCallback((patch: Partial<PlotRange>) => {
    setPlotRangeState((p) => ({ ...p, ...patch }));
    bumpVersion();
  }, [bumpVersion]);

  const setParticleA = useCallback((patch: Partial<ParticleState>) => {
    setParticleAState((p) => ({ ...p, ...patch }));
  }, []);

  const setParticleB = useCallback((patch: Partial<ParticleState>) => {
    setParticleBState((p) => ({ ...p, ...patch }));
  }, []);

  const addMagnet = useCallback(
    (polarity: Polarity) => {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.5;
      setMagnets((m) => [
        ...m,
        {
          id: String(Date.now()),
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          polarity,
        },
      ]);
      bumpVersion();
    },
    [bumpVersion]
  );

  const removeSelectedMagnet = useCallback(() => {
    if (!selectedMagnetId) return;
    setMagnets((m) => m.filter((mag) => mag.id !== selectedMagnetId));
    setSelectedMagnetId(null);
    bumpVersion();
  }, [selectedMagnetId, bumpVersion]);

  const updateMagnet = useCallback(
    (id: string, x: number, y: number) => {
      setMagnets((m) => m.map((mag) => (mag.id === id ? { ...mag, x, y } : mag)));
      bumpVersion();
    },
    [bumpVersion]
  );

  const toggleMagnetPolarity = useCallback(
    (id: string) => {
      setMagnets((m) =>
        m.map((mag) =>
          mag.id === id ? { ...mag, polarity: (mag.polarity === 1 ? -1 : 1) as Polarity } : mag
        )
      );
      setSelectedMagnetId(id);
      bumpVersion();
    },
    [bumpVersion]
  );

  const resetParticles = useCallback(() => {
    setParticleAState(defaultA);
    setParticleBState(defaultB);
    setRunning(false);
  }, []);

  const value = useMemo(
    () => ({
      magnets,
      params,
      setParams,
      mode,
      setMode,
      particleA,
      particleB,
      setParticleA,
      setParticleB,
      running,
      setRunning,
      selectedMagnetId,
      setSelectedMagnetId,
      potentialMode,
      setPotentialMode,
      plotRange,
      setPlotRange,
      addMagnet,
      removeSelectedMagnet,
      updateMagnet,
      toggleMagnetPolarity,
      resetParticles,
      version,
      bumpVersion,
      clearTrailsNonce,
      clearTrails,
    }),
    [
      magnets,
      params,
      setParams,
      mode,
      particleA,
      particleB,
      setParticleA,
      setParticleB,
      running,
      selectedMagnetId,
      potentialMode,
      plotRange,
      setPlotRange,
      addMagnet,
      removeSelectedMagnet,
      updateMagnet,
      toggleMagnetPolarity,
      resetParticles,
      version,
      bumpVersion,
      clearTrailsNonce,
      clearTrails,
    ]
  );

  return (
    <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error("useSimulation must be used within SimulationProvider");
  return ctx;
}
