"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  CollectionItem,
  CollectionItemsById,
  CollectionStatus
} from "@/lib/types";

const STORAGE_KEY = "gridledger.collection.v1";

function isCollectionStatus(value: unknown): value is CollectionStatus {
  return value === "missing" || value === "owned" || value === "wantlist";
}

function normalizeStoredItems(value: unknown): CollectionItemsById {
  if (!value || typeof value !== "object") {
    return {};
  }

  const entries = Object.entries(value as Record<string, unknown>);
  const normalized: CollectionItemsById = {};

  for (const [cardId, rawItem] of entries) {
    if (!rawItem || typeof rawItem !== "object") {
      continue;
    }

    const item = rawItem as Partial<CollectionItem>;
    const status = isCollectionStatus(item.status) ? item.status : "missing";
    const quantityOwned =
      typeof item.quantityOwned === "number" && item.quantityOwned > 0
        ? Math.floor(item.quantityOwned)
        : 0;

    normalized[cardId] = {
      cardId,
      status: quantityOwned > 0 ? "owned" : status,
      quantityOwned,
      updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : ""
    };
  }

  return normalized;
}

function createCollectionItem(
  cardId: string,
  status: CollectionStatus = "missing",
  quantityOwned = 0
): CollectionItem {
  return {
    cardId,
    status: quantityOwned > 0 ? "owned" : status,
    quantityOwned,
    updatedAt: new Date().toISOString()
  };
}

export function useCollectionStore() {
  const [items, setItems] = useState<CollectionItemsById>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setItems(stored ? normalizeStoredItems(JSON.parse(stored)) : {});
    } catch {
      setItems({});
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const getItem = useCallback(
    (cardId: string) => items[cardId] ?? createCollectionItem(cardId),
    [items]
  );

  const setStatus = useCallback((cardId: string, status: CollectionStatus) => {
    setItems((current) => {
      const previous = current[cardId] ?? createCollectionItem(cardId);
      const quantityOwned =
        status === "owned" ? Math.max(1, previous.quantityOwned) : 0;

      return {
        ...current,
        [cardId]: createCollectionItem(cardId, status, quantityOwned)
      };
    });
  }, []);

  const setQuantity = useCallback((cardId: string, quantity: number) => {
    setItems((current) => {
      const previous = current[cardId] ?? createCollectionItem(cardId);
      const quantityOwned = Math.max(0, Math.floor(quantity));
      const status =
        quantityOwned > 0
          ? "owned"
          : previous.status === "wantlist"
            ? "wantlist"
            : "missing";

      return {
        ...current,
        [cardId]: createCollectionItem(cardId, status, quantityOwned)
      };
    });
  }, []);

  const resetCollection = useCallback(() => {
    setItems({});
  }, []);

  return useMemo(
    () => ({
      hydrated,
      items,
      getItem,
      setStatus,
      setQuantity,
      resetCollection
    }),
    [getItem, hydrated, items, resetCollection, setQuantity, setStatus]
  );
}
