import type { StudyStage } from '../types/study';

export const stage06: StudyStage = {
  id: 6,
  part: 'B',
  partTitle: 'Qubits, gates and entanglement',
  title: 'No-cloning and teleportation',
  subtitle:
    'An unknown state can’t be copied, so it is moved instead, using an entangled pair and two classical bits.',
  questions: [
    {
      number: 19,
      question: 'State and explain no cloning theorem.',
      sourceTag: 'Mid 1 · Unit II · Q6',
      marks: 5,
      intuition:
        'Unitary gates are strictly linear—like a flat mirror, they cannot square amplitudes into α² and β²—so no machine can duplicate an arbitrary unknown qubit without first measuring and destroying it.',
      sections: [
        {
          label: '(a) Statement',
          html: `<p>The <strong>No-Cloning Theorem</strong> (Wootters & Zurek, 1982) states that <strong>it is impossible to create an independent and identical copy of an arbitrary unknown quantum state</strong>.</p>`,
        },
        {
          label: '(b) Algebraic Proof by Linearity (Step by Step)',
          html: `<ol>
            <li>Suppose a copying unitary circuit <span class="math-inline">U</span> exists that copies any arbitrary qubit <span class="math-inline">|φ⟩ = α|0⟩ + β|1⟩</span> onto a blank qubit initially in <span class="math-inline">|0⟩</span>:
              <div class="math-block">Input state: &nbsp;|ψ_i⟩ = |0⟩ ⊗ |φ⟩ = <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> ⊗ <table class="q-matrix"><tr><td>α</td></tr><tr><td>β</td></tr></table> = <table class="q-matrix"><tr><td>α</td></tr><tr><td>β</td></tr><tr><td>0</td></tr><tr><td>0</td></tr></table></div>
            </li>
            <li>The desired cloned output state is <span class="math-inline">|φ⟩ ⊗ |φ⟩</span>:
              <div class="math-block">Target output: &nbsp;|ψ_o⟩ = |φ⟩ ⊗ |φ⟩ = <table class="q-matrix"><tr><td>α</td></tr><tr><td>β</td></tr></table> ⊗ <table class="q-matrix"><tr><td>α</td></tr><tr><td>β</td></tr></table> = <table class="q-matrix"><tr><td>α²</td></tr><tr><td>αβ</td></tr><tr><td>αβ</td></tr><tr><td>β²</td></tr></table></div>
            </li>
            <li>Compare the two: by <strong>linearity</strong>, a unitary matrix <span class="math-inline">U(|0⟩ ⊗ (α|0⟩ + β|1⟩))</span> can only produce terms linear in <span class="math-inline">α</span> and <span class="math-inline">β</span>, specifically <span class="math-inline">α U(|00⟩) + β U(|01⟩) = α|00⟩ + β|11⟩</span> (via CNOT), <em>never</em> quadratic cross-terms <span class="math-inline">α², αβ, β²</span> unless <span class="math-inline">α=0</span> or <span class="math-inline">β=0</span>.</li>
          </ol>`,
        },
        {
          label: '(c) Known Basis States vs. Arbitrary Unknown States',
          html: `<p>A CNOT gate copies <em>classical basis states</em> (<span class="math-inline">|0⟩ → |00⟩</span>, <span class="math-inline">|1⟩ → |11⟩</span>), because <span class="math-inline">α=1,β=0</span> or <span class="math-inline">α=0,β=1</span> makes <span class="math-inline">αβ = 0</span>. For any unknown superposition, cloning fails and entangles the two qubits instead.</p>`,
        },
        {
          label: '(d) Uses & Role in QKD',
          html: `<p>The No-Cloning Theorem guarantees the physical security of <strong>Quantum Key Distribution (BB84)</strong>: an eavesdropper Eve cannot intercept a photon, clone a copy to measure later, and pass the original untouched to Bob.</p>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>Because unitary evolution is linear and unknown state parameters cannot be read without collapse, arbitrary quantum states cannot be cloned—making quantum teleportation and QKD security possible.</p>`,
        },
      ],
      studySource: '1unit qst/11 no cloning theorem.docx & 2unit qst/10 no cloning.docx.',
      noDiagramNote:
        '1unit qst/11 no cloning theorem.docx & 2unit qst/10 no cloning.docx prove this algebraically via vectors |ψ_i⟩ = [α, β, 0, 0]ᵀ vs |ψ_o⟩ = [α², αβ, αβ, β²]ᵀ without a separate graphic.',
      rememberThese: [
        'Impossible to copy an <strong>arbitrary unknown</strong> quantum state',
        'Reason: <strong>Unitary operators are linear</strong> (<span class="math-inline">[α,β,0,0]ᵀ</span> cannot map to <span class="math-inline">[α²,αβ,αβ,β²]ᵀ</span>)',
        'Classical/orthogonal basis states (<span class="math-inline">|0⟩, |1⟩</span>) <em>can</em> be copied by CNOT',
        'Protects BB84 QKD from eavesdropping',
      ],
    },
    {
      number: '19a',
      question: 'No-cloning theorem',
      sourceTag: 'Added from attached PDF · Unit II · Q8',
      marks: 2,
      intuition:
        'Unitary operations are linear, so they can copy known 0 or 1 states, but no single machine can duplicate an arbitrary unknown superposition.',
      sections: [
        {
          html: `<p>The <strong>No-Cloning Theorem</strong> (Wootters and Zurek, 1982) states that no unitary quantum operation can create an exact, independent copy of an arbitrary unknown quantum state <span class="math-inline">|ψ⟩</span>. Because unitary evolution is linear, only known orthogonal states (such as <span class="math-inline">|0⟩</span> and <span class="math-inline">|1⟩</span>) can be cloned, which underpins the security of quantum key distribution.</p>`,
        },
      ],
      studySource:
        '1unit qst/11 no cloning theorem.docx, 2unit qst/10 no cloning.docx, & attached PDF (Unit II · Short Q8).',
      noDiagramNote:
        'Concise 2-mark statement; see Q19 for the full algebraic proof by linearity.',
      rememberThese: [
        'Unknown arbitrary quantum states cannot be copied',
        'Proof basis: linearity / inner-product preservation of unitary operators',
      ],
    },
    {
      number: 20,
      question: 'What is quantum teleportation?',
      sourceTag: 'Mid 2 · Unit IV · Short Q6',
      marks: 2,
      intuition:
        'Because you cannot clone an unknown quantum state, teleportation uses shared entanglement plus two ordinary classical bits to reconstruct the exact state at a remote receiver while destroying the original at the sender.',
      sections: [
        {
          html: `<p><strong>Quantum teleportation</strong> is a protocol that transfers an unknown quantum state <span class="math-inline">|ψ⟩</span> from a sender (Alice) to a distant receiver (Bob) using a pre-shared entangled Bell pair and two classical communication bits—without physically sending the qubit itself. Alice’s measurement destroys her original copy (respecting the no-cloning theorem), and Bob applies a Pauli correction gate (<span class="math-inline">I, X, Z, ZX</span>) to recover <span class="math-inline">|ψ⟩</span>.</p>`,
        },
      ],
      studySource: '2unit qst/11b quantum teleportation eg.docx & 2unit qst/11a quantum teleportaion State transfer.docx.',
      noDiagramNote:
        'Concise 2-mark definition; see Q21 and Q22 for the state-transfer circuit and full 3-qubit teleportation protocol.',
      rememberThese: [
        'Transfers quantum <em>state</em> (information), not the physical particle',
        'Requires: 1 shared Bell pair + 2 classical bits',
        'Respects no-cloning & relativity (cannot send faster than light)',
      ],
    },
    {
      number: 21,
      question: 'Write about quantum teleportation principle for state transfer.',
      sourceTag: 'Mid 1 · Unit II · Q7',
      marks: 5,
      intuition:
        'By reversing an entangling Bell circuit using CX, Hadamard, and CZ operations, the amplitudes (α, β) sitting on qubit q₀ are cleanly swapped onto qubit q₁ without ever measuring α or β.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>The <strong>quantum teleportation principle for state transfer</strong> transfers an unknown quantum state <span class="math-inline">|φ⟩ = α|0⟩ + β|1⟩</span> from one qubit register (<span class="math-inline">q₀</span>) to another (<span class="math-inline">q₁</span>) without cloning it or directly reading its unknown amplitudes.</p>`,
        },
        {
          label: '(b) Circuit Schematic for State Transfer',
          html: `<p>Let <span class="math-inline">q₀</span> initially hold the unknown state <span class="math-inline">|φ⟩ = α|0⟩ + β|1⟩</span>, and <span class="math-inline">q₁</span> start in <span class="math-inline">|0⟩</span>:</p>`,
          image: {
            file: 'teleportation_circuit.png',
            caption: 'Fig. Quantum state transfer circuit using CX (q₀→q₁), Hadamard on q₀, and CZ',
            source: '2unit qst/11a quantum teleportaion State transfer.docx · rId4 (and 1unit qst/12 quantum teleportation.docx · rId5)',
            placement: 'inline-top',
          },
        },
        {
          label: '(c) Mathematical Derivation Step by Step',
          html: `<ol>
            <li><strong>Step 1 (Composite Initial State):</strong> Using tensor product ordering <span class="math-inline">|q₁⟩ ⊗ |q₀⟩</span>:
              <div class="math-block">|ψ₁⟩ = |0⟩ ⊗ |φ⟩ = |0⟩(α|0⟩ + β|1⟩) = α|0⟩|0⟩ + β|0⟩|1⟩</div>
            </li>
            <li><strong>Step 2 (Apply CNOT / CX from q₀ to q₁):</strong> When <span class="math-inline">q₀ = |1⟩</span>, flip <span class="math-inline">q₁</span>:
              <div class="math-block">|ψ₂⟩ = CX |ψ₁⟩ = α|0⟩|0⟩ + β|1⟩|1⟩</div>
            </li>
            <li><strong>Step 3 (Apply Hadamard to q₀):</strong> Applying <span class="math-inline">I ⊗ H</span> turns <span class="math-inline">|0⟩ → |+⟩</span> and <span class="math-inline">|1⟩ → |−⟩</span> on <span class="math-inline">q₀</span>:
              <div class="math-block">|ψ₃⟩ = (I ⊗ H)|ψ₂⟩ = α|0⟩|+⟩ + β|1⟩|−⟩ = (1/√2)(α|00⟩ + α|01⟩ + β|10⟩ − β|11⟩)</div>
            </li>
            <li><strong>Step 4 (Apply Controlled-Z, CZ):</strong> Flips the sign of <span class="math-inline">|11⟩</span> from <span class="math-inline">−</span> back to <span class="math-inline">+</span>:
              <div class="math-block">|ψ₄⟩ = CZ |ψ₃⟩ = (1/√2)(α|00⟩ + α|01⟩ + β|10⟩ + β|11⟩) = (α|0⟩ + β|1⟩) ⊗ (|0⟩ + |1⟩)/√2 = |φ⟩ ⊗ |+⟩</div>
            </li>
          </ol>`,
        },
        {
          label: '(d) Final Outcome & Interpretation',
          html: `<p>Now <span class="math-inline">q₁</span> holds the exact original state <span class="math-inline">|φ⟩ = α|0⟩ + β|1⟩</span>, while <span class="math-inline">q₀</span> has changed to <span class="math-inline">|+⟩</span>—the unknown state has moved from <span class="math-inline">q₀</span> to <span class="math-inline">q₁</span> without ever creating two copies.</p>`,
        },
        {
          label: '(e) Uses',
          html: `<p>Forms the algebraic backbone for quantum network state transfer, distributed quantum gates, and measurement-based quantum computing.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>Through CX entanglement, Hadamard basis mixing, and CZ phase correction, an unknown quantum state transfers cleanly from source qubit to target qubit while obeying no-cloning.</p>`,
        },
      ],
      studySource: '2unit qst/11a quantum teleportaion State transfer.docx (rId4) & 1unit qst/12 quantum teleportation.docx (rId5).',
      rememberThese: [
        'Gate sequence in state transfer: <span class="math-inline">CX(q₀→q₁) → H(q₀) → CZ</span>',
        'Transforms <span class="math-inline">|0⟩ ⊗ |φ⟩</span> into <span class="math-inline">|φ⟩ ⊗ |+⟩</span>',
        'Original state leaves <span class="math-inline">q₀</span> so no-cloning theorem is preserved',
      ],
    },
    {
      number: '21a',
      question: 'Bits for teleportation',
      sourceTag: 'Added from attached PDF · Unit II · Q9',
      marks: 2,
      intuition:
        'Alice’s Bell measurement yields one of four equally likely outcomes, so she must send two ordinary classical bits telling Bob which correction gate (I, X, Z, or ZX) to apply.',
      sections: [
        {
          html: `<p>Standard single-qubit quantum teleportation requires transmitting <strong>two classical bits</strong> (<span class="math-inline">00, 01, 10,</span> or <span class="math-inline">11</span>) from Alice to Bob alongside one pre-shared entangled Bell pair. Those two classical bits instruct Bob which Pauli correction (<span class="math-inline">I, X, Z,</span> or <span class="math-inline">ZX</span>) reconstructs Alice’s unknown state <span class="math-inline">|ψ⟩</span> without violating causality.</p>`,
        },
      ],
      studySource:
        '2unit qst/11b quantum teleportation eg.docx & attached PDF (Unit II · Short Q9).',
      noDiagramNote:
        'Concise 2-mark resource count; see Q21 and Q22 for teleportation circuits.',
      rememberThese: [
        'Quantum teleportation cost = <strong>2 classical bits</strong> + 1 shared Bell pair',
        'Lookup: <span class="math-inline">00→I, 01→X, 10→Z, 11→ZX</span>',
      ],
    },
    {
      number: 22,
      question: 'Explain quantum teleportation with its circuit and protocol.',
      sourceTag: 'Mid 2 · Unit IV · Long Q2(b)',
      marks: 5,
      intuition:
        'Instead of shipping a fragile qubit across town, Alice entangles her unknown qubit with her half of a shared Bell pair, measures both to get 2 ordinary bits, phones Bob those 2 bits, and Bob flips his entangled qubit into an exact replica of Alice’s original state.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p><strong>Quantum teleportation</strong> (Bennett et al., 1993) transmits an unknown quantum state <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span> from Alice to Bob across any distance using <strong>1 pre-shared entangled Bell pair</strong> and <strong>2 classical bits</strong>.</p>`,
        },
        {
          label: '(b) 3-Qubit Setup & Step-by-Step Protocol',
          html: `<ul>
            <li><strong>Qubit 0 (<span class="math-inline">q₀</span>):</strong> Alice’s unknown state <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>.</li>
            <li><strong>Qubit 1 (<span class="math-inline">q₁</span>) & Qubit 2 (<span class="math-inline">q₂</span>):</strong> Shared entangled Bell pair <span class="math-inline">|Φ⁺⟩₁₂ = (|00⟩ + |11⟩)/√2</span> created via H on <span class="math-inline">q₁</span> then CNOT(<span class="math-inline">q₁→q₂</span>). Alice holds <span class="math-inline">q₁</span>; Bob holds <span class="math-inline">q₂</span>.</li>
          </ul>
          <ol>
            <li><strong>Bell Measurement by Alice:</strong> Alice applies <span class="math-inline">CNOT(q₀→q₁)</span> followed by <span class="math-inline">H</span> on <span class="math-inline">q₀</span>, then measures <span class="math-inline">q₀</span> and <span class="math-inline">q₁</span>, obtaining 2 random classical bits <span class="math-inline">(m₀, m₁) ∈ {00, 01, 10, 11}</span>. Her original <span class="math-inline">|ψ⟩</span> is destroyed.</li>
            <li><strong>Classical Communication:</strong> Alice sends the 2 classical bits <span class="math-inline">(m₀, m₁)</span> to Bob over a regular channel.</li>
            <li><strong>Unitary Correction by Bob:</strong> Bob applies a gate to <span class="math-inline">q₂</span> based on Alice’s two bits:
              <table class="q-table">
                <thead><tr><th>Alice’s Measurement (m₀m₁)</th><th>Bob’s Qubit State</th><th>Bob’s Correction Gate</th><th>Final Bob State</th></tr></thead>
                <tbody>
                  <tr><td>00</td><td>α|0⟩ + β|1⟩</td><td>I (do nothing)</td><td>α|0⟩ + β|1⟩</td></tr>
                  <tr><td>01</td><td>α|1⟩ + β|0⟩</td><td>X (bit flip)</td><td>α|0⟩ + β|1⟩</td></tr>
                  <tr><td>10</td><td>α|0⟩ − β|1⟩</td><td>Z (phase flip)</td><td>α|0⟩ + β|1⟩</td></tr>
                  <tr><td>11</td><td>α|1⟩ − β|0⟩</td><td>ZX (X then Z)</td><td>α|0⟩ + β|1⟩</td></tr>
                </tbody>
              </table>
            </li>
          </ol>`,
        },
        {
          label: '(c) Circuit Representation',
          html: `<p>In the three-qubit teleportation circuit: qubits <span class="math-inline">q₁, q₂</span> first form an entangled Bell pair (<span class="math-inline">H(q₁), CX(q₁, q₂)</span>); Alice then applies <span class="math-inline">CX(q₀, q₁)</span> and <span class="math-inline">H(q₀)</span> and measures <span class="math-inline">q₀ → m₀, q₁ → m₁</span>; finally Bob applies <span class="math-inline">X^(m₁)</span> followed by <span class="math-inline">Z^(m₀)</span> on <span class="math-inline">q₂</span>. The circuit below shows the two-qubit state-transfer module:</p>`,
          image: {
            file: 'teleportation_circuit.png',
            caption: 'Fig. Quantum state transfer circuit diagram',
            source: '2unit qst/11a quantum teleportaion State transfer.docx · rId4',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Worked Example',
          html: `<p>Suppose Alice wants to send <span class="math-inline">|ψ⟩ = (1/√2)(|0⟩ + |1⟩)</span>. After Alice and Bob share <span class="math-inline">(|00⟩ + |11⟩)/√2</span>, Alice measures <span class="math-inline">q₀</span> and <span class="math-inline">q₁</span> and obtains <span class="math-inline">01</span>. She transmits <span class="math-inline">01</span> to Bob, Bob applies the <span class="math-inline">X</span> gate to <span class="math-inline">q₂</span>, and Bob’s qubit becomes <span class="math-inline">(1/√2)(|0⟩ + |1⟩)</span> identically.</p>`,
        },
        {
          label: '(e) Uses & Limitations',
          html: `<p>Used in quantum repeaters, quantum internet nodes, and secure quantum cloud links. Teleportation cannot transmit information faster than light because Alice’s 2 classical bits must travel at or below the speed of light.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>Quantum teleportation moves an intact quantum state between distant nodes using entanglement, classical communication, and conditional gate correction without violating no-cloning.</p>`,
        },
      ],
      studySource: '2unit qst/11b quantum teleportation eg.docx & 2unit qst/11a quantum teleportaion State transfer.docx (rId4); 3-qubit conditional correction flow supplemented from standard Nielsen & Chuang teleportation circuit.',
      rememberThese: [
        '3 qubits: <span class="math-inline">q₀</span> (message), <span class="math-inline">q₁</span> (Alice Bell half), <span class="math-inline">q₂</span> (Bob Bell half)',
        'Cost: 1 ebit (entangled Bell pair) + 2 classical bits',
        'Correction lookup: <span class="math-inline">00→I, 01→X, 10→Z, 11→ZX</span>',
      ],
    },
  ],
};
