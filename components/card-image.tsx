"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ChecklistCard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CardImagePlaceholder } from "@/components/card-image-placeholder";

interface CardImageProps {
  card: ChecklistCard;
  variant?: "tile" | "thumb" | "detail";
  priority?: boolean;
}

const variantClasses = {
  tile: "aspect-[2.5/3.5] w-full",
  thumb: "h-20 w-14",
  detail: "aspect-[2.5/3.5] w-full max-w-sm"
};

export function CardImage({
  card,
  variant = "tile",
  priority = false
}: CardImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const canRenderImage = Boolean(card.imageUrl) && !failed;
  const isSvg = card.imageUrl?.endsWith(".svg") ?? false;

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [card.id, card.imageUrl]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/80 bg-white/75 shadow-glow",
        variantClasses[variant]
      )}
    >
      {canRenderImage ? (
        <>
          {!loaded ? <div className="image-skeleton absolute inset-0" /> : null}
          <Image
            src={card.imageUrl as string}
            alt={card.imageAlt || `${card.setName} #${card.cardNumber} ${card.subjectName}`}
            fill
            unoptimized={isSvg}
            priority={priority}
            sizes={
              variant === "thumb"
                ? "56px"
                : "(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 260px"
            }
            className={cn(
              "object-cover transition duration-500",
              loaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <CardImagePlaceholder card={card} compact={variant === "thumb"} />
      )}
    </div>
  );
}
