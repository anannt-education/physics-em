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

export const UNIT8_LESSONS: Lesson[] = [
  {
    id: "u8-flux-misconception",
    slug: "zero-flux-is-not-zero-field",
    title: "Flux versus local field",
    unit: 8,
    topics: ["8.5"],
    objectives: ["8.5.B"],
    capability:
      "Explain why $\\Phi_{\\mathrm{net}}=0$ does not force $\\vec{E}=0$ at every point, and refuse the slogan “Gauss’s law is $E$ times $A$ for every surface.”",
    prereqs: [],
    minutes: [22, 32],
    ...review,
    prediction: {
      prompt:
        "A closed cube sits in a uniform field $\\vec{E}=E\\hat{x}$. No charge is inside. A student says “Gauss’s law: $EA=Q_{\\mathrm{enc}}/\\varepsilon_0$, so $E=0$ on every face.” What is actually true?",
      choices: [
        {
          id: "A",
          text: "Net flux through the cube is zero, and $E=0$ on every face.",
          misconception: "flux-equals-local-field",
        },
        {
          id: "B",
          text: "Net flux is zero. The field on the faces is still $E\\hat{x}$; opposite faces cancel in the surface integral.",
          correct: true,
        },
        {
          id: "C",
          text: "Gauss’s law does not apply because the cube is not a sphere.",
        },
        {
          id: "D",
          text: "Net flux equals $6EA$, one face times six.",
        },
      ],
      explanation:
        "Gauss’s law is $\\Phi_{\\mathrm{net}}=\\oint\\vec{E}\\cdot d\\vec{A}=Q_{\\mathrm{enc}}/\\varepsilon_0$. Here $Q_{\\mathrm{enc}}=0$, so net flux is zero. That is a statement about the integral, not about the integrand. On the $+x$ face $\\vec{E}\\cdot d\\vec{A}=EA$; on the $-x$ face the outward normal is $-\\hat{x}$, so $\\vec{E}\\cdot d\\vec{A}=-EA$. The four faces parallel to $\\vec{E}$ contribute nothing. The field is not zero; the signed fluxes cancel. You may pull $E$ out of the integral only when symmetry makes $|\\vec{E}|$ constant and perpendicular on the chosen surface.",
    },
    explanation: {
      model:
        "Electric flux through a patch is $\\mathrm{d}\\Phi=\\vec{E}\\cdot d\\vec{A}$. Net flux through a closed surface equals enclosed charge over $\\varepsilon_0$, independent of charges outside. Local $\\vec{E}$ at a point on the surface is a different object: it is the force per unit test charge there, from every source.",
      represent:
        "Draw the cube. Mark outward normals. For a uniform field, sketch equal-and-opposite contributions on opposite faces. Separately, draw a Gaussian sphere around a point charge: now symmetry lets $|E|$ leave the integral.",
      derive:
        "$\\oint\\vec{E}\\cdot d\\vec{A}=Q_{\\mathrm{enc}}/\\varepsilon_0$. If you write $EA=Q_{\\mathrm{enc}}/\\varepsilon_0$, you have already assumed (1) $|E|$ constant on the surface and (2) $\\vec{E}$ parallel to $d\\vec{A}$. Those assumptions fail for a cube in a uniform field, for a charge sitting off-centre, and for any surface that is not adapted to the symmetry.",
      check:
        "Units of flux: $\\mathrm{N\\,m}^2/\\mathrm{C}$. A uniform field through a closed surface: net flux $0$. A point charge outside a Gaussian surface: net flux $0$, local $E$ on the near face larger than on the far face.",
      explain:
        "Zero net flux is compatible with a lively field. Gauss’s law is not a local “$E$ times $A$” recipe. Use it as $E\\times A$ only after you have named the symmetry that justifies pulling $E$ out.",
    },
    workedExample: {
      title: "Charge outside a Gaussian sphere",
      situation:
        "A point charge $+Q$ sits a distance $2R$ from the centre of a sphere of radius $R$. The sphere does not enclose $Q$. A student claims $E=0$ everywhere on the sphere “because flux is zero.”",
      assumptions: [
        "Electrostatics; point charge; vacuum.",
        "The Gaussian surface is the sphere of radius $R$, not enclosing $Q$.",
      ],
      derivation:
        "$Q_{\\mathrm{enc}}=0$, so $\\Phi_{\\mathrm{net}}=0$. At the nearest point of the sphere, $r=R$ from the charge, Coulomb’s law still gives $E=kQ/R^2$, not zero. At the far point, $r=3R$, $E=kQ/(9R^2)$. The flux contributions from near and far patches have opposite signs and unequal areas in a way that sums to zero. The student’s claim confuses the integral with the field.",
      units: "N/C for $E$; N·m²/C for flux.",
      interpretation:
        "Enclosed charge fixes net flux. It does not set the field at a chosen point. To find $E$ at a point, use Coulomb/superposition or a Gaussian surface that actually has the required symmetry about that charge distribution.",
      whyAlternativesFail:
        "Writing $E=0$ from $\\Phi=0$ is the flux-equals-local-field mix-up. Requiring a sphere “for Gauss’s law to exist” confuses a useful surface with the law itself, which holds for any closed surface.",
    },
    fadedExample: {
      situation: "Uniform field $E$ through a closed cylinder, axis along $\\vec{E}$. No enclosed charge.",
      steps: [
        {
          prompt: "What is $Q_{\\mathrm{enc}}$? What is $\\Phi_{\\mathrm{net}}$?",
          hint: "Gauss’s law for a closed surface.",
          expected: "$Q_{\\mathrm{enc}}=0$, so $\\Phi_{\\mathrm{net}}=0$.",
        },
        {
          prompt: "Are the two end-cap fluxes equal in magnitude? Do they cancel?",
          hint: "Outward normals on the two caps point opposite ways.",
          expected: "Each end has flux $\\pm EA$. They cancel. The curved wall has $\\vec{E}\\perp d\\vec{A}$, flux $0$.",
        },
        {
          prompt: "Is $E=0$ on an end cap?",
          hint: "The field was given as uniform and nonzero.",
          expected: "No. $E$ on each cap is the given uniform field. Cancellation is in the signed integral.",
        },
      ],
    },
    representationTask: {
      kind: "diagram",
      prompt:
        "Sketch a cube in a uniform field. Label outward $d\\vec{A}$ on the $+x$ and $-x$ faces, write $\\vec{E}\\cdot d\\vec{A}$ on each, and state in one sentence why net flux can be zero while $E$ is not.",
      expected:
        "Opposite faces: $+EA$ and $-EA$. Net flux $0$. The field on the faces is the same uniform $E$, not zero. The integral cancelled; the integrand did not vanish.",
    },
    independentItemIds: ["u8-flux-1", "u8-flux-2"],
    retrievalItemId: "u8-flux-r",
    videoAlt:
      "A cube in a uniform field: arrows through opposite faces, equal in size, opposite in sign. A second sketch: a charge outside a sphere, field stronger on the near side, net flux still zero.",
  },
  {
    id: "u8-continuous-line",
    slug: "finite-line-of-charge",
    title: "A finite line of charge",
    unit: 8,
    topics: ["8.4"],
    objectives: ["8.4.A"],
    capability:
      "Construct $d\\vec{E}$ from a line-charge element, keep the component the symmetry allows, and integrate over a finite length — not an infinite-line formula used blindly.",
    prereqs: ["u8-flux-misconception"],
    minutes: [24, 36],
    ...review,
    prediction: {
      prompt:
        "A thin rod of length $L$ carries uniform $\\lambda>0$. Point $P$ is on the perpendicular bisector, a distance $a$ from the centre. Compared with treating the rod as a single point charge $Q=\\lambda L$ at the centre, the actual $|\\vec{E}|$ at $P$ is",
      choices: [
        { id: "A", text: "exactly $k(\\lambda L)/a^2$, because the whole charge sits a distance $a$ away." },
        {
          id: "B",
          text: "smaller than $k(\\lambda L)/a^2$, because end pieces are farther than $a$ and their transverse components partly cancel.",
          correct: true,
        },
        { id: "C", text: "larger than $k(\\lambda L)/a^2$, because a line always beats a point." },
        {
          id: "D",
          text: "$\\lambda/(2\\pi\\varepsilon_0 a)$, the infinite-line result, because $L$ does not matter.",
        },
      ],
      explanation:
        "Every element is at least a distance $a$ from $P$; the ends are farther, so each $dE$ is weaker than the centre element. Parallel-to-the-rod components cancel by symmetry on the bisector; only the perpendicular pieces remain, each reduced by a cosine. The infinite-line formula assumes the rod never ends. A point-charge lump at the centre overestimates $|E|$.",
    },
    explanation: {
      model:
        "A continuous source is a pile of $dQ=\\lambda\\,dx$. The field at $P$ is the superposition $\\vec{E}=\\int d\\vec{E}$ with Coulomb’s $dE=k\\,dQ/r^2$ for each element, directed along the line from the element to $P$.",
      represent:
        "Place the rod on $x$ from $-L/2$ to $L/2$. Put $P$ at $(0,a)$. An element at $x$ has $r=\\sqrt{x^2+a^2}$. The useful component is $dE_\\perp=dE\\cos\\theta$ with $\\cos\\theta=a/r$.",
      derive:
        "$E_\\perp=\\int_{-L/2}^{L/2} k\\lambda a\\,(x^2+a^2)^{-3/2}\\,dx= k\\lambda L /(a\\sqrt{(L/2)^2+a^2})$. Parallel components cancel. Check limits: $L\\ll a$ recovers $k(\\lambda L)/a^2$. $L\\to\\infty$ becomes $2k\\lambda/a$.",
      check:
        "Dimensions: $k\\lambda$ is N/C, $L/\\sqrt{(L/2)^2+a^2}$ is dimensionless. If $\\lambda$ flips sign, $\\vec{E}$ reverses. If $P$ is not on the bisector, you must keep both components — this sitting is the symmetric case.",
      explain:
        "Calculus is the bookkeeping for superposition. The infinite-line shortcut is a limit, not a starting slogan. A finite rod is not a point and is not infinite.",
    },
    workedExample: {
      title: "Bisector field for $L=0.40\\,\\mathrm{m}$, $a=0.30\\,\\mathrm{m}$",
      situation:
        "$\\lambda=2.0\\,\\mu\\mathrm{C/m}$ on a rod of length $0.40\\,\\mathrm{m}$. $P$ is on the perpendicular bisector, $0.30\\,\\mathrm{m}$ from the centre. Find $|\\vec{E}|$.",
      assumptions: ["Uniform $\\lambda$. Thin rod. Electrostatics. $P$ exactly on the bisector."],
      derivation:
        "$E= k\\lambda L /(a\\sqrt{(L/2)^2+a^2})$. $\\sqrt{(0.20)^2+(0.30)^2}=0.3606\\,\\mathrm{m}$. $E=(9.0\\times 10^9)(2.0\\times 10^{-6})(0.40)/(0.30\\times 0.3606)=6.7\\times 10^4\\,\\mathrm{N/C}$, away from the rod. A lumped $Q=0.80\\,\\mu\\mathrm{C}$ at the centre would have given $kQ/a^2=8.0\\times 10^4\\,\\mathrm{N/C}$ — larger, as predicted.",
      units: "N/C.",
      interpretation:
        "Direction: along the bisector, away from a positive line. Magnitude is about 16% below the point-charge estimate. Do not paste $2k\\lambda/a=1.2\\times 10^5\\,\\mathrm{N/C}$; that is the infinite-line limit, almost twice as large here.",
      whyAlternativesFail:
        "Using $kQ/a^2$ ignores extra distance to the ends. Using $2k\\lambda/a$ pretends the rod is infinite. Integrating $dE$ without the cosine keeps cancelled components.",
    },
    fadedExample: {
      situation: "Same geometry, new numbers: $L=0.80\\,\\mathrm{m}$, $a=0.30\\,\\mathrm{m}$, same $\\lambda$.",
      steps: [
        {
          prompt: "Write $E$ in symbols before substituting.",
          hint: "$E=k\\lambda L/(a\\sqrt{(L/2)^2+a^2})$.",
          expected: "$E=k\\lambda L/(a\\sqrt{(L/2)^2+a^2})$.",
        },
        {
          prompt: "Is this larger or smaller than the $L=0.40\\,\\mathrm{m}$ result, and why?",
          hint: "More charge, but the new ends are farther. Compare to the infinite-line ceiling $2k\\lambda/a$.",
          expected:
            "Larger than the short-rod result, still below $2k\\lambda/a$. Extra charge helps; extra distance to the new ends keeps it below the infinite limit.",
        },
      ],
    },
    representationTask: {
      kind: "diagram",
      prompt:
        "Sketch the rod, $P$ on the bisector, one off-centre $dQ$, the two components of $d\\vec{E}$, and mark which pair cancels. Then state the integral you would write for $E_\\perp$.",
      expected:
        "Parallel components from $+x$ and $-x$ cancel. $E_\\perp=\\int k\\lambda a(x^2+a^2)^{-3/2}\\,dx$ from $-L/2$ to $L/2$.",
    },
    independentItemIds: ["u8-line-1", "u8-line-2"],
    retrievalItemId: "u8-line-r",
    videoAlt:
      "A rod on the x-axis, P on the y-axis. An element at x sends dE toward P; the horizontal piece is cancelled by its partner at −x. The remaining vertical pieces are integrated.",
  },
];
