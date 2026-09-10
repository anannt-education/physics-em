export interface SignatureResource {
  slug: string;
  title: string;
  dek: string;
  reviewed: string;
  sections: { heading: string; body: string }[];
}

export const SIGNATURE_RESOURCES: SignatureResource[] = [
  {
    slug: "field-and-potential",
    title: "Field and potential comparison guide",
    dek: "Zero field is not zero potential. Zero potential is not zero field. The reference is a choice; the field is a local measurement.",
    reviewed: "2026-09-10",
    sections: [
      {
        heading: "Two different objects",
        body: "The electric field $\\vec{E}$ is a local vector: force per unit test charge at a point. The electric potential $V$ is a scalar set (up to a constant) by $\\Delta V = -\\int \\vec{E}\\cdot d\\vec{\\ell}$. Units already forbid treating them as the same quantity: N/C or V/m versus J/C or V. A surface integral of $\\vec{E}$ (flux) is a third object again.",
      },
      {
        heading: "When $V=0$ but $E\\ne 0$",
        body: "Midway between equal-and-opposite point charges, $V$ can be set to zero by symmetry if $V(\\infty)=0$, while $\\vec{E}$ is nonzero and points from $+$ to $-$. Choosing $V=0$ on a conductor likewise does not make $\\vec{E}=0$ outside it. Always state the reference.",
      },
      {
        heading: "When $E=0$ but $V\\ne 0$",
        body: "Inside a charged conducting shell in equilibrium, $\\vec{E}=0$ while $V$ is constant and generally not the same as $V(\\infty)$. A uniform field region can have $V$ changing along the field even if you pick a zero somewhere else. Constancy of $V$ on a connected conductor is the equilibrium statement, not a claim about the numerical value of that constant.",
      },
      {
        heading: "Graphs",
        body: "$E_x = -dV/dx$ in one dimension. A steep $V$ means a large $E$. A maximum or minimum of $V$ is where $E_x=0$. A flat $V$ is where $E_x=0$. Sign: if $V$ decreases in the $+x$ direction, $E_x$ is positive. Sketch both before computing.",
      },
      {
        heading: "Energy",
        body: "$U = qV$ for a test charge in an external potential (the external field must be prescribed; do not count the test charge’s self-energy). A positive charge loses $U$ as it moves to lower $V$; a negative charge does the opposite. Mechanical energy conservation needs a conservative $\\vec{E}$ and a declared reference.",
      },
    ],
  },
  {
    slug: "derivation-workbook",
    title: "Derivation workbook",
    dek: "The moves that actually appear on AP Physics C: E&M — source elements, Gaussian surfaces, loop equations, and Faraday’s law — written as checkable chains.",
    reviewed: "2026-09-10",
    sections: [
      {
        heading: "How to write a derivation that earns points",
        body: "Start with a named principle and a diagram. Define coordinates and the positive direction. Keep symbols until the last line. State the idealisation (infinite line, steady current, quasistatic). End with units and a limiting-case check. Alternate methods are allowed when they use a valid principle on the same situation.",
      },
      {
        heading: "Coulomb / superposition template",
        body: "For a continuous source: $d\\vec{E} = k\\,dq\\,\\hat{r}/r^2$. Choose $dq$ ($\\lambda dx$, $\\sigma dA$, $\\rho dV$). Cancel components that symmetry kills before integrating. Never integrate a vector by integrating its magnitude blindly. Check that $E\\to 0$ as $r\\to\\infty$ for a finite source.",
      },
      {
        heading: "Gauss template",
        body: "$\\oint \\vec{E}\\cdot d\\vec{A} = Q_{\\mathrm{enc}}/\\varepsilon_0$ is always true. Pulling $|\\vec{E}|$ out requires symmetry: $|\\vec{E}|$ constant on the chosen face and $\\vec{E}\\parallel\\hat{n}$ there, and vanishing flux on the others. If those fail, the law is still true and still useless for finding a single $E$. Enclosed charge is not “charge nearby.”",
      },
      {
        heading: "Circuit template",
        body: "Label a current direction in every branch. Kirchhoff junction: $\\sum I_{\\mathrm{in}} = \\sum I_{\\mathrm{out}}$. Loop: $\\sum \\Delta V = 0$ with a consistent travel direction — through a battery $+$ to $-$ is $-\\mathcal{E}$; through a resistor with the current is $-IR$. A negative solved current means the actual flow is opposite the arrow, not that Kirchhoff failed.",
      },
      {
        heading: "Faraday template",
        body: "$\\mathcal{E} = -d\\Phi_B/dt$ with $\\Phi_B = \\int \\vec{B}\\cdot d\\vec{A}$. Choose a loop orientation first; Lenz then names the induced current that opposes the change in flux, not the existing $\\vec{B}$. A large constant flux is compatible with $\\mathcal{E}=0$. Motion emf $\\mathcal{E}=B\\ell v$ is the special case of changing area in uniform $\\vec{B}$.",
      },
    ],
  },
  {
    slug: "error-atlas",
    title: "Error atlas",
    dek: "Named misconceptions Anannt tags in E&M, with the repair that actually changes the next unseen item — not a replay of the explanation.",
    reviewed: "2026-09-10",
    sections: [
      {
        heading: "flux-equals-local-field",
        body: "Claim: zero net flux means $\\vec{E}=0$ on the surface. Repair: exhibit a uniform field through a closed surface, or an external point charge. Net flux can vanish by cancellation. Then give an unseen off-centre enclosed charge: flux is $Q/\\varepsilon_0$ while $|\\vec{E}|$ is not constant. Replaying Gauss’s law as a slogan does not clear the tag.",
      },
      {
        heading: "zero-V-means-zero-E",
        body: "Claim: the reference point is a null field. Repair: dipole midplane, or $V=0$ on a grounded conductor with $\\sigma\\ne 0$. Ask the student to sketch $V(x)$ and $E_x(x)$ on the same axis.",
      },
      {
        heading: "equal-charge-on-connected-conductors",
        body: "Claim: wires force $Q_1=Q_2$. Repair: connected conductors share $V$, not $Q$. Capacitors in parallel share $V$; charges follow $C$. Isolated conductors sharing a net charge after contact equalise $V$, and $Q_i = C_i V$.",
      },
      {
        heading: "capacitor-energy-wrong-fixed-variable",
        body: "Claim: $U=\\tfrac12 C V^2$ always, even when the battery is disconnected and $C$ changes. Repair: name what is fixed. Battery connected $\\Rightarrow V$ fixed, $Q=CV$ changes, $U=\\tfrac12 C V^2$ rises with $C$. Battery disconnected $\\Rightarrow Q$ fixed, $V=Q/C$ falls, $U=Q^2/(2C)$ falls as $C$ rises.",
      },
      {
        heading: "current-continues-through-open-capacitor-branch",
        body: "Claim: a capacitor is a short at $t=0^+$ so a series inductor is irrelevant. Repair: $C$ is a short only relative to its own $dv/dt$ story; $L$ forbids a jump in $i_L$. Draw the $t=0^-$ and $t=0^+$ circuits separately.",
      },
      {
        heading: "lenz-opposes-B-not-change",
        body: "Claim: induced current creates $\\vec{B}$ opposite the applied field always. Repair: if flux of $+z$ field is decreasing, induced current tries to make $+z$ field. Oppose the change.",
      },
      {
        heading: "right-hand-rule-ignores-sign-of-q",
        body: "Claim: $\\vec{F}=q\\vec{v}\\times\\vec{B}$ direction is the fingers for every particle. Repair: reverse for $q<0$. An electron with $\\vec{v}\\parallel +x$ and $\\vec{B}\\parallel +z$ feels $\\vec{F}$ toward $-y$ if the proton would feel $+y$.",
      },
    ],
  },
  {
    slug: "circuit-initial-conditions",
    title: "Circuit initial-condition guide",
    dek: "The $t=0^-$ / $t=0^+$ / $t\\to\\infty$ discipline for RC, RL, and LC. Switching is a modelling step, not a memory trick.",
    reviewed: "2026-09-10",
    sections: [
      {
        heading: "What cannot jump",
        body: "Capacitor voltage $v_C$ is continuous unless an impulse of current is modelled. Inductor current $i_L$ is continuous unless an impulse of voltage is modelled. These are the contents of the energy stores $\\tfrac12 C v_C^2$ and $\\tfrac12 L i_L^2$. Resistor current can jump.",
      },
      {
        heading: "Capacitor views",
        body: "Uncharged $C$ at $t=0^+$ behaves as a short for the purpose of that instant’s resistor network (voltage still 0, current whatever the rest of the circuit demands). As $t\\to\\infty$ in a DC circuit, $C$ is an open. Always redraw.",
      },
      {
        heading: "Inductor views",
        body: "Unenergised $L$ at $t=0^+$ behaves as an open (current still 0). As $t\\to\\infty$ in DC, $L$ is a short. An inductor that already carries $I_0$ is a current source $I_0$ at $t=0^+$.",
      },
      {
        heading: "RC functions",
        body: "Charging toward $\\mathcal{E}$: $q(t)=C\\mathcal{E}(1-e^{-t/\\tau})$, $\\tau=RC$. Discharging: $q(t)=q_0 e^{-t/\\tau}$. The 63% language is about $\\tau$, not about “most of the charge.” A leaky capacitor (parallel $R_L$) changes the asymptote; 63% of the battery voltage is then the wrong target.",
      },
      {
        heading: "RL and LC",
        body: "RL growth: $i(t)=(\\mathcal{E}/R)(1-e^{-t/\\tau})$ with $\\tau=L/R$, $i(0)=0$. LC: $\\omega=1/\\sqrt{LC}$ for the ideal undamped oscillator; energy sloshes between $C$ and $L$. Damping from $R$ is enrichment unless the prompt includes $R$.",
      },
    ],
  },
  {
    slug: "frq-reasoning-clinic",
    title: "FRQ reasoning clinic",
    dek: "The four 2027 free-response categories are not the three science practices. Write so a human rubric can award each point.",
    reviewed: "2026-09-10",
    sections: [
      {
        heading: "The four categories (exam structure)",
        body: "Mathematical routines; translation between representations; experimental design and analysis; qualitative/quantitative translation. Anannt tags FRQs with these labels separately from science practices 1–3. Do not assume a four-practice framework.",
      },
      {
        heading: "What earns a derivation point",
        body: "A starting principle, a valid intermediate, and a result with units. Error-carried-forward is item-specific: follow that FRQ’s rubric, not a house rule. An unsupported boxed number with a correct value is weaker than a slightly algebra-flawed chain that shows the model.",
      },
      {
        heading: "Representations",
        body: "Label axes with quantity and unit. A graph of $E(r)$ for a uniformly charged insulating sphere is linear then $1/r^2$, continuous at $R$. A circuit diagram for an experiment must show the meter in a place that actually measures the claimed quantity.",
      },
      {
        heading: "Experimental design",
        body: "Name the independent variable, the measured quantity, what is held fixed, and how you would extract the target (slope of an appropriate linearisation, not “look at the data”). Identify Anannt labs as simulations. Physical laboratory work is recorded separately; College Board includes lab experience in AP physics education.",
      },
      {
        heading: "Handwriting and uploads",
        body: "Write on paper during a mock; upload after the section clock. Upload time is not response time. Unreadable symbols are not graded as if OCR were certain. Self-review, instructor review, and any later automated suggestion are labelled distinctly. Ungraded FRQ work is never converted to zero.",
      },
    ],
  },
];

export function resourceBySlug(slug: string) {
  return SIGNATURE_RESOURCES.find((r) => r.slug === slug);
}
