window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 5,
  "part": "B",
  "partTitle": "Qubits, gates and entanglement",
  "title": "Two qubits and entanglement",
  "subtitle": "Tensor products describe two qubits; CNOT plus H turns them into an entangled pair.",
  "questions": [
    {
      "number": 16,
      "question": "What is the purpose of tensor product? Explain.",
      "sourceTag": "Mid 1 · Unit II · Q8",
      "marks": 5,
      "intuition": "You cannot describe two qubits simply by adding their two vectors side-by-side because their outcomes interact—you need the tensor product (⊗) to multiply every amplitude of qubit A with every amplitude of qubit B into a joint state space.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>The <strong>tensor product (Kronecker product, ⊗)</strong> combines two or more independent quantum systems (e.g., Qubit A and Qubit B) into one <strong>composite quantum system</strong>, and also combines single-qubit gates acting in parallel into a multi-qubit gate matrix.</p>"
        },
        {
          "label": "(b) Purpose & Mathematical Rule Step by Step",
          "html": "<ol>\n            <li><strong>Composite state space dimension:</strong> If Qubit A has 2 states (<span class=\"math-inline\">ℂ²</span>) and Qubit B has 2 states (<span class=\"math-inline\">ℂ²</span>), the combined system has <span class=\"math-inline\">2 × 2 = 4</span> basis states (<span class=\"math-inline\">|00⟩, |01⟩, |10⟩, |11⟩</span>). For <span class=\"math-inline\">n</span> qubits, the space grows to <span class=\"math-inline\">2ⁿ</span> dimensions.</li>\n            <li><strong>Kronecker rule:</strong> Each component of the first vector multiplies the entire second vector:</li>\n          </ol>",
          "image": {
            "file": "tensor_product_formula.png",
            "caption": "Fig. 1: Tensor product of two single-qubit state vectors forming a 4D composite vector",
            "source": "2unit qst/5 tensor products and composite systems.pptx · slide 3",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Multi-Qubit Operators & Separability Test",
          "html": "<div class=\"math-block\">|ψ_AB⟩ = |ψ_A⟩ ⊗ |ψ_B⟩ = [ a₁b₁, a₁b₂, a₂b₁, a₂b₂ ]ᵀ<br/>Parallel gates: (H ⊗ I)(|ψ_A⟩ ⊗ |ψ_B⟩) = (H|ψ_A⟩) ⊗ (I|ψ_B⟩)</div>\n          <p><strong>Separable vs. Entangled states:</strong> A 2-qubit state that factors into <span class=\"math-inline\">|ψ_A⟩ ⊗ |ψ_B⟩</span> is <em>separable</em> (independent). A state like the Bell state <span class=\"math-inline\">(|00⟩ + |11⟩)/√2</span> cannot be written as a tensor product of two single-qubit vectors—that mathematical impossibility defines <strong>quantum entanglement</strong>.</p>"
        },
        {
          "label": "(d) Worked Example (|0⟩ ⊗ |+⟩)",
          "html": "<p>Let <span class=\"math-inline\">|ψ_A⟩ = |0⟩ = [1, 0]ᵀ</span> and <span class=\"math-inline\">|ψ_B⟩ = |+⟩ = (1/√2)[1, 1]ᵀ</span>. Computing their tensor product gives:</p>\n          <div class=\"math-block\">|ψ_AB⟩ = |0⟩ ⊗ |+⟩ = (1/√2)<table class=\"q-matrix\"><tr><td>1·[1, 1]ᵀ</td></tr><tr><td>0·[1, 1]ᵀ</td></tr></table> = (1/√2)<table class=\"q-matrix\"><tr><td>1</td></tr><tr><td>1</td></tr><tr><td>0</td></tr><tr><td>0</td></tr></table> = (1/√2)(|00⟩ + |01⟩)</div>",
          "image": {
            "file": "tensor_product_example.png",
            "caption": "Fig. 2: Worked tensor product calculation for |0⟩ ⊗ |+⟩",
            "source": "2unit qst/5 tensor products and composite systems.pptx · slide 4",
            "placement": "inline-bottom"
          }
        },
        {
          "label": "(e) Uses",
          "html": "<p>Essential for building multi-qubit registers (<span class=\"math-inline\">H ⊗ I</span>), defining entanglement, and computing quantum circuits algebraically.</p>"
        },
        {
          "label": "(f) Conclusion",
          "html": "<p>The tensor product is the mathematical glue that scales single-qubit spaces and gates into <span class=\"math-inline\">2ⁿ</span>-dimensional multi-qubit circuits and reveals entanglement.</p>"
        }
      ],
      "studySource": "2unit qst/5 tensor products and composite systems.pptx (slides 1–9).",
      "rememberThese": [
        "Combines <span class=\"math-inline\">ℂ² ⊗ ℂ² → ℂ⁴</span> (<span class=\"math-inline\">n</span> qubits ⇒ <span class=\"math-inline\">2ⁿ</span> dimensions)",
        "Rule: each entry of left vector/matrix scales the whole right vector/matrix",
        "Separable state = can be factored as <span class=\"math-inline\">|A⟩ ⊗ |B⟩</span>; Entangled = cannot be factored"
      ]
    },
    {
      "number": 17,
      "question": "Write about T and CNOT gates and check for unitary satisfiability.",
      "sourceTag": "Mid 1 · Unit II · Q9",
      "marks": 5,
      "intuition": "A quantum gate is valid only if it is unitary (U†U = I)—meaning it never creates or destroys total probability and can always be reversed cleanly.",
      "sections": [
        {
          "label": "(a) The T Gate (π/8 Gate)",
          "html": "<p>The <strong>T gate</strong> is a single-qubit phase gate equal to the square root of the S gate (<span class=\"math-inline\">T² = S</span>) and fourth root of Pauli-Z (<span class=\"math-inline\">T⁴ = Z</span>). It rotates the Bloch vector by 45° around the Z-axis, leaving <span class=\"math-inline\">|0⟩</span> unchanged and shifting <span class=\"math-inline\">|1⟩ → e^(iπ/4)|1⟩</span>.</p>\n          <div class=\"math-block\">T = <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>e^(iπ/4)</td></tr></table></div>",
          "image": {
            "file": "t_gate_matrix.png",
            "caption": "Fig. 1: T gate definition, basis actions, and matrix representation",
            "source": "2unit qst/8 quantum gates pauli x y z t.pptx · slide 44",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(b) The CNOT Gate (Controlled-NOT)",
          "html": "<p>The <strong>CNOT (CX) gate</strong> is a 2-qubit entangling gate with a control qubit and a target qubit. If the control qubit is <span class=\"math-inline\">|0⟩</span>, the target stays unchanged; if the control qubit is <span class=\"math-inline\">|1⟩</span>, the target is flipped (<span class=\"math-inline\">X</span> is applied): <span class=\"math-inline\">|00⟩→|00⟩, |01⟩→|01⟩, |10⟩→|11⟩, |11⟩→|10⟩</span>.</p>\n          <div class=\"math-block\">CNOT = <table class=\"q-matrix\"><tr><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0</td></tr></table></div>",
          "image": {
            "file": "cnot_matrix_gate.png",
            "caption": "Fig. 2: 4×4 matrix representation of the CNOT gate",
            "source": "2unit qst/8 quantum gates pauli x y z t.pptx · slide 59",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Unitary Satisfiability Check (U†U = U U† = I)",
          "html": "<p>A matrix <span class=\"math-inline\">U</span> is unitary if its conjugate transpose equals its inverse (<span class=\"math-inline\">U† = U⁻¹</span>, so <span class=\"math-inline\">U†U = I</span>):</p>\n          <div class=\"math-block\"><strong>1. Check T gate:</strong><br/>T† = <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>e^(−iπ/4)</td></tr></table><br/>T†T = <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>e^(−iπ/4)</td></tr></table> <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>e^(iπ/4)</td></tr></table> = <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>e⁰</td></tr></table> = <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>1</td></tr></table> = I &nbsp; ✓ (Unitary!)</div>\n          <div class=\"math-block\"><strong>2. Check CNOT gate:</strong><br/>CNOT is real and symmetric, so CNOT† = CNOT.<br/>CNOT† · CNOT = CNOT² = <table class=\"q-matrix\"><tr><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0</td></tr></table> <table class=\"q-matrix\"><tr><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0</td></tr></table> = <table class=\"q-matrix\"><tr><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td><td>1</td></tr></table> = I₄ &nbsp; ✓ (Unitary!)</div>"
        },
        {
          "label": "(d) Uses & Universal Gate Set",
          "html": "<p>The set <span class=\"math-inline\">{H, T, CNOT}</span> forms a universal fault-tolerant gate set: <span class=\"math-inline\">CNOT</span> creates multi-qubit entanglement while <span class=\"math-inline\">T</span> supplies the non-Clifford phase rotation needed for universal quantum computation.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Both the T gate and CNOT gate satisfy <span class=\"math-inline\">U†U = I</span>, confirming they preserve quantum normalization and are reversible.</p>"
        }
      ],
      "studySource": "2unit qst/8 quantum gates pauli x y z t.pptx (slides 44 & 59) & 2unit qst/good pdf gates.pdf.",
      "rememberThese": [
        "<span class=\"math-inline\">T = diag(1, e^(iπ/4))</span>; <span class=\"math-inline\">T² = S</span>, <span class=\"math-inline\">T⁴ = Z</span> (45° Z-rotation)",
        "CNOT flips target iff control is <span class=\"math-inline\">|1⟩</span>; it is self-inverse (<span class=\"math-inline\">CNOT² = I</span>)",
        "Unitary condition: <span class=\"math-inline\">U†U = U U† = I</span>, where <span class=\"math-inline\">U† = (Uᵀ)*</span>"
      ]
    },
    {
      "number": "17a",
      "question": "T gate",
      "sourceTag": "Added from attached PDF · Unit II · Q10",
      "marks": 2,
      "intuition": "The T gate leaves |0⟩ untouched and nudges |1⟩’s phase by 45° (π/4), supplying the non-Clifford ingredient needed for universal quantum computing.",
      "sections": [
        {
          "html": "<p>The <strong>T gate (π/8 gate)</strong> is a single-qubit unitary phase gate given by <span class=\"math-inline\">T = diag(1, e^(iπ/4))</span>. It leaves <span class=\"math-inline\">|0⟩</span> unchanged and adds a <span class=\"math-inline\">π/4</span> phase to <span class=\"math-inline\">|1⟩</span> (<span class=\"math-inline\">T|1⟩ = e^(iπ/4)|1⟩</span>), satisfying <span class=\"math-inline\">T² = S</span> and <span class=\"math-inline\">T⁴ = Z</span>. Combining <span class=\"math-inline\">T</span> with Clifford gates (<span class=\"math-inline\">{H, S, CNOT}</span>) yields a universal gate set.</p>"
        }
      ],
      "studySource": "2unit qst/8 quantum gates pauli x y z t.pptx (slide 44) & attached PDF (Unit II · Short Q10).",
      "noDiagramNote": "Concise 2-mark definition; see Q17 for the T-gate matrix figure.",
      "rememberThese": [
        "Matrix: <span class=\"math-inline\">T = diag(1, e^(iπ/4))</span> (45° Z-axis rotation)",
        "<span class=\"math-inline\">{H, S, CNOT, T}</span> forms a universal quantum gate set"
      ]
    },
    {
      "number": "17b",
      "question": "CNOT on |10⟩",
      "sourceTag": "Added from attached PDF · Unit II · Q6",
      "marks": 2,
      "intuition": "In CNOT |control, target⟩, the first qubit acts like a light switch—since the control is 1, it flips the second qubit from 0 to 1.",
      "sections": [
        {
          "html": "<p>A <strong>CNOT (Controlled-NOT)</strong> gate acts on two qubits via <span class=\"math-inline\">|c, t⟩ → |c, t ⊕ c⟩</span>, flipping the target qubit if and only if the control qubit is <span class=\"math-inline\">|1⟩</span>. For the input state <span class=\"math-inline\">|10⟩</span> (control <span class=\"math-inline\">c = 1</span>, target <span class=\"math-inline\">t = 0</span>), the active control flips the target from <span class=\"math-inline\">|0⟩</span> to <span class=\"math-inline\">|1⟩</span>, giving <span class=\"math-inline\">CNOT|10⟩ = |11⟩</span>.</p>"
        }
      ],
      "studySource": "2unit qst/8 quantum gates pauli x y z t.pptx (slide 59) & attached PDF (Unit II · Short Q6).",
      "noDiagramNote": "Concise 2-mark basis action; see Q17 for the 4×4 CNOT matrix figure.",
      "rememberThese": [
        "Rule: <span class=\"math-inline\">CNOT|c, t⟩ = |c, t ⊕ c⟩</span>",
        "Control = 1 on <span class=\"math-inline\">|10⟩</span> ⇒ target flips <span class=\"math-inline\">0 → 1</span>, giving <span class=\"math-inline\">|11⟩</span>"
      ]
    },
    {
      "number": 18,
      "question": "Create a quantum circuit with H and CNOT measure the outcomes of q0 and q1.",
      "sourceTag": "Mid 1 · Unit II · Q10",
      "marks": 5,
      "intuition": "Putting qubit 0 into a 50/50 superposition with Hadamard and then wiring CNOT from q₀ to q₁ forces q₁ to mirror q₀—even before either is measured, linking them into the Bell state (|00⟩ + |11⟩)/√2.",
      "sections": [
        {
          "label": "(a) Core Idea & Circuit Design",
          "html": "<p>Initialize two qubits in <span class=\"math-inline\">|q₀ q₁⟩ = |00⟩</span>. Apply a <strong>Hadamard gate (H)</strong> on <span class=\"math-inline\">q₀</span>, then apply a <strong>CNOT</strong> gate with control <span class=\"math-inline\">q₀</span> and target <span class=\"math-inline\">q₁</span>, and finally measure both qubits into classical bits <span class=\"math-inline\">c</span>.</p>",
          "image": {
            "file": "h_cnot_bell_circuit.png",
            "caption": "Fig. 1: Quantum circuit with Hadamard on q₀ followed by CNOT (control q₀, target q₁)",
            "source": "2unit qst/9a quantum circuits.pptx · slide 18",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(b) Step-by-Step State Calculation",
          "html": "<ol>\n            <li><strong>Step 0 (Initial state):</strong> <span class=\"math-inline\">|ψ₀⟩ = |0⟩ ⊗ |0⟩ = |00⟩ = [1, 0, 0, 0]ᵀ</span>.</li>\n            <li><strong>Step 1 (Apply H ⊗ I):</strong> Applying H to <span class=\"math-inline\">q₀</span> and I to <span class=\"math-inline\">q₁</span> gives:\n              <div class=\"math-block\">|ψ₁⟩ = (H ⊗ I)|00⟩ = ( (|0⟩ + |1⟩)/√2 ) ⊗ |0⟩ = (|00⟩ + |10⟩)/√2 = (1/√2)[1, 0, 1, 0]ᵀ</div>\n            </li>\n            <li><strong>Step 2 (Apply CNOT):</strong> Multiply by the 4×4 CNOT matrix (swapping rows 3 and 4, i.e., <span class=\"math-inline\">|10⟩ → |11⟩</span>):\n              <div class=\"math-block\">|ψ₂⟩ = CNOT · (1/√2)<table class=\"q-matrix\"><tr><td>1</td></tr><tr><td>0</td></tr><tr><td>1</td></tr><tr><td>0</td></tr></table> = (1/√2)<table class=\"q-matrix\"><tr><td>1</td></tr><tr><td>0</td></tr><tr><td>0</td></tr><tr><td>1</td></tr></table> = (|00⟩ + |11⟩)/√2 = |Φ⁺⟩</div>\n            </li>\n          </ol>",
          "image": {
            "file": "bell_state_math.png",
            "caption": "Fig. 2: Matrix verification producing the Bell state (|00⟩ + |11⟩)/√2",
            "source": "2unit qst/9a quantum circuits.pptx · slide 23",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Measurement Outcomes of q₀ and q₁",
          "html": "<p>Measuring both qubits collapses <span class=\"math-inline\">|Φ⁺⟩ = (1/√2)|00⟩ + 0|01⟩ + 0|10⟩ + (1/√2)|11⟩</span>:</p>\n          <ul>\n            <li><strong>Outcome 00:</strong> <span class=\"math-inline\">P(00) = |1/√2|² = 1/2 = 50%</span></li>\n            <li><strong>Outcome 11:</strong> <span class=\"math-inline\">P(11) = |1/√2|² = 1/2 = 50%</span></li>\n            <li><strong>Outcomes 01 and 10:</strong> <span class=\"math-inline\">P(01) = P(10) = 0%</span> (never occur together)</li>\n          </ul>",
          "image": {
            "file": "h_cnot_measurement.png",
            "caption": "Fig. 3: Measurement histogram for H + CNOT showing correlated outcomes 00 and 11",
            "source": "2unit qst/3a Quantum superposition.pptx · slide 8",
            "placement": "inline-bottom"
          }
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>An H gate followed by CNOT turns <span class=\"math-inline\">|00⟩</span> into the maximally entangled Bell state <span class=\"math-inline\">|Φ⁺⟩</span>, guaranteeing perfectly correlated measurement outcomes of <span class=\"math-inline\">00</span> or <span class=\"math-inline\">11</span> with 50% probability each.</p>"
        }
      ],
      "studySource": "2unit qst/9a quantum circuits.pptx (slides 18, 23) & 2unit qst/3a Quantum superposition.pptx (slide 8).",
      "rememberThese": [
        "Circuit: <span class=\"math-inline\">H</span> on <span class=\"math-inline\">q₀</span> → <span class=\"math-inline\">CNOT(q₀, q₁)</span> → Measure both",
        "Output state: Bell pair <span class=\"math-inline\">|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</span>",
        "Outcomes: 50% <span class=\"math-inline\">|00⟩</span>, 50% <span class=\"math-inline\">|11⟩</span>, 0% for <span class=\"math-inline\">|01⟩</span> or <span class=\"math-inline\">|10⟩</span>"
      ]
    },
    {
      "number": "18a",
      "question": "Is (|00⟩ + |11⟩)/√2 entangled?",
      "sourceTag": "Added from attached PDF · Unit II · Q3",
      "marks": 2,
      "intuition": "Multiplying any two independent single-qubit states always gives amplitudes whose outer product satisfies ad = bc; here (1/√2)(1/√2) = 1/2 ≠ 0, so the pair is inseparable.",
      "sections": [
        {
          "html": "<p><strong>Yes</strong>, the Bell state <span class=\"math-inline\">|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</span> is maximally <strong>entangled</strong>. A two-qubit state <span class=\"math-inline\">a|00⟩ + b|01⟩ + c|10⟩ + d|11⟩</span> is separable into <span class=\"math-inline\">(α|0⟩ + β|1⟩) ⊗ (γ|0⟩ + δ|1⟩)</span> only when <span class=\"math-inline\">ad = bc</span>; here <span class=\"math-inline\">ad = (1/√2)(1/√2) = 1/2 ≠ 0 = bc</span>, so it cannot be factored into single-qubit states.</p>"
        }
      ],
      "studySource": "2unit qst/3b Quantum entanglement.pptx, 2unit qst/5 tensor products and composite systems.pptx, & attached PDF (Unit II · Short Q3).",
      "noDiagramNote": "Algebraic separability check; see Q18 for the H + CNOT Bell-state creation circuit.",
      "rememberThese": [
        "Factorability test: separable iff <span class=\"math-inline\">ad = bc</span>",
        "For <span class=\"math-inline\">(|00⟩ + |11⟩)/√2</span>: <span class=\"math-inline\">ad = 1/2 ≠ 0</span> ⇒ maximally entangled Bell state <span class=\"math-inline\">|Φ⁺⟩</span>"
      ]
    }
  ]
});
