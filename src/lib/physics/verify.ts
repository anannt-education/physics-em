import {
  EPSILON_0,
  almostEqual,
  electricFluxThroughClosedSurface,
  infiniteLineField,
  infiniteSheetField,
  conductingPlaneField,
  sphericalShellField,
  uniformSphereVolumeField,
  superpositionField,
  parallelPlateCapacitance,
  capacitorEnergy,
  rcCharge,
  rlCurrent,
  lorentzForce2d,
  magneticFlux,
  faradayEmf,
  lcOmega,
} from "./em";

export interface PhysicsCheck {
  name: string;
  pass: boolean;
  detail: string;
  idealisation?: string;
}

export function runPhysicsVerification(): PhysicsCheck[] {
  const checks: PhysicsCheck[] = [];

  const lambda = 2e-6;
  const e1 = infiniteLineField(lambda, 0.10);
  const e2 = infiniteLineField(lambda, 0.20);
  checks.push({
    name: "Infinite line charge: inverse-distance dependence",
    pass: almostEqual(e1 / e2, 2, 1e-9),
    detail: `E(0.10)/E(0.20) = ${(e1 / e2).toPrecision(8)} (expect 2)`,
    idealisation:
      "Infinite uniform line in vacuum. Singular on the line (r = 0 excluded). End effects neglected.",
  });

  const analytic = lambda / (2 * Math.PI * EPSILON_0 * 0.10);
  checks.push({
    name: "Infinite line charge: analytic Gauss-law magnitude",
    pass: almostEqual(e1, analytic, 1e-9),
    detail: `E(0.10 m) = ${e1.toExponential(6)} N/C; analytic ${analytic.toExponential(6)} N/C`,
    idealisation: "Uses ε0 = 8.854187817e-12 F/m. No numerical integration.",
  });

  checks.push({
    name: "Line field rejects non-positive radius",
    pass: Number.isNaN(infiniteLineField(lambda, 0)),
    detail: "r = 0 is excluded as a singular input.",
  });

  const sheet = infiniteSheetField(1e-6);
  checks.push({
    name: "Infinite sheet independent of distance",
    pass: almostEqual(sheet, 1e-6 / (2 * EPSILON_0)),
    detail: `E = ${sheet.toExponential(5)} N/C`,
    idealisation: "Infinite nonconducting sheet; field is discontinuous at the sheet.",
  });

  checks.push({
    name: "Conducting plane is twice the nonconducting sheet for same σ",
    pass: almostEqual(conductingPlaneField(1e-6), 2 * sheet),
    detail: "E_cond = σ/ε0, E_sheet = σ/(2ε0).",
  });

  checks.push({
    name: "Spherical shell: interior field zero, exterior Coulomb",
    pass:
      sphericalShellField(1e-9, 0.05, 0.02) === 0 &&
      almostEqual(
        sphericalShellField(1e-9, 0.05, 0.10),
        (8.99e9 * 1e-9) / 0.01,
        1e-4,
      ),
    detail: "Hollow shell of radius 5 cm, Q = 1 nC.",
  });

  const Q = 3e-9;
  const R = 0.04;
  const inside = uniformSphereVolumeField(Q, R, 0.02);
  const expectedInside = (8.99e9 * Q * 0.02) / (R * R * R);
  checks.push({
    name: "Uniform insulating sphere: interior linear in r",
    pass: almostEqual(inside, expectedInside, 1e-6),
    detail: `E(r=2 cm) = ${inside.toExponential(5)} vs ${expectedInside.toExponential(5)}`,
  });

  checks.push({
    name: "Closed-surface flux equals Q_enc / ε0, independent of shape",
    pass: almostEqual(electricFluxThroughClosedSurface(2e-9), 2e-9 / EPSILON_0),
    detail: "Flux is not a local-field measurement.",
  });

  const cancel = superpositionField(
    [
      { q: 1e-9, r: { x: -0.1, y: 0 } },
      { q: -1e-9, r: { x: 0.1, y: 0 } },
    ],
    { x: 0, y: 0 },
  );
  checks.push({
    name: "Dipole midpoint: net field is not zero (points +x, from + to −)",
    pass: Math.abs(cancel.y) < 1e-6 && cancel.x > 0,
    detail: `E = (${cancel.x.toExponential(3)}, ${cancel.y.toExponential(3)}) N/C`,
  });

  const C = parallelPlateCapacitance(0.02, 0.001, 1);
  checks.push({
    name: "Parallel-plate C = ε0 A / d",
    pass: almostEqual(C, (EPSILON_0 * 0.02) / 0.001, 1e-9),
    detail: `C = ${C.toExponential(5)} F`,
  });

  checks.push({
    name: "Capacitor energy ½CV² matches Q²/2C",
    pass: almostEqual(capacitorEnergy(C, 12), capacitorEnergy(C, 12, C * 12), 1e-9),
    detail: "Two energy expressions agree when Q = CV.",
  });

  const tau = 2000 * 1e-6;
  const qHalf = rcCharge(1, tau * Math.LN2, 2000, 1e-6, false);
  checks.push({
    name: "RC discharge: Q(τ ln 2) = Q0/2",
    pass: almostEqual(qHalf, 0.5, 1e-9),
    detail: `Q = ${qHalf}`,
  });

  const iGrow = rlCurrent(6, 3, 0.15, 0, true);
  checks.push({
    name: "RL growth: I(0) = 0",
    pass: almostEqual(iGrow, 0, 1e-12),
    detail: `I(0) = ${iGrow}`,
  });

  const Fplus = lorentzForce2d(1.6e-19, { x: 1e5, y: 0 }, 0.2);
  const Fminus = lorentzForce2d(-1.6e-19, { x: 1e5, y: 0 }, 0.2);
  checks.push({
    name: "Lorentz force reverses for negative charge",
    pass: almostEqual(Fplus.y, -Fminus.y) && almostEqual(Fplus.x, 0),
    detail: `F+ y = ${Fplus.y}, F− y = ${Fminus.y}`,
  });

  checks.push({
    name: "Flux Φ = BA cosθ; Faraday emf is −dΦ/dt",
    pass:
      almostEqual(magneticFlux(0.4, 0.05, 0), 0.02) &&
      almostEqual(faradayEmf(0.02), -0.02),
    detail: "B = 0.4 T, A = 0.05 m², θ = 0.",
  });

  checks.push({
    name: "LC angular frequency 1/√(LC)",
    pass: almostEqual(lcOmega(0.25, 4e-6), 1000, 1e-6),
    detail: `ω = ${lcOmega(0.25, 4e-6)} rad/s`,
  });

  return checks;
}

if (typeof require !== "undefined" && typeof module !== "undefined") {
  const isMain =
    typeof process !== "undefined" &&
    process.argv[1] &&
    process.argv[1].includes("verify.ts");
  if (isMain) {
    const results = runPhysicsVerification();
    const failed = results.filter((r) => !r.pass);
    for (const r of results) {
      console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}`);
      console.log(`      ${r.detail}`);
      if (r.idealisation) console.log(`      Idealisation: ${r.idealisation}`);
    }
    if (failed.length) {
      console.error(`\n${failed.length} physics check(s) failed.`);
      process.exit(1);
    }
    console.log(`\n${results.length} physics checks passed.`);
  }
}
