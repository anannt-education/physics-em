import { ACTIVE_EXAM_PROFILE, MOCK_MCQ_ALLOCATION_2027 } from "@/content/exam-profile";
import { MOCK1_PUBLIC } from "./form1-public";
import type { FrqTask } from "@/lib/types";

const provenance = {
  author: "Anannt physics author",
  reviewer: "Independent physics reviewer",
  reviewed: "2026-09-10",
  version: "1.0",
};

export const MOCK1_FRQS: FrqTask[] = [
  {
    id: "m1-frq-a",
    family: "m1-frq-gauss",
    version: "1.0",
    unit: 8,
    topic: "8.6",
    objective: "8.6.A",
    category: "mathematical_routines",
    sciencePractice: 2,
    totalPoints: 12,
    expectedMinutes: 22,
    pool: "mock",
    stimulus: "A uniformly charged insulating sphere, radius $R$, total $Q>0$.",
    parts: [
      { id: "a", prompt: "Derive $E(r)$ for $r\\ge R$ using Gauss’s law.", points: 3 },
      { id: "b", prompt: "Derive $E(r)$ for $r\\le R$.", points: 4 },
      { id: "c", prompt: "Sketch $E(r)$ from 0 to $3R$ and check continuity at $R$.", points: 3 },
      { id: "d", prompt: "A student claims $E=0$ for $r<R$ because “Gauss’s law says enclosed charge makes flux, and the field is inside.” Correct the student.", points: 2 },
    ],
    modelSolution: "Exterior Coulomb. Interior $kQr/R^3$. Continuous at $R$. The student confuses a conductor with an insulator and/or flux with local E.",
    rubric: [
      { id: "a1", points: 3, earns: "Gaussian sphere, Q_enc=Q, E=kQ/r^2." },
      { id: "b1", points: 4, earns: "Q_enc∝r^3 and E=kQr/R^3." },
      { id: "c1", points: 3, earns: "Linear then 1/r^2, matching at R." },
      { id: "d1", points: 2, earns: "Distinguishes conductor vs insulator or flux vs E." },
    ],
    selfChecks: ["Only enclosed charge", "Sketch labelled"],
    provenance,
    status: "published",
  },
  {
    id: "m1-frq-b",
    family: "m1-frq-V",
    version: "1.0",
    unit: 9,
    topic: "9.3",
    objective: "9.3.A",
    category: "translation_between_representations",
    sciencePractice: 1,
    totalPoints: 10,
    expectedMinutes: 20,
    pool: "mock",
    parts: [
      { id: "a", prompt: "A graph of V(x) is provided in the prompt booklet as a V-shape: V= 6.0 V at x=0, falling linearly to 0 at x=±0.030 m, then 0 beyond. Find E_x for |x|<0.030 m on the right side.", points: 3 },
      { id: "b", prompt: "Sketch E_x(x).", points: 3 },
      { id: "c", prompt: "Is V=0 the same as E=0 for |x|>0.030 m? Explain.", points: 4 },
    ],
    modelSolution: "Right slope ΔV/Δx=(0-6)/0.030=−200 V/m so E_x=+200 N/C. Left side opposite. Outside, V=0 and E=0 in this piecewise model — here they coincide, unlike a dipole midpoint.",
    rubric: [
      { id: "a1", points: 3, earns: "E=−dV/dx with sign on the right." },
      { id: "b1", points: 3, earns: "Odd function: negative E on the left, positive on the right, zero outside." },
      { id: "c1", points: 4, earns: "In this graph they coincide outside; student notes this is not generally required, citing another example." },
    ],
    selfChecks: ["Sign of E", "Did not claim V=0 always means E=0"],
    provenance,
    status: "published",
  },
  {
    id: "m1-frq-c",
    family: "m1-frq-rc",
    version: "1.0",
    unit: 11,
    topic: "11.8",
    objective: "11.8.A",
    category: "experimental_design",
    sciencePractice: 3,
    totalPoints: 12,
    expectedMinutes: 24,
    pool: "mock",
    stimulus: "Students have a battery, switch, resistor, capacitor, voltmeter, and timer. They wish to determine τ.",
    parts: [
      { id: "a", prompt: "Outline a procedure to measure τ for charging, including what is graphed.", points: 4 },
      { id: "b", prompt: "How would a leaky capacitor (parallel leakage R_L) change the final V_C? What does that do to a naive τ from 63% of the battery voltage?", points: 4 },
      { id: "c", prompt: "Identify this investigation as a simulation or a physical lab when performed in Anannt’s circuit lab.", points: 4 },
    ],
    modelSolution: "(a) Charge from zero, record V_C(t), find time to 0.63ε, or linearise ln(1−V/ε). (b) Final V is a divider, below ε; 63% of ε is the wrong target. (c) Anannt’s circuit lab is a simulation; physical laboratory work is recorded separately. College Board includes laboratory experience in AP physics education.",
    rubric: [
      { id: "a1", points: 4, earns: "Workable procedure with a graph or 63% criterion." },
      { id: "b1", points: 4, earns: "Final V < ε and τ mis-estimated if 0.63ε is used blindly." },
      { id: "c1", points: 4, earns: "Labels Anannt as simulation; does not claim it replaces the course lab requirement." },
    ],
    selfChecks: ["Simulation labelled", "Leakage affects asymptote"],
    provenance,
    status: "published",
  },
  {
    id: "m1-frq-d",
    family: "m1-frq-lenz",
    version: "1.0",
    unit: 13,
    topic: "13.3",
    objective: "13.3.A",
    category: "qualitative_quantitative_translation",
    sciencePractice: 3,
    totalPoints: 12,
    expectedMinutes: 22,
    pool: "mock",
    stimulus: "A sliding bar on rails, B into the page, area increasing, resistance R.",
    parts: [
      { id: "a", prompt: "Determine the direction of induced current and justify with Lenz’s law.", points: 3 },
      { id: "b", prompt: "Derive ε=Bℓv and I.", points: 3 },
      { id: "c", prompt: "Show F_mag opposes v and that F v = I²R.", points: 3 },
      { id: "d", prompt: "If B is decreasing in time while the bar is held still, can there still be an emf? Distinguish flux from dΦ/dt.", points: 3 },
    ],
    modelSolution: "Induced B out of the page. ε=Bℓv. Magnetic drag; agent supplies I²R. Yes: dB/dt with fixed A still changes Φ. Flux can be large with zero emf if constant.",
    rubric: [
      { id: "a1", points: 3, earns: "Correct direction opposing the change." },
      { id: "b1", points: 3, earns: "ε=Bℓv and I=ε/R." },
      { id: "c1", points: 3, earns: "Force opposite v and power match." },
      { id: "d1", points: 3, earns: "dB/dt induces emf; flux ≠ rate of change." },
    ],
    selfChecks: ["Oppose the change not B", "Energy source named"],
    provenance,
    status: "published",
  },
];

