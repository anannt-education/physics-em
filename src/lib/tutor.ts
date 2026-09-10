import { LESSONS, lessonById } from "@/content/lessons";
import type { Lesson, StudentState } from "@/lib/types";

export const HINT_LADDER = [
  {
    id: "situation",
    title: "Clarify the physical situation",
    prompt:
      "Name the objects, what is given, what is asked, and which idealisations you are allowed to use (point charge, infinite line, steady current, quasistatic flux change).",
  },
  {
    id: "representation",
    title: "Identify a representation",
    prompt:
      "Sketch sources and the field point, choose coordinates and a sign convention, or draw the circuit with the switch state labelled. Do not solve yet.",
  },
  {
    id: "principle",
    title: "Identify a principle",
    prompt:
      "Name the principle that actually applies: Coulomb/superposition, Gauss (with symmetry), energy/$V$, Kirchhoff, Lorentz, Faraday/Lenz, or a transient DE. Say why a neighbouring principle is the wrong tool.",
  },
  {
    id: "next-step",
    title: "Suggest the next mathematical step",
    prompt:
      "Write the next line only: a source element, a Gaussian surface, a loop equation, or $d\\Phi_B/dt$. Do not jump to the boxed answer.",
  },
  {
    id: "worked",
    title: "Worked explanation (learning mode only)",
    prompt:
      "A complete Model → Represent → Derive → Check → Explain walkthrough from an approved lesson, with assumptions and why tempting alternatives fail.",
  },
] as const;

export const EVALUATION_SET = [
  {
    id: "eval-sign",
    topic: "signs",
    prompt: "Is $E_x = -dV/dx$ or $+dV/dx$?",
    mustInclude: ["minus", "decrease"],
    forbidden: ["always positive"],
  },
  {
    id: "eval-dim",
    topic: "dimensions",
    prompt: "Can flux equal the local field?",
    mustInclude: ["N m^2/C", "N/C"],
    forbidden: ["same units"],
  },
  {
    id: "eval-V-E",
    topic: "field versus potential",
    prompt: "Can $V=0$ with $E\\ne 0$?",
    mustInclude: ["reference", "dipole"],
    forbidden: ["never"],
  },
  {
    id: "eval-conductor",
    topic: "conductor equilibrium",
    prompt: "Do connected conductors share charge equally?",
    mustInclude: ["equipotential", "not equal charge"],
    forbidden: ["always equal charge"],
  },
  {
    id: "eval-switch",
    topic: "circuit switching",
    prompt: "What is $I$ through an inductor the instant after a switch closes onto an unenergised $L$?",
    mustInclude: ["zero", "continuous"],
    forbidden: ["ε/R immediately"],
  },
  {
    id: "eval-negative",
    topic: "negative charges",
    prompt: "Lorentz force on an electron with $\\vec{v}$ to $+x$ and $\\vec{B}$ to $+z$?",
    mustInclude: ["negative", "opposite"],
    forbidden: ["same as proton"],
  },
  {
    id: "eval-flux-change",
    topic: "flux changes",
    prompt: "Can a large flux produce zero emf?",
    mustInclude: ["rate", "constant"],
    forbidden: ["flux is emf"],
  },
  {
    id: "eval-alt",
    topic: "alternative solutions",
    prompt: "Is energy conservation an acceptable alternate to $E=-dV/dr$ for a radial field?",
    mustInclude: ["yes", "assumption"],
    forbidden: ["only Gauss"],
  },
] as const;

const KEYWORDS: Array<{ re: RegExp; lessonId: string }> = [
  { re: /flux|gauss|gaussian|enclosed/i, lessonId: "u8-flux-misconception" },
  { re: /coulomb|point charge|superposition/i, lessonId: "u8-coulomb-vectors" },
  { re: /field model|test charge|source/i, lessonId: "u8-field-model" },
  { re: /potential|equipotential|reference|dV/i, lessonId: "u9-zero-v-vs-zero-e" },
  { re: /capacitor|dielectric|stored energy/i, lessonId: "u10-dielectrics" },
  { re: /conductor|electrostatic equilibrium/i, lessonId: "u10-conductor-equilibrium" },
  { re: /kirchhoff|loop|junction|network/i, lessonId: "u11-networks" },
  { re: /\bRC\b|transient|time constant|charging/i, lessonId: "u11-rc-transients" },
  { re: /lorentz|right.?hand|negative charge|electron/i, lessonId: "u12-force-on-charges" },
  { re: /biot|amp[eè]re|wire field/i, lessonId: "u12-biot-savart" },
  { re: /faraday|lenz|induced|flux change/i, lessonId: "u13-faraday" },
  { re: /\bRL\b|inductor|inductance/i, lessonId: "u13-rl" },
  { re: /\bLC\b|oscillat/i, lessonId: "u13-lc" },
  { re: /integral|antiderivative|bound/i, lessonId: "bridge-integrals" },
  { re: /derivative|slope|exponential/i, lessonId: "bridge-derivatives" },
  { re: /vector|component|coordinate/i, lessonId: "bridge-vectors" },
];

