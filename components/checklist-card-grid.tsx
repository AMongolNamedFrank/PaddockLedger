"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CardImage } from "@/components/card-image";
import { QuantityStepper } from "@/components/quantity-stepper";
import { RookieBadge } from "@/components/rookie-badge";
import { SetBadge } from "@/components/set-badge";
import { StatusToggle } from "@/components/status-toggle";
import { getEffectiveStatus } from "@/lib/progress";
import type {
  ChecklistCard,
  CollectionItemsById,
  CollectionStatus
} from "@/lib/types";

interface ChecklistCardGridProps {
  cards: ChecklistCard[];
  collectionItems: CollectionItemsById;
  onStatusChange: (cardId: string, status: CollectionStatus) => void;
  onQuantityChange: (cardId: string, quantity: number) => void;
}

export function ChecklistCardGrid({
  cards,
  collectionItems,
  onStatusChange,
  onQuantityChange
}: ChecklistCardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="club-panel rounded-lg p-10 text-center">
        <p className="text-lg font-semibold text-ink">No cards match these filters.</p>
        <p className="mt-2 text-sm text-zinc-500">Try a different driver, team, or status.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card, index) => {
        const item = collectionItems[card.id];
        const status = getEffectiveStatus(item);
        const quantityOwned = item?.quantityOwned ?? 0;

        return (
          <article
            key={card.id}
            className="club-panel group rounded-lg p-3 transition hover:-translate-y-0.5 hover:border-signal/25"
          >
            <Link href={`/card/${card.id}`} className="block">
              <CardImage card={card} priority={index < 4} />
            </Link>

            <div className="mt-3 space-y-3">
              <div className="club-rule h-px w-full" />
              <div className="flex flex-wrap items-center gap-2">
                <SetBadge setName={card.setName} />
                {card.isRookie ? <RookieBadge /> : null}
                {card.parallel ? (
                  <span className="club-chip rounded-md px-2 py-1 text-xs font-semibold text-zinc-600">
                    {card.parallel}
                  </span>
                ) : null}
              </div>

              <Link
                href={`/card/${card.id}`}
                className="group/title flex items-start justify-between gap-3"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase text-zinc-500">
                    #{card.cardNumber}
                  </span>
                  <span className="mt-1 block text-base font-semibold leading-snug text-ink group-hover/title:text-signal">
                    {card.subjectName}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    {[card.teamName, card.subset || card.category].filter(Boolean).join(" • ")}
                  </span>
                </span>
                <ChevronRight className="mt-4 h-4 w-4 shrink-0 text-zinc-500 transition group-hover/title:text-signal" />
              </Link>

              <div className="flex flex-col gap-2">
                <StatusToggle
                  value={status}
                  onChange={(nextStatus) => onStatusChange(card.id, nextStatus)}
                />
                <QuantityStepper
                  value={quantityOwned}
                  onChange={(quantity) => onQuantityChange(card.id, quantity)}
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
