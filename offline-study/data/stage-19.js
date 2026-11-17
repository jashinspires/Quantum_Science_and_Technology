window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 19,
  "part": "E",
  "partTitle": "Quantum technologies and applications",
  "title": "Supremacy, NISQ and the global race",
  "subtitle": "What today’s hardware can and can’t do, who is building it, and the ethics of it.",
  "questions": [
    {
      "number": 82,
      "question": "What is quantum supremacy? Explain.",
      "sourceTag": "Mid 2 · Unit V · Long Q2(b)",
      "marks": 5,
      "intuition": "Quantum supremacy doesn’t mean quantum laptops replace your phone; it is the historic \"Wright brothers moment\" proving a real quantum chip solved one carefully chosen math puzzle far faster than any classical supercomputer could.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p><strong>Quantum supremacy</strong> (increasingly called <strong>quantum computational advantage</strong>) is the milestone where a programmable quantum computer executes a specific, well-defined computational task dramatically faster than the world’s fastest classical supercomputers—so fast that classical computation would take impractical years.</p>"
        },
        {
          "label": "(b) Step-by-Step Explanation",
          "html": "<ol>\n            <li><strong>Origin of the Term:</strong> Coined by John Preskill (2012) to mark the crossover point beyond classical simulation limits (<span class=\"math-inline\">~50+</span> entangled qubits, where classical statevectors exceed <span class=\"math-inline\">2⁵⁰</span> amplitudes).</li>\n            <li><strong>Benchmark Experiment (Google Sycamore, 2019):</strong> Google used its 53-qubit superconducting <em>Sycamore</em> processor to sample outputs from random quantum circuits in ~200 seconds—a specialized Random Circuit Sampling task originally estimated to take classical supercomputers thousands of years.</li>\n            <li><strong>Distinction from “Practical Quantum Advantage”:</strong> Early supremacy benchmarks solved contrived random sampling tasks rather than directly useful industrial problems; useful advantage requires error mitigation or full fault-tolerant error correction (QEC).</li>\n          </ol>"
        },
        {
          "label": "(c) Why Hardware Noise Limits Today’s Supremacy Tasks",
          "html": "<p>Today’s noisy NISQ processors can only run shallow circuits before decoherence washes out results, so supremacy tests use short-depth sampling problems rather than deep algorithms like Shor’s factoring.</p>"
        },
        {
          "label": "(d) Advantages, Criticisms & Response",
          "html": "<p>Supremacy experiments proved quantum computers can reliably explore exponentially large Hilbert spaces in real hardware—even as improved classical tensor-network algorithms continually raise the bar for proving supremacy.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Quantum supremacy validates non-classical computational scaling on real physical devices, marking a foundational stepping stone toward fault-tolerant, practically useful quantum computers.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 9), 5 unit qst/5 unit qst 2 full.pptx (slide 11) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 3).",
      "noDiagramNote": "Covered conceptually in Unit V lecture notes (5 unit.docx, 5 unit qst 2 full.pptx s11, Study Guide p.3) without an embedded image.",
      "rememberThese": [
        "<strong>Quantum supremacy:</strong> quantum device solves a task unfeasible for any classical supercomputer",
        "Coined by John Preskill; famously demonstrated by Google’s 53-qubit <em>Sycamore</em> (2019) via Random Circuit Sampling",
        "Differs from full industrial utility, which awaits noise reduction / fault-tolerant QEC"
      ]
    },
    {
      "number": 83,
      "question": "What does NISQ stand for?",
      "sourceTag": "Mid 2 · Unit V · Short Q9",
      "marks": 2,
      "intuition": "Coined by John Preskill in 2018, NISQ sums up today’s hardware honestly in four words: useful enough to explore, small enough to build now, and noisy because we don’t have full error correction yet.",
      "sections": [
        {
          "html": "<p><strong>NISQ</strong> stands for <strong>Noisy Intermediate-Scale Quantum</strong> (term coined by John Preskill in 2018). It describes today’s generation of quantum processors containing roughly <strong>50 to a few hundred/thousand physical qubits</strong> (“intermediate-scale”) that lack full fault-tolerant Quantum Error Correction and therefore suffer from gate errors and environmental decoherence (“noisy”).</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 9) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 3).",
      "noDiagramNote": "5 unit.docx Section 9 outlines NISQ hybrid VQE/QAOA workflows in text only.",
      "rememberThese": [
        "<strong>N</strong>oisy <strong>I</strong>ntermediate-<strong>S</strong>cale <strong>Q</strong>uantum (John Preskill, 2018)",
        "~50 to ~1000 physical qubits, <strong>no full Quantum Error Correction (QEC)</strong> yet",
        "Runs short hybrid quantum–classical algorithms like <strong>VQE</strong> and <strong>QAOA</strong>"
      ]
    },
    {
      "number": 84,
      "question": "Explain the NISQ era and its limitations.",
      "sourceTag": "Mid 2 · Unit V · Long Q3(a)",
      "marks": 5,
      "intuition": "Think of the NISQ era like early biplanes: they prove powered flight works and handle short hops (shallow hybrid circuits like VQE), yet turbulent air (decoherence) stops them from crossing oceans (Shor’s algorithm) until error correction matures.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>The <strong>NISQ (Noisy Intermediate-Scale Quantum) era</strong>, named by John Preskill (2018), represents the current phase of quantum hardware (~50 to a few hundred physical qubits) where processors are large enough to surpass brute-force classical simulation yet remain too noisy for full fault-tolerant Quantum Error Correction.</p>"
        },
        {
          "label": "(b) How NISQ Computers Operate Today (Hybrid VQE / QAOA Loop)",
          "html": "<p>Because deep circuits decay quickly, NISQ machines run short <strong>variational hybrid quantum–classical algorithms</strong> such as <strong>VQE</strong> (molecular ground-state chemistry) and <strong>QAOA</strong> (combinatorial optimization):</p>\n          <ol>\n            <li>Prepare a short parameterized quantum circuit <span class=\"math-inline\">|Ψ(θ)⟩</span> on the NISQ chip.</li>\n            <li>Measure expectation value <span class=\"math-inline\">⟨H⟩(θ)</span> repeatedly and pass results to a classical optimizer.</li>\n            <li>Classical optimizer (COBYLA or Adam) updates parameters <span class=\"math-inline\">θ</span> and repeats until energy or cost converges.</li>\n          </ol>"
        },
        {
          "label": "(c) Key Limitations of the NISQ Era",
          "html": "<ul>\n            <li><strong>Decoherence & Short Coherence Time:</strong> Qubits lose superposition rapidly via thermal and electromagnetic noise, capping maximum circuit depth.</li>\n            <li><strong>Gate & Readout Errors:</strong> Physical two-qubit CNOT gates have ~0.1–1% error rates, compounding exponentially over deep algorithms.</li>\n            <li><strong>No Full Quantum Error Correction (QEC):</strong> Correcting one logical qubit via Shor or surface codes needs hundreds to thousands of physical qubits, so NISQ chips cannot yet execute large instances of <strong>Shor’s factoring algorithm</strong> or deep Grover searches.</li>\n            <li><strong>Limited Qubit Connectivity & Barren Plateaus:</strong> Qubits often connect only to immediate neighbors (requiring extra SWAP gates) and variational optimizers can stall in flat optimization landscapes.</li>\n          </ul>"
        },
        {
          "label": "(d) Bridge to Future Fault Tolerance",
          "html": "<p>Error mitigation techniques and mid-circuit measurement experiments are actively pushing error rates toward the threshold needed for Fault-Tolerant Quantum Computing (FTQC).</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>The NISQ era delivers practical hybrid testbeds (VQE/QAOA) while clearly highlighting that full error correction is the essential next step to scale quantum algorithms.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 9), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 3) & Unit III Grover/QEC notes.",
      "noDiagramNote": "5 unit.docx Section 9 and Study Guide.pdf describe the 4-step VQE/QAOA hybrid loop using numbered text blocks.",
      "rememberThese": [
        "NISQ = 50–1000 physical qubits without full QEC",
        "Key limitations: decoherence, gate/readout errors, shallow depth, sparse connectivity",
        "Main NISQ algorithms: Hybrid <strong>VQE</strong> and <strong>QAOA</strong> (not Shor’s algorithm yet)"
      ]
    },
    {
      "number": 85,
      "question": "Explain the quantum initiatives of IBM, Google, D-Wave and IonQ.",
      "sourceTag": "Mid 2 · Unit V · Long Q1(b)",
      "marks": 5,
      "intuition": "Global tech companies are racing along three different hardware tracks—IBM and Google build cryogenic superconducting gate chips, D-Wave builds specialized quantum annealers for optimization, and IonQ flies precision laser-controlled ions.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Leading industry pioneers—<strong>IBM, Google, D-Wave, and IonQ</strong>—are commercializing distinct quantum hardware architectures and open cloud ecosystems to move quantum computing from physics labs into real-world applications.</p>"
        },
        {
          "label": "(b) Initiatives Breakdown",
          "html": "<ol>\n            <li><strong>IBM Quantum (Superconducting Gate-Based Qubits):</strong>\n              <ul>\n                <li>First to put programmable quantum processors on the public cloud (IBM Quantum Experience, 2016) alongside the open-source Python SDK <strong>Qiskit</strong>.</li>\n                <li>Developing modular multi-chip superconducting processors (such as <em>Condor</em> 1121-qubit and high-fidelity <em>Heron</em> processors) targeting fault-tolerant QEC roadmaps.</li>\n              </ul>\n            </li>\n            <li><strong>Google Quantum AI (Superconducting Qubits & Supremacy):</strong>\n              <ul>\n                <li>Built the 53-qubit <em>Sycamore</em> superconducting chip that demonstrated landmark <strong>quantum supremacy (2019)</strong> on random circuit sampling, and develops the <strong>Cirq</strong> Python framework.</li>\n                <li>Focused heavily on <strong>surface-code quantum error correction</strong> (showing logical error suppression as code distance scales) toward fault tolerance.</li>\n              </ul>\n            </li>\n            <li><strong>D-Wave Systems (Quantum Annealing):</strong>\n              <ul>\n                <li>Launched the first commercially available quantum systems (2011) using <strong>quantum annealing</strong> rather than universal gate circuits.</li>\n                <li>Its <em>Advantage</em> processors (&gt;5,000 qubits) specialize in solving large combinatorial optimization, scheduling, routing, and logistics problems.</li>\n              </ul>\n            </li>\n            <li><strong>IonQ (Trapped-Ion Quantum Computing):</strong>\n              <ul>\n                <li>Commercializing trapped-ion processors using ytterbium/barium atomic ions manipulated by lasers with high two-qubit gate fidelities and all-to-all connectivity.</li>\n                <li>Widely accessible via major cloud marketplaces (Amazon Braket, Microsoft Azure Quantum, Google Cloud).</li>\n              </ul>\n            </li>\n          </ol>"
        },
        {
          "label": "(c) Summary Matrix",
          "html": "<table class=\"q-table\">\n            <thead><tr><th>Company</th><th>Hardware Platform</th><th>Key Software / Strategic Milestone</th></tr></thead>\n            <tbody>\n              <tr><td><strong>IBM</strong></td><td>Superconducting Qubits</td><td>Qiskit SDK, IBM Cloud Quantum, Condor & Heron modular processors</td></tr>\n              <tr><td><strong>Google</strong></td><td>Superconducting Qubits</td><td>Cirq SDK, Sycamore 2019 Quantum Supremacy, surface-code error suppression</td></tr>\n              <tr><td><strong>D-Wave</strong></td><td>Quantum Annealing</td><td>Advantage (&gt;5,000 qubits) for combinatorial optimization</td></tr>\n              <tr><td><strong>IonQ</strong></td><td>Trapped Ion Qubits</td><td>High-fidelity all-to-all <span class=\"math-inline\">Yb⁺/Ba</span> ions on AWS Braket & Azure Quantum</td></tr>\n            </tbody>\n          </table>"
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>IBM, Google, D-Wave, and IonQ anchor the global commercial quantum race across gate-based superconducting, trapped-ion, and annealing architectures delivered via the cloud.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 10) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 4).",
      "noDiagramNote": "5 unit.docx Section 10 summarizes the ecosystem using a structured comparison table and text diagram.",
      "rememberThese": [
        "<strong>IBM:</strong> Superconducting + Qiskit + Cloud (Heron/Condor)",
        "<strong>Google:</strong> Superconducting + Cirq + Sycamore Supremacy + Surface-code QEC",
        "<strong>D-Wave:</strong> Quantum Annealing (&gt;5000 qubits) for optimization",
        "<strong>IonQ:</strong> Trapped Ions (all-to-all, high fidelity) on AWS Braket / Azure"
      ]
    },
    {
      "number": 86,
      "question": "What is the National Quantum Mission (NQM)?",
      "sourceTag": "Mid 2 · Unit V · Short Q10",
      "marks": 2,
      "intuition": "Launched to ensure India builds its own sovereign quantum computers, hack-proof satellite QKD links, and precision atomic sensors rather than importing foreign quantum tech.",
      "sections": [
        {
          "html": "<p>India’s <strong>National Quantum Mission (NQM)</strong> is a flagship government R&amp;D initiative (with an outlay of over <strong>₹6,000 Crore</strong>, managed under the Department of Science &amp; Technology) aimed at building indigenous scientific and industrial leadership in quantum technologies. It targets <strong>four core verticals</strong>: Quantum Computing (50–1000 physical qubits), Quantum Communication (terrestrial &amp; satellite QKD), Quantum Sensing &amp; Metrology (atomic clocks/magnetometers), and Quantum Materials &amp; Devices.</p>"
        }
      ],
      "studySource": "5 unit qst/5 unit qst 2 full.pptx (slide 13), 3rd unit/5 unit.docx (Section 10) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 4).",
      "noDiagramNote": "Outlined across Study Guide.pdf, 5 unit.docx, and 5 unit qst 2 full.pptx slide 13 without an embedded image.",
      "rememberThese": [
        "India’s flagship ₹6,000+ Crore quantum program (DST)",
        "4 Pillars: <strong>1. Computing</strong> (50–1000 qubits), <strong>2. Communication</strong> (QKD), <strong>3. Sensing & Metrology</strong>, <strong>4. Materials</strong>"
      ]
    },
    {
      "number": 87,
      "question": "Explain India’s National Quantum Mission. Discuss the ethical concerns and future prospects of quantum technology.",
      "sourceTag": "Mid 2 · Unit V · Long Q5(b)",
      "marks": 5,
      "intuition": "While India’s NQM builds sovereign quantum hardware across computing, communication, sensing, and materials, global quantum progress carries big ethical stakes—from breaking encrypted banking secrets to widening tech inequality—alongside huge breakthroughs in medicine and climate science.",
      "sections": [
        {
          "label": "Part 1: India’s National Quantum Mission (NQM)",
          "html": "<p>Approved with a budget exceeding <strong>₹6,000 Crore</strong> under the Department of Science &amp; Technology (DST), India’s <strong>National Quantum Mission (NQM)</strong> aims to seed academic research hubs, startups, and industrial capability across <strong>four core thematic pillars</strong>:</p>\n          <ol>\n            <li><strong>Quantum Computing:</strong> Developing intermediate-scale quantum computers reaching <strong>50 to 1,000 physical qubits</strong> across superconducting and photonic platforms.</li>\n            <li><strong>Quantum Communication:</strong> Establishing secure satellite-based and terrestrial optical-fiber <strong>QKD networks</strong> (targeting multi-thousand-kilometer secure links).</li>\n            <li><strong>Quantum Sensing &amp; Metrology:</strong> Designing indigenous ultra-high-precision atomic clocks, magnetometers, and gravimeters for navigation and defense.</li>\n            <li><strong>Quantum Materials &amp; Devices:</strong> Synthesizing superconductors, topological materials, quantum dots, and novel semiconductors for fabricating quantum chips.</li>\n          </ol>"
        },
        {
          "label": "Part 2: Ethical Concerns of Quantum Technology",
          "html": "<ul>\n            <li><strong>Cybersecurity Threat (RSA/ECC Decryption):</strong> Fault-tolerant quantum computers running Shor’s algorithm can break RSA and ECC, risking banking, health, and national secrets. Even today, adversaries use <strong>“Harvest Now, Decrypt Later”</strong> attacks—storing encrypted data now to unlock once quantum hardware matures.</li>\n            <li><strong>The Quantum Divide:</strong> High hardware costs (cryogenics, nanofabs) could concentrate quantum power among a few wealthy nations and tech monopolies, widening economic and geopolitical inequality.</li>\n            <li><strong>Dual-Use Military &amp; Surveillance Risks:</strong> Subterranean quantum gravimeters, submarine-tracking magnetometers, and materials or chemical weapons simulation create complex defense and regulatory dilemmas.</li>\n          </ul>"
        },
        {
          "label": "Part 3: Future Prospects & Transition Path",
          "html": "<p>As technology advances from today’s noisy <strong>NISQ</strong> era toward <strong>Fault-Tolerant Quantum Computing (FTQC)</strong>, society will transition to <strong>Post-Quantum Cryptography (PQC)</strong> and QKD security while unlocking breakthroughs in green-fertilizer catalysts, targeted drug discovery, battery materials, climate modeling, and logistics optimization.</p>"
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>India’s NQM positions the country as a global quantum contributor across four key pillars, while responsible governance, open standards, and early PQC migration are vital to manage quantum security and equity risks.</p>"
        }
      ],
      "studySource": "5 unit qst/5 unit qst 2 full.pptx (slides 13–14), 3rd unit/5 unit.docx (Sections 10–11) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 4).",
      "noDiagramNote": "Unit V notes (5 unit.docx Section 10–11, 5 unit qst 2 full.pptx slides 13–14) cover NQM, ethics, and future prospects in text and summary diagrams.",
      "rememberThese": [
        "<strong>NQM (₹6,000+ Cr):</strong> Computing (50–1000 qubits) + Communication (QKD) + Sensing + Materials",
        "<strong>3 Ethical Risks:</strong> Encryption collapse (<em>Harvest Now, Decrypt Later</em>), Quantum Divide, Dual-Use military tools",
        "<strong>Future Outlook:</strong> PQC/QKD cybersecurity + FTQC breakthroughs in drugs, catalysts, climate & logistics"
      ]
    }
  ]
});
