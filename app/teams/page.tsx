import { EntityProgressPage } from "@/components/entity-progress-page";
import { checklistCards } from "@/lib/checklist-data";

export default function TeamsPage() {
  return <EntityProgressPage cards={checklistCards} mode="teams" />;
}
