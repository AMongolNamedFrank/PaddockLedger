export type ChecklistSet =
  | "2025 Topps Chrome Formula 1"
  | "2025 Topps Chrome Sapphire Formula 1";

export type CollectionStatus = "missing" | "owned" | "wantlist";

export type CardImageSource = "local" | "remote" | "uploaded" | "placeholder";

export interface ChecklistCard {
  id: string;
  setName: ChecklistSet;
  year: 2025;
  cardNumber: string;
  subjectName: string;
  driverName?: string | null;
  teamName?: string | null;
  category?: string | null;
  subset?: string | null;
  isRookie: boolean;
  isDriverCard: boolean;
  isTeamCard: boolean;
  isMultiSubject: boolean;
  parallel?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  imageSource?: CardImageSource;
  notes?: string | null;
}

export interface CollectionItem {
  cardId: string;
  status: CollectionStatus;
  quantityOwned: number;
  updatedAt: string;
}

export type CollectionItemsById = Record<string, CollectionItem>;

export interface DriverTag {
  id: string;
  name: string;
  currentTeam?: string | null;
  isCurrentGridDriver: boolean;
  isRookieRelevant?: boolean;
}

export interface TeamTag {
  id: string;
  name: string;
  shortName?: string;
  primaryColor?: string;
}

export type ChecklistSetFilter = ChecklistSet | "all";
export type ChecklistStatusFilter = CollectionStatus | "all";

export interface ChecklistFilters {
  search: string;
  setName: ChecklistSetFilter;
  driverName: string;
  teamName: string;
  rookieOnly: boolean;
  category: string;
  status: ChecklistStatusFilter;
}

export interface ProgressSummary {
  totalCards: number;
  ownedCards: number;
  missingCards: number;
  wantlistCards: number;
  completionPercentage: number;
}

export interface EntityProgress extends ProgressSummary {
  id: string;
  name: string;
  color?: string;
}
