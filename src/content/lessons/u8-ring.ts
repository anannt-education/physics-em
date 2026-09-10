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

export const U8_RING: Lesson = {
    id: "u8-ring-and-disk",
    slug: "ring-and-disk-fields",
    title: "Ring and disk: building from $dq$",
    unit: 8,
    topics: ["8.4"],
    objectives: ["8.4.A"],
    capability:
      "Obtain the on-axis field of a ring and of a uniformly charged disk, and recover point-charge and infinite-sheet limits.",
    prereqs: ["u8-continuous-line"],
    minutes: [25, 35],
    ...review,
    prediction: {
      prompt: "On the axis of a uniformly charged ring, $E$ at the centre is",
      choices: [
        { id: "A", text: "maximum, because you are nearest the charge." },
        { id: "B", text: "zero by cancellation, even though $Q\\neq 0$.", correct: true },
        { id: "C", text: "equal to $kQ/R^2$ toward the ring." },
        { id: "D", text: "infinite, because every $dq$ is at finite distance." },
      ],
      explanation:
        "Every $d\\vec{E}$ has a partner opposite. The centre is a null point of $\\vec{E}$ with nonzero $Q$ and typically nonzero $V$.",
    },
    explanation: {
      model:
        "A ring is a circle of charge; a disk is concentric rings. Uniform $\\sigma$ is an idealisation of a thin layer.",
      represent:
        "Axis $z$. For a ring, $\\cos\\theta = z/\\sqrt{R^2+z^2}$. For a disk, integrate $R$ or equivalently radius $u$ from 0 to $a$.",
      derive:
        "Ring: $E_z = k Q z / (R^2+z^2)^{3/2}$. Disk: $E_z = \\frac{\\sigma}{2\\varepsilon_0}\\left(1 - \\frac{z}{\\sqrt{z^2+a^2}}\\right)$ (for $z>0$). As $a\\to\\infty$, $E\\to\\sigma/(2\\varepsilon_0)$. As $z\\to\\infty$, $E\\to kQ/z^2$.",
      check:
        "Odd in $z$ for a single ring (direction follows the sign of $z$ for $Q>0$). Disk formula above is for one side with a sign convention.",
      explain:
        "Maximum $|E|$ on a ring’s axis is not at the centre. Setting $dE/dz=0$ gives $|z|=R/\\sqrt{2}$.",
    },
    workedExample: {
      title: "Ring field at $z=R$",
      situation: "$Q=20\\,\\mathrm{nC}$, $R=8.0\\,\\mathrm{cm}$. Find $E$ at $z=R$ on axis.",
      assumptions: ["Uniform ring; vacuum; point on axis."],
      derivation:
        "$E = k Q R / (R^2+R^2)^{3/2} = kQ /(R^2 2^{3/2}) = (8.99\\mathrm{e}9)(2.0\\mathrm{e}{-8}) / ((0.080)^2 \\cdot 2.828) = 9.9\\times 10^3\\,\\mathrm{N/C}$.",
      units: "N/C along $+z$ if $Q>0$ and $z>0$.",
      interpretation: "About $kQ/R^2 = 2.8\\times 10^4\\,\\mathrm{N/C}$ would be the naive point-at-centre estimate; the actual is smaller.",
      whyAlternativesFail: "Using $kQ/z^2$ at $z=R$ ignores that charge is at distance $\\sqrt{2}R$, not $R$.",
    },
    fadedExample: {
      situation: "Disk of radius $a$, uniform $\\sigma>0$, point on axis $z=a$.",
      steps: [
        {
          prompt: "Write $E$ from the disk formula.",
          hint: "$z/\\sqrt{z^2+a^2} = 1/\\sqrt{2}$.",
          expected: "$E = \\frac{\\sigma}{2\\varepsilon_0}(1-1/\\sqrt{2}) \\approx 0.293\\,\\sigma/\\varepsilon_0$.",
        },
        {
          prompt: "Compare with infinite sheet.",
          hint: "Infinite sheet is $\\sigma/(2\\varepsilon_0)$.",
          expected: "Smaller than the infinite sheet, as expected: missing charge at large radius.",
        },
      ],
    },
    independentItemIds: ["u8-ring-1"],
    retrievalItemId: "u8-ring-r",
    videoAlt:
      "A ring’s dq elements are paired across a diameter. At the centre arrows cancel. On the axis, components along z add. A plot of E(z) is zero at 0, peaks, then falls as 1/z².",
  }
