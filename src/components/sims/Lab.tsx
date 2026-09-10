"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  EPSILON_0,
  capacitorEnergy,
  faradayEmf,
  infiniteLineField,
  lcOmega,
  lorentzForce2d,
  magneticFlux,
  parallelPlateCapacitance,
  pointChargeField,
  rcCharge,
  rlCurrent,
  superpositionField,
} from "@/lib/physics/em";
import { useStudent } from "@/lib/store/student-store";

function sliderValue(v: number | readonly number[], fallback: number) {
  return typeof v === "number" ? v : (v[0] ?? fallback);
}

export function Lab({ id }: { id: string }) {
  switch (id) {
    case "charge-field":
      return <ChargeField />;
    case "gauss":
      return <GaussLab />;
    case "potential-graph":
      return <PotentialGraph />;
    case "capacitor":
      return <CapacitorLab />;
    case "circuit":
      return <CircuitLab />;
    case "magnetic-direction":
      return <MagneticTrainer />;
    case "induction":
      return <InductionLab />;
    case "inductor":
      return <InductorLab />;
    default:
      return <p>Unknown lab.</p>;
  }
}

function ChargeField() {
  const [charges, setCharges] = useState([
    { q: 2, x: -40, y: 0 },
    { q: 2, x: 40, y: 0 },
  ]);
  const [probe, setProbe] = useState({ x: 0, y: 0 });
  const E = useMemo(() => {
    const sources = charges.map((c) => ({
      q: c.q * 1e-9,
      r: { x: c.x / 100, y: c.y / 100 },
    }));
    return superpositionField(sources, { x: probe.x / 100, y: probe.y / 100 });
  }, [charges, probe]);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Scale: centimetres on the canvas, nanocoulombs. Arrow at the probe is E (N/C). Keyboard: arrow keys move the probe.
      </p>
      <svg
        viewBox="-100 -80 200 160"
        className="h-64 w-full rounded-lg border border-border bg-white"
        tabIndex={0}
        role="application"
        aria-label="Charge and field canvas"
        onKeyDown={(e) => {
          const step = 4;
          if (e.key === "ArrowLeft") setProbe((p) => ({ ...p, x: p.x - step }));
          if (e.key === "ArrowRight") setProbe((p) => ({ ...p, x: p.x + step }));
          if (e.key === "ArrowUp") setProbe((p) => ({ ...p, y: p.y - step }));
          if (e.key === "ArrowDown") setProbe((p) => ({ ...p, y: p.y + step }));
        }}
      >
        <line x1="-100" y1="0" x2="100" y2="0" stroke="#e3dfd4" />
        <line x1="0" y1="-80" x2="0" y2="80" stroke="#e3dfd4" />
        {charges.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="8" fill={c.q >= 0 ? "#0b1f3a" : "#c49a3c"} />
            <text x={c.x} y={c.y + 3} textAnchor="middle" fontSize="8" fill="#fbfaf6">
              {c.q > 0 ? "+" : "−"}
            </text>
          </g>
        ))}
        <circle cx={probe.x} cy={probe.y} r="3" fill="#c49a3c" />
        <line
          x1={probe.x}
          y1={probe.y}
          x2={probe.x + Math.max(-40, Math.min(40, E.x / 4000))}
          y2={probe.y + Math.max(-40, Math.min(40, E.y / 4000))}
          stroke="#0b1f3a"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#0b1f3a" />
          </marker>
        </defs>
      </svg>
      <p className="font-mono text-sm">
        E = ({Number.isFinite(E.x) ? E.x.toExponential(3) : "singular"}, {Number.isFinite(E.y) ? E.y.toExponential(3) : "singular"}) N/C
      </p>
      <p className="text-xs">Ex = {E.x.toFixed(0)} · Ey = {E.y.toFixed(0)} · superposition of Coulomb fields.</p>
      <div className="flex flex-wrap gap-2">
        {charges.map((c, i) => (
          <label key={i} className="text-xs">
            q{i + 1} (nC)
            <input
              type="number"
              className="ml-1 w-16 rounded border px-1"
              value={c.q}
              onChange={(e) =>
                setCharges((cs) => cs.map((x, j) => (j === i ? { ...x, q: Number(e.target.value) } : x)))
              }
            />
          </label>
        ))}
        <Button size="sm" variant="outline" onClick={() => { setCharges([{ q: 2, x: -40, y: 0 }, { q: 2, x: 40, y: 0 }]); setProbe({ x: 0, y: 0 }); }}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function GaussLab() {
  const [q, setQ] = useState(4);
  const [qx, setQx] = useState(60);
  const [radius, setRadius] = useState(30);
  const enclosed = Math.hypot(qx, 0) < radius;
  const flux = enclosed ? (q * 1e-9) / EPSILON_0 : 0;
  const Eedge = pointChargeField(q * 1e-9, { x: qx / 100, y: 0 }, { x: radius / 100, y: 0 });

  return (
    <div className="space-y-3">
      <svg viewBox="-100 -70 200 140" className="h-56 w-full rounded-lg border bg-white">
        <circle cx="0" cy="0" r={radius} fill="none" stroke="#c49a3c" strokeDasharray="4 3" />
        <circle cx={qx} cy="0" r="7" fill="#0b1f3a" />
      </svg>
      <p className="font-mono text-sm">
        Q_enc = {enclosed ? `${q} nC` : "0"} · Φ_net = {flux.toExponential(3)} N·m²/C · |E| at +x on the sphere ≈ {Number.isFinite(Eedge.x) ? Math.abs(Eedge.x).toExponential(3) : "—"} N/C
      </p>
      <p className="text-xs">Net flux follows Q_enc only. Local |E| does not vanish for an external charge.</p>
      <Label>Charge x-position (cm)</Label>
      <Slider value={[qx]} min={-80} max={80} onValueChange={(v) => setQx(sliderValue(v, qx))} />
      <Label>Gaussian radius (cm)</Label>
      <Slider value={[radius]} min={10} max={70} onValueChange={(v) => setRadius(sliderValue(v, radius))} />
      <Button size="sm" variant="outline" onClick={() => { setQ(4); setQx(60); setRadius(30); }}>
        Reset
      </Button>
    </div>
  );
}

