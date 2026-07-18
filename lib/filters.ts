import type {
  ChecklistCard,
  ChecklistFilters,
  CollectionItemsById
} from "@/lib/types";
import { getEffectiveStatus } from "@/lib/progress";

export const defaultChecklistFilters: ChecklistFilters = {
  search: "",
  setName: "all",
  driverName: "all",
  teamName: "all",
  rookieOnly: false,
  category: "all",
  status: "all"
};

export function filterChecklistCards(
  cards: ChecklistCard[],
  filters: ChecklistFilters,
  collectionItems: CollectionItemsById
) {
  const search = filters.search.trim().toLowerCase();

  return cards.filter((card) => {
    if (filters.setName !== "all" && card.setName !== filters.setName) {
      return false;
    }

    if (filters.driverName !== "all" && card.driverName !== filters.driverName) {
      return false;
    }

    if (filters.teamName !== "all" && card.teamName !== filters.teamName) {
      return false;
    }

    if (filters.rookieOnly && !card.isRookie) {
      return false;
    }

    if (
      filters.category !== "all" &&
      card.category !== filters.category &&
      card.subset !== filters.category
    ) {
      return false;
    }

    if (
      filters.status !== "all" &&
      getEffectiveStatus(collectionItems[card.id]) !== filters.status
    ) {
      return false;
    }

    if (!search) {
      return true;
    }

    const haystack = [
      card.cardNumber,
      card.subjectName,
      card.driverName,
      card.teamName,
      card.setName,
      card.category,
      card.subset,
      card.parallel
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
}