export const MOCK_FORMS = [
  {
    id: "mock-2027-1",
    title: "Anannt Mock A — May 2027 profile",
    profileId: ACTIVE_EXAM_PROFILE.id,
    mcqIds: MOCK1_PUBLIC.map((i) => i.id),
    frqIds: MOCK1_FRQS.map((f) => f.id),
    allocation: MOCK_MCQ_ALLOCATION_2027,
    secure: true as const,
    versionLabel: "2027-A",
    notes:
      "Fixed form. Solutions are not bundled in the exam workspace. FRQ scores stay pending until you complete a self-review; they are never silently zeroed.",
  },
  {
    id: "mock-2027-2",
    title: "Anannt Mock B — same stems as Mock A (not a second paper)",
    profileId: ACTIVE_EXAM_PROFILE.id,
    mcqIds: [...MOCK1_PUBLIC].reverse().map((i) => i.id),
    frqIds: [...MOCK1_FRQS].reverse().map((f) => f.id),
    allocation: MOCK_MCQ_ALLOCATION_2027,
    secure: true as const,
    versionLabel: "2027-B",
    notes:
      "Not a second paper. Mock B reuses Mock A’s public stems in reverse order. It is a scrambled repeat of the same sitting, not an independent 42-item form. Keep it off any “second paper” sentence.",
  },
];

export function mockFormById(id: string) {
  return MOCK_FORMS.find((m) => m.id === id);
}
