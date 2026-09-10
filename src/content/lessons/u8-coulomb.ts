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

export const U8_COULOMB: Lesson = {
    id: "u8-coulomb-vectors",
    slug: "coulomb-law-as-a-vector",
    title: "Coulomb’s law as a vector equation",
    unit: 8,
    topics: ["8.1"],
    objectives: ["8.1.A"],
    capability:
      "Compute the electric force on a point charge due to one or more others, including direction and a stated sign convention.",
    prereqs: ["bridge-vectors", "bridge-units"],
    minutes: [25, 35],
    ...review,
    prediction: {
      prompt:
        "Charges $q_1=+2.0\\,\\mu\\mathrm{C}$ at $x=0$ and $q_2=-2.0\\,\\mu\\mathrm{C}$ at $x=0.20\\,\\mathrm{m}$ act on $q_3=+1.0\\,\\mu\\mathrm{C}$ at $x=0.10\\,\\mathrm{m}$. The net force on $q_3$ is",
      choices: [
        { id: "A", text: "zero, because $q_1$ and $q_2$ are equal in magnitude." },
        { id: "B", text: "to the right (toward $q_2$).", correct: true },
        { id: "C", text: "to the left (toward $q_1$)." },
        { id: "D", text: "undefined; three charges cannot be collinear in Coulomb’s law." },
      ],
      explanation:
        "$q_1$ repels $q_3$ to the right; $q_2$ attracts $q_3$ to the right. Equal distances and equal $|q|$ make the two forces equal in magnitude and the same direction. They add, they do not cancel.",
    },
    explanation: {
      model:
        "Point charges in vacuum interact along the line joining them. Like charges repel; unlike attract. The magnitude is $F = k |q_1 q_2|/r^2$ with $k=8.99\\times 10^9\\,\\mathrm{N\\cdot m}^2/\\mathrm{C}^2$. The model excludes the point $r=0$ and ignores finite size, polarisation of nearby matter, and magnetic forces from motion.",
      represent:
        "Place charges on a line or plane. Draw $\\vec{F}_{\\mathrm{on\\,3\\,by\\,1}}$ in the direction required by the signs, not automatically from 1 toward 3. Write $\\vec{F}_{\\mathrm{net}} = \\sum \\vec{F}_i$.",
      derive:
        "For each pair, compute the magnitude, assign the unit vector from the source to the sufferer or against it according to the product of signs, then add components. Superposition is an assumption of classical electrostatics, tested to extraordinary precision, not a theorem you must re-derive each time.",
      check:
        "Newtons. If all charges are positive, every force on a test charge points away from the sources. Equal opposite charges at equal distance from a midpoint do not produce zero force on a charge at the midpoint if that charge is off the perpendicular — but on the line between them they can add.",
      explain:
        "A common failure is to cancel forces because “the charges are equal and opposite,” without asking whether those two forces on the third charge point the same way. Another is to treat Coulomb’s law as $F=kq_1q_2$ without $r^2$.",
    },
    workedExample: {
      title: "Force on the middle charge of a line",
      situation:
        "$q_1=+4.0\\,\\mathrm{nC}$ at $x=0$, $q_2=+4.0\\,\\mathrm{nC}$ at $x=0.30\\,\\mathrm{m}$, $q_3=-2.0\\,\\mathrm{nC}$ at $x=0.10\\,\\mathrm{m}$. Find $\\vec{F}$ on $q_3$.",
      assumptions: [
        "Point charges in vacuum; electrostatics; +x to the right.",
        "No other charges.",
      ],
      derivation:
        "Distance $r_{13}=0.10\\,\\mathrm{m}$, $r_{23}=0.20\\,\\mathrm{m}$. $|F_{13}|=k(4\\times 10^{-9})(2\\times 10^{-9})/(0.10)^2 = 7.19\\times 10^{-6}\\,\\mathrm{N}$ toward $q_1$ (attraction), so $-x$. $|F_{23}|=k(4\\mathrm{e}{-9})(2\\mathrm{e}{-9})/(0.20)^2 = 1.80\\times 10^{-6}\\,\\mathrm{N}$ toward $q_2$, so $+x$. $F_x = -7.19\\mathrm{e}{-6}+1.80\\mathrm{e}{-6} = -5.39\\times 10^{-6}\\,\\mathrm{N}$.",
      units: "Newtons. $k$ in SI, charges in C, $r$ in m.",
      interpretation:
        "The nearer like-sign? Wait: $q_1$ is positive, $q_3$ negative, so attraction toward $q_1$ dominates because $r$ is smaller and enters as $1/r^2$.",
      whyAlternativesFail:
        "Averaging the two distances or using $r=0.15\\,\\mathrm{m}$ for both invents a symmetry the positions do not have. Cancelling the two $4\\,\\mathrm{nC}$ sources ignores that they are at different distances from $q_3$.",
    },
    fadedExample: {
      situation:
        "Two charges $+q$ and $+q$ sit at $(a,0)$ and $(-a,0)$. A charge $+Q$ is at $(0,y)$. Describe $\\vec{F}$ on $Q$.",
      steps: [
        {
          prompt: "Do the x-components cancel?",
          hint: "Mirror symmetry across the y-axis.",
          expected: "Yes. The two x-components are equal and opposite.",
        },
        {
          prompt: "Direction of the net force?",
          hint: "Both sources are positive, $Q$ is positive.",
          expected: "Away from the x-axis: $+y$ if $y>0$.",
        },
        {
          prompt: "Would Gauss’s law with a sphere around the origin give this force?",
          hint: "Symmetry of the three-charge system is not spherical.",
          expected: "No. There is no Gaussian surface that makes $|E|$ constant and equal to the field at $(0,y)$ in a useful way.",
        },
      ],
    },
    independentItemIds: ["u8-coul-1", "u8-coul-2"],
    representationTask: {
      kind: "diagram",
      prompt:
        "Draw free-body diagrams for each of three collinear charges $+2q$, $-q$, $+2q$ equally spaced. Then state whether the middle charge can be in equilibrium.",
      expected:
        "The middle (negative) charge is attracted both ways equally if the outer charges and distances match, so it can be in equilibrium. Each outer charge is pulled inward by the middle and repelled by the far charge; those do not cancel, so the outer charges are not in equilibrium.",
    },
    retrievalItemId: "u8-coul-r",
    videoAlt:
      "Three charges on a line. Force arrows on the middle charge are drawn in the same direction when the outer charges are opposite in sign. A numeric superposition is then computed with SI units.",
  }
