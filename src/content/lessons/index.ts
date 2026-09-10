import type { Lesson } from "@/lib/types";
import { BRIDGE_LESSONS } from "./bridge";
import { UNIT8_LESSONS } from "./unit8";
import { UNIT9_LESSONS, UNIT10_LESSONS } from "./unit9-10";
import { UNIT11_LESSONS } from "./unit11";
import { UNIT12_LESSONS, UNIT13_LESSONS } from "./unit12-13";

export const LESSONS: Lesson[] = [
  ...BRIDGE_LESSONS,
  ...UNIT8_LESSONS,
  ...UNIT9_LESSONS,
  ...UNIT10_LESSONS,
  ...UNIT11_LESSONS,
  ...UNIT12_LESSONS,
  ...UNIT13_LESSONS,
];
export const allLessons = LESSONS;

export function lessonById(id: string) {
  return LESSONS.find((l) => l.id === id);
}

export function lessonBySlug(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}

export function lessonsForUnit(unit: Lesson["unit"]) {
  return LESSONS.filter((l) => l.unit === unit);
}

export const SAMPLE_PATH_SLUG = "zero-flux-is-not-zero-field";
