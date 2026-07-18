import type { ChecklistCard } from "@/lib/types";
import { formatSetShortName } from "@/lib/utils";

interface CardImagePlaceholderProps {
  card: ChecklistCard;
  compact?: boolean;
}

export function CardImagePlaceholder({
  card,
  compact = false
}: CardImagePlaceholderProps) {
  const isSapphire = card.setName.includes("Sapphire");

  return (
    <div
      className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border ${
        isSapphire
          ? "border-aqua/30 bg-[linear-gradient(145deg,#f8fdff,#d8f4ff_38%,#f7f0ff_70%,#ffffff)]"
          : "border-signal/25 bg-[linear-gradient(145deg,#fff3f8,#fff8df_38%,#eefbff_72%,#ffffff)]"
      } p-3 text-left`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-md border border-white/80 bg-white/70 px-2 py-1 text-[10px] font-bold uppercase text-ink shadow-glow">
          #{card.cardNumber}
        </span>
        {card.isRookie ? (
          <span className="rounded-md border border-champagne/30 bg-champagne/10 px-2 py-1 text-[10px] font-bold uppercase text-champagne">
            RC
          </span>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="club-rule h-px w-full" />
        <div>
          <p
            className={`font-semibold leading-tight text-ink ${
              compact ? "text-xs" : "text-base"
            }`}
          >
            {card.subjectName}
          </p>
          <p className="mt-1 text-[10px] uppercase text-zinc-500">
            {formatSetShortName(card.setName)}
          </p>
        </div>
      </div>
    </div>
  );
}
