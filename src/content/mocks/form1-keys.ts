import type { Choice } from "@/lib/types";

export interface MockKey {
  correct: Choice["id"];
  explanation: string;
  distractorRationales: Partial<Record<Choice["id"], string>>;
}

/** Imported only from server routes — not from client components. */
export const MOCK1_KEYS: Record<string, MockKey> = {
  "m1-01": { correct: "A", explanation: "$F=k q^2/r^2=(8.99\\times 10^9)(2.0\\times 10^{-6})^2/(0.40)^2\\approx 0.22\\,\\mathrm{N}$.", distractorRationales: { B: "Missed $r^2$ or a factor of 10.", C: "Used $k=9\\times 10^9$ with charges in μC unconverted.", D: "Off by 10." } },
  "m1-02": { correct: "B", explanation: "Both pairwise forces on $+Q$ point toward the negative charge / away from $+q$, i.e. to the right.", distractorRationales: { A: "Equal magnitudes, same direction — they add.", C: "Opposite of both contributions.", D: "Collinear electrostatics in the plane." } },
  "m1-03": { correct: "A", explanation: "Total $+6\\,\\mu\\mathrm{C}$ shared equally.", distractorRationales: { B: "Ignored the negative sphere.", C: "No sharing.", D: "Signed sum is not zero." } },
  "m1-04": { correct: "B", explanation: "$F=|q|E=1.2\\,\\mu\\mathrm{N}$ opposite $\\vec{E}$ because $q<0$.", distractorRationales: { A: "Forgot the sign of $q$.", C: "Used $E$ as force.", D: "Force is not zero." } },
  "m1-05": { correct: "A", explanation: "Equal opposite fields at the midpoint of two like charges.", distractorRationales: { B: "No preferred +x.", C: "No preferred −x.", D: "Nothing in the problem points off-axis." } },
  "m1-06": { correct: "B", explanation: "Infinite line: $E\\propto 1/r$.", distractorRationales: { A: "Point-charge $1/r^2$.", C: "Inverted.", D: "Sheet, not line." } },
  "m1-07": { correct: "B", explanation: "Gauss’s law: net flux is $Q_{\\mathrm{enc}}/\\varepsilon_0=0$, not $E=0$.", distractorRationales: { A: "Integral vs local field.", C: "External charges allowed.", D: "Any closed surface." } },
  "m1-08": { correct: "B", explanation: "Uniform ball: $E\\propto r$ inside.", distractorRationales: { A: "Exterior formula with full $Q$.", C: "Conductor interior.", D: "Line-charge thinking." } },
  "m1-09": { correct: "A", explanation: "Nonconducting infinite sheet: $E=\\sigma/(2\\varepsilon_0)$.", distractorRationales: { B: "Conducting plane.", C: "Invented $1/x$.", D: "Point charge." } },
  "m1-10": { correct: "B", explanation: "Like charges, $U=ke^2/r>0$, larger at smaller $r$. Conservative: path independent.", distractorRationales: { A: "Opposite charges.", C: "Only at infinity.", D: "Electrostatics is conservative." } },
  "m1-11": { correct: "B", explanation: "Scalar $V$ cancels; vector $E$ from $+$ to $-$ does not.", distractorRationales: { A: "$E\\neq 0$.", C: "Ring centre, not dipole midpoint.", D: "Both defined." } },
  "m1-12": { correct: "B", explanation: "$\\Delta V=-E\\Delta x=-8.0\\,\\mathrm{V}$.", distractorRationales: { A: "Missed the minus.", C: "Not an equipotential along x.", D: "Quoted $E$." } },
  "m1-13": { correct: "A", explanation: "$E_x=-dV/dx=-10x=-4.0\\,\\mathrm{N/C}$.", distractorRationales: { B: "Dropped the minus.", C: "Did not evaluate.", D: "Quoted $V$ or $x^2$ slip." } },
  "m1-14": { correct: "B", explanation: "$K=q\\Delta V=100\\,\\mathrm{eV}$ for a proton from rest.", distractorRationales: { A: "Joules would be $1.6\\times 10^{-17}\\,\\mathrm{J}$, not 100 J.", C: "It gains $K$.", D: "Wrong conversion." } },
  "m1-15": { correct: "A", explanation: "Field cancels; every $dq$ is at distance $R$.", distractorRationales: { B: "Swapped E and V behaviour.", C: "$V\\neq 0$.", D: "Finite." } },
  "m1-16": { correct: "A", explanation: "$E=0$ throughout the conducting material.", distractorRationales: { B: "Exterior.", C: "Entire metal, not a point.", D: "Just outside." } },
  "m1-17": { correct: "B", explanation: "$Q\\propto R$ at common $V$, so $Q_{\\mathrm{small}}=Q/4$.", distractorRationales: { A: "Equal share.", C: "The larger sphere.", D: "All on the small one." } },
  "m1-18": { correct: "A", explanation: "$C=\\varepsilon_0 A/d\\approx 44\\,\\mathrm{pF}$.", distractorRationales: { B: "Off by 10 (mm vs m).", C: "nF too large.", D: "Missing $A/d$." } },
  "m1-19": { correct: "B", explanation: "$V$ fixed, $C$ falls, $U=\\tfrac12 CV^2$ falls.", distractorRationales: { A: "Isolated-$Q$ intuition.", C: "$C$ changed.", D: "Energy is positive." } },
  "m1-20": { correct: "B", explanation: "Isolated: $Q$ fixed, $C\\to 2C$, $V=Q/C$ halves.", distractorRationales: { A: "Battery-connected $Q$ change.", C: "$C$ changed.", D: "Wrong factor." } },
  "m1-21": { correct: "A", explanation: "$I=\\Delta Q/\\Delta t=4.0\\,\\mathrm{mA}$.", distractorRationales: { B: "Forgot milli.", C: "Mixed μC and ms.", D: "Wrong power of 10." } },
  "m1-22": { correct: "B", explanation: "$L\\times 2$, $A/2$, $R\\times 4$.", distractorRationales: { A: "Forgot area.", C: "Inverted.", D: "$\\rho$ unchanged, $R$ not." } },
  "m1-23": { correct: "B", explanation: "$I=2.0\\,\\mathrm{A}$, $P=I^2 R=24\\,\\mathrm{W}$.", distractorRationales: { A: "$18^2/6$ using full voltage.", C: "Power in the 3 Ω.", D: "Total battery power." } },
  "m1-24": { correct: "B", explanation: "$V=\\mathcal{E}-Ir=8.0\\,\\mathrm{V}$.", distractorRationales: { A: "Open-circuit emf.", C: "Charging sign.", D: "Just $Ir$." } },
  "m1-25": { correct: "A", explanation: "$5.0-1.5-2.0=1.5\\,\\mathrm{A}$ out.", distractorRationales: { B: "Added all.", C: "Left out a branch.", D: "Would violate conservation." } },
  "m1-26": { correct: "B", explanation: "Negative means opposite the assumed direction.", distractorRationales: { A: "Sign is conventional.", C: "Not zero.", D: "Dropped the sign." } },
  "m1-27": { correct: "A", explanation: "$6\\| 3=2\\,\\Omega$, plus $2\\,\\Omega$ is $4\\,\\Omega$; $I=12/4=3.0\\,\\mathrm{A}$.", distractorRationales: { B: "Used 6 Ω as series.", C: "Ignored series 2 Ω.", D: "Current in the 6 Ω." } },
  "m1-28": { correct: "B", explanation: "$V_C(0^+)=0$ so $I=\\mathcal{E}/R$.", distractorRationales: { A: "Long-time current.", C: "$Q_\\infty$, not current.", D: "Finite $R$." } },
  "m1-29": { correct: "A", explanation: "$RC=10\\,\\mathrm{ms}$.", distractorRationales: { B: "Arithmetic slip.", C: "Forgot μF.", D: "Off by 100." } },
  "m1-30": { correct: "B", explanation: "$\\hat{x}\\times\\hat{z}=-\\hat{y}$ (down if +y is up). Proton is positive.", distractorRationales: { A: "Electron, or reversed B.", C: "F ⟂ B.", D: "F ⟂ v." } },
  "m1-31": { correct: "A", explanation: "$qvB=mv^2/r$.", distractorRationales: { B: "Inverted.", C: "Electric force.", D: "Not a radius." } },
  "m1-32": { correct: "A", explanation: "$F=ILB=0.12\\,\\mathrm{N}$.", distractorRationales: { B: "Forgot $B$ or $L$.", C: "Not parallel.", D: "Off by 10." } },
  "m1-33": { correct: "A", explanation: "$B=\\mu_0 I/(2\\pi r)=4.0\\times 10^{-5}\\,\\mathrm{T}$.", distractorRationales: { B: "Forgot $2\\pi$.", C: "Loop-centre formula.", D: "Current produces B." } },
  "m1-34": { correct: "A", explanation: "Loop centre: $\\mu_0 I/(2R)$.", distractorRationales: { B: "Straight wire.", C: "No cancellation at the centre.", D: "Solenoid." } },
  "m1-35": { correct: "A", explanation: "$B=\\mu_0 n I=2.5\\times 10^{-3}\\,\\mathrm{T}$.", distractorRationales: { B: "Off by 10.", C: "Ideal exterior.", D: "Wire formula." } },
  "m1-36": { correct: "B", explanation: "Net enclosed current is zero outside.", distractorRationales: { A: "Between core and sheath.", C: "Solenoid.", D: "Finite." } },
  "m1-37": { correct: "A", explanation: "$\\Phi=BA=0.012\\,\\mathrm{Wb}$.", distractorRationales: { B: "$B/A$.", C: "$\\theta=0$ is maximum flux, not zero.", D: "Quoted $B$." } },
  "m1-38": { correct: "B", explanation: "$|\\mathcal{E}|=N|d\\Phi/dt|=0.20\\,\\mathrm{V}$.", distractorRationales: { A: "Forgot $N$.", C: "Flux changing.", D: "Quoted $N$ as volts." } },
  "m1-39": { correct: "A", explanation: "Oppose increase of out-of-page flux: induced B into the page, clockwise.", distractorRationales: { B: "Would add to the increase.", C: "Loop need not move.", D: "Current is around the loop." } },
  "m1-40": { correct: "B", explanation: "$\\mathcal{E}_L=-L dI/dt=0$ if $I$ is constant.", distractorRationales: { A: "Not emf.", C: "Energy, not emf.", D: "Only if $I$ jumps." } },
  "m1-41": { correct: "B", explanation: "Current cannot jump; $I(0^+)=0$.", distractorRationales: { A: "Long-time inductor.", C: "Wrong element.", D: "$L$ is not resistance." } },
  "m1-42": { correct: "A", explanation: "$\\omega=1/\\sqrt{LC}$.", distractorRationales: { B: "Missing reciprocal.", C: "RL time constant.", D: "RC." } },
};