export function groundedLesson(query: string, preferredLessonId?: string): Lesson | undefined {
  if (preferredLessonId) {
    const preferred = lessonById(preferredLessonId);
    if (preferred) return preferred;
  }
  const hit = KEYWORDS.find((k) => k.re.test(query));
  if (hit) return lessonById(hit.lessonId);
  return LESSONS.find((l) => l.slug === "zero-flux-is-not-zero-field");
}

export function assessmentLock(state: StudentState) {
  const live = state.mockAttempts.find((a) => !a.submittedAt && a.section !== "done");
  return Boolean(live);
}

export interface TutorTurn {
  role: "assistant";
  ladderStep: number;
  title: string;
  body: string;
  source: { title: string; href: string; reviewDate: string } | null;
  blocked: boolean;
  escalate: boolean;
}

export function tutorReply(opts: {
  query: string;
  ladderStep: number;
  state: StudentState;
  lessonId?: string;
}): TutorTurn {
  if (assessmentLock(opts.state)) {
    return {
      role: "assistant",
      ladderStep: opts.ladderStep,
      title: "Protected assessment",
      body: "Ask Anannt has no access to unreleased mock keys during a live timed sitting — not through this page, retrieval, or tools. Finish or abandon the attempt, then return. Official Bluebook familiarisation is a separate College Board environment.",
      source: null,
      blocked: true,
      escalate: false,
    };
  }

  const lesson = groundedLesson(opts.query, opts.lessonId);
  if (!lesson) {
    return {
      role: "assistant",
      ladderStep: opts.ladderStep,
      title: "Limitation",
      body: "I could not retrieve an approved lesson for that question. I will not invent physics. Submit an expert ticket with the item id and your last step.",
      source: null,
      blocked: false,
      escalate: true,
    };
  }

  const source = {
    title: lesson.title,
    href: `/learn/${lesson.slug}`,
    reviewDate: lesson.reviewDate,
  };

  const step = Math.min(Math.max(opts.ladderStep, 0), HINT_LADDER.length - 1);
  const rung = HINT_LADDER[step];

  if (step === 0) {
    return {
      role: "assistant",
      ladderStep: step,
      title: rung.title,
      body: `${rung.prompt}\n\nApproved context from “${lesson.title}”: ${lesson.explanation.model}`,
      source,
      blocked: false,
      escalate: false,
    };
  }
  if (step === 1) {
    return {
      role: "assistant",
      ladderStep: step,
      title: rung.title,
      body: `${rung.prompt}\n\nFrom the approved lesson: ${lesson.explanation.represent}`,
      source,
      blocked: false,
      escalate: false,
    };
  }
  if (step === 2) {
    return {
      role: "assistant",
      ladderStep: step,
      title: rung.title,
      body: `${rung.prompt}\n\nThe lesson’s selected principle: ${lesson.explanation.derive.slice(0, 420)}`,
      source,
      blocked: false,
      escalate: false,
    };
  }
  if (step === 3) {
    return {
      role: "assistant",
      ladderStep: step,
      title: rung.title,
      body: `${rung.prompt}\n\nCheck against the faded example’s first move: ${lesson.fadedExample.steps[0]?.hint ?? lesson.explanation.check}`,
      source,
      blocked: false,
      escalate: false,
    };
  }

  return {
    role: "assistant",
    ladderStep: step,
    title: rung.title,
    body: `Learning-mode walkthrough (not an independent attempt):\n\nModel. ${lesson.explanation.model}\n\nDerive. ${lesson.explanation.derive}\n\nCheck. ${lesson.explanation.check}\n\nWhy alternatives fail. ${lesson.workedExample.whyAlternativesFail}\n\nOpening the full explanation keeps later scoring as learning evidence, not independence.`,
    source,
    blocked: false,
    escalate: false,
  };
}
