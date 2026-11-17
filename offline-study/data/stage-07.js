window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 7,
  "part": "C",
  "partTitle": "Quantum computing",
  "title": "Why quantum computing?",
  "subtitle": "Where classical machines hit a wall, and what qubits change.",
  "questions": [
    {
      "number": 23,
      "question": "Write any two limitations of classical computers.",
      "sourceTag": "Mid 2 · Unit III · Short Q1",
      "marks": 2,
      "intuition": "Classical chips are reaching both atomic hardware walls and mathematical complexity walls where problems explode faster than silicon can keep up.",
      "sections": [
        {
          "html": "<ol>\n            <li><strong>Exponential scaling of hard problems:</strong> Simulating <span class=\"math-inline\">n</span> interacting quantum particles (requiring <span class=\"math-inline\">2ⁿ</span> complex numbers) or factoring huge integers grows exponentially in time and memory beyond classical reach.</li>\n            <li><strong>Physical miniaturization & heat walls:</strong> As transistors shrink to a few nanometers, quantum tunneling causes electron leakage, slowing Moore’s Law, while high chip power density caps clock speeds around 3–5 GHz.</li>\n          </ol>"
        }
      ],
      "studySource": "3rd unit/New Microsoft Word Document.docx (classical computing limitations).",
      "noDiagramNote": "3rd unit/New Microsoft Word Document.docx covers classical computing limitations purely in text.",
      "rememberThese": [
        "Exponential scaling (<span class=\"math-inline\">2ⁿ</span> states needed to simulate <span class=\"math-inline\">n</span> quantum particles)",
        "Physical transistor miniaturization limit (quantum tunneling leakage & power wall)",
        "Also valid: Von Neumann memory bottleneck, single definite bit (no superposition)"
      ]
    },
    {
      "number": 24,
      "question": "What are the limitations of classical computing? Why do we need quantum computing?",
      "sourceTag": "Mid 2 · Unit III · Long Q1(a)",
      "marks": 5,
      "intuition": "Classical computers must check paths one binary configuration at a time and fight nanoscale quantum leakage; quantum computers turn those very quantum rules—superposition, entanglement, and interference—into an engine.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Classical computers store bits strictly as 0 or 1 on silicon transistors following Von Neumann sequential architecture. While effective for everyday tasks, they hit fundamental physical, architectural, and complexity barriers that motivate quantum computing.</p>"
        },
        {
          "label": "(b) Key Limitations of Classical Computing",
          "html": "<ul>\n            <li><strong>Exponential scaling of hard problems:</strong> Integer factorization (RSA), combinatorial optimization, and molecular simulation demand memory and time scaling exponentially (<span class=\"math-inline\">O(2ⁿ)</span>).</li>\n            <li><strong>Inability to simulate quantum systems:</strong> Modeling <span class=\"math-inline\">n</span> entangled electrons requires storing <span class=\"math-inline\">2ⁿ</span> amplitudes—infeasible classically past roughly 50 particles.</li>\n            <li><strong>Physical limits of miniaturization:</strong> Shrinking transistors to a few nanometers triggers quantum tunneling leakage, slowing Moore’s Law.</li>\n            <li><strong>Power wall & Von Neumann bottleneck:</strong> High heat dissipation caps clock speeds (~3–5 GHz), while CPU-to-memory data bus latency limits throughput; Amdahl’s Law caps sequential parallel speedup.</li>\n            <li><strong>No superposition or entanglement:</strong> Classical bits hold one definite state at a time and cannot exploit quantum interference.</li>\n          </ul>"
        },
        {
          "label": "(c) Why Quantum Computing Is Needed",
          "html": "<p>Quantum computers encode information in qubits capable of <strong>superposition</strong>, <strong>entanglement</strong>, and <strong>quantum interference</strong>, giving polynomial or exponential speedups for specialized problems:</p>\n          <ul>\n            <li><strong>Drug discovery & chemistry:</strong> Natively simulating molecules, catalysts, and battery materials (Richard Feynman’s 1981 insight).</li>\n            <li><strong>Shor’s algorithm (<span class=\"math-inline\">O((log N)³)</span>):</strong> Exponential speedup for integer factorization over classical sub-exponential sieves.</li>\n            <li><strong>Grover’s algorithm (<span class=\"math-inline\">O(√N)</span>):</strong> Quadratic speedup for unstructured search and optimization.</li>\n          </ul>",
          "image": {
            "file": "classical_vs_quantum_chart.png",
            "caption": "Fig. Classical vs. quantum computing comparison across architecture, gates, and applications",
            "source": "1unit qst/1unit history.pptx · slide 6",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Concrete Scaling Example",
          "html": "<p>Representing the state of just <span class=\"math-inline\">n = 50</span> qubits requires <span class=\"math-inline\">2⁵⁰ ≈ 1.1 × 10¹⁵</span> numbers (over 16 petabytes of classical RAM), whereas a quantum register stores it physically in 50 qubits.</p>"
        },
        {
          "label": "(e) Practical Note (Complementary Roles)",
          "html": "<p>Quantum computers do not replace classical laptops for browsing or spreadsheets; they act as specialized co-processors alongside CPUs and GPUs for intractable quantum-scale workloads.</p>"
        },
        {
          "label": "(f) Conclusion",
          "html": "<p>Quantum computing is needed because silicon hardware is nearing atomic limits and classical computers cannot efficiently simulate quantum nature or solve exponentially hard algebraic and search problems.</p>"
        }
      ],
      "studySource": "3rd unit/New Microsoft Word Document.docx & 1unit qst/1unit history.pptx (slide 6).",
      "rememberThese": [
        "5 key classical limits: <span class=\"math-inline\">2ⁿ</span> scaling, tunneling leakage, power wall (3–5 GHz), Von Neumann bottleneck, Amdahl’s law",
        "Feynman (1981): Nature is quantum, so simulating it requires a quantum computer",
        "Speedups: Shor (factoring, exponential), Grover (search, <span class=\"math-inline\">O(√N)</span>), molecular simulation"
      ]
    },
    {
      "number": 25,
      "question": "State the differences between classical computing and quantum computing.",
      "sourceTag": "Mid 1 · Unit II · Q1",
      "orderNote": "Asked again later in Mid 2 (#26) – study it once.",
      "marks": 5,
      "intuition": "Classical computing steps through deterministic 0/1 voltage switches one state at a time, whereas quantum computing manipulates superposed probability amplitudes on reversible unitary gates and uses interference to pull out the right answer.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Classical computers process information using deterministic binary voltage bits, while quantum computers process information using coherent quantum states (qubits) governed by linear algebra in Hilbert space.</p>"
        },
        {
          "label": "(b) Side-by-Side Comparison Table",
          "html": "<table class=\"q-table\">\n            <thead><tr><th>Feature</th><th>Classical Computing</th><th>Quantum Computing</th></tr></thead>\n            <tbody>\n              <tr><td><strong>Basic Unit of Information</strong></td><td>Bit: strictly <span class=\"math-inline\">0</span> OR <span class=\"math-inline\">1</span> (discrete voltage level)</td><td>Qubit: <span class=\"math-inline\">|ψ⟩ = α|0⟩ + β|1⟩</span>, superposition of <span class=\"math-inline\">|0⟩</span> and <span class=\"math-inline\">|1⟩</span></td></tr>\n              <tr><td><strong>State Capacity (<span class=\"math-inline\">n</span> units)</strong></td><td>Holds 1 of <span class=\"math-inline\">2ⁿ</span> states at any instant</td><td><span class=\"math-inline\">n</span> qubits span <span class=\"math-inline\">2ⁿ</span> basis states simultaneously (<span class=\"math-inline\">2¹, 2², 2ⁿ</span>)</td></tr>\n              <tr><td><strong>Mathematical Representation</strong></td><td>Boolean algebra (<span class=\"math-inline\">0, 1</span> scalars)</td><td>Dirac bra-ket vectors in complex Hilbert space (<span class=\"math-inline\">ℂ^(2ⁿ)</span>)</td></tr>\n              <tr><td><strong>Logic Gates & Reversibility</strong></td><td>AND, OR, NOT, NAND (mostly irreversible)</td><td>H, X, Y, Z, T, CNOT (strictly reversible unitary <span class=\"math-inline\">U†U = I</span>)</td></tr>\n              <tr><td><strong>Information Copying</strong></td><td>Trivial (fan-out copies bits freely)</td><td>Forbidden for unknown states (No-Cloning Theorem)</td></tr>\n              <tr><td><strong>Measurement</strong></td><td>Passive read; state remains unchanged</td><td>Probabilistic (<span class=\"math-inline\">|α|², |β|²</span>) and collapses superposition</td></tr>\n              <tr><td><strong>Error Rate & Hardware</strong></td><td>Extremely low error rate; CMOS transistors at room temp</td><td>High error rate (decoherence); cryogenic/vacuum/optical hardware</td></tr>\n              <tr><td><strong>Best-Suited Problems</strong></td><td>Everyday tasks, web, databases, sequential logic</td><td>Factoring (Shor), molecular simulation, optimization, search (Grover)</td></tr>\n            </tbody>\n          </table>",
          "image": {
            "file": "classical_vs_quantum_chart.png",
            "caption": "Fig. Comparison chart of classical computing vs. quantum computing",
            "source": "1unit qst/1unit history.pptx · slide 6",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Mathematical Contrast Example",
          "html": "<p>A 3-bit classical register stores a single 3-bit string such as <span class=\"math-inline\">101</span>. A 3-qubit register holds amplitudes across all <span class=\"math-inline\">2³ = 8</span> states (<span class=\"math-inline\">|000⟩</span> through <span class=\"math-inline\">|111⟩</span>) at once, and uses CNOT entanglement plus interference to correlate them.</p>"
        },
        {
          "label": "(d) Advantages & Limitations",
          "html": "<p>Classical computers offer cheap, reliable, room-temperature general computing. Quantum computers offer massive exponential or quadratic speedups on structured math and physics tasks but currently face high decoherence noise.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Classical and quantum computing operate on fundamentally different physical rules—bits vs. superposed entangled qubits—and complement each other in modern hybrid workflows.</p>"
        }
      ],
      "studySource": "2unit qst/1a differences between classical computing and quantum computing.docx, 2unit qst/1b introduction to quantum computing.pptx & 1unit qst/1unit history.pptx (slide 6).",
      "rememberThese": [
        "Bit (<span class=\"math-inline\">0</span> or <span class=\"math-inline\">1</span>) vs Qubit (<span class=\"math-inline\">α|0⟩ + β|1⟩</span>)",
        "<span class=\"math-inline\">n</span> qubits represent <span class=\"math-inline\">2ⁿ</span> states; gates must be unitary & reversible (<span class=\"math-inline\">U†U=I</span>)",
        "Unknown qubits cannot be copied (No-Cloning) and measurement collapses state",
        "Classical = low error, general tasks; Quantum = high error, factoring/simulation/optimization"
      ]
    },
    {
      "number": 26,
      "question": "Differentiate between classical computing and quantum computing.",
      "sourceTag": "Mid 2 · Unit III · Long Q5(a)",
      "orderNote": "Same question as #25 – nothing new to study.",
      "marks": 5,
      "intuition": "Classical machines flip definite voltage switches sequentially using irreversible Boolean logic, while quantum machines steer interfering complex wave amplitudes using reversible unitary gates.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Classical computing encodes binary data in deterministic bits (<span class=\"math-inline\">0</span> or <span class=\"math-inline\">1</span>), whereas quantum computing encodes data in qubits capable of superposition, entanglement, and quantum interference.</p>"
        },
        {
          "label": "(b) Detailed Differentiation Table",
          "html": "<table class=\"q-table\">\n            <thead><tr><th>Comparison Criterion</th><th>Classical Computing</th><th>Quantum Computing</th></tr></thead>\n            <tbody>\n              <tr><td><strong>Fundamental Unit</strong></td><td>Bit (strictly <span class=\"math-inline\">0</span> or <span class=\"math-inline\">1</span>)</td><td>Qubit (<span class=\"math-inline\">|ψ⟩ = α|0⟩ + β|1⟩</span>, <span class=\"math-inline\">|α|² + |β|² = 1</span>)</td></tr>\n              <tr><td><strong>State Scaling (<span class=\"math-inline\">n</span> units)</strong></td><td>Represents 1 single configuration out of <span class=\"math-inline\">2ⁿ</span></td><td>Superposition of all <span class=\"math-inline\">2ⁿ</span> configurations simultaneously</td></tr>\n              <tr><td><strong>Processing Mechanism</strong></td><td>Sequential step-by-step execution (<span class=\"math-inline\">1 → 2 → … → n</span>)</td><td>Quantum parallelism + constructive/destructive interference</td></tr>\n              <tr><td><strong>Logic Operations</strong></td><td>Boolean gates: AND, OR, NOT, NAND (irreversible)</td><td>Unitary reversible matrices: H, X, Y, Z, T, CNOT (<span class=\"math-inline\">U†U = I</span>)</td></tr>\n              <tr><td><strong>Correlation & Copying</strong></td><td>Independent bits; copying is free</td><td>Entanglement links qubits; unknown states cannot be cloned</td></tr>\n              <tr><td><strong>Readout / Measurement</strong></td><td>Deterministic; reading does not disturb data</td><td>Probabilistic collapse (<span class=\"math-inline\">|α|², |β|²</span>) destroys superposition</td></tr>\n              <tr><td><strong>Error Profile</strong></td><td>Very low error rate (CMOS chips at room temp)</td><td>High error rate (decoherence, thermal noise); needs QEC</td></tr>\n              <tr><td><strong>Application Domain</strong></td><td>General software, databases, daily arithmetic</td><td>Shor factoring, Grover search, quantum chemistry, optimization</td></tr>\n            </tbody>\n          </table>",
          "image": {
            "file": "classical_vs_quantum_chart.png",
            "caption": "Fig. Classical vs. quantum computing across bits, parallelism, gates, and applications",
            "source": "1unit qst/1unit history.pptx · slide 6",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Worked Contrast (3-Unit Register)",
          "html": "<p>A 3-bit classical memory holds only one 3-bit integer at a time, whereas applying <span class=\"math-inline\">H⊗³</span> to <span class=\"math-inline\">|000⟩</span> produces <span class=\"math-inline\">(1/√8)∑|x⟩</span>, encoding all 8 binary combinations in parallel within one register.</p>"
        },
        {
          "label": "(d) Advantages & Trade-offs",
          "html": "<p>Classical computers excel in reliability, cost, and general-purpose software; quantum computers provide exponential or quadratic algorithmic speedups where interference cancels wrong outputs.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Classical and quantum computers differ in state representation, reversibility, parallelism, and measurement behavior, making quantum devices powerful accelerators for intractable problems.</p>"
        }
      ],
      "studySource": "1unit qst/1unit history.pptx (slide 6), 2unit qst/1a differences between classical computing and quantum computing.docx & 2unit qst/1b introduction to quantum computing.pptx.",
      "rememberThese": [
        "Deterministic bit vs Superposed qubit (<span class=\"math-inline\">|α|²+|β|²=1</span>)",
        "Irreversible Boolean gates vs Reversible unitary gates (<span class=\"math-inline\">U† = U⁻¹</span>)",
        "Passive reading vs Probabilistic wave collapse + No-Cloning",
        "Exponential state space <span class=\"math-inline\">2ⁿ</span> enables interference-driven speedups"
      ]
    }
  ]
});
