import type { Investigation } from "@/lib/types";

export const INVESTIGATIONS: Investigation[] = [
  {
    id: "charge-field",
    title: "Charge and field explorer",
    unit: 8,
    topics: ["8.3", "8.4"],
    assumption:
      "Point charges in vacuum. The field is undefined at a source. Superposition is linear. Distances are in centimetres on the canvas; charges in nanocoulombs.",
    prediction: {
      prompt:
        "Two equal positive charges sit on the x-axis. At the midpoint, the net field is",
      choices: [
        { id: "A", text: "twice the field of one charge, to the right." },
        { id: "B", text: "zero.", correct: true },
        { id: "C", text: "undefined, because two fields occupy one point." },
        { id: "D", text: "toward the larger-looking charge on the screen." },
      ],
      explanation:
        "Equal charges at equal distance produce equal-and-opposite fields at the midpoint. Observe this, then move one charge and watch a leftover component appear.",
    },
    transferItemId: "u8-sup-2",
    staticEquivalent:
      "If motion is reduced, place two +2 nC charges at (−4 cm, 0) and (4 cm, 0) and read E at the origin from the numeric readout: both components should be consistent with zero within rounding.",
  },
  {
    id: "gauss",
    title: "Gaussian surface explorer",
    unit: 8,
    topics: ["8.5", "8.6"],
    assumption:
      "Gauss’s law is exact: net flux equals Q_enc/ε0. Displayed E is the superposition of point sources, not an assumption that E is constant on the surface. Ideal spheres, cylinders, and pillboxes.",
    prediction: {
      prompt:
        "A charge sits outside a Gaussian sphere. Net flux through the sphere is",
      choices: [
        { id: "A", text: "Q/ε0, because field lines still pierce the sphere." },
        { id: "B", text: "zero, because Q_enc = 0.", correct: true },
        { id: "C", text: "zero only if E is zero on the sphere." },
        { id: "D", text: "negative of Q/ε0." },
      ],
      explanation:
        "Q_enc is zero, so net flux is zero. The field on the sphere is not zero. Compare flux with local |E| in the explorer.",
    },
    transferItemId: "u8-mis-3",
    staticEquivalent:
      "Place +4 nC at (6 cm, 0) and a sphere of radius 3 cm at the origin. Q_enc reads 0; flux reads 0; |E| at the rightmost surface point is not zero.",
  },
  {
    id: "potential-graph",
    title: "Potential and field graph tool",
    unit: 9,
    topics: ["9.2", "9.3"],
    assumption:
      "One-dimensional electrostatics. E_x = −dV/dx. The zero of V is a reference you choose; it does not change E.",
    prediction: {
      prompt: "Where V(x) has a flat peak, E_x is",
      choices: [
        { id: "A", text: "maximum." },
        { id: "B", text: "zero.", correct: true },
        { id: "C", text: "equal to V." },
        { id: "D", text: "infinite." },
      ],
      explanation: "Slope of V is zero at a peak, so E_x = 0. V itself need not be zero.",
    },
    transferItemId: "u9-ev-2",
    staticEquivalent:
      "A sample V(x) = 4x − x³ is plotted with its analytic E_x = −4 + 3x². Mark the zeros of E on the graph.",
  },
  {
    id: "capacitor",
    title: "Capacitor investigation",
    unit: 10,
    topics: ["10.3", "10.4"],
    assumption:
      "Ideal parallel plates, neglected fringing. Linear dielectric filling the gap. Battery connected means V fixed; disconnected means Q fixed.",
    prediction: {
      prompt: "With the battery connected, inserting κ = 2 will",
      choices: [
        { id: "A", text: "double C and double Q, with V fixed.", correct: true },
        { id: "B", text: "double C and halve Q." },
        { id: "C", text: "leave C unchanged because geometry is unchanged." },
        { id: "D", text: "halve U because E is shielded." },
      ],
      explanation:
        "Connected: V fixed. C → κC, Q = CV doubles, U = ½CV² doubles. Isolated would have halved U.",
    },
    transferItemId: "u10-en-2",
    staticEquivalent:
      "Tabulate Q, V, C, U for d and κ with the battery switch on versus off. Check U = Q²/(2C) = ½CV² numerically.",
  },
  {
    id: "circuit",
    title: "Circuit and transient lab",
    unit: 11,
    topics: ["11.5", "11.6", "11.8"],
    assumption:
      "Lumped DC and series RC. Ideal battery and wires. Capacitor current is dQ/dt in the leads. No inductance.",
    prediction: {
      prompt: "At t = 0⁺ charging an uncharged C, current is",
      choices: [
        { id: "A", text: "zero." },
        { id: "B", text: "ε/R.", correct: true },
        { id: "C", text: "εC." },
        { id: "D", text: "infinite." },
      ],
      explanation: "V_C(0⁺) = 0, so the loop is ε = IR. Observe I(t) fall exponentially.",
    },
    transferItemId: "u11-rc-2",
    staticEquivalent:
      "Read I(0), Q(∞), and τ = RC from the meters. Confirm Q(τ) ≈ 0.63 Q_∞.",
  },
  {
    id: "magnetic-direction",
    title: "Magnetic direction trainer",
    unit: 12,
    topics: ["12.1"],
    assumption:
      "Uniform B along z (out of the page when Bz > 0). F = q v × B in the plane. No electric field.",
    prediction: {
      prompt: "A proton with v to the right and B out of the page feels a force",
      choices: [
        { id: "A", text: "up the page." },
        { id: "B", text: "down the page.", correct: true },
        { id: "C", text: "out of the page." },
        { id: "D", text: "in the direction of v." },
      ],
      explanation:
        "v × z-hat is down the page for v to the right (x × z = −y if +y is up). Proton charge is positive.",
    },
    transferItemId: "u12-fq-2",
    staticEquivalent:
      "Worked static cases: proton right / B out → F down; electron same v and B → F up.",
  },
  {
    id: "induction",
    title: "Induction investigation",
    unit: 13,
    topics: ["13.1", "13.2", "13.3"],
    assumption:
      "Uniform B over a rectangular area that can change with time or with a sliding width. Single-turn loop. ε = −dΦ/dt with Φ = B A cosθ.",
    prediction: {
      prompt: "If B is constant and the loop area is constant, emf is",
      choices: [
        { id: "A", text: "BA." },
        { id: "B", text: "zero, unless orientation is changing.", correct: true },
        { id: "C", text: "B/A." },
        { id: "D", text: "infinite." },
      ],
      explanation: "Flux can be large and constant. Emf needs dΦ/dt. Change B, A, or θ and watch emf appear.",
    },
    transferItemId: "u13-far-2",
    staticEquivalent:
      "Set B(t) = B0 + α t with A fixed. The emf readout should equal −α A, independent of B0.",
  },
  {
    id: "inductor",
    title: "Inductor and oscillator lab",
    unit: 13,
    topics: ["13.4", "13.5", "13.6"],
    assumption:
      "Ideal L and C; series R when selected. Linear inductor. LC uses ω = 1/√(LC). RL uses τ = L/R.",
    prediction: {
      prompt: "In an ideal LC circuit starting from Q = Qm, I = 0, the first instant of maximum |I| occurs at",
      choices: [
        { id: "A", text: "t = 0." },
        { id: "B", text: "t = T/4.", correct: true },
        { id: "C", text: "t = T/2." },
        { id: "D", text: "never; current is always zero if it starts at zero." },
      ],
      explanation:
        "Energy is all electric at t = 0 and all magnetic a quarter period later. Current does not stay zero.",
    },
    transferItemId: "u13-lc-1",
    staticEquivalent:
      "Check ω_readout against 1/√(LC) within rounding. Energy U_E + U_B should stay constant when R = 0.",
  },
];

export function investigationById(id: string) {
  return INVESTIGATIONS.find((i) => i.id === id);
}