function PotentialGraph() {
  const xs = Array.from({ length: 41 }, (_, i) => -2 + i * 0.1);
  const V = (x: number) => 4 * x - x ** 3;
  const E = (x: number) => -4 + 3 * x * x;
  const [x0, setX0] = useState(0.5);
  return (
    <div className="space-y-3">
      <svg viewBox="-2 -8 8 16" className="h-56 w-full rounded-lg border bg-white">
        <line x1="-2" y1="0" x2="6" y2="0" stroke="#e3dfd4" />
        <polyline fill="none" stroke="#0b1f3a" strokeWidth="0.08" points={xs.map((x) => `${x + 2},${-V(x)}`).join(" ")} />
        <polyline fill="none" stroke="#c49a3c" strokeWidth="0.08" points={xs.map((x) => `${x + 2},${-E(x) / 2}`).join(" ")} />
        <circle cx={x0 + 2} cy={-V(x0)} r="0.12" fill="#0b1f3a" />
      </svg>
      <p className="text-xs">Navy: V(x)=4x−x³ (V). Amber: E_x=−4+3x² (scaled). Reference V(0)=0 is a choice.</p>
      <p className="font-mono text-sm">
        x={x0.toFixed(2)} m · V={V(x0).toFixed(2)} V · E_x={E(x0).toFixed(2)} N/C
      </p>
      <Slider value={[x0]} min={-2} max={2} step={0.05} onValueChange={(v) => setX0(sliderValue(v, x0))} />
    </div>
  );
}

