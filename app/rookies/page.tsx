import { Suspense } from "react";
import { ChecklistExplorer } from "@/components/checklist-explorer";
import { checklistCards } from "@/lib/checklist-data";

const rookieCards = checklistCards.filter((card) => card.isRookie);

export default function RookiesPage() {
  return (
    <Suspense fallback={<RookiesPageFallback />}>
      <ChecklistExplorer
        cards={rookieCards}
        title="Rookie cards"
        eyebrow="Rookie view"
        description="All rookie-tagged cards across the 2025 Topps Chrome Formula 1 and Chrome Sapphire Formula 1 seed checklists."
        lockRookieFilter
      />
    </Suspense>
  );
}

function RookiesPageFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="club-panel aspect-[2.5/3.5] rounded-lg" />
      ))}
    </div>
  );
}
