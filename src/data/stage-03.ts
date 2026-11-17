import type { StudyStage } from '../types/study';

export const stage03: StudyStage = {
  id: 3,
  part: 'A',
  partTitle: 'Foundations (Unit I)',
  title: 'The rules of quantum mechanics',
  subtitle:
    'Energy operator, then the equation that evolves a state, then the postulates, then a worked application.',
  questions: [
    {
      number: 8,
      question: 'What is Hamiltonian operator? Explain.',
      sourceTag: 'Mid 1 · Unit I · Q4',
      marks: 5,
      intuition:
        'Just as total energy (kinetic + potential) drives motion in classical physics, the Hamiltonian operator represents total energy in quantum mechanics and dictates how any state evolves in time.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>The <strong>Hamiltonian operator (<span class="math-inline">Ĥ</span>)</strong> is the quantum mechanical operator corresponding to the <strong>total energy</strong> of a system—the sum of its kinetic energy operator (<span class="math-inline">T̂</span>) and potential energy operator (<span class="math-inline">V̂</span>).</p>`,
        },
        {
          label: '(b) Mathematical Construction Step by Step',
          html: `<ol>
            <li>Classically, total energy is <span class="math-inline">E = K.E. + P.E. = p²/(2m) + V(x)</span>.</li>
            <li>In 1D quantum mechanics, momentum becomes the differential operator <span class="math-inline">p̂ = −iℏ (d/dx)</span>, so <span class="math-inline">p̂² = −ℏ² (d²/dx²)</span>.</li>
            <li>Substituting into <span class="math-inline">Ĥ = T̂ + V̂</span> yields the 1D Hamiltonian operator, which must be <strong>Hermitian</strong> (<span class="math-inline">Ĥ = Ĥ†</span>) so energy eigenvalues are real and probabilities remain conserved during time evolution <span class="math-inline">U(t) = e^(−iĤt/ℏ)</span>.</li>
          </ol>`,
        },
        {
          label: '(c) Operator Formula & Diagram',
          html: `<div class="math-block">Ĥ = T̂ + V̂ = −(ℏ² / 2m) · (d²/dx²) + V(x)<br/>Time-independent Schrödinger equation: Ĥψ = Eψ<br/>Time-dependent Schrödinger equation: iℏ (∂ψ/∂t) = Ĥψ</div>`,
          image: {
            file: 'hamiltonian_operator.png',
            caption: 'Fig. Hamiltonian operator combining kinetic and potential energy operators',
            source: '1unit qst/13c operators and observables - Hamiltonian operator.pptx · slide 8',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Worked Examples',
          html: `<p>For a <strong>free particle</strong>, <span class="math-inline">V(x) = 0</span>, so <span class="math-inline">Ĥ = p̂²/(2m)</span> and every momentum state <span class="math-inline">|p⟩</span> has energy <span class="math-inline">E = p²/(2m)</span>. For a 2-level matrix Hamiltonian <span class="math-inline">H = <table class="q-matrix"><tr><td>0</td><td>1−i</td></tr><tr><td>1+i</td><td>2</td></tr></table></span>, taking the conjugate transpose gives <span class="math-inline">H† = H</span>, confirming that it is Hermitian.</p>`,
        },
        {
          label: '(e) Uses',
          html: `<p>Used in finding allowed atomic energy levels (<span class="math-inline">Ĥψ = Eψ</span>), designing quantum logic gates (<span class="math-inline">U = e^(−iĤt/ℏ)</span>), and simulating molecules and materials.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>The Hamiltonian is the single most important operator in quantum theory because it gives both the allowed energy spectrum and the rule for time evolution.</p>`,
        },
      ],
      studySource: '1unit qst/13c operators and observables - Hamiltonian operator.pptx (slide 8) & 2unit qst/7 Hilbert Hermitian hamiltonian.pptx (slide 5).',
      rememberThese: [
        '<span class="math-inline">Ĥ = T̂ + V̂ = −(ℏ²/2m)(d²/dx²) + V(x)</span>',
        'Must be Hermitian (<span class="math-inline">Ĥ = Ĥ†</span>) ⇒ real energies & orthogonal stationary states',
        'Drives time evolution via <span class="math-inline">iℏ ∂ψ/∂t = Ĥψ</span>',
      ],
    },
    {
      number: 9,
      question: 'Describe information of a quantum system using Schrödinger wave equation.',
      sourceTag: 'Mid 1 · Unit I · Q3',
      marks: 5,
      intuition:
        'Schrödinger’s wave equation plays the exact same role in quantum physics as Newton’s F = ma in classical physics: once you know the potential V(x), it tells you the wavefunction Ψ—which holds everything measurable about the particle.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>Formulated by Erwin Schrödinger (1926), the <strong>Schrödinger wave equation</strong> describes how a quantum particle’s wave function <span class="math-inline">Ψ(x, t)</span> evolves in space and time under forces represented by potential energy <span class="math-inline">V</span>.</p>`,
        },
        {
          label: '(b) Both Forms Explained Step by Step',
          html: `<ol>
            <li><strong>Time-Dependent Schrödinger Equation (TDSE):</strong> Gives the full evolution of <span class="math-inline">Ψ(x,t)</span> over time. Here <span class="math-inline">∂/∂x</span> relates to momentum and <span class="math-inline">∂²/∂x²</span> relates to kinetic energy.</li>
            <li><strong>Time-Independent Schrödinger Equation (TISE):</strong> When <span class="math-inline">V(x)</span> does not vary with time, separating variables (<span class="math-inline">Ψ(x,t) = ψ(x)e^(−iEt/ℏ)</span>) gives stationary energy states and discrete quantized energy levels <span class="math-inline">E</span>.</li>
            <li><strong>Information extracted from <span class="math-inline">Ψ(x,t)</span>:</strong>
              <ul>
                <li><em>Probability density:</em> <span class="math-inline">|Ψ(x,t)|²</span> gives the probability per unit length of finding the particle near <span class="math-inline">x</span> (Born interpretation), with normalization <span class="math-inline">∫|Ψ|²dx = 1</span>.</li>
                <li><em>Energy & Observables:</em> Allowed energy eigenvalues <span class="math-inline">E_n</span> and expectation values <span class="math-inline">⟨Â⟩ = ∫Ψ* Â Ψ dx</span>.</li>
              </ul>
            </li>
          </ol>`,
        },
        {
          label: '(c) Equations & Diagrams',
          html: `<div class="math-block">TDSE: iℏ ∂Ψ(x,t)/∂t = [ −(ℏ² / 2m) ∇² + V(x,t) ] Ψ(x,t)<br/>TISE: −(ℏ² / 2m) d²ψ(x)/dx² + V(x)ψ(x) = Eψ(x)</div>`,
          image: {
            file: 'schrodinger_tdse.png',
            caption: 'Fig. 1: Time-Dependent Schrödinger Equation and symbol definitions',
            source: '1unit qst/1unit history.pptx · slide 4 (and 7 Scrodinger eqn.pptx · slide 4)',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Stationary State Equation & Worked Example',
          html: `<p>Applying TISE to an <strong>infinite potential well</strong> of width <span class="math-inline">L</span> (<span class="math-inline">V=0</span> inside, <span class="math-inline">∞</span> outside) forces <span class="math-inline">ψ(0)=ψ(L)=0</span>, giving standing waves <span class="math-inline">ψ_n(x) = √(2/L) sin(nπx/L)</span> and discrete energies <span class="math-inline">E_n = n²π²ℏ² / (2mL²)</span>.</p>`,
          image: {
            file: 'schrodinger_tise.png',
            caption: 'Fig. 2: Time-Independent Schrödinger Equation for stationary states and allowed energies',
            source: '1unit qst/7 Scrodinger eqn.pptx · slide 7',
            placement: 'inline-bottom',
          },
        },
        {
          label: '(e) Uses',
          html: `<p>Predicts atomic spectra, electron behavior in semiconductors, quantum tunneling across potential barriers, and quantum gate evolution.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>Solving the Schrödinger equation for <span class="math-inline">Ψ</span> gives complete probabilistic, energy, and time-evolution information about any quantum system.</p>`,
        },
      ],
      studySource: '1unit qst/7 Scrodinger eqn.pptx (slides 1–7), 1unit qst/1unit history.pptx (slide 4), & 1unit qst/9 Infinite potential well.docx.',
      rememberThese: [
        'Role = quantum equivalent of Newton’s <span class="math-inline">F = ma</span>',
        'TDSE: <span class="math-inline">iℏ ∂Ψ/∂t = −(ℏ²/2m)∇²Ψ + VΨ</span>',
        'TISE: <span class="math-inline">−(ℏ²/2m)∇²ψ + Vψ = Eψ</span> (gives stationary states)',
        '<span class="math-inline">|Ψ(x,t)|²</span> = probability density; <span class="math-inline">ℏ = h / (2π) = 1.055 × 10⁻³⁴ J·s</span>',
      ],
    },
    {
      number: '9a',
      question: 'Free particle energy',
      sourceTag: 'Added from attached PDF · Unit I · Q5',
      marks: 2,
      intuition:
        'Without confining walls (<span class="math-inline">V = 0</span>), no standing-wave quantization condition traps the wavelength, so a free particle can carry any non-negative energy.',
      sections: [
        {
          html: `<p>A <strong>free particle</strong> experiences zero potential energy (<span class="math-inline">V(x) = 0</span>), so its time-independent Schrödinger equation <span class="math-inline">−(ℏ²/2m)(d²ψ/dx²) = Eψ</span> has plane-wave solutions <span class="math-inline">ψ(x) = A e^(ikx)</span> with energy <span class="math-inline">E = ℏ²k² / (2m) = p² / (2m)</span>. Because no boundary walls confine the particle, <span class="math-inline">k</span> is unrestricted and the allowed energy spectrum is <strong>continuous</strong> (<span class="math-inline">E ≥ 0</span>).</p>`,
        },
      ],
      studySource:
        '1unit qst/8 Free particle.docx, 1unit qst/7 Scrodinger eqn.pptx, & attached PDF (Unit I · Short Q5).',
      noDiagramNote:
        '1unit qst/8 Free particle.docx explains free-particle states in text without a saved figure.',
      rememberThese: [
        'Formula: <span class="math-inline">E = ℏ²k² / (2m) = p² / (2m)</span> (<span class="math-inline">V = 0</span>)',
        'Spectrum is continuous because no boundary conditions restrict <span class="math-inline">k</span>',
      ],
    },
    {
      number: 10,
      question: 'Write any two quantum postulates.',
      sourceTag: 'Mid 1 · Unit I · Q5',
      marks: 2,
      intuition:
        'Quantum postulates are the basic ground rules—like axioms in geometry—that tell us how states are stored and how measurements produce numbers.',
      sections: [
        {
          html: `<ol>
            <li><strong>State Postulate:</strong> Every isolated physical quantum system is completely described by a normalized unit vector <span class="math-inline">|ψ⟩</span> (<span class="math-inline">⟨ψ|ψ⟩ = 1</span>) in a complex Hilbert space; for a qubit, <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span> with <span class="math-inline">|α|² + |β|² = 1</span>.</li>
            <li><strong>Measurement & Probability (Born Rule) Postulate:</strong> Measuring an observable yields an eigenvalue of its Hermitian operator (<span class="math-inline">A = A†</span>) with probability <span class="math-inline">P(m) = |⟨m|ψ⟩|²</span>, and immediately collapses the state into the eigenstate <span class="math-inline">|m⟩</span>.</li>
          </ol>`,
          image: {
            file: 'postulates_summary.png',
            caption: 'Fig. Summary of the foundational postulates of quantum mechanics',
            source: '1unit qst/13f quantum postulates.pptx · slide 11',
            placement: 'inline-bottom',
          },
        },
      ],
      studySource: '1unit qst/13f quantum postulates.pptx (slide 11).',
      rememberThese: [
        '1. States → normalized vectors in Hilbert space (<span class="math-inline">⟨ψ|ψ⟩ = 1</span>)',
        '2. Observables → Hermitian operators (<span class="math-inline">A = A†</span>)',
        '3. Measurement → eigenvalues + collapse; Probabilities = <span class="math-inline">|⟨m|ψ⟩|²</span>',
        '5. Time evolution → Schrödinger equation / Unitary operators',
      ],
    },
    {
      number: '10a',
      question: 'Commutator',
      sourceTag: 'Added from attached PDF · Unit I · Q7',
      marks: 2,
      intuition:
        'The commutator tests whether applying two operations in reversed order changes the outcome—when it is zero, both observables can be sharply measured together.',
      sections: [
        {
          html: `<p>The <strong>commutator</strong> of two operators <span class="math-inline">Â</span> and <span class="math-inline">B̂</span> is defined as <span class="math-inline">[Â, B̂] = ÂB̂ − B̂Â</span>. If <span class="math-inline">[Â, B̂] = 0</span>, the observables commute and share simultaneous eigenstates; if non-zero—as in the canonical relation <span class="math-inline">[x̂, p̂] = iℏ</span>—they are incompatible and obey an uncertainty relation.</p>`,
        },
      ],
      studySource:
        '1unit qst/13d operators and observables -commutation relations.pptx & attached PDF (Unit I · Short Q7).',
      noDiagramNote:
        '1unit qst/13d operators and observables -commutation relations.pptx defines [Â, B̂] and derives [x̂, p̂] = iℏ algebraically.',
      rememberThese: [
        'Definition: <span class="math-inline">[Â, B̂] = ÂB̂ − B̂Â</span>',
        'Canonical position–momentum commutator: <span class="math-inline">[x̂, p̂] = iℏ</span>',
      ],
    },
    {
      number: '10b',
      question: 'Uncertainty principle',
      sourceTag: 'Added from attached PDF · Unit I · Q10',
      marks: 2,
      intuition:
        'Because position and momentum do not commute, squeezing a quantum wave tightly in space spreads out its momentum wavelengths—a fundamental law of nature, not an instrument flaw.',
      sections: [
        {
          html: `<p><strong>Heisenberg’s uncertainty principle</strong> states that it is fundamentally impossible to simultaneously measure certain pairs of non-commuting observables, such as position <span class="math-inline">x</span> and momentum <span class="math-inline">p</span>, with arbitrary precision. Their standard deviations satisfy <span class="math-inline">Δx · Δp ≥ ℏ / 2</span> (generally <span class="math-inline">ΔA · ΔB ≥ ½ |⟨[Â, B̂]⟩|</span>), explaining atomic stability and zero-point energy.</p>`,
        },
      ],
      studySource:
        '1unit qst/13a operators and observables -uncertainty principle.pptx & attached PDF (Unit I · Short Q10).',
      noDiagramNote:
        '1unit qst/13a operators and observables -uncertainty principle.pptx presents Δx·Δp ≥ ℏ/2 algebraically without a standalone diagram needed here.',
      rememberThese: [
        'Position–momentum bound: <span class="math-inline">Δx · Δp ≥ ℏ / 2</span>',
        'General bound: <span class="math-inline">ΔA · ΔB ≥ ½ |⟨[Â, B̂]⟩|</span>',
      ],
    },
    {
      number: 11,
      question: 'Discuss how the behavior of particle changes due to step potential.',
      sourceTag: 'Mid 1 · Unit I · Q10',
      marks: 5,
      intuition:
        'Think of rolling a ball toward a sudden raised platform of height V₀: classically it either climbs over or bounces straight back, but as a quantum matter wave it partly reflects even when it has enough energy, and partly leaks (tunnels) into the step even when it doesn’t.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>A <strong>step potential</strong> has a sudden jump in potential energy at <span class="math-inline">x = 0</span>: <span class="math-inline">V(x) = 0</span> for <span class="math-inline">x &lt; 0</span> and <span class="math-inline">V(x) = V₀</span> for <span class="math-inline">x ≥ 0</span>. Because a quantum particle behaves as a wave, meeting this step causes partial reflection, transmission, or exponential penetration depending on whether particle energy <span class="math-inline">E</span> is above or below <span class="math-inline">V₀</span>.</p>`,
        },
        {
          label: '(b) Behavior in the Two Energy Cases',
          html: `<ol>
            <li><strong>Case 1: <span class="math-inline">E &gt; V₀</span> (Energy above step):</strong>
              <ul>
                <li>Classically, 100% of particles pass into <span class="math-inline">x &gt; 0</span> with lower speed.</li>
                <li>Quantum mechanically, wavefunctions are oscillatory on both sides (<span class="math-inline">k₁ = √(2mE)/ℏ</span> and <span class="math-inline">k₂ = √(2m(E−V₀))/ℏ</span>). Matching continuity of <span class="math-inline">ψ</span> and <span class="math-inline">dψ/dx</span> at <span class="math-inline">x = 0</span> yields <strong>partial reflection</strong> and <strong>partial transmission</strong> (<span class="math-inline">R &gt; 0</span>, <span class="math-inline">R + T = 1</span>).</li>
              </ul>
            </li>
            <li><strong>Case 2: <span class="math-inline">E &lt; V₀</span> (Energy below step):</strong>
              <ul>
                <li>Classically, zero particles can enter <span class="math-inline">x &gt; 0</span>; all bounce back.</li>
                <li>Quantum mechanically, although total reflection occurs (<span class="math-inline">R = 1</span>), the wavefunction does <em>not</em> drop abruptly to zero at <span class="math-inline">x = 0</span>; it decays exponentially inside the barrier as <span class="math-inline">ψ(x) = C e^(−αx)</span>, where <span class="math-inline">α = √(2m(V₀−E))/ℏ</span>. If the barrier is finite in width, this evanescent tail leads to <strong>quantum tunneling</strong>.</li>
              </ul>
            </li>
          </ol>`,
          image: {
            file: 'step_potential_cases.jpg',
            caption: 'Fig. Step potential wavefunctions for Case 1 (E > V₀) and Case 2 (E < V₀)',
            source: '1unit qst/10 step potential.docx · rId5',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Boundary Conditions & Equations',
          html: `<div class="math-block">Continuity at x = 0: &nbsp; ψ₁(0) = ψ₂(0) &nbsp; and &nbsp; dψ₁/dx|₀ = dψ₂/dx|₀<br/>Case 1 (E &gt; V₀): ψ₂(x) = C e^(ik₂x), &nbsp; R = ((k₁ − k₂)/(k₁ + k₂))², &nbsp; T = 4k₁k₂ / (k₁ + k₂)²<br/>Case 2 (E &lt; V₀): ψ₂(x) = C e^(−αx), &nbsp; R = 1, &nbsp; T = 0 (infinite step)</div>`,
        },
        {
          label: '(d) Numerical Example',
          html: `<p>If an electron with <span class="math-inline">E = 9 eV</span> encounters a potential step <span class="math-inline">V₀ = 5 eV</span>, then <span class="math-inline">k₁ ∝ √9 = 3</span> and <span class="math-inline">k₂ ∝ √4 = 2</span>. Even though <span class="math-inline">E &gt; V₀</span>, the quantum reflection probability is <span class="math-inline">R = ((3−2)/(3+2))² = 1/25 = 4%</span>.</p>`,
        },
        {
          label: '(e) Uses & Significance',
          html: `<p>Step and barrier potentials explain electron reflection in heterostructures, scanning tunneling microscopes (STM), alpha decay, and Josephson junctions in superconducting qubits.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>A step potential highlights two purely quantum behaviors: partial reflection when <span class="math-inline">E &gt; V₀</span> and nonzero wave penetration into the classically forbidden region when <span class="math-inline">E &lt; V₀</span>.</p>`,
        },
      ],
      studySource: '1unit qst/10 step potential.docx (rId5).',
      rememberThese: [
        'Continuity at <span class="math-inline">x = 0</span>: both <span class="math-inline">ψ</span> and <span class="math-inline">dψ/dx</span> must match',
        '<span class="math-inline">E &gt; V₀</span> ⇒ oscillatory wave both sides + partial reflection (<span class="math-inline">R + T = 1</span>)',
        '<span class="math-inline">E &lt; V₀</span> ⇒ evanescent exponential decay <span class="math-inline">e^(−αx)</span> inside barrier (foundation of tunneling)',
      ],
    },
  ],
};
