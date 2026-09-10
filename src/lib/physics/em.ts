/** Deterministic electrostatics used by investigations and the physics test suite. */

export const K = 8.99e9;
export const EPSILON_0 = 8.854187817e-12;
export const MU_0 = 4 * Math.PI * 1e-7;

export type Vec2 = { x: number; y: number };

export function add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function scale(a: Vec2, s: number): Vec2 {
  return { x: a.x * s, y: a.y * s };
}

export function sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function mag(a: Vec2): number {
  return Math.hypot(a.x, a.y);
}

export function hat(a: Vec2): Vec2 {
  const m = mag(a);
  if (m === 0) return { x: 0, y: 0 };
  return { x: a.x / m, y: a.y / m };
}

export function pointChargeField(
  chargeC: number,
  source: Vec2,
  fieldPoint: Vec2,
): Vec2 {
  const r = sub(fieldPoint, source);
  const rMag = mag(r);
  if (rMag < 1e-6) return { x: NaN, y: NaN };
  const s = (K * chargeC) / (rMag * rMag);
  const u = hat(r);
  return { x: s * u.x, y: s * u.y };
}

export function superpositionField(
  sources: { q: number; r: Vec2 }[],
  point: Vec2,
): Vec2 {
  return sources.reduce(
    (acc, s) => add(acc, pointChargeField(s.q, s.r, point)),
    { x: 0, y: 0 },
  );
}

export function pointChargePotential(
  chargeC: number,
  source: Vec2,
  fieldPoint: Vec2,
  Vref = 0,
): number {
  const rMag = mag(sub(fieldPoint, source));
  if (rMag < 1e-6) return Number.POSITIVE_INFINITY;
  return Vref + (K * chargeC) / rMag;
}

/** Infinite line, SI: E = λ / (2 π ε0 r), radial. */
export function infiniteLineField(lambdaCPerM: number, rMeters: number): number {
  if (rMeters <= 0) return Number.NaN;
  return lambdaCPerM / (2 * Math.PI * EPSILON_0 * rMeters);
}

/** Infinite nonconducting sheet: E = σ / (2 ε0). */
export function infiniteSheetField(sigmaCPerM2: number): number {
  return sigmaCPerM2 / (2 * EPSILON_0);
}

/** Conducting plane: E = σ / ε0 just outside. */
export function conductingPlaneField(sigmaCPerM2: number): number {
  return sigmaCPerM2 / EPSILON_0;
}

export function sphericalShellField(
  qEnc: number,
  radius: number,
  r: number,
): number {
  if (r <= 0) return Number.NaN;
  if (r < radius) return 0;
  return (K * qEnc) / (r * r);
}

export function uniformSphereVolumeField(
  totalQ: number,
  radius: number,
  r: number,
): number {
  if (r <= 0) return Number.NaN;
  if (r < radius) return (K * totalQ * r) / (radius * radius * radius);
  return (K * totalQ) / (r * r);
}

export function electricFluxThroughClosedSurface(qEnclosed: number): number {
  return qEnclosed / EPSILON_0;
}

export function parallelPlateCapacitance(
  areaM2: number,
  separationM: number,
  kappa = 1,
): number {
  if (separationM <= 0) return Number.NaN;
  return (kappa * EPSILON_0 * areaM2) / separationM;
}

export function capacitorEnergy(C: number, V: number, Q?: number): number {
  if (Q !== undefined) return (Q * Q) / (2 * C);
  return 0.5 * C * V * V;
}

export function rcCharge(Q0: number, t: number, R: number, C: number, charging: boolean) {
  const tau = R * C;
  if (tau <= 0) return Number.NaN;
  if (charging) return Q0 * (1 - Math.exp(-t / tau));
  return Q0 * Math.exp(-t / tau);
}

export function rlCurrent(V: number, R: number, L: number, t: number, growing: boolean) {
  const tau = L / R;
  if (tau <= 0 || R === 0) return Number.NaN;
  const Iinf = V / R;
  if (growing) return Iinf * (1 - Math.exp(-t / tau));
  return Iinf * Math.exp(-t / tau);
}

export function magneticForceOnCharge(
  q: number,
  v: Vec2,
  Bz: number,
): Vec2 {
  // F = q v × B with B = Bz k-hat in 2D plane
  return { x: q * v.y * Bz * -1 + q * 0, y: q * v.x * Bz };
}

/** 2D: F = q (vx, vy, 0) × (0, 0, Bz) = q(vy*0 - 0*Bz, 0*Bz - vx*0, vx*0 - vy*0) wait
 * v × z-hat = (vx, vy, 0) × (0, 0, 1) = (vy, -vx, 0)? 
 * i(vy*1 - 0*0) - j(vx*1 - 0*0) + k(0)
 * = (vy, -vx, 0) yes if we use standard: i(vy Bz) + j(-vx Bz)
 * F = q (vy Bz, -vx Bz)
 */
export function lorentzForce2d(q: number, v: Vec2, Bz: number): Vec2 {
  return { x: q * v.y * Bz, y: -q * v.x * Bz };
}

export function magneticFlux(B: number, area: number, thetaRad: number): number {
  return B * area * Math.cos(thetaRad);
}

export function faradayEmf(dFluxDt: number): number {
  return -dFluxDt;
}

export function lcOmega(L: number, C: number): number {
  if (L <= 0 || C <= 0) return Number.NaN;
  return 1 / Math.sqrt(L * C);
}

export function almostEqual(a: number, b: number, rel = 1e-6, abs = 1e-12): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  const diff = Math.abs(a - b);
  return diff <= abs || diff <= rel * Math.max(Math.abs(a), Math.abs(b));
}
