"use client";

import { CheckCircle2, CircleDashed, Layers3, Star } from "lucide-react";
import { DriverCard } from "@/components/driver-card";
import { ProgressCard } from "@/components/progress-card";
import { TeamCard } from "@/components/team-card";
import { drivers, teams } from "@/lib/checklist-data";
import { useCollectionStore } from "@/lib/collection-store";
import {
  getDriverProgress,
  getProgressSummary,
  getTeamProgress
} from "@/lib/progress";
import type { ChecklistCard } from "@/lib/types";
import { formatPercentage } from "@/lib/utils";

interface EntityProgressPageProps {
  cards: ChecklistCard[];
  mode: "drivers" | "teams";
}

export function EntityProgressPage({ cards, mode }: EntityProgressPageProps) {
  const collection = useCollectionStore();
  const summary = getProgressSummary(cards, collection.items);
  const rows =
    mode === "drivers"
      ? getDriverProgress(cards, collection.items, drivers)
      : getTeamProgress(cards, collection.items, teams);

  return (
    <div className="space-y-6">
      <section>
        <p className="club-kicker text-sm font-semibold uppercase">
          {mode === "drivers" ? "Driver progress" : "Team progress"}
        </p>
        <h1 className="club-title mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          {mode === "drivers" ? "Drivers" : "Teams"}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
          {mode === "drivers"
            ? "Completion by primary driver across the two 2025 Chrome F1 checklist seeds."
            : "Completion by constructor/team across the two 2025 Chrome F1 checklist seeds."}
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ProgressCard
          label="Checklist rows"
          value={summary.totalCards}
          icon={Layers3}
          tone="neutral"
        />
        <ProgressCard
          label="Owned"
          value={summary.ownedCards}
          detail={formatPercentage(summary.completionPercentage)}
          icon={CheckCircle2}
          tone="mint"
        />
        <ProgressCard
          label="Missing"
          value={summary.missingCards}
          icon={CircleDashed}
          tone="signal"
        />
        <ProgressCard
          label="Wantlist"
          value={summary.wantlistCards}
          icon={Star}
          tone="champagne"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) =>
          mode === "drivers" ? (
            <DriverCard key={row.id} driver={row} />
          ) : (
            <TeamCard key={row.id} team={row} />
          )
        )}
      </section>
    </div>
  );
}
