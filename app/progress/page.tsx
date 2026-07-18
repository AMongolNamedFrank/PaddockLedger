import { ProgressOverviewPage } from "@/components/progress-overview-page";
import { checklistCards } from "@/lib/checklist-data";

export default function ProgressPage() {
  return <ProgressOverviewPage cards={checklistCards} />;
}
