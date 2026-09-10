import type { Lesson } from "@/lib/types";

const review = {
  reviewDate: "2026-09-10",
  authors: [
    { name: "Anannt physics author", role: "author" as const },
    { name: "Independent physics reviewer", role: "reviewer" as const },
  ],
  version: "1.0",
  status: "published" as const,
};

export const U8_NEUTRAL: Lesson = {
    id: "u8-neutral-vs-uncharged",
    slug: "neutral-is-not-chargeless",
    title: "Neutral is not the same as chargeless",
    unit: 8,
    topics: ["8.1"],
    objectives: ["8.1.B"],
    capability:
      "Distinguish a net-neutral object from an object imagined to have no charged constituents, and predict polarisation and induction qualitatively.",
    prereqs: ["u8-coulomb-vectors"],
    minutes: [20, 30],
    ...review,
    prediction: {
      prompt:
        "A charged rod is brought near an ungrounded metal sphere without touching. The sphere is then",
      choices: [
        {
          id: "A",
          text: "still net neutral, with charge separated: near side opposite the rod, far side like the rod.",
          correct: true,
        },
        { id: "B", text: "given a net charge of the same sign as the rod by induction." },
        { id: "C", text: "unaffected, because metals have no “free” charge unless net charged." },
        {
          id: "D",
          text: "net charged opposite the rod even without a ground path.",
          misconception: "induction-always-charges",
        },
      ],
      explanation:
        "Induction without grounding rearranges charge but conserves net charge. Grounding would allow charge to flow to or from Earth and could leave a net charge after the rod is removed.",
    },
    explanation: {
      model:
        "Ordinary matter contains enormous equal amounts of positive and negative charge. Neutral means $Q_{\\mathrm{net}}\\approx 0$, not “no charges present.” In a conductor, some charge can move. In an insulator, charges shift slightly (polarisation).",
      represent:
        "Draw $+$ and $-$ on opposite sides of the sphere. Keep a count: number of $+$ equals number of $-$ if the object started and stayed isolated.",
      derive:
        "The rod’s field exerts opposite forces on $+$ and $-$, so they separate until the conductor’s own rearranged charge makes $\\vec{E}=0$ inside (electrostatic equilibrium).",
      check:
        "If the sphere is isolated, $Q_{\\mathrm{net}}$ cannot jump when the rod approaches. If you later ground it, that conservation statement changes because Earth is now part of the system.",
      explain:
        "Students sometimes say a neutral object “has no charge to make a field.” Polarisation still produces a dipole field. A charged rod can attract a neutral conductor or insulator; attraction of an uncharged bits of paper is not proof the paper was net charged.",
    },
    workedExample: {
      title: "Two-step induction",
      situation:
        "A negative rod is held near an isolated neutral conducting sphere. The far side is then briefly grounded. The ground is removed, then the rod is removed. What is the sphere’s final net charge?",
      assumptions: ["Conductor; electrostatics after each step; Earth is a charge reservoir."],
      derivation:
        "Step 1: electrons on the sphere are repelled to the far side (or equivalently, the near side is positive). Step 2: grounding the far side lets negative charge flow to Earth. Step 3: isolating and then removing the rod leaves the sphere net positive.",
      units: "Charge is in coulombs; the sign is the result.",
      interpretation:
        "The rod never touched the sphere. Net charge arrived through the ground lead.",
      whyAlternativesFail:
        "Concluding the sphere is negative because “the rod is negative” confuses the rod’s sign with the charge that left to Earth. Skipping the grounding step would leave the sphere neutral.",
    },
    fadedExample: {
      situation: "A charged comb attracts a stream of water.",
      steps: [
        {
          prompt: "Is the water necessarily net charged?",
          hint: "Polar molecules.",
          expected: "No. Polarisation of water molecules produces a net attraction in a nonuniform field.",
        },
        {
          prompt: "Would a uniform field pull a neutral polar molecule?",
          hint: "Equal and opposite forces on $\\pm$ in a uniform $E$.",
          expected: "Net force on a pure dipole in a uniform field is zero; torque may remain. Attraction of a stream requires nonuniformity or induced dipole in a gradient.",
        },
      ],
    },
    independentItemIds: ["u8-neut-1", "u8-neut-2"],
    retrievalItemId: "u8-neut-r",
    videoAlt:
      "A metal sphere is drawn with equal plus and minus. A negative rod approaches; minuses shift away. A ground wire briefly connects; some minuses leave. The rod leaves; leftover pluses remain.",
  }
