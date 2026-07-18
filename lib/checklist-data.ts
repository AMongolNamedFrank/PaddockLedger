import chromeChecklist from "@/data/checklists/2025-topps-chrome-f1.json";
import sapphireChecklist from "@/data/checklists/2025-topps-chrome-sapphire-f1.json";
import driversData from "@/data/drivers.json";
import teamsData from "@/data/teams.json";
import type { ChecklistCard, ChecklistSet, DriverTag, TeamTag } from "@/lib/types";

export const checklistSets: ChecklistSet[] = [
  "2025 Topps Chrome Formula 1",
  "2025 Topps Chrome Sapphire Formula 1"
];

export const checklistCards = [
  ...(chromeChecklist as ChecklistCard[]),
  ...(sapphireChecklist as ChecklistCard[])
].sort((a, b) => {
  if (a.setName !== b.setName) {
    return a.setName.localeCompare(b.setName);
  }

  return a.cardNumber.localeCompare(b.cardNumber, undefined, {
    numeric: true,
    sensitivity: "base"
  });
});

export const drivers = driversData as DriverTag[];
export const teams = teamsData as TeamTag[];

export function getChecklistCardById(id: string) {
  return checklistCards.find((card) => card.id === id);
}

export function getDriverOptions(cards: ChecklistCard[] = checklistCards) {
  return Array.from(
    new Set(cards.map((card) => card.driverName).filter(Boolean) as string[])
  ).sort((a, b) => a.localeCompare(b));
}

export function getTeamOptions(cards: ChecklistCard[] = checklistCards) {
  return Array.from(
    new Set(cards.map((card) => card.teamName).filter(Boolean) as string[])
  ).sort((a, b) => a.localeCompare(b));
}

export function getCategoryOptions(cards: ChecklistCard[] = checklistCards) {
  return Array.from(
    new Set(
      cards
        .map((card) => card.subset || card.category)
        .filter(Boolean) as string[]
    )
  ).sort((a, b) => a.localeCompare(b));
}
