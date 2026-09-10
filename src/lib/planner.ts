import type { EvidenceEvent, NextTask, PathwayId, StudentProfile } from "@/lib/types";
import { LESSONS, lessonById } from "@/content/lessons";
import { TOPICS } from "@/content/curriculum";
import { INVESTIGATIONS } from "@/content/investigations";
import { masteryForObjective } from "@/lib/mastery";
import { PRACTICE_FRQS } from "@/content/frqs";

export const PATHWAYS: Record<
  PathwayId,
  { title: string; weeks: number; blurb: string; template: string }
> = {
  "24-week": {
    title: "24-week foundation",
    weeks: 24,
    blurb: "More time on the bridge and on retrieval. A starting template, not a promise.",
    template: "Weeks 1–3 diagnosis and bridge; 4–8 Unit 8; 9–11 Unit 9; 12–13 Unit 10; 14–17 Unit 11; 18–20 Unit 12; 21–22 Unit 13; 23–24 mixed practice and mocks.",
  },
  "16-week": {
    title: "16-week standard",
    weeks: 16,
    blurb: "Week 1 diagnosis and bridge; weeks 2–4 Unit 8; 5–6 Unit 9; 7 Unit 10; 8–10 Unit 11; 11–12 Unit 12; 13–14 Unit 13; 15–16 mixed practice and remaining mocks.",
    template: "FRQs and retrieval start in week 1. Full mocks begin once all units have been introduced.",
  },
  "8-week": {
    title: "8-week revision",
    weeks: 8,
    blurb: "Assumes prior exposure to the syllabus. Prioritises weak objectives, retrieval, and timed sections.",
    template: "Week 1 diagnostic and triage; weeks 2–6 unit repair by evidence; weeks 7–8 mocks and error clinic.",
  },
};

const UNIT_ORDER: Array<8 | 9 | 10 | 11 | 12 | 13> = [8, 9, 10, 11, 12, 13];

export function recommendedTask(
  profile: StudentProfile | null,
  events: EvidenceEvent[],
  completedLessons: string[],
  mistakes: { repaired: boolean; retrievalDueAt: number; retrievalItemId: string; objectiveId: string }[],
): NextTask {
  if (!profile?.onboardingComplete) {
    return {
      kind: "diagnostic",
      id: "onboarding",
      title: "Complete onboarding",
      why: "The plan needs your exam year, time, and accessibility settings before it can sequence work.",
      minutes: [8, 12],
      href: "/onboarding",
    };
  }
  if (!profile.diagnosticComplete) {
    return {
      kind: "diagnostic",
      id: "diagnostic",
      title: "Sit the baseline diagnostic",
      why: "Anannt diagnostics are not miniature official scores. They route you into bridge repair and an honest starting map.",
      minutes: [30, 40],
      href: "/diagnostic",
    };
  }

  const overdue = mistakes.find((m) => !m.repaired && m.retrievalDueAt <= Date.now());
  if (overdue) {
    return {
      kind: "repair",
      id: overdue.retrievalItemId,
      title: "Repair a logged error",
      why: "A scored miss created a linked repair. Independence is not restored by replaying the explanation.",
      minutes: [8, 15],
      href: `/notebook`,
    };
  }

  const dueRetrieval = mistakes.find((m) => m.repaired && m.retrievalDueAt <= Date.now());
  if (dueRetrieval) {
    return {
      kind: "retrieval",
      id: dueRetrieval.retrievalItemId,
      title: "Delayed retrieval check",
      why: "Retained status needs an unseen check after 7–14 days, not another clone of the same item family.",
      minutes: [6, 12],
      href: `/practice/${dueRetrieval.retrievalItemId}`,
    };
  }

  const weakCalc = events.some(
    (e) =>
      e.objectiveId?.startsWith("B.") &&
      e.type === "independent_response_submitted" &&
      e.correct === false,
  );
  if (weakCalc) {
    const bridge = LESSONS.find((l) => l.unit === "bridge" && !completedLessons.includes(l.id));
    if (bridge) {
      return {
        kind: "bridge",
        id: bridge.id,
        title: bridge.title,
        why: "A weak calculus or vector result opens targeted bridge lessons alongside accessible physics — it does not lock the syllabus.",
        minutes: bridge.minutes,
        href: `/learn/${bridge.slug}`,
      };
    }
  }

  for (const unit of UNIT_ORDER) {
    const lessons = LESSONS.filter((l) => l.unit === unit);
    const next = lessons.find((l) => !completedLessons.includes(l.id));
    if (next) {
      const prereqGap = next.prereqs.find((p) => {
        const lesson = lessonById(p);
        return lesson && !completedLessons.includes(lesson.id);
      });
      if (prereqGap) {
        const pre = lessonById(prereqGap)!;
        return {
          kind: "lesson",
          id: pre.id,
          title: pre.title,
          why: `Recommended because it is a prerequisite of “${next.title}”, not because the rest of the syllabus is locked.`,
          minutes: pre.minutes,
          href: `/learn/${pre.slug}`,
        };
      }
      return {
        kind: "lesson",
        id: next.id,
        title: next.title,
        why: `Next unpublished-to-you lesson in ${TOPICS.find((t) => t.id === next.topics[0])?.title ?? `Unit ${unit}`}, weighted ${unit === 8 || unit === 11 ? "heavily" : "moderately"} on the MCQ paper.`,
        minutes: next.minutes,
        href: `/learn/${next.slug}`,
      };
    }
  }

  const inv = INVESTIGATIONS.find((i) => {
    const m = masteryForObjective(events, LESSONS.find((l) => l.investigationId === i.id)?.objectives[0] ?? "");
    return m.state === "learning" || m.state === "needs_review" || m.state === "provisional";
  });
  if (inv) {
    return {
      kind: "investigation",
      id: inv.id,
      title: inv.title,
      why: "A prediction–observe–explain cycle on a tool tied to a still-open objective.",
      minutes: [15, 25],
      href: `/investigations/${inv.id}`,
    };
  }

  const frq = PRACTICE_FRQS[0];
  if (frq) {
    return {
      kind: "frq",
      id: frq.id,
      title: "Written FRQ practice",
      why: "Timed execution and argumentation need handwritten (or typed) work, not only MCQ accuracy.",
      minutes: [frq.expectedMinutes, frq.expectedMinutes + 10],
      href: `/practice/frq/${frq.id}`,
    };
  }

  return {
    kind: "mock",
    id: "mock-2027-1",
    title: "May 2027 Mock A",
    why: "All units have been introduced. Full mocks begin now, with time reserved to review each one.",
    minutes: [85 + 95, 85 + 95 + 20],
    href: "/mocks/mock-2027-1",
  };
}

export function weeklyLoadHours(weeklyHours: number) {
  const low = Math.max(2, Math.round(weeklyHours * 0.8));
  const high = Math.round(weeklyHours * 1.2);
  return [low, high] as [number, number];
}

export function shortfall(profile: StudentProfile, remainingMinutes: number) {
  const weeks = PATHWAYS[profile.pathway].weeks;
  const available = profile.weeklyHours * 60 * weeks;
  const gap = remainingMinutes - available;
  return { available, remainingMinutes, gap, weeks };
}
