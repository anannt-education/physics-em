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

export const U8_XFER: Lesson = {
    id: "u8-charge-transfer",
    slug: "charge-conservation-and-transfer",
    title: "Charge accounting during transfer",
    unit: 8,
    topics: ["8.2"],
    objectives: ["8.2.A"],
    capability:
      "Conserve charge when two conductors share charge or when charge is transferred by contact.",
    prereqs: ["u8-neutral-vs-uncharged"],
    minutes: [20, 28],
    ...review,
    prediction: {
      prompt:
        "Identical isolated conducting spheres carry $+6.0\\,\\mu\\mathrm{C}$ and $-2.0\\,\\mu\\mathrm{C}$. They touch and separate. Each then carries",
      choices: [
        { id: "A", text: "$+6.0$ and $-2.0\\,\\mu\\mathrm{C}$ still, because charge is conserved on each sphere." },
        { id: "B", text: "$+2.0\\,\\mu\\mathrm{C}$ each.", correct: true },
        { id: "C", text: "$+4.0\\,\\mu\\mathrm{C}$ each." },
        { id: "D", text: "$0$ and $+4.0\\,\\mu\\mathrm{C}$, the negative sphere being “neutralised first.”" },
      ],
      explanation:
        "Total $Q=+4.0\\,\\mu\\mathrm{C}$ is conserved. Identical isolated conductors share equally, so $+2.0\\,\\mu\\mathrm{C}$ each. Charge is not conserved on each sphere separately during contact.",
    },
    explanation: {
      model:
        "Electric charge of an isolated system is conserved. Contact of conductors lets charge flow until their potentials are equal. For identical isolated spheres, that means equal charge.",
      represent:
        "Write $Q_1+Q_2=Q_{1f}+Q_{2f}$. For identical spheres $Q_{1f}=Q_{2f}$.",
      derive:
        "$Q_{f} = (Q_1+Q_2)/2$ each. If capacitances differ, they share so $V$ is common: $Q=CV$ with the same $V$.",
      check:
        "Sum after equals sum before. Signs can flip for one object if it started opposite and smaller.",
      explain:
        "“The negative charge cancels $+2\\,\\mu\\mathrm{C}$ and the leftover $+4$ stays on the first sphere” treats charge as a stain that cannot move onto the second sphere.",
    },
    workedExample: {
      title: "Unequal capacitors sharing charge",
      situation:
        "Capacitors $C$ and $2C$, isolated, carry $+6.0\\,\\mu\\mathrm{C}$ and $0$. They are connected in parallel (nothing else). Find final charges.",
      assumptions: ["No leakage; connecting wires ideal; isolated pair."],
      derivation:
        "Common $V$, $Q_C + Q_{2C} = 6.0\\,\\mu\\mathrm{C}$, $Q_C = CV$, $Q_{2C}=2CV$ so $Q_C=2.0\\,\\mu\\mathrm{C}$, $Q_{2C}=4.0\\,\\mu\\mathrm{C}$.",
      units: "Microcoulombs.",
      interpretation:
        "The larger capacitor takes more of the conserved charge. Equal-charge sharing would have been the identical-sphere mistake.",
      whyAlternativesFail:
        "Putting $3\\,\\mu\\mathrm{C}$ on each ignores capacitance. Dumping all charge onto the larger capacitor ignores equilibrium of potential.",
    },
    fadedExample: {
      situation: "A charged insulator is rubbed onto a conductor.",
      steps: [
        {
          prompt: "Is the combined system’s net charge conserved?",
          hint: "If isolated, yes.",
          expected: "Yes, if no path to Earth.",
        },
        {
          prompt: "Must each object keep its original charge?",
          hint: "Contact transfer.",
          expected: "No. Charge can move from one object to the other.",
        },
      ],
    },
    independentItemIds: ["u8-xfer-1"],
    retrievalItemId: "u8-xfer-r",
    videoAlt:
      "Two circles labelled +6 and −2 μC touch. Charge tallies merge to +4, then split +2 and +2. A second animation with C and 2C splits 2 and 4.",
  }
