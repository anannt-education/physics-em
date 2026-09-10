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

export const U8_MIS: Lesson = {
    id: "u8-flux-misconception",
    slug: "zero-flux-is-not-zero-field",
    title: "Zero net flux is not a zero field",
    unit: 8,
    topics: ["8.5"],
    objectives: ["8.5.B"],
    capability:
      "Reject the claim that $Q_{\\mathrm{enc}}=0$ implies $\\vec{E}=0$ on a surface, using uniform-field and external-charge examples.",
    prereqs: [],
    minutes: [25, 35],
    ...review,
    investigationId: "gauss",
    prediction: {
      prompt:
        "A spherical Gaussian surface encloses zero net charge. Which statement must be true?",
      choices: [
        { id: "A", text: "$\\vec{E}=0$ at every point on the surface." },
        { id: "B", text: "The net flux through the surface is zero.", correct: true },
        { id: "C", text: "There are no charges anywhere in the universe." },
        {
          id: "D",
          text: "The flux is zero only if the surface is centred on a charge distribution.",
          misconception: "flux-equals-local-field",
        },
      ],
      explanation:
        "Gauss’s law: $\\oint \\vec{E}\\cdot d\\vec{A} = Q_{\\mathrm{enc}}/\\varepsilon_0 = 0$. That is a statement about the integral, not about the integrand. External charges can produce field on the surface whose inward and outward contributions cancel.",
    },
    explanation: {
      model:
        "This lesson exists because a very common error treats a surface integral as if it were a local measurement. The integral $\\oint \\vec{E}\\cdot d\\vec{A}$ can vanish while $\\vec{E}$ is large. Think of a river: net flow out of a loop of boom can be zero while water rushes past.",
      represent:
        "Draw a cube in a uniform field. Draw a sphere with a point charge outside it. On both, sketch $\\vec{E}$ on the surface.",
      derive:
        "Uniform field, cube: $\\Phi_{\\mathrm{net}}=0$ while $|E|$ is the same on opposite faces. External point charge: field is stronger on the near side, but the near side is smaller in solid angle in such a way that net flux is still zero — equivalently, Gauss’s law with $Q_{\\mathrm{enc}}=0$.",
      check:
        "You may conclude $E=0$ on a Gaussian surface only with symmetry that makes $E$ constant in magnitude and perpendicular (or known) so it factors out of the integral, together with $Q_{\\mathrm{enc}}=0$. Spherical symmetry about the centre is the usual case. A charge off-centre inside a sphere does not give $E$ constant on the sphere.",
      explain:
        "If a student answers “the field is zero because the enclosed charge is zero,” tag the attempt as confusing a surface integral with local field strength. Do not mark the misconception resolved because they replayed this paragraph. They need a new geometry: external charges, or a uniform field, and then delayed retrieval.",
    },
    workedExample: {
      title: "Uniform field through a sphere",
      situation:
        "A sphere of radius $R$ is placed in uniform $\\vec{E}_0$. Find net flux and discuss $\\vec{E}$ on the surface.",
      assumptions: ["The uniform field is produced by distant sources; no charge inside the sphere."],
      derivation:
        "$Q_{\\mathrm{enc}}=0 \\Rightarrow \\Phi_{\\mathrm{net}}=0$. On the surface $\\vec{E}=\\vec{E}_0$ (in this empty-space idealisation), which is not zero and is not radial. You cannot pull $|E|$ out of the flux integral as a constant radial field.",
      units: "Flux is zero; $E_0$ in N/C.",
      interpretation:
        "Useful Gaussian surfaces require matching symmetry. This sphere is a legal surface for Gauss’s law, but it is not a useful one for finding $E_0$.",
      whyAlternativesFail:
        "Declaring $E=0$ on the sphere contradicts the given uniform field. Declaring Gauss’s law false because $E\\neq 0$ misunderstands the law.",
    },
    fadedExample: {
      situation:
        "Point charge $+Q$ outside a closed surface $S$ that does not enclose $Q$. A second charge $-Q$ is also outside.",
      steps: [
        {
          prompt: "Net flux through $S$?",
          hint: "$Q_{\\mathrm{enc}}$.",
          expected: "Zero.",
        },
        {
          prompt: "Is $E$ zero on $S$?",
          hint: "The charges are nearby.",
          expected: "Generally no. The two external charges produce field throughout space.",
        },
        {
          prompt: "What new question would show transfer?",
          hint: "Change the surface.",
          expected: "If $S$ is expanded to enclose $+Q$ but not $-Q$, flux becomes $Q/\\varepsilon_0$ even though $-Q$ still produces field on $S$.",
        },
      ],
    },
    independentItemIds: ["u8-mis-1", "u8-mis-2", "u8-mis-3"],
    representationTask: {
      kind: "explanation",
      prompt:
        "A classmate says: “My Gaussian sphere has no charge inside, so the electric field on it is zero, so nothing outside can affect points on the sphere.” Write a correction that uses a uniform-field cube and an external point charge.",
      expected:
        "Net flux is zero, not $E$. A uniform field has zero net flux through any closed surface and nonzero $E$. An external charge produces field on the surface; incoming and outgoing flux cancel.",
    },
    retrievalItemId: "u8-mis-r",
    videoAlt:
      "Side-by-side: a cube in a uniform field with flux in and out labelled, and a sphere with an external charge whose field lines enter and leave. A caution card reads: zero net flux ≠ zero field. A transfer prompt then shows a charge outside a Gaussian cylinder.",
  }
