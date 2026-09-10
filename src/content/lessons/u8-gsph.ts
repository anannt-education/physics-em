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

export const U8_GSPH: Lesson = {
    id: "u8-gauss-sphere",
    slug: "gauss-law-spherical-symmetry",
    title: "Gauss’s law with spherical symmetry",
    unit: 8,
    topics: ["8.6"],
    objectives: ["8.6.A"],
    capability:
      "Use a concentric sphere to find $E(r)$ for spherical charge distributions, stating when $|E|$ may leave the integral.",
    prereqs: ["u8-flux-misconception"],
    minutes: [28, 35],
    ...review,
    investigationId: "gauss",
    prediction: {
      prompt:
        "A uniformly charged insulating sphere, total $Q$, radius $R$. For $r\u003cR$, $E(r)$ is proportional to",
      choices: [
        { id: "A", text: "$1/r^2$, using the full $Q$." },
        { id: "B", text: "$r$.", correct: true },
        { id: "C", text: "zero, as if all charge were on the surface." },
        { id: "D", text: "$1/r$." },
      ],
      explanation:
        "$Q_{\\mathrm{enc}}=(r^3/R^3)Q$ for uniform volume density. $\\oint E\\,dA = 4\\pi r^2 E = Q_{\\mathrm{enc}}/\\varepsilon_0$, so $E\\propto r$ inside. Using the full $Q$ inside is the conductor-shell mistake.",
    },
    explanation: {
      model:
        "Gauss’s law is always true: $\\oint \\vec{E}\\cdot d\\vec{A} = Q_{\\mathrm{enc}}/\\varepsilon_0$. It becomes an algebra problem for $E$ when symmetry makes $E$ constant in magnitude on the surface and perpendicular (or zero on parts of it).",
      represent:
        "For spherical symmetry, a concentric sphere of radius $r$. $Q_{\\mathrm{enc}}$ is the charge inside that radius only.",
      derive:
        "Outside a ball (or any spherical shell), $E=kQ/r^2$. Inside a uniform ball, $E=kQr/R^3$. Inside an empty spherical shell (or conductor’s cavity with no charge in the cavity), $E=0$ from this symmetry.",
      check:
        "Continuity of $E$ at $r=R$ for the uniform insulator: both formulae give $kQ/R^2$. For a thin shell, $E$ jumps as you cross the surface charge.",
      explain:
        "A Gaussian surface is a calculating surface, not a physical object. Charge on the Gaussian surface itself is an ambiguous limiting case; put surface charge clearly inside or idealise as a thin layer.",
    },
    workedExample: {
      title: "Uniform ball, inside and out",
      situation:
        "$Q=3.0\\,\\mathrm{nC}$, $R=4.0\\,\\mathrm{cm}$. Find $E$ at $r=2.0\\,\\mathrm{cm}$ and $r=8.0\\,\\mathrm{cm}$.",
      assumptions: ["Uniform insulating sphere; vacuum outside; spherical symmetry."],
      derivation:
        "Inside: $E=kQr/R^3 = (8.99\\mathrm{e}9)(3.0\\mathrm{e}{-9})(0.020)/(0.040)^3 = 8.4\\times 10^3\\,\\mathrm{N/C}$. Outside: $E=kQ/r^2 = (8.99\\mathrm{e}9)(3.0\\mathrm{e}{-9})/(0.080)^2 = 4.2\\times 10^3\\,\\mathrm{N/C}$.",
      units: "N/C, radially out for $Q>0$.",
      interpretation:
        "Inside, only 1/8 of the charge is enclosed ($r^3/R^3=1/8$), but the surface area is also smaller. The $r$ law wins over the naive “closer is stronger” applied with full $Q$.",
      whyAlternativesFail:
        "Using $kQ/r^2$ inside overestimates. Using $E=0$ inside confuses this insulator with a conductor.",
    },
    fadedExample: {
      situation: "Thick spherical conducting shell, inner radius $a$, outer $b$, net charge $Q$, empty cavity.",
      steps: [
        {
          prompt: "Gaussian sphere of radius $r$ with $a\u003cr\u003cb$. What is $E$?",
          hint: "Conductor in equilibrium.",
          expected: "$E=0$, so $Q_{\\mathrm{enc}}=0$, so inner surface charge is 0 if the cavity is empty.",
        },
        {
          prompt: "Where is the net $Q$?",
          hint: "Inner surface already 0.",
          expected: "On the outer surface, $r=b$.",
        },
      ],
    },
    independentItemIds: ["u8-gsph-1", "u8-gsph-2"],
    retrievalItemId: "u8-gsph-r",
    videoAlt:
      "A cutaway insulating sphere with a concentric dashed Gaussian sphere inside. Enclosed charge is a smaller ball. E(r) is graphed: linear to R, then 1/r². A conductor cutaway is contrasted with E=0 in the metal.",
  }
