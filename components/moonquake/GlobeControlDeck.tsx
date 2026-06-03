"use client";

import { CategoryFilterBar } from "./CategoryFilterBar";
import { Timeline } from "./Timeline";

export function GlobeControlDeck() {
  return (
    <div className="mt-4 rounded border border-border bg-surface p-4">
      <CategoryFilterBar />
      <div className="mt-4 border-t border-border pt-4">
        <Timeline />
      </div>
    </div>
  );
}
