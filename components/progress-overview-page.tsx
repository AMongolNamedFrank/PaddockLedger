"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, CircleDashed, Layers3, Star, Trophy } from "lucide-react";
import { ProgressCard } from "@/components/progress-card";
import { checklistSets, drivers, teams } from "@/lib/checklist-data";
import { useCollectionStore } from "@/lib/collection-store";
import {
  getDriverProgress,
  getProgressSummary,
  getTeamProgress
} from "@/lib/progress";
import type { ChecklistCard, ProgressSummary } from "@/lib/types";
import { formatPercentage, formatSetShortName } from "@/lib/utils";

interface ProgressOverviewPageProps {
  cards: ChecklistCard[];
}

export function ProgressOverviewPage({ cards }: ProgressOverviewPageProps) {
  const collection = useCollectionStore();
  const overall = getProgressSummary(cards, collection.items);
  const rookieSummary = getProgressSummary(
    cards.filter((card) => card.isRookie),
    collection.items
  );
  const setSummaries = checklistSets.map((setName) => ({
    setName,
    summary: getProgressSummary(
      cards.filter((card) => card.setName === setName),
      collection.items
    )
  }));
  const driverRows = getDriverProgress(cards, collection.items, drivers).slice(0, 5);
  const teamRows = getTeamProgress(cards, collection.items, teams).slice(0, 5);

  return (
    <div className="space-y-6">
      <section>
        <p className="club-kicker text-sm font-semibold uppercase">Progress</p>
        <h1 className="club-title mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          Collection progress
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
          Overall completion across the local 2025 Topps Chrome Formula 1 and Chrome Sapphire Formula 1 checklist seeds.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <ProgressCard label="Total cards" value={overall.totalCards} icon={Layers3} tone="neutral" />
        <ProgressCard
          label="Owned"
          value={overall.ownedCards}
          detail={formatPercentage(overall.completionPercentage)}
          icon={CheckCircle2}
          tone="mint"
        />
        <ProgressCard label="Missing" value={overall.missingCards} icon={CircleDashed} tone="signal" />
        <ProgressCard label="Wantlist" value={overall.wantlistCards} icon={Star} tone="champagne" />
        <ProgressCard
          label="Rookies"
          value={formatPercentage(rookieSummary.completionPercentage)}
          detail={`${rookieSummary.ownedCards} of ${rookieSummary.totalCards}`}
          icon={Trophy}
          tone="aqua"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {setSummaries.map(({ setName, summary }) => (
          <ProgressPanel
            key={setName}
            href={`/checklist?set=${encodeURIComponent(setName)}`}
            title={formatSetShortName(setName)}
            summary={summary}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <RankedPanel title="Drivers" rows={driverRows} href="/drivers" />
        <RankedPanel title="Teams" rows={teamRows} href="/teams" />
      </section>
    </div>
  );
}

function ProgressPanel({
  title,
  summary,
  href
}: {
  title: string;
  summary: ProgressSummary;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="club-panel group rounded-lg p-4 transition hover:border-signal/25"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-ink group-hover:text-signal">{title}</p>
          <p className="mt-1 text-sm text-zinc-500">
            {summary.ownedCards} of {summary.totalCards} owned
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-zinc-500 group-hover:text-signal" />
      </div>
      <div className="mt-5 flex items-end justify-between">
        <span className="text-3xl font-semibold text-ink">
          {formatPercentage(summary.completionPercentage)}
        </span>
        <span className="text-sm text-zinc-500">{summary.wantlistCards} wantlist</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#ff4d7b,#ff9f1c,#a3ff12,#14a6ff)]"
          style={{ width: `${summary.completionPercentage}%` }}
        />
      </div>
    </Link>
  );
}

function RankedPanel({
  title,
  rows,
  href
}: {
  title: string;
  rows: Array<{ id: string; name: string; ownedCards: number; totalCards: number; completionPercentage: number }>;
  href: string;
}) {
  return (
    <div className="club-panel rounded-lg p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <Link href={href} className="text-sm font-semibold text-signal hover:text-ink">
          View all
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="club-chip rounded-lg p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-ink">{row.name}</span>
              <span className="text-sm text-zinc-500">
                {row.ownedCards}/{row.totalCards}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ff4d7b,#ff9f1c,#a3ff12)]"
                style={{ width: `${row.completionPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
