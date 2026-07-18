import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EntityProgress } from "@/lib/types";
import { formatPercentage } from "@/lib/utils";

interface DriverCardProps {
  driver: EntityProgress;
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <Link
      href={`/checklist?driver=${encodeURIComponent(driver.name)}`}
      className="club-panel group rounded-lg p-4 transition hover:-translate-y-0.5 hover:border-signal/25"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-ink group-hover:text-signal">
            {driver.name}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {driver.ownedCards} of {driver.totalCards} owned
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-zinc-500 transition group-hover:text-signal" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="text-3xl font-semibold text-ink">
          {formatPercentage(driver.completionPercentage)}
        </span>
        <span className="club-chip rounded-md px-2 py-1 text-xs font-semibold text-zinc-600">
          {driver.wantlistCards} wantlist
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#ff4d7b,#ff9f1c,#a3ff12)] transition-all"
          style={{ width: `${driver.completionPercentage}%` }}
        />
      </div>
    </Link>
  );
}
