"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, Copy, Layers3, Star } from "lucide-react";
import { CardImage } from "@/components/card-image";
import { ProgressCard } from "@/components/progress-card";
import { QuantityStepper } from "@/components/quantity-stepper";
import { RookieBadge } from "@/components/rookie-badge";
import { SetBadge } from "@/components/set-badge";
import { StatusToggle } from "@/components/status-toggle";
import { useCollectionStore } from "@/lib/collection-store";
import { getEffectiveStatus } from "@/lib/progress";
import type { ChecklistCard } from "@/lib/types";
import { getStatusLabel } from "@/lib/utils";

interface CardDetailClientProps {
  card: ChecklistCard;
}

const metadataRows: Array<{
  label: string;
  key: keyof ChecklistCard;
}> = [
  { label: "Card number", key: "cardNumber" },
  { label: "Subject", key: "subjectName" },
  { label: "Driver", key: "driverName" },
  { label: "Team", key: "teamName" },
  { label: "Category", key: "category" },
  { label: "Subset", key: "subset" },
  { label: "Parallel", key: "parallel" },
  { label: "Image source", key: "imageSource" }
];

export function CardDetailClient({ card }: CardDetailClientProps) {
  const collection = useCollectionStore();
  const item = collection.items[card.id];
  const status = getEffectiveStatus(item);
  const quantityOwned = item?.quantityOwned ?? 0;

  return (
    <div className="space-y-6">
      <Link
        href="/checklist"
        className="club-panel inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-600 transition hover:text-signal"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Checklist
      </Link>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex justify-center lg:justify-start">
          <CardImage card={card} variant="detail" priority />
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <SetBadge setName={card.setName} />
            {card.isRookie ? <RookieBadge /> : null}
            {card.parallel ? (
              <span className="club-chip rounded-md px-2 py-1 text-xs font-semibold text-zinc-600">
                {card.parallel}
              </span>
            ) : null}
          </div>

          <div>
            <p className="club-kicker text-sm font-semibold uppercase">Card #{card.cardNumber}</p>
            <h1 className="club-title mt-3 text-3xl font-semibold tracking-normal sm:text-5xl">
              {card.subjectName}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
              {[card.teamName, card.subset || card.category, card.setName]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ProgressCard
              label="Status"
              value={getStatusLabel(status)}
              icon={status === "owned" ? CheckCircle2 : status === "wantlist" ? Star : CircleDashed}
              tone={status === "owned" ? "mint" : status === "wantlist" ? "champagne" : "signal"}
            />
            <ProgressCard
              label="Quantity"
              value={quantityOwned}
              icon={Copy}
              tone="aqua"
            />
            <ProgressCard
              label="Checklist"
              value={card.isRookie ? "Rookie" : card.isTeamCard ? "Team" : "Driver"}
              icon={Layers3}
              tone="neutral"
            />
          </div>

          <div className="club-panel rounded-lg p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <StatusToggle
                value={status}
                onChange={(nextStatus) => collection.setStatus(card.id, nextStatus)}
              />
              <QuantityStepper
                value={quantityOwned}
                onChange={(quantity) => collection.setQuantity(card.id, quantity)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <div className="club-panel rounded-lg p-4">
          <h2 className="text-lg font-semibold text-ink">Checklist metadata</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {metadataRows.map((row) => {
              const value = card[row.key];

              return (
                <div key={row.key} className="club-chip rounded-lg p-3">
                  <dt className="text-xs font-medium uppercase text-zinc-500">{row.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {typeof value === "boolean" ? String(value) : value || "None"}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="club-panel rounded-lg p-4">
          <h2 className="text-lg font-semibold text-ink">Notes</h2>
          <p className="club-chip mt-3 min-h-24 rounded-lg p-3 text-sm leading-6 text-zinc-600">
            {card.notes || "No checklist note on this seed row."}
          </p>
        </div>
      </section>
    </div>
  );
}
