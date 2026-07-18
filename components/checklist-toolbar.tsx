"use client";

import { LayoutGrid, Rows3, Search } from "lucide-react";
import type { ChecklistFilters, ChecklistSet } from "@/lib/types";
import { checklistSets } from "@/lib/checklist-data";
import { cn, formatSetShortName } from "@/lib/utils";

type ViewMode = "grid" | "table";

interface ChecklistToolbarProps {
  filters: ChecklistFilters;
  onFiltersChange: (filters: ChecklistFilters) => void;
  driverOptions: string[];
  teamOptions: string[];
  categoryOptions: string[];
  totalCount: number;
  filteredCount: number;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
  lockRookieFilter?: boolean;
}

export function ChecklistToolbar({
  filters,
  onFiltersChange,
  driverOptions,
  teamOptions,
  categoryOptions,
  totalCount,
  filteredCount,
  viewMode,
  onViewModeChange,
  lockRookieFilter = false
}: ChecklistToolbarProps) {
  function updateFilter<K extends keyof ChecklistFilters>(
    key: K,
    value: ChecklistFilters[K]
  ) {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  }

  return (
    <section className="club-panel rounded-lg p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            aria-hidden
          />
          <input
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search card, driver, team, set"
            className="club-field h-11 w-full rounded-lg pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-zinc-500 focus:border-signal/40 focus:bg-white"
          />
        </label>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:flex">
          <select
            value={filters.setName}
            onChange={(event) =>
              updateFilter("setName", event.target.value as ChecklistSet | "all")
            }
            className="club-field h-11 rounded-lg px-3 text-sm text-ink outline-none focus:border-signal/40 focus:bg-white"
          >
            <option value="all">All sets</option>
            {checklistSets.map((setName) => (
              <option key={setName} value={setName}>
                {formatSetShortName(setName)}
              </option>
            ))}
          </select>

          <select
            value={filters.driverName}
            onChange={(event) => updateFilter("driverName", event.target.value)}
            className="club-field h-11 rounded-lg px-3 text-sm text-ink outline-none focus:border-signal/40 focus:bg-white"
          >
            <option value="all">All drivers</option>
            {driverOptions.map((driver) => (
              <option key={driver} value={driver}>
                {driver}
              </option>
            ))}
          </select>

          <select
            value={filters.teamName}
            onChange={(event) => updateFilter("teamName", event.target.value)}
            className="club-field h-11 rounded-lg px-3 text-sm text-ink outline-none focus:border-signal/40 focus:bg-white"
          >
            <option value="all">All teams</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
            className="club-field h-11 rounded-lg px-3 text-sm text-ink outline-none focus:border-signal/40 focus:bg-white"
          >
            <option value="all">All categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(event) =>
              updateFilter("status", event.target.value as ChecklistFilters["status"])
            }
            className="club-field h-11 rounded-lg px-3 text-sm text-ink outline-none focus:border-signal/40 focus:bg-white"
          >
            <option value="all">All status</option>
            <option value="owned">Owned</option>
            <option value="missing">Missing</option>
            <option value="wantlist">Wantlist</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <button
            type="button"
            aria-pressed={filters.rookieOnly}
            disabled={lockRookieFilter}
            onClick={() => updateFilter("rookieOnly", !filters.rookieOnly)}
            className={cn(
              "h-11 rounded-lg border px-3 text-sm font-semibold transition",
              filters.rookieOnly
                ? "border-champagne/35 bg-champagne/15 text-champagne shadow-glow"
                : "club-field text-zinc-600 hover:bg-white hover:text-ink",
              lockRookieFilter && "cursor-not-allowed opacity-80"
            )}
          >
            Rookies
          </button>

          <div className="club-field inline-flex h-11 rounded-lg p-1">
            <button
              type="button"
              title="Grid view"
              aria-pressed={viewMode === "grid"}
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "inline-flex w-10 items-center justify-center rounded-md transition",
                viewMode === "grid"
                  ? "bg-signal/10 text-signal shadow-glow"
                  : "text-zinc-500 hover:bg-white hover:text-ink"
              )}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              title="Compact table view"
              aria-pressed={viewMode === "table"}
              onClick={() => onViewModeChange("table")}
              className={cn(
                "inline-flex w-10 items-center justify-center rounded-md transition",
                viewMode === "table"
                  ? "bg-signal/10 text-signal shadow-glow"
                  : "text-zinc-500 hover:bg-white hover:text-ink"
              )}
            >
              <Rows3 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        <span className="club-chip rounded-md px-2 py-1">
          {filteredCount} shown
        </span>
        <span className="club-chip rounded-md px-2 py-1">
          {totalCount} checklist rows
        </span>
      </div>
    </section>
  );
}