function CapacitorLab() {
  const [d, setD] = useState(1);
  const [kappa, setKappa] = useState(1);
  const [connected, setConnected] = useState(true);
  const A = 0.02;
  const Vbat = 12;
  const C0 = parallelPlateCapacitance(A, 0.001, 1);
  const [Qiso, setQiso] = useState(C0 * Vbat);
  const C = parallelPlateCapacitance(A, d * 0.001, kappa);
  const V = connected ? Vbat : Qiso / C;
  const Q = connected ? C * Vbat : Qiso;
  const U = capacitorEnergy(C, V, Q);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{connected ? "Battery connected — V fixed" : "Disconnected — Q fixed"}</p>
      <Button size="sm" variant="outline" onClick={() => { setConnected(!connected); if (connected) setQiso(C * Vbat); }}>
        Toggle battery
      </Button>
      <Label>Separation d (mm)</Label>
      <Slider value={[d]} min={0.5} max={4} step={0.1} onValueChange={(v) => setD(sliderValue(v, d))} />
      <Label>Dielectric κ</Label>
      <Slider value={[kappa]} min={1} max={6} step={0.1} onValueChange={(v) => setKappa(sliderValue(v, kappa))} />
      <dl className="grid grid-cols-2 gap-2 font-mono text-sm">
        <dt>C</dt><dd>{C.toExponential(3)} F</dd>
        <dt>Q</dt><dd>{Q.toExponential(3)} C</dd>
        <dt>V</dt><dd>{V.toFixed(2)} V</dd>
        <dt>U</dt><dd>{U.toExponential(3)} J</dd>
      </dl>
      <p className="text-xs">Check U = Q²/(2C) = ½CV². Fringing neglected. A = 0.020 m².</p>
    </div>
  );
}

function CircuitLab() {
  const [t, setT] = useState(0);
  const R = 2000;
  const C = 1e-6;
  const E = 9;
  const tau = R * C;
  const Qinf = C * E;
  const Q = rcCharge(Qinf, t, R, C, true);
  const I = ((Qinf - Q) / C) / R;
  return (
    <div className="space-y-3">
      <p className="text-sm">Series RC charging. τ = RC = {tau.toFixed(3)} s. Keyboard: [ and ] nudge time.</p>
      <svg viewBox="0 0 200 80" className="h-24 w-full rounded border bg-white" tabIndex={0} onKeyDown={(e) => {
        if (e.key === "]") setT((x) => Math.min(5 * tau, x + tau / 10));
        if (e.key === "[") setT((x) => Math.max(0, x - tau / 10));
      }}>
        <rect x="10" y="30" width="40" height="20" fill="none" stroke="#0b1f3a" />
        <text x="30" y="44" fontSize="8" textAnchor="middle">ε</text>
        <line x1="50" y1="40" x2="90" y2="40" stroke="#0b1f3a" />
        <path d="M90,40 l8,-8 l8,16 l8,-16 l8,16 l8,-8" fill="none" stroke="#0b1f3a" />
        <line x1="130" y1="40" x2="160" y2="40" stroke="#0b1f3a" />
        <line x1="160" y1="28" x2="160" y2="52" stroke="#0b1f3a" />
        <line x1="168" y1="32" x2="168" y2="48" stroke="#0b1f3a" />
      </svg>
      <Slider value={[t]} min={0} max={5 * tau} step={tau / 50} onValueChange={(v) => setT(sliderValue(v, t))} />
      <p className="font-mono text-sm">
        t={t.toFixed(3)} s · Q={Q.toExponential(3)} C · I={I.toExponential(3)} A · Q(τ)/Q∞={(rcCharge(Qinf, tau, R, C, true) / Qinf).toFixed(2)}
      </p>
      <Button size="sm" variant="outline" onClick={() => setT(0)}>Reset</Button>
    </div>
  );
}

function MagneticTrainer() {
  const [sign, setSign] = useState(1);
  const [vx, setVx] = useState(1);
  const [Bz, setBz] = useState(1);
  const F = lorentzForce2d(sign * 1.6e-19, { x: vx * 1e5, y: 0 }, Bz * 0.2);
  const dir = F.y < 0 ? "down the page" : F.y > 0 ? "up the page" : "none";
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 200 120" className="h-40 w-full rounded border bg-white">
        <defs>
          <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={Bz > 0 ? "#0b1f3a" : "#c49a3c"} />
          </pattern>
        </defs>
        <rect width="200" height="120" fill="url(#dots)" opacity="0.35" />
        <line x1="40" y1="60" x2="140" y2="60" stroke="#0b1f3a" strokeWidth="2" markerEnd="url(#a2)" />
        <line x1="100" y1="60" x2="100" y2={F.y < 0 ? 100 : 20} stroke="#c49a3c" strokeWidth="2" />
        <defs>
          <marker id="a2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#0b1f3a" />
          </marker>
        </defs>
      </svg>
      <p className="text-sm">
        Particle: {sign > 0 ? "proton" : "electron"} · v to the right · B {Bz > 0 ? "out of page" : "into page"} · F {dir}
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setSign((s) => -s)}>Flip charge sign</Button>
        <Button size="sm" variant="outline" onClick={() => setBz((b) => -b)}>Flip B</Button>
        <Button size="sm" variant="outline" onClick={() => { setSign(1); setVx(1); setBz(1); }}>Reset</Button>
      </div>
    </div>
  );
}

