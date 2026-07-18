import type { ChecklistSet } from "@/lib/types";
import { cn, formatSetShortName } from "@/lib/utils";

export function SetBadge({ setName }: { setName: ChecklistSet }) {
  const isSapphire = setName.includes("Sapphire");

  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-1 text-xs font-semibold",
        isSapphire
          ? "border-aqua/30 bg-[linear-gradient(135deg,rgba(20,166,255,0.14),rgba(143,106,255,0.12))] text-aqua"
          : "border-signal/30 bg-[linear-gradient(135deg,rgba(255,77,123,0.14),rgba(255,159,28,0.12))] text-signal"
      )}
    >
      {formatSetShortName(setName)}
    </span>
  );
}
