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

export const U8_GCYL: Lesson = {
    id: "u8-gauss-cylinder-plane",
    slug: "gauss-law-cylinder-and-plane",
    title: "Gauss’s law for the line and the plane",
    unit: 8,
    topics: ["8.6"],
    objectives: ["8.6.B"],
    capability:
      "Select a cylinder or pillbox, identify $Q_{\\mathrm{enc}}$, and obtain $E$ for an infinite line and an infinite sheet.",
    prereqs: ["u8-gauss-sphere", "u8-continuous-line"],
    minutes: [25, 35],
    ...review,
    investigationId: "gauss",
    prediction: {
      prompt:
        "An infinite nonconducting sheet has uniform $\\sigma$. $E$ a distance $x$ from the sheet",
      choices: [
        { id: "A", text: "falls as $1/x^2$." },
        { id: "B", text: "falls as $1/x$." },
        { id: "C", text: "is $\\sigma/(2\\varepsilon_0)$, independent of $x$.", correct: true },
        { id: "D", text: "is $\\sigma/\\varepsilon_0$, the conducting-plane result." },
      ],
      explanation:
        "A Gaussian pillbox encloses $\\sigma A$. Two faces contribute if the sheet is nonconducting with field on both sides, giving $E=\\sigma/(2\\varepsilon_0)$. A conducting plane has $E=0$ on the interior face, so $E=\\sigma/\\varepsilon_0$ outside.",
    },
    explanation: {
      model:
        "Infinite line: cylindrical symmetry, $E$ radial, depends only on $r$. Infinite sheet: planar symmetry, $E$ perpendicular, depends only on which side (and is constant in the idealisation).",
      represent:
        "Line: coaxial cylinder, radius $r$, length $L$. Caps have $\\vec{E}\\perp d\\vec{A}$ so zero flux; wall has $E\\cdot 2\\pi r L$. Sheet: pillbox straddling the sheet.",
      derive:
        "Line: $E(2\\pi r L)= (\\lambda L)/\\varepsilon_0$, so $E=\\lambda/(2\\pi\\varepsilon_0 r)$. Sheet (nonconducting): $2EA = \\sigma A/\\varepsilon_0$, $E=\\sigma/(2\\varepsilon_0)$.",
      check:
        "The line result matches the integral of Lesson “field of a line charge” in the infinite limit. Finite sheets have fringing; $E$ is not perfectly constant.",
      explain:
        "Choosing a sphere around a line does not make $|E|$ constant on the sphere. The tool must match the symmetry you actually have.",
    },
    workedExample: {
      title: "Two parallel nonconducting sheets",
      situation:
        "Sheets with $\\sigma$ and $-\\sigma$, parallel. Find $E$ between and outside.",
      assumptions: ["Infinite sheets; vacuum; superposition."],
      derivation:
        "Each sheet contributes $\\sigma/(2\\varepsilon_0)$ away from a positive sheet. Between: the two fields add, $E=\\sigma/\\varepsilon_0$ from $+$ toward $-$. Outside: they cancel, $E=0$.",
      units: "N/C.",
      interpretation:
        "This is the infinite parallel-plate capacitor field (ideal). A conducting-plate capacitor also has $E=\\sigma/\\varepsilon_0$ between plates, with $\\sigma$ the surface charge density on the inner surfaces.",
      whyAlternativesFail:
        "Adding $2\\times\\sigma/\\varepsilon_0$ treats each sheet as a conductor. Leaving $E$ between as $\\sigma/(2\\varepsilon_0)$ forgets superposition of two sheets.",
    },
    fadedExample: {
      situation: "Infinite line $\\lambda$ along $z$, Gaussian cylinder.",
      steps: [
        {
          prompt: "Why is flux through the end caps zero?",
          hint: "$\\vec{E}$ is radial.",
          expected: "$\\vec{E}$ is perpendicular to the cylinder axis, parallel to the cap, so $\\vec{E}\\cdot d\\vec{A}=0$ on the caps.",
        },
        {
          prompt: "What would go wrong with a finite line?",
          hint: "Symmetry.",
          expected: "$E$ would have a $z$-component near the ends and would vary on a coaxial cylinder, so you could not factor $E$ out.",
        },
      ],
    },
    independentItemIds: ["u8-gcyl-1", "u8-gcyl-2"],
    retrievalItemId: "u8-gcyl-r",
    videoAlt:
      "A coaxial Gaussian cylinder is drawn around an infinite line; only the curved wall contributes flux. A pillbox is drawn through a sheet; one versus two faces is contrasted for conductor versus nonconductor.",
  }
