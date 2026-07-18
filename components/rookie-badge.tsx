import { BadgeCheck } from "lucide-react";

export function RookieBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-champagne/30 bg-[linear-gradient(135deg,rgba(255,159,28,0.16),rgba(163,255,18,0.14))] px-2 py-1 text-xs font-semibold text-champagne">
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      Rookie
    </span>
  );
}
