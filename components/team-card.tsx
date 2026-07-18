import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EntityProgress } from "@/lib/types";
import { formatPercentage } from "@/lib/utils";

interface TeamCardProps {
  team: EntityProgress;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/checklist?team=${encodeURIComponent(team.name)}`}
      className="club-panel group rounded-lg p-4 transition hover:-translate-y-0.5 hover:border-aqua/25"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: team.color || "#53d3a6" }}
            />
            <p className="text-lg font-semibold text-ink group-hover:text-aqua">
              {team.name}
            </p>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            {team.ownedCards} of {team.totalCards} owned
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-zinc-500 transition group-hover:text-aqua" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="text-3xl font-semibold text-ink">
          {formatPercentage(team.completionPercentage)}
        </span>
        <span className="club-chip rounded-md px-2 py-1 text-xs font-semibold text-zinc-600">
          {team.wantlistCards} wantlist
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${team.completionPercentage}%`,
            backgroundColor: team.color || "#53d3a6"
          }}
        />
      </div>
    </Link>
  );
}