function InductionLab() {
  const [B0, setB0] = useState(0.4);
  const [alpha, setAlpha] = useState(0.05);
  const [t, setT] = useState(0);
  const [area, setArea] = useState(0.04);
  const B = B0 + alpha * t;
  const Phi = magneticFlux(B, area, 0);
  const emf = faradayEmf(alpha * area);
  return (
    <div className="space-y-3">
      <p className="text-sm">Φ = BA (θ=0). B = B0 + α t. ε = −α A, independent of B0.</p>
      <Label>t (s)</Label>
      <Slider value={[t]} min={0} max={4} step={0.05} onValueChange={(v) => setT(sliderValue(v, t))} />
      <Label>Area (m²)</Label>
      <Slider value={[area]} min={0.01} max={0.08} step={0.005} onValueChange={(v) => setArea(sliderValue(v, area))} />
      <Label>α = dB/dt (T/s)</Label>
      <Slider value={[alpha]} min={-0.1} max={0.1} step={0.005} onValueChange={(v) => setAlpha(sliderValue(v, alpha))} />
      <p className="font-mono text-sm">
        B={B.toFixed(3)} T · Φ={Phi.toExponential(3)} Wb · ε={emf.toExponential(3)} V
      </p>
      <Button size="sm" variant="outline" onClick={() => { setB0(0.4); setAlpha(0.05); setT(0); setArea(0.04); }}>Reset</Button>
    </div>
  );
}

function InductorLab() {
  const [L, setL] = useState(0.25);
  const [C, setC] = useState(4e-6);
  const [R, setR] = useState(0);
  const [mode, setMode] = useState<"lc" | "rl">("lc");
  const w = lcOmega(L, C);
  const tau = L / 20;
  const [t, setT] = useState(0);
  const Qm = 8e-6;
  const Q = Qm * Math.cos(w * t);
  const Iosc = -w * Qm * Math.sin(w * t);
  const Irl = rlCurrent(8, 20, L, t, true);
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" variant={mode === "lc" ? "default" : "outline"} onClick={() => setMode("lc")}>LC</Button>
        <Button size="sm" variant={mode === "rl" ? "default" : "outline"} onClick={() => setMode("rl")}>RL growth</Button>
      </div>
      {mode === "lc" ? (
        <>
          <p className="font-mono text-sm">ω = {w.toFixed(1)} rad/s (expect { (1/Math.sqrt(L*C)).toFixed(1) }) · R={R} Ω {R === 0 ? "(energy conserved)" : "(damping not plotted)"}</p>
          <Slider value={[t]} min={0} max={2 * Math.PI / w} step={0.0005} onValueChange={(v) => setT(sliderValue(v, t))} />
          <p className="font-mono text-sm">
            Q={Q.toExponential(3)} C · I={Iosc.toExponential(3)} A · U_E={(Q*Q)/(2*C)} · U_B={0.5*L*Iosc*Iosc}
          </p>
        </>
      ) : (
        <>
          <p className="text-sm">τ = L/R with R=20 Ω → {tau.toFixed(3)} s. I(∞)=0.40 A.</p>
          <Slider value={[t]} min={0} max={5 * tau} step={tau / 40} onValueChange={(v) => setT(sliderValue(v, t))} />
          <p className="font-mono text-sm">I={Irl.toFixed(3)} A</p>
        </>
      )}
      <Label>L (H)</Label>
      <Slider value={[L]} min={0.05} max={0.5} step={0.01} onValueChange={(v) => setL(sliderValue(v, L))} />
      <Button size="sm" variant="outline" onClick={() => { setL(0.25); setC(4e-6); setT(0); }}>Reset</Button>
    </div>
  );
}

export function lineFieldCheck(r: number) {
  return infiniteLineField(2e-6, r);
}

export function useReduced() {
  const { state } = useStudent();
  const [sys, setSys] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSys(mq.matches);
  }, []);
  return sys || Boolean(state.profile?.accessibility.reducedMotion);
}
