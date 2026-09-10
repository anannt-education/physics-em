import type { ExamProfile } from "@/lib/types";

/** Official May 2027 AP Physics C: E&M profile. Pinned; attempts store this id. */
export const EXAM_PROFILE_2027: ExamProfile = {
  id: "apc-em-2027-v1",
  year: 2027,
  label: "AP Physics C: Electricity and Magnetism — May 2027",
  sourceUrl:
    "https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism/exam",
  sourceReviewDate: "2026-09-10",
  approver: "Anannt academic lead (pending named appointment)",
  mcqCount: 42,
  mcqMinutes: 85,
  frqCount: 4,
  frqMinutes: 95,
  mcqWeight: 0.5,
  frqWeight: 0.5,
  calculator: "Permitted, subject to the current College Board calculator policy.",
  referenceInfo: true,
  delivery:
    "Hybrid digital: MCQs and FRQ prompts in Bluebook; FRQ answers written on paper. Anannt is an independent practice environment, not Bluebook.",
  frqCategories: [
    "mathematical_routines",
    "translation_between_representations",
    "experimental_design",
    "qualitative_quantitative_translation",
  ],
  notes: [
    "Fall 2026 clarifications replace the former 40-question / 80-minute MCQ section and 100-minute FRQ section.",
    "Older mocks must be labelled by examination version. This product ships only the 2027 profile.",
    "Anannt does not convert uncalibrated percentages into official 1–5 scores.",
    "Wednesday 5 May 2027 Session 2 clashes with Physics 1. Pick one sitting.",
  ],
};

export const EXAM_PROFILE_2026_LEGACY: ExamProfile = {
  id: "apc-em-2026-legacy",
  year: 2026,
  label: "AP Physics C: E&M — pre-2027 timing (do not use for May 2027 pacing)",
  sourceUrl:
    "https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-course-and-exam-description-clarifications.pdf",
  sourceReviewDate: "2026-09-10",
  approver: "Anannt academic lead (pending named appointment)",
  mcqCount: 40,
  mcqMinutes: 80,
  frqCount: 4,
  frqMinutes: 100,
  mcqWeight: 0.5,
  frqWeight: 0.5,
  calculator: "Permitted, subject to policy at the time.",
  referenceInfo: true,
  delivery: "Retained only to label older materials. Not used for new attempts.",
  frqCategories: [
    "mathematical_routines",
    "translation_between_representations",
    "experimental_design",
    "qualitative_quantitative_translation",
  ],
  notes: ["Superseded for May 2027. Shown so historical forms are never silently retimed."],
};

export const ACTIVE_EXAM_PROFILE = EXAM_PROFILE_2027;

export const MOCK_MCQ_ALLOCATION_2027 = {
  8: 9,
  9: 6,
  10: 5,
  11: 9,
  12: 7,
  13: 6,
} as const;

export const UNIT_MCQ_WEIGHTS: Record<number, string> = {
  8: "15–25%",
  9: "10–20%",
  10: "10–15%",
  11: "15–25%",
  12: "10–20%",
  13: "10–20%",
};
