"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  compact?: boolean;
}

export function QuantityStepper({
  value,
  onChange,
  compact = false
}: QuantityStepperProps) {
  return (
    <div className="club-field inline-flex items-center rounded-lg p-1">
      <button
        type="button"
        title="Decrease quantity"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 transition hover:bg-white/85 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        disabled={value <= 0}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <input
        aria-label="Quantity owned"
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(
          "h-8 rounded-md border border-white/80 bg-white/75 text-center text-sm font-semibold text-ink outline-none focus:border-signal/40",
          compact ? "w-10" : "w-14"
        )}
      />
      <button
        type="button"
        title="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 transition hover:bg-white/85 hover:text-ink"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
