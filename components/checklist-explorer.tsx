"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CircleDashed, Layers3, Star, Trophy } from "lucide-react";
import { ChecklistCardGrid } from "@/components/checklist-card-grid";
import { ChecklistTable } from "@/components/checklist-table";
import { ChecklistToolbar } from "@/components/checklist-toolbar";
import { ProgressCard } from "@/components/progress-card";
import {
  getCategoryOptions,
  getDriverOptions,
  getTeamOptions
} from "@/lib/checklist-data";
import { useCollectionStore } from "@/lib/collection-store";
import { defaultChecklistFilters, filterChecklistCards } from "@/lib/filters";
import { getProgressSummary } from "@/lib/progress";
import type {
  ChecklistCard,
  ChecklistFilters,
  ChecklistSet,
  CollectionStatus
} from "@/lib/types";
import { formatPercentage } from "@/lib/utils";

type ViewMode = "grid" | "table";

interface ChecklistExplorerProps {
  cards: ChecklistCard[];
  title: string;
  eyebrow?: string;
  description: string;
  lockRookieFilter?: boolean;
}

function asValidSet(value: string | null): ChecklistSet | "all" {
  if (
    value === "2025 Topps Chrome Formula 1" ||
    value === "2025 Topps Chrome Sapphire Formula 1"
  ) {
    return value;
  }

  return "all";
}

function asValidStatus(value: string | null): CollectionStatus | "all" {
  if (value === "owned" || value === "missing" || value === "wantlist") {
    return value;
  }

  return "all";
}

export function ChecklistExplorer({
  cards,
  title,
  eyebrow = "Checklist",
  description,
  lockRookieFilter = false
}: ChecklistExplorerProps) {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const collection = useCollectionStore();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<ChecklistFilters>({
    ...defaultChecklistFilters,
    rookieOnly: lockRookieFilter
  });

  useEffect(() => {
    const params = new URLSearchParams(queryKey);

    setFilters((current) => ({
      ...current,
      search: params.get("search") ?? current.search,
      setName: asValidSet(params.get("set")),
      driverName: params.get("driver") ?? "all",
      teamName: params.get("team") ?? "all",
      status: asValidStatus(params.get("status")),
      rookieOnly: lockRookieFilter || params.get("rookie") === "true",
      category: params.get("category") ?? "all"
    }));
  }, [lockRookieFilter, queryKey]);

  const driverOptions = useMemo(() => getDriverOptions(cards), [cards]);
  const teamOptions = useMemo(() => getTeamOptions(cards), [cards]);
  const categoryOptions = useMemo(() => getCategoryOptions(cards), [cards]);
  const filteredCards = useMemo(
    () => filterChecklistCards(cards, filters, collection.items),
    [cards, collection.items, filters]
  );
  const progress = useMemo(
    () => getProgressSummary(cards, collection.items),
    [cards, collection.items]
  );

  function handleFiltersChange(nextFilters: ChecklistFilters) {
    setFilters({
      ...nextFilters,
      rookieOnly: lockRookieFilter || nextFilters.rookieOnly
    });
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="club-kicker text-sm font-semibold uppercase">{eyebrow}</p>
          <h1 className="club-title mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
            {description}
          </p>
        </div>

        <div className="club-panel-strong rounded-lg p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase text-zinc-500">Completion</p>
              <p className="mt-1 text-3xl font-semibold text-ink">
                {formatPercentage(progress.completionPercentage)}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full border border-white/80 bg-[linear-gradient(135deg,rgba(255,77,123,0.18),rgba(163,255,18,0.18),rgba(20,166,255,0.16))] p-1 shadow-glow">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: `conic-gradient(#ff4d7b ${progress.completionPercentage * 3.6}deg, rgba(25,19,34,0.1) 0deg)`
                }}
              />
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ff4d7b,#ff9f1c,#a3ff12,#14a6ff)]"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <ProgressCard
          label="Total cards"
          value={progress.totalCards}
          detail={`${filteredCards.length} visible`}
          icon={Layers3}
          tone="neutral"
        />
        <ProgressCard
          label="Owned"
          value={progress.ownedCards}
          detail={formatPercentage(progress.completionPercentage)}
          icon={CheckCircle2}
          tone="mint"
        />
        <ProgressCard
          label="Missing"
          value={progress.missingCards}
          detail="Still open"
          icon={CircleDashed}
          tone="signal"
        />
        <ProgressCard
          label="Wantlist"
          value={progress.wantlistCards}
          detail="Priority targets"
          icon={Star}
          tone="champagne"
        />
        <ProgressCard
          label="Rookies"
          value={cards.filter((card) => card.isRookie).length}
          detail="Tagged in data"
          icon={Trophy}
          tone="aqua"
        />
      </section>

      <ChecklistToolbar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        driverOptions={driverOptions}
        teamOptions={teamOptions}
        categoryOptions={categoryOptions}
        filteredCount={filteredCards.length}
        totalCount={cards.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        lockRookieFilter={lockRookieFilter}
      />

      {viewMode === "grid" ? (
        <ChecklistCardGrid
          cards={filteredCards}
          collectionItems={collection.items}
          onStatusChange={collection.setStatus}
          onQuantityChange={collection.setQuantity}
        />
      ) : (
        <ChecklistTable
          cards={filteredCards}
          collectionItems={collection.items}
          onStatusChange={collection.setStatus}
          onQuantityChange={collection.setQuantity}
        />
      )}
    </div>
  );
}
