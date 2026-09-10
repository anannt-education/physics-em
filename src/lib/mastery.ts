import type { EvidenceEvent, MasteryState, SkillTrack } from "@/lib/types";
import { LESSONS } from "@/content/lessons";
import { itemById } from "@/content/items";

const INDEPENDENT_MIN = 10;
const INDEPENDENT_ACCURACY = 0.8;
const INDEPENDENT_FAMILIES = 6;
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export interface ObjectiveMastery {
  objectiveId: string;
  state: MasteryState;
  scored: number;
  correctUnaided: number;
  families: number;
  hasRepresentation: boolean;
  sessions: number;
  lastUnaidedAt?: number;
  reason: string;
}

export function eventsForObjective(events: EvidenceEvent[], objectiveId: string) {
  return events.filter((e) => e.objectiveId === objectiveId);
}

export function masteryForObjective(events: EvidenceEvent[], objectiveId: string): ObjectiveMastery {
  const ev = eventsForObjective(events, objectiveId);
  const independentSubs = ev.filter(
    (e) =>
      e.type === "independent_response_submitted" &&
      !e.assisted &&
      e.itemFamily,
  );
  const scored = independentSubs.length;
  const correctUnaided = independentSubs.filter((e) => e.correct).length;
  const families = new Set(independentSubs.map((e) => e.itemFamily)).size;
  const sessions = new Set(independentSubs.map((e) => e.sessionId)).size;
  const hasRepresentation = ev.some(
    (e) => e.type === "representation_submitted" && !e.assisted,
  );
  const lastUnaidedAt = independentSubs.filter((e) => e.correct).at(-1)?.at;
  const delayed = ev.some(
    (e) =>
      e.type === "independent_response_submitted" &&
      !e.assisted &&
      e.correct &&
      lastUnaidedAt &&
      e.at - (independentSubs[0]?.at ?? e.at) >= RETENTION_MS,
  );

  if (scored === 0 && !ev.some((e) => e.type === "lesson_started" || e.type === "lesson_prediction")) {
    return {
      objectiveId,
      state: "not_assessed",
      scored,
      correctUnaided,
      families,
      hasRepresentation,
      sessions,
      reason: "No scored attempts yet.",
    };
  }

  if (scored > 0 && scored < 4) {
    return {
      objectiveId,
      state: "provisional",
      scored,
      correctUnaided,
      families,
      hasRepresentation,
      sessions,
      lastUnaidedAt,
      reason: "Sparse evidence — status is provisional, not independent.",
    };
  }

  const accuracy = scored ? correctUnaided / scored : 0;
  const independent =
    scored >= INDEPENDENT_MIN &&
    sessions >= 2 &&
    families >= INDEPENDENT_FAMILIES &&
    hasRepresentation &&
    accuracy >= INDEPENDENT_ACCURACY;

  if (independent && delayed) {
    return {
      objectiveId,
      state: "retained",
      scored,
      correctUnaided,
      families,
      hasRepresentation,
      sessions,
      lastUnaidedAt,
      reason: "Independent threshold met, plus a later unseen check.",
    };
  }

  if (independent) {
    return {
      objectiveId,
      state: "independent",
      scored,
      correctUnaided,
      families,
      hasRepresentation,
      sessions,
      lastUnaidedAt,
      reason: `At least ${INDEPENDENT_MIN} unaided scored items across two sessions, ${INDEPENDENT_FAMILIES}+ families, a representation task, and ≥80% unaided. Hint or solution views do not count toward this.`,
    };
  }

  const recentWrong = [...ev].reverse().find((e) => e.type === "independent_response_submitted");
  if (recentWrong && recentWrong.correct === false) {
    return {
      objectiveId,
      state: "needs_review",
      scored,
      correctUnaided,
      families,
      hasRepresentation,
      sessions,
      lastUnaidedAt,
      reason: "A recent unaided miss is queued for repair. Repeats of the same family will not mint independence.",
    };
  }

  if (ev.length) {
    return {
      objectiveId,
      state: "learning",
      scored,
      correctUnaided,
      families,
      hasRepresentation,
      sessions,
      lastUnaidedAt,
      reason: "Learning with support. Video completion and hinted attempts are logged as learning evidence only.",
    };
  }

  return {
    objectiveId,
    state: "not_assessed",
    scored,
    correctUnaided,
    families,
    hasRepresentation,
    sessions,
    reason: "Not yet assessed.",
  };
}

export function allObjectiveMastery(events: EvidenceEvent[]) {
  const ids = [...new Set(LESSONS.flatMap((l) => l.objectives))];
  return ids.map((id) => masteryForObjective(events, id));
}

export function skillScores(events: EvidenceEvent[]): Record<SkillTrack, { n: number; correct: number }> {
  const empty = { n: 0, correct: 0 };
  const out: Record<SkillTrack, { n: number; correct: number }> = {
    physical_modelling: { ...empty },
    mathematical_execution: { ...empty },
    representations: { ...empty },
    experimental_reasoning: { ...empty },
    argumentation: { ...empty },
    timed_execution: { ...empty },
  };
  for (const e of events) {
    if (!e.skill || e.type !== "independent_response_submitted" || e.assisted) continue;
    out[e.skill].n += 1;
    if (e.correct) out[e.skill].correct += 1;
  }
  return out;
}

export function coverageLabel(state: MasteryState) {
  switch (state) {
    case "not_assessed":
      return "Not assessed";
    case "learning":
      return "Learning with support";
    case "provisional":
      return "Provisional";
    case "independent":
      return "Independent";
    case "retained":
      return "Retained";
    case "needs_review":
      return "Needs review";
  }
}

export function itemFamilyOf(itemId?: string) {
  if (!itemId) return undefined;
  return itemById(itemId)?.family;
}
