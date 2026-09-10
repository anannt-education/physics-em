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

export const U8_SUPER: Lesson = {
    id: "u8-superposition",
    slug: "superposition-of-fields",
    title: "Superposition of electric fields",
    unit: 8,
    topics: ["8.3"],
    objectives: ["8.3.B"],
    capability:
      "Add electric field vectors from discrete sources, including cases of cancellation of one component.",
    prereqs: ["u8-field-model"],
    minutes: [22, 32],
    ...review,
    investigationId: "charge-field",
    prediction: {
      prompt:
        "Equal charges $+q$ sit at $x=\\pm a$. At the origin, $\\vec{E}$ is",
      choices: [
        { id: "A", text: "zero.", correct: true },
        { id: "B", text: "to the right, twice the field of one charge." },
        { id: "C", text: "undefined, because two fields cannot occupy a point." },
        { id: "D", text: "toward either charge, depending on which you “consider first.”" },
      ],
      explanation:
        "Each field at the origin points away from its source: one left, one right, equal magnitude. Vector sum is zero. Superposition does not depend on order.",
    },
    explanation: {
      model:
        "The net field is the vector sum of fields computed as if each source were alone. This is linear electrostatics in vacuum (or linear media).",
      represent:
        "Draw each $\\vec{E}_i$ at the field point, not at the source. Resolve into components before adding.",
      derive:
        "$\\vec{E}_{\\mathrm{net}} = \\sum_i kq_i \\hat{r}_i / r_i^2$.",
      check:
        "A point of zero field is not necessarily a point of zero potential. Cancellation of $\\vec{E}$ requires opposing vectors, not opposing charges automatically.",
      explain:
        "Adding magnitudes $E_1+E_2$ is correct only when the vectors are parallel. For perpendicular contributions use Pythagoras on the components.",
    },
    workedExample: {
      title: "Equilateral triangle of charges",
      situation:
        "Charges $+q$, $+q$, $-q$ at the vertices of an equilateral triangle of side $a$. Find the direction of $\\vec{E}$ at the centroid qualitatively.",
      assumptions: ["Point charges; plane of the triangle."],
      derivation:
        "The two $+q$ fields at the centroid are equal in magnitude. Their resultant points away from the $+$ side, along the altitude. The $-q$ field at the centroid points toward $-q$, which is the same altitude direction. All three contributions have a component toward $-q$.",
      units: "Direction only in this qualitative item.",
      interpretation:
        "The centroid is not a null point. Replacing $-q$ by $+q$ would make $\\vec{E}=0$ at the centre by symmetry.",
      whyAlternativesFail:
        "Claiming $\\vec{E}=0$ because “the triangle is symmetric” ignores that the charges are not all equal.",
    },
    fadedExample: {
      situation: "Charges $+2q$ at $(-d,0)$ and $-q$ at $(+d,0)$. Where on the x-axis (not on a charge) could $E=0$?",
      steps: [
        {
          prompt: "Can it be between them?",
          hint: "Directions of $E$ from each.",
          expected: "No. Between them both fields point left (from +2q to the right, toward −q from the left? Wait: +2q at left: field to the right of it points right. −q at right: field to its left (between) points toward −q, i.e. right. Both right. No cancellation between.",
        },
        {
          prompt: "Left of both or right of both?",
          hint: "The larger |q| wins at equal distance; you need to be closer to the smaller charge.",
          expected: "Right of −q (the smaller magnitude), so you are nearer −q and the two fields can oppose.",
        },
      ],
    },
    independentItemIds: ["u8-sup-1", "u8-sup-2"],
    representationTask: {
      kind: "diagram",
      prompt:
        "At a point P above the midpoint of a dipole $\\pm q$ along x, sketch $\\vec{E}_+$ and $\\vec{E}_-$ and their sum.",
      expected:
        "The two fields have equal magnitude. Their x-components cancel; y-components add, pointing from the positive toward the negative side’s “above,” actually antiparallel to the dipole moment for a point on the perpendicular bisector.",
    },
    retrievalItemId: "u8-sup-r",
    videoAlt:
      "Two field arrows at a point are drawn from two sources, then translated to a common origin and added with the parallelogram rule. A zero-field location is marked only where the arrows truly cancel.",
  }
