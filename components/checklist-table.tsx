"use client";

import Link from "next/link";
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

interface ChecklistTableProps {
  cards: ChecklistCard[];
  collectionItems: CollectionItemsById;
  onStatusChange: (cardId: string, status: CollectionStatus) => void;
  onQuantityChange: (cardId: string, quantity: number) => void;
}

export function ChecklistTable({
  cards,
  collectionItems,
  onStatusChange,
  onQuantityChange
}: ChecklistTableProps) {
  if (cards.length === 0) {
    return (
      <div className="club-panel rounded-lg p-10 text-center">
        <p className="text-lg font-semibold text-ink">No cards match these filters.</p>
        <p className="mt-2 text-sm text-zinc-500">Try a different driver, team, or status.</p>
      </div>
    );
  }

  return (
    <div className="club-panel overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/70">
          <thead className="bg-white/45 text-left text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Card</th>
              <th className="px-4 py-3 font-semibold">Set</th>
              <th className="px-4 py-3 font-semibold">Team</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/70">
            {cards.map((card) => {
              const item = collectionItems[card.id];
              const status = getEffectiveStatus(item);
              const quantityOwned = item?.quantityOwned ?? 0;

              return (
                <tr key={card.id} className="transition hover:bg-white/55">
                  <td className="px-4 py-3">
                    <div className="flex min-w-64 items-center gap-3">
                      <Link href={`/card/${card.id}`}>
                        <CardImage card={card} variant="thumb" />
                      </Link>
                      <div>
                        <Link
                          href={`/card/${card.id}`}
                          className="font-semibold text-ink hover:text-signal"
                        >
                          #{card.cardNumber} {card.subjectName}
                        </Link>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {card.isRookie ? <RookieBadge /> : null}
                          {card.parallel ? (
                            <span className="club-chip rounded-md px-2 py-1 text-xs font-semibold text-zinc-600">
                              {card.parallel}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <SetBadge setName={card.setName} />
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {card.teamName || "None"}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {card.subset || card.category || "Base"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusToggle
                      value={status}
                      compact
                      onChange={(nextStatus) => onStatusChange(card.id, nextStatus)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <QuantityStepper
                      value={quantityOwned}
                      compact
                      onChange={(quantity) => onQuantityChange(card.id, quantity)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
