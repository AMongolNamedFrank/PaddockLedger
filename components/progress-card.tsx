import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  label: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  tone?: "mint" | "signal" | "champagne" | "aqua" | "neutral";
}

const tones = {
  mint: "border-mint/25 bg-mint/10 text-mint",
  signal: "border-signal/25 bg-signal/10 text-signal",
  champagne: "border-champagne/25 bg-champagne/10 text-champagne",
  aqua: "border-aqua/25 bg-aqua/10 text-aqua",
  neutral: "border-lilac/20 bg-lilac/10 text-lilac"
};

export function ProgressCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "neutral"
}: ProgressCardProps) {
  return (
    <div className="club-panel rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase text-zinc-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
        </div>
        <span
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-glow",
            tones[tone]
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      {detail ? <p className="mt-3 text-sm text-zinc-500">{detail}</p> : null}
    </div>
  );
}
