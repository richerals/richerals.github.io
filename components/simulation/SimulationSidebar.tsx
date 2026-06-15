"use client";

import { useSimulation } from "@/context/SimulationContext";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="mb-3 block text-xs text-muted">
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="font-mono text-text">{value.toFixed(step < 0.01 ? 2 : step < 1 ? 2 : 0)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1 w-full accent-accentBlue"
      />
    </label>
  );
}

function NumInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-xs text-muted">
      {label}
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="mt-0.5 w-full rounded border border-border bg-bg px-2 py-1 font-mono text-sm text-text"
      />
    </label>
  );
}

export function SimulationSidebar({
  onClearTrails,
  onReset,
  showPlayback = true,
}: {
  onClearTrails: () => void;
  onReset: () => void;
  showPlayback?: boolean;
}) {
  const {
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
    addMagnet,
    removeSelectedMagnet,
    selectedMagnetId,
  } = useSimulation();

  return (
    <div className="flex flex-col gap-3">
      <Panel title="Magnet tools">
        <div className="flex flex-wrap gap-2">
          <Button variant="red" onClick={() => addMagnet(1)}>
            + Add Red
          </Button>
          <Button variant="blue" onClick={() => addMagnet(-1)}>
            + Add Blue
          </Button>
          <Button onClick={removeSelectedMagnet} disabled={!selectedMagnetId}>
            Delete
          </Button>
        </div>
      </Panel>

      <Panel title="Parameters">
        <Slider label="Damping b" value={params.b} min={0.02} max={0.4} step={0.01} onChange={(b) => setParams({ b })} />
        <Slider label="Height h" value={params.h} min={0.1} max={0.8} step={0.01} onChange={(h) => setParams({ h })} />
        <Slider label="Mass m" value={params.m} min={0.2} max={3} step={0.05} onChange={(m) => setParams({ m })} />
        <Slider label="Time step dt" value={params.dt} min={0.002} max={0.02} step={0.001} onChange={(dt) => setParams({ dt })} />
        <Slider label="Trail length" value={params.trailLen} min={200} max={6000} step={100} onChange={(trailLen) => setParams({ trailLen })} />
      </Panel>

      <Panel title="Initial conditions">
        <div className="mb-3 flex gap-2">
          <Button variant={mode === "single" ? "primary" : "ghost"} onClick={() => setMode("single")}>
            Single
          </Button>
          <Button variant={mode === "compare" ? "primary" : "ghost"} onClick={() => setMode("compare")}>
            Compare
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <NumInput label="x₁" value={particleA.x} onChange={(x) => setParticleA({ x })} />
          <NumInput label="y₁" value={particleA.y} onChange={(y) => setParticleA({ y })} />
          {mode === "compare" && (
            <>
              <NumInput label="x₂" value={particleB.x} onChange={(x) => setParticleB({ x })} />
              <NumInput label="y₂" value={particleB.y} onChange={(y) => setParticleB({ y })} />
            </>
          )}
          <NumInput label="vₓ" value={particleA.vx} onChange={(vx) => setParticleA({ vx })} />
          <NumInput label="v_y" value={particleA.vy} onChange={(vy) => setParticleA({ vy })} />
        </div>
        {mode === "compare" && (
          <p className="mt-3 text-xs italic text-muted">
            Small differences in initial conditions lead to dramatically different outcomes.
          </p>
        )}
      </Panel>

      {showPlayback && (
        <div className="hidden lg:block">
          <Panel title="Playback">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => setRunning(true)} disabled={running}>
                Play
              </Button>
              <Button onClick={() => setRunning(false)} disabled={!running}>
                Pause
              </Button>
              <Button onClick={onReset}>Reset</Button>
              <Button onClick={onClearTrails}>Clear trails</Button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
