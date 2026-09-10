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

export const U8_LINE: Lesson = {
    id: "u8-continuous-line",
    slug: "field-of-a-line-charge",
    title: "Integrating the field of a line charge",
    unit: 8,
    topics: ["8.4"],
    objectives: ["8.4.A"],
    capability:
      "Write $dq=\\lambda dx$, resolve $d\\vec{E}$, and integrate a finite straight line; recover the infinite-line limit.",
    prereqs: [],
    minutes: [28, 35],
    ...review,
    investigationId: "charge-field",
    prediction: {
      prompt:
        "For an infinite uniform line $\\lambda$, $E$ a distance $r$ away",
      choices: [
        { id: "A", text: "falls as $1/r^2$, like a point." },
        { id: "B", text: "falls as $1/r$.", correct: true },
        { id: "C", text: "is independent of $r$, like an infinite sheet." },
        { id: "D", text: "cannot be found without a computer, because the line is infinite." },
      ],
      explanation:
        "Gauss’s law with a coaxial cylinder, or the $L\\to\\infty$ limit of the finite-line integral, gives $E=\\lambda/(2\\pi\\varepsilon_0 r)$. Not $1/r^2$, and not constant.",
    },
    explanation: {
      model:
        "A uniform line is an idealised cylinder of radius 0 with finite $\\lambda$. Real wires have radius; we stay many radii away. The infinite line ignores ends.",
      represent:
        "Place the line on $x$, field point on the perpendicular at distance $d$. Element $dx$ at position $x$, $r=\\sqrt{x^2+d^2}$, $\\cos\\theta = d/r$.",
      derive:
        "$dE_\\perp = (k\\lambda dx / r^2)\\cos\\theta$. Integrate $x$ from $-L$ to $L$ for a finite centred rod. $L\\to\\infty$ yields $2k\\lambda/d = \\lambda/(2\\pi\\varepsilon_0 d)$.",
      check:
        "The physics test suite in this product verifies $E\\propto 1/r$ and matches the analytic Gauss-law expression. $r=0$ is excluded.",
      explain:
        "Using $E=kQ/r^2$ with $Q=\\lambda L$ and $r$ the perpendicular distance treats the rod as a point, valid only far away compared with $L$.",
    },
    workedExample: {
      title: "Finite rod, perpendicular bisector",
      situation:
        "Rod length $2L=0.40\\,\\mathrm{m}$, $\\lambda=3.0\\,\\mu\\mathrm{C/m}$, point $P$ a distance $d=0.15\\,\\mathrm{m}$ from the centre on the bisector. Find $E$.",
      assumptions: ["Uniform $\\lambda$; vacuum; rod thickness neglected."],
      derivation:
        "$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\lambda (2L)}{d\\sqrt{d^2+L^2}} = k\\lambda (2L)/(d\\sqrt{d^2+L^2})$. Numerically $k=8.99\\mathrm{e}9$, $2L=0.40$, $\\sqrt{0.15^2+0.20^2}=0.250$, $E = (8.99\\mathrm{e}9)(3.0\\mathrm{e}{-6})(0.40)/(0.15\\times 0.250)=2.88\\times 10^5\\,\\mathrm{N/C}$, away from the rod if $\\lambda>0$.",
      units: "N/C.",
      interpretation:
        "Compare with a point charge $Q=\\lambda(2L)$ at the centre: $kQ/d^2=4.79\\times 10^5\\,\\mathrm{N/C}$, larger, as expected — the actual charge is spread farther away.",
      whyAlternativesFail:
        "Infinite-line formula $\\lambda/(2\\pi\\varepsilon_0 d)=3.6\\times 10^5\\,\\mathrm{N/C}$ is a different idealisation (no ends). Using it here is an approximation, not the finite-rod result.",
    },
    fadedExample: {
      situation: "Same rod, field point on the axis beyond one end.",
      steps: [
        {
          prompt: "Do perpendicular components cancel?",
          hint: "There is no left-right pairing about P.",
          expected: "On the axis of a straight rod, $\\vec{dE}$ is along the axis; there is no perpendicular component to cancel. You integrate a 1-D scalar.",
        },
        {
          prompt: "What is $E$ as $P$ approaches an end?",
          hint: "Finite $\\lambda$, vanishing distance.",
          expected: "The ideal zero-thickness model diverges. Exclude the material of the rod.",
        },
      ],
    },
    independentItemIds: ["u8-line-1", "u8-line-2"],
    retrievalItemId: "u8-line-r",
    videoAlt:
      "A rod is divided into dx. At P on the bisector, paired dE arrows show cancellation along the rod and addition along the bisector. The infinite-line 1/r result is compared with a graph of E(r).",
  }
