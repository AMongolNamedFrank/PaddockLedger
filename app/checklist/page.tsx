import { Suspense } from "react";
import { ChecklistExplorer } from "@/components/checklist-explorer";
import { checklistCards } from "@/lib/checklist-data";

export default function ChecklistPage() {
  return (
    <Suspense fallback={<ChecklistPageFallback />}>
      <ChecklistExplorer
        cards={checklistCards}
        title="2025 Topps Chrome F1 checklist"
        description="Browse Chrome and Chrome Sapphire Formula 1 seed checklists, mark cards owned, build a wantlist, and track collection progress locally."
      />
    </Suspense>
  );
}

function ChecklistPageFallback() {
  return (
    <div className="space-y-4">
      <div className="club-panel h-28 rounded-lg" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="club-panel h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
