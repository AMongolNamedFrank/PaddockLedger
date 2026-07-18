import type { CollectionStatus } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPercentage(value: number) {
  if (!Number.isFinite(value)) {
    return "0%";
  }

  return `${Math.round(value)}%`;
}

export function formatSetShortName(setName: string) {
  if (setName.includes("Sapphire")) {
    return "Chrome Sapphire";
  }

  return "Chrome";
}

export function getStatusLabel(status: CollectionStatus) {
  const labels: Record<CollectionStatus, string> = {
    missing: "Missing",
    owned: "Owned",
    wantlist: "Wantlist"
  };

  return labels[status];
}

export function getStatusTone(status: CollectionStatus) {
  const tones: Record<CollectionStatus, string> = {
    missing: "border-lilac/20 bg-lilac/10 text-lilac",
    owned: "border-mint/25 bg-mint/10 text-mint",
    wantlist: "border-champagne/25 bg-champagne/10 text-champagne"
  };

  return tones[status];
}
