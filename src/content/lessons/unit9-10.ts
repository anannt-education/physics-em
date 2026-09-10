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

export const UNIT9_LESSONS: Lesson[] = [
  {
    id: "u9-potential-energy",
    slug: "electric-potential-energy",
    title: "Electric potential energy of a charge system",
    unit: 9,
    topics: ["9.1"],
    objectives: ["9.1.A"],
    capability: "Write $U$ for point charges with a stated reference and apply energy conservation.",
    prereqs: ["bridge-energy", "u8-coulomb-vectors"],
    minutes: [22, 32],
    ...review,
    prediction: {
      prompt: "Two protons are released from rest a distance $r_0$ apart. As they separate, $U$ of the pair",
      choices: [
        { id: "A", text: "increases because kinetic energy appears." },
        { id: "B", text: "decreases, and $K$ of the two-proton system increases by the same amount.", correct: true },
        { id: "C", text: "is constant; electrostatic forces do no work." },
        { id: "D", text: "cannot be defined for two particles." },
      ],
      explanation: "Like charges have $U = k e^2/r$ (with $U(\\infty)=0$), which falls as $r$ grows. The lost $U$ becomes $K$. Electrostatic forces are conservative and do work.",
    },
    explanation: {
      model: "Potential energy belongs to a system. For two point charges $U = k q_1 q_2 / r$ with $U(\\infty)=0$. For more charges, sum every pair once.",
      represent: "State the reference. Draw initial and final configurations. Do not assign $U$ to \u201ca charge\u201d without a partner and a reference.",
      derive: "$\\Delta U = U_f - U_i$. If only electrostatic forces act, $\\Delta K + \\Delta U = 0$.",
      check: "Opposite charges have negative $U$ relative to infinity. That does not mean energy is \u201cless than nothing\u201d; it means you must do positive work to separate them to infinity.",
      explain: "Using $U = qEd$ without asking whether $E$ is uniform, or mixing $U$ with $V$, are the usual substitutions.",
    },
    workedExample: {
      title: "Three charges on a line",
      situation: "$+q$ at 0, $+q$ at $2a$, $-q$ at $a$. Find $U$ of the system relative to infinite separation.",
      assumptions: ["Point charges; $U(\\infty)=0$."],
      derivation: "Pairs: $(+q,+q)$ at $2a$ contributes $kq^2/(2a)$; two $(+q,-q)$ pairs at $a$ contribute $-kq^2/a$ each. $U = kq^2/(2a) - 2kq^2/a = -3kq^2/(2a)$.",
      units: "Joules.",
      interpretation: "The system is bound relative to infinity: you would have to add energy to move all three to infinite separation.",
      whyAlternativesFail: "Counting only nearest neighbours, or using $3$ pairs all as $kq^2/a$.",
    },
    fadedExample: {
      situation: "A charge $q_0$ is moved at constant speed in an electrostatic field.",
      steps: [
        { prompt: "Is $\\Delta K$ zero?", hint: "Constant speed.", expected: "Yes. An external agent cancelled the electrical force." },
        { prompt: "Who did work?", hint: "Both the field and the agent.", expected: "$W_{\\mathrm{field}} = -\\Delta U$. The agent does $+\\Delta U$ if speed is held constant." },
      ],
    },
    independentItemIds: ["u9-u-1"],
    retrievalItemId: "u9-u-r",
    videoAlt: "Two protons move apart. A bar chart shows U falling and K rising. A formula U = ke\u00b2/r is plotted.",
  },
];
