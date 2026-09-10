import type { McqItem } from "@/lib/types";
import { DIAGNOSTIC_ITEMS } from "./diagnostic";
import { UNIT8_ITEMS } from "./unit8";
import { REST_ITEMS } from "./rest";

export const PRACTICE_ITEMS: McqItem[] = [...DIAGNOSTIC_ITEMS, ...UNIT8_ITEMS, ...REST_ITEMS];
export const allItems = PRACTICE_ITEMS;

export function itemById(id: string) {
  return PRACTICE_ITEMS.find((i) => i.id === id);
}

export function itemsByIds(ids: string[]) {
  return ids.map(itemById).filter((i): i is McqItem => Boolean(i));
}

export function itemsForObjective(objective: string) {
  return PRACTICE_ITEMS.filter((i) => i.objective === objective);
}

export function itemsForPool(pool: McqItem["pool"]) {
  return PRACTICE_ITEMS.filter((i) => i.pool === pool);
}

export function keyedItem(item: McqItem) {
  if (!item.correct) throw new Error(`Item ${item.id} is missing a key (not a learning item).`);
  return item as McqItem & { correct: NonNullable<McqItem["correct"]> };
}
