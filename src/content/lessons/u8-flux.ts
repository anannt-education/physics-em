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

export const U8_FLUX: Lesson = {
    id: "u8-flux-definition",
    slug: "electric-flux",
    title: "Electric flux as a surface integral",
    unit: 8,
    topics: ["8.5"],
    objectives: ["8.5.A"],
    capability:
      "Compute $\\Phi_E = \\int \\vec{E}\\cdot d\\vec{A}$ for uniform fields and simple surfaces, including sign from the normal.",
    prereqs: ["u8-field-model", "bridge-signs"],
    minutes: [22, 32],
    ...review,
    investigationId: "gauss",
    prediction: {
      prompt:
        "A cube sits in a uniform field $\\vec{E}=E\\hat{\\imath}$. The net flux through the closed cube is",
      choices: [
        { id: "A", text: "$6EA$, counting six faces." },
        { id: "B", text: "$EA$, the flux through the face that “sees” the field." },
        { id: "C", text: "zero.", correct: true },
        { id: "D", text: "$E$ times the cube’s volume." },
      ],
      explanation:
        "Flux in the left face is $-EA$ (inward relative to the outward normal). Flux out the right face is $+EA$. Other faces are perpendicular to $\\vec{E}$. Net zero — there is no enclosed charge needed to “explain” this; Gauss’s law agrees because $Q_{\\mathrm{enc}}=0$.",
    },
    explanation: {
      model:
        "Flux measures how much field pierces a chosen oriented surface. It is not the field, not the flow of a fluid, and not automatically $EA$ unless $\\vec{E}$ is uniform and perpendicular.",
      represent:
        "Choose $d\\vec{A}$ (outward for closed surfaces, by convention). Write $\\vec{E}\\cdot d\\vec{A} = E\\,dA\\cos\\theta$.",
      derive:
        "Uniform $E$, flat face: $\\Phi = EA\\cos\\theta$. Closed surface: sum of faces. In a uniform field the closed-surface flux is zero.",
      check:
        "SI unit $\\mathrm{N\\cdot m}^2/\\mathrm{C}$. Reversing the normal flips the sign of $\\Phi$.",
      explain:
        "A large flux can mean a large $E$, a large area, or a favourable alignment. You cannot infer a unique $E$ from flux alone.",
    },
    workedExample: {
      title: "Tilted rectangle",
      situation:
        "Uniform $E=400\\,\\mathrm{N/C}$ along $+z$. A $0.20\\times 0.10\\,\\mathrm{m}$ rectangle has its normal at $60^\\circ$ to $+z$. Find flux through the rectangle (open surface).",
      assumptions: ["Uniform field; flat surface; given normal."],
      derivation:
        "$\\Phi = EA\\cos 60^\\circ = (400)(0.020)(0.50) = 4.0\\,\\mathrm{N\\cdot m}^2/\\mathrm{C}$.",
      units: "N·m²/C.",
      interpretation:
        "If the normal had been $90^\\circ$, flux would vanish even though $E\\neq 0$ on the surface.",
      whyAlternativesFail:
        "Using $\\sin 60^\\circ$, or multiplying by six for “a box,” or omitting $\\cos\\theta$.",
    },
    fadedExample: {
      situation: "A closed cylinder in a uniform horizontal field.",
      steps: [
        {
          prompt: "Flux through the curved wall?",
          hint: "$\\vec{E}\\cdot\\hat{n}$ varies; integrate or argue in/out.",
          expected: "Net zero on the curved wall by pairing, or compute; the two caps: one $+EA$, one $-EA$ if the axis is along $E$.",
        },
        {
          prompt: "Net flux?",
          hint: "Closed surface, uniform $E$.",
          expected: "Zero.",
        },
      ],
    },
    independentItemIds: ["u8-flux-1", "u8-flux-2"],
    representationTask: {
      kind: "explanation",
      prompt:
        "In words and a sketch, explain how a surface can have $\\Phi=0$ while $|\\vec{E}|$ is large everywhere on it.",
      expected:
        "Example: closed cube in uniform $E$; or a surface parallel to $\\vec{E}$. Flux cancellation or $\\theta=90^\\circ$ does not require $E=0$.",
    },
    retrievalItemId: "u8-flux-r",
    videoAlt:
      "Field arrows of equal length pass through a cube. Incoming arrows on one face and outgoing on the opposite face are counted. The algebraic flux sums to zero. A separate open rectangle is tilted and Φ = EA cosθ is computed.",
  }
