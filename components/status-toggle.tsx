"use client";

import { CheckCircle2, CircleDashed, Star } from "lucide-react";
import type { CollectionStatus } from "@/lib/types";
import { cn, getStatusLabel, getStatusTone } from "@/lib/utils";

const statuses: Array<{
  value: CollectionStatus;
  icon: typeof CircleDashed;
}> = [
  {
    value: "missing",
    icon: CircleDashed
  },
  {
    value: "owned",
    icon: CheckCircle2
  },
  {
    value: "wantlist",
    icon: Star
  }
];

interface StatusToggleProps {
  value: CollectionStatus;
  onChange: (status: CollectionStatus) => void;
  compact?: boolean;
}

export function StatusToggle({
  value,
  onChange,
  compact = false
}: StatusToggleProps) {
  return (
    <div className="club-field flex rounded-lg p-1">
      {statuses.map((status) => {
        const Icon = status.icon;
        const active = value === status.value;

        return (
          <button
            key={status.value}
            type="button"
            aria-pressed={active}
            title={getStatusLabel(status.value)}
            onClick={() => onChange(status.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-semibold transition",
              compact ? "min-w-9" : "min-w-20",
              active
                ? getStatusTone(status.value)
                : "border-transparent text-zinc-500 hover:bg-white/85 hover:text-ink"
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {compact ? null : getStatusLabel(status.value)}
          </button>
        );
      })}
    </div>
  );
}
