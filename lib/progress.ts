import type {
  ChecklistCard,
  CollectionItem,
  CollectionItemsById,
  CollectionStatus,
  DriverTag,
  EntityProgress,
  ProgressSummary,
  TeamTag
} from "@/lib/types";

export function getEffectiveStatus(item?: CollectionItem): CollectionStatus {
  if (item?.quantityOwned && item.quantityOwned > 0) {
    return "owned";
  }

  return item?.status ?? "missing";
}

export function isCardOwned(item?: CollectionItem) {
  return getEffectiveStatus(item) === "owned";
}

export function getProgressSummary(
  cards: ChecklistCard[],
  collectionItems: CollectionItemsById
): ProgressSummary {
  const totalCards = cards.length;
  let ownedCards = 0;
  let wantlistCards = 0;
  let missingCards = 0;

  for (const card of cards) {
    const status = getEffectiveStatus(collectionItems[card.id]);

    if (status === "owned") {
      ownedCards += 1;
    } else if (status === "wantlist") {
      wantlistCards += 1;
    } else {
      missingCards += 1;
    }
  }

  return {
    totalCards,
    ownedCards,
    missingCards,
    wantlistCards,
    completionPercentage: totalCards > 0 ? (ownedCards / totalCards) * 100 : 0
  };
}

export function getDriverProgress(
  cards: ChecklistCard[],
  collectionItems: CollectionItemsById,
  driverTags: DriverTag[]
): EntityProgress[] {
  const representedDrivers = new Set(
    cards.map((card) => card.driverName).filter(Boolean) as string[]
  );
  const driverMetadataByName = new Map(
    driverTags.map((driver) => [driver.name, driver])
  );

  return Array.from(representedDrivers)
    .map((driverName) => {
      const driver = driverMetadataByName.get(driverName);
      const driverCards = cards.filter((card) => card.driverName === driverName);
      return {
        id: driver?.id ?? slugifyEntityId(driverName),
        name: driverName,
        color: undefined,
        ...getProgressSummary(driverCards, collectionItems)
      };
    })
    .sort((a, b) => {
      if (b.totalCards !== a.totalCards) {
        return b.totalCards - a.totalCards;
      }

      return a.name.localeCompare(b.name);
    });
}

export function getTeamProgress(
  cards: ChecklistCard[],
  collectionItems: CollectionItemsById,
  teamTags: TeamTag[]
): EntityProgress[] {
  const representedTeams = new Set(
    cards.map((card) => card.teamName).filter(Boolean) as string[]
  );
  const teamMetadataByName = new Map(teamTags.map((team) => [team.name, team]));

  return Array.from(representedTeams)
    .map((teamName) => {
      const team = teamMetadataByName.get(teamName);
      const teamCards = cards.filter((card) => card.teamName === teamName);
      return {
        id: team?.id ?? slugifyEntityId(teamName),
        name: teamName,
        color: team?.primaryColor,
        ...getProgressSummary(teamCards, collectionItems)
      };
    })
    .sort((a, b) => {
      if (b.totalCards !== a.totalCards) {
        return b.totalCards - a.totalCards;
      }

      return a.name.localeCompare(b.name);
    });
}

function slugifyEntityId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
