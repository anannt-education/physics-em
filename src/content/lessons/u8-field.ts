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

export const U8_FIELD: Lesson = {
    id: "u8-field-model",
    slug: "electric-field-as-a-model",
    title: "The electric field as a local vector model",
    unit: 8,
    topics: ["8.3"],
    objectives: ["8.3.A"],
    capability:
      "Define $\\vec{E}$ from $\\vec{F}=q\\vec{E}$, use a test charge of either sign, and sketch field lines with density and direction rules.",
    prereqs: ["u8-coulomb-vectors"],
    minutes: [22, 32],
    ...review,
    prediction: {
      prompt:
        "At a point where $\\vec{E}$ points right with magnitude $200\\,\\mathrm{N/C}$, a charge $q=-2.0\\,\\mathrm{nC}$ experiences",
      choices: [
        { id: "A", text: "a force of $4.0\\times 10^{-7}\\,\\mathrm{N}$ to the right." },
        { id: "B", text: "a force of $4.0\\times 10^{-7}\\,\\mathrm{N}$ to the left.", correct: true },
        { id: "C", text: "zero force, because field lines are a fiction." },
        { id: "D", text: "a force of $200\\,\\mathrm{N}$ to the left." },
      ],
      explanation:
        "$\\vec{F}=q\\vec{E}$. Negative $q$ reverses direction. Magnitude $|q|E = (2.0\\times 10^{-9})(200)=4.0\\times 10^{-7}\\,\\mathrm{N}$.",
    },
    explanation: {
      model:
        "The field is a vector assigned to each point in space by the source charges, independent of the test charge you later place there (provided the test charge does not disturb the sources). Operationally $\\vec{E}=\\vec{F}/q_{\\mathrm{test}}$ in the small-$q$ limit.",
      represent:
        "Field lines leave positive charge and enter negative charge. Line density suggests magnitude. Lines do not cross. A line is tangent to $\\vec{E}$, not a trajectory unless $\\vec{v}$ happens to start along it and speed is constrained in a special way.",
      derive:
        "For a point source $\\vec{E} = kq\\,\\hat{r}/r^2$ with $\\hat{r}$ from the source to the field point. The force on $q_0$ is then $q_0\\vec{E}$.",
      check:
        "N/C or V/m. Reversing the test-charge sign reverses $\\vec{F}$ but not $\\vec{E}$.",
      explain:
        "Field lines are a drawing convention, but $\\vec{E}$ is as real a model as $\\vec{g}$. Trajectories of charges are not field lines: a charge with sideways velocity curves according to Newton’s law, not by “following a line.”",
    },
    workedExample: {
      title: "Test charge versus source",
      situation:
        "A source $Q=+8.0\\,\\mathrm{nC}$ sits at the origin. Find $\\vec{E}$ at $(0.30,0)\\,\\mathrm{m}$, then $\\vec{F}$ on $q_0=-1.0\\,\\mathrm{nC}$ placed there.",
      assumptions: ["Vacuum; point charges; the source is fixed."],
      derivation:
        "$E = k(8.0\\times 10^{-9})/(0.30)^2 = 799\\,\\mathrm{N/C}$ in the $+x$ direction. $\\vec{F}=q_0\\vec{E}$ has magnitude $8.0\\times 10^{-7}\\,\\mathrm{N}$ in the $-x$ direction.",
      units: "N/C then N.",
      interpretation:
        "The field exists as a property of the source configuration. The negative test charge is pulled toward the source.",
      whyAlternativesFail:
        "Computing $F=kQq/r$ without squaring, or reporting $\\vec{E}$ in the direction of $\\vec{F}$ on a negative charge.",
    },
    fadedExample: {
      situation: "Field lines around an isolated negative point charge.",
      steps: [
        {
          prompt: "Which way do the lines go?",
          hint: "Convention: away from + , toward −.",
          expected: "Inward, toward the charge.",
        },
        {
          prompt: "A proton released from rest nearby moves which way?",
          hint: "$\\vec{F}=q\\vec{E}$ with $q>0$.",
          expected: "Along the local $\\vec{E}$, i.e. toward the negative source.",
        },
      ],
    },
    independentItemIds: ["u8-field-1"],
    investigationId: "charge-field",
    retrievalItemId: "u8-field-r",
    videoAlt:
      "A positive source radiates field arrows. A negative test charge is placed; its force arrow points opposite the field arrow. Magnitudes are computed from F = qE.",
  }
