window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 14,
  "part": "D",
  "partTitle": "Quantum communication",
  "title": "Dense coding, networks and repeaters",
  "subtitle": "Dense coding mirrors teleportation; swapping and repeaters stretch entanglement over distance.",
  "questions": [
    {
      "number": 57,
      "question": "What is quantum dense coding?",
      "sourceTag": "Mid 2 · Unit IV · Short Q7",
      "marks": 2,
      "intuition": "Holevo’s bound says 1 ordinary qubit carries at most 1 bit—unless Alice and Bob already share an entangled partner qubit, letting Alice pack 2 full classical bits into a single transmitted qubit.",
      "sections": [
        {
          "html": "<p><strong>Quantum dense coding (superdense coding)</strong>, proposed by Bennett and Wiesner (1992), is a protocol that sends <strong>2 classical bits</strong> (<span class=\"math-inline\">00, 01, 10, 11</span>) from Alice to Bob while physically transmitting only <strong>1 single qubit</strong>—doubling channel capacity (<span class=\"math-inline\">2 : 1</span>) using a pre-shared entangled Bell pair. Alice encodes her message locally with <span class=\"math-inline\">I, X, Z,</span> or <span class=\"math-inline\">ZX</span>, sends her qubit, and Bob decodes with CNOT + Hadamard.</p>"
        }
      ],
      "studySource": "4 unit qst/quantum_dense_coding.pptx (slides 1–7).",
      "noDiagramNote": "Full Qiskit ASCII circuit and Bell encoding table from 4 unit qst/quantum_dense_coding.pptx are shown in Q58.",
      "rememberThese": [
        "Transmits <strong>2 classical bits</strong> using <strong>1 sent qubit</strong> + 1 pre-shared Bell pair",
        "Encoding gates by Alice: <span class=\"math-inline\">00→I, 01→X, 10→Z, 11→ZX</span>",
        "Uses up 1 Bell pair per 2-bit message"
      ]
    },
    {
      "number": 58,
      "question": "Explain quantum dense coding with its circuit.",
      "sourceTag": "Mid 2 · Unit IV · Long Q3(a)",
      "marks": 5,
      "intuition": "Because the 4 Bell states are completely orthogonal to one another, Alice flipping only her own half of an entangled pair shifts the whole 2-qubit pair into whichever of the 4 Bell states matches her 2-bit message.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Proposed by Bennett and Wiesner (1992), <strong>quantum dense coding</strong> transmits 2 classical bits of information (<span class=\"math-inline\">00, 01, 10, 11</span>) across a quantum channel by physically sending only 1 qubit, thanks to pre-shared entanglement.</p>"
        },
        {
          "label": "(b) 4-Step Protocol",
          "html": "<ol>\n            <li><strong>Step 1 — Share a Bell Pair:</strong> Prepare <span class=\"math-inline\">|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</span> using <span class=\"math-inline\">H</span> on <span class=\"math-inline\">q₀</span> followed by <span class=\"math-inline\">CNOT(q₀→q₁)</span>. Alice takes <span class=\"math-inline\">q₀</span>; Bob takes <span class=\"math-inline\">q₁</span>.</li>\n            <li><strong>Step 2 — Encode (Alice acts ONLY on q₀):</strong> Depending on her 2-bit message, Alice applies one of four local single-qubit gates to <span class=\"math-inline\">q₀</span>:\n              <table class=\"q-table\">\n                <thead><tr><th>2-Bit Message</th><th>Gate Alice Applies to q₀</th><th>Resulting Shared Bell State</th><th>Bob Reads</th></tr></thead>\n                <tbody>\n                  <tr><td>00</td><td>I (do nothing)</td><td>|Φ⁺⟩ = (|00⟩ + |11⟩)/√2</td><td>00</td></tr>\n                  <tr><td>01</td><td>X (bit flip)</td><td>|Ψ⁺⟩ = (|01⟩ + |10⟩)/√2</td><td>01</td></tr>\n                  <tr><td>10</td><td>Z (phase flip)</td><td>|Φ⁻⟩ = (|00⟩ − |11⟩)/√2</td><td>10</td></tr>\n                  <tr><td>11</td><td>Z after X (ZX)</td><td>|Ψ⁻⟩ = (|01⟩ − |10⟩)/√2</td><td>11</td></tr>\n                </tbody>\n              </table>\n            </li>\n            <li><strong>Step 3 — Send:</strong> Alice physically sends only her single qubit <span class=\"math-inline\">q₀</span> to Bob.</li>\n            <li><strong>Step 4 — Decode (Bell Measurement by Bob):</strong> Bob now holds both <span class=\"math-inline\">q₀</span> and <span class=\"math-inline\">q₁</span>. He applies <span class=\"math-inline\">CNOT(q₀→q₁)</span>, then <span class=\"math-inline\">H</span> on <span class=\"math-inline\">q₀</span>, and measures both qubits—recovering Alice’s exact 2 bits with 100% certainty because the 4 Bell states are orthogonal.</li>\n          </ol>",
          "image": {
            "file": "entanglement_bell_states.png",
            "caption": "Fig. The four orthogonal Bell states (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩) encoded by Alice and decoded by Bob",
            "source": "2unit qst/3b Quantum entanglement.pptx · slide 2",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Quantum Circuit Diagram",
          "html": "<pre class=\"math-block\">     ┌───┐      ░ ┌───┐┌───┐ ░      ┌───┐ ░ ┌─┐   \nq_0: ┤ H ├──■───░─┤ X ├┤ Z ├─░───■──┤ H ├─░─┤M├───\n     └───┘┌─┴─┐ ░ └───┘└───┘ ░ ┌─┴─┐└───┘ ░ └╥┘┌─┐\nq_1: ─────┤ X ├─░────────────░─┤ X ├──────░──╫─┤M├\n          └───┘ ░            ░ └───┘      ░  ║ └╥┘\nc: 2/═════════════════════════════════════════╩══╩═\n                                             1  0\nBell pair: H, CNOT  |  Alice (msg=11): X then Z  |  Bob decoder: CNOT, H → Measure</pre>"
        },
        {
          "label": "(d) Worked Verification (Message = 11)",
          "html": "<p>Starting from <span class=\"math-inline\">(|00⟩+|11⟩)/√2</span>, Alice applies <span class=\"math-inline\">X</span> on <span class=\"math-inline\">q₀</span> → <span class=\"math-inline\">(|10⟩+|01⟩)/√2</span>, then <span class=\"math-inline\">Z</span> on <span class=\"math-inline\">q₀</span> → <span class=\"math-inline\">(|01⟩−|10⟩)/√2 = |Ψ⁻⟩</span>. When Bob applies <span class=\"math-inline\">CNOT(q₀→q₁)</span>: <span class=\"math-inline\">(|01⟩ − |11⟩)/√2 = ((|0⟩−|1⟩)/√2) ⊗ |1⟩</span>. Applying <span class=\"math-inline\">H</span> to <span class=\"math-inline\">q₀</span> yields <span class=\"math-inline\">|1⟩ ⊗ |1⟩ = |11⟩</span>—100% deterministic readout of <span class=\"math-inline\">11</span>.</p>"
        },
        {
          "label": "(e) Limits & Conclusion",
          "html": "<p>Dense coding requires sharing an entangled pair beforehand, consumes 1 Bell pair per 2-bit message, and is sensitive to channel noise—yet demonstrates that entanglement acts as a capacity-doubling communication resource.</p>"
        }
      ],
      "studySource": "4 unit qst/quantum_dense_coding.pptx (slides 1–7) & Bell state diagram from 2unit qst/3b Quantum entanglement.pptx (slide 2).",
      "rememberThese": [
        "4 steps: Share Bell pair → Encode (<span class=\"math-inline\">I, X, Z, ZX</span> on <span class=\"math-inline\">q₀</span>) → Send <span class=\"math-inline\">q₀</span> → Decode (<span class=\"math-inline\">CNOT + H</span>)",
        "Encoding map: <span class=\"math-inline\">00→I, 01→X, 10→Z, 11→ZX</span>",
        "Throughput = <strong>2 classical bits per 1 sent qubit</strong> (using 1 pre-shared Bell pair)"
      ]
    },
    {
      "number": 59,
      "question": "Compare quantum teleportation and quantum dense coding. Explain how entanglement is used in each, with circuits.",
      "sourceTag": "Mid 2 · Unit IV · Long Q6(b)",
      "marks": 5,
      "intuition": "Teleportation and dense coding are exact mirror twins of each other: teleportation spends 1 Bell pair + 2 classical bits to move 1 qubit, while dense coding spends 1 Bell pair + 1 qubit to move 2 classical bits.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Side-by-Side Comparison",
          "html": "<table class=\"q-table\">\n            <thead><tr><th>Property</th><th>Quantum Teleportation</th><th>Quantum Dense Coding</th></tr></thead>\n            <tbody>\n              <tr><td><strong>Goal</strong></td><td>Transfer <strong>1 unknown quantum state</strong> (<span class=\"math-inline\">|ψ⟩</span>)</td><td>Send <strong>2 classical bits</strong> (<span class=\"math-inline\">00, 01, 10, 11</span>)</td></tr>\n              <tr><td><strong>Shared Resource Consumed</strong></td><td>1 entangled Bell pair (<span class=\"math-inline\">|Φ⁺⟩</span>)</td><td>1 entangled Bell pair (<span class=\"math-inline\">|Φ⁺⟩</span>)</td></tr>\n              <tr><td><strong>What Travels Across Channel?</strong></td><td><strong>2 classical bits</strong> (no qubit travels)</td><td><strong>1 qubit</strong> (no classical bits sent)</td></tr>\n              <tr><td><strong>Alice’s Operations</strong></td><td>Bell measurement: <span class=\"math-inline\">CNOT + H + Measure</span></td><td>Local Pauli gate: <span class=\"math-inline\">I, X, Z,</span> or <span class=\"math-inline\">ZX</span> on her qubit</td></tr>\n              <tr><td><strong>Bob’s Operations</strong></td><td>Conditional Pauli fix: <span class=\"math-inline\">X^(m₁), Z^(m₀)</span></td><td>Bell decoding: <span class=\"math-inline\">CNOT + H + Measure</span></td></tr>\n            </tbody>\n          </table>"
        },
        {
          "label": "(b) How Entanglement Is Used in Each",
          "html": "<ul>\n            <li><strong>In Teleportation:</strong> Entanglement acts as a <em>quantum bridge</em> linking Alice’s and Bob’s registers. When Alice performs a Bell measurement joining her unknown state with her Bell half, her two classical bits tell Bob how to rotate his distant entangled partner into the original <span class=\"math-inline\">|ψ⟩</span>.</li>\n            <li><strong>In Dense Coding:</strong> Entanglement acts as a <em>pre-loaded correlation resource</em> spanning 4 orthogonal joint states. Acting on her half alone lets Alice select any of the 4 global Bell states, so sending just 1 qubit lets Bob distinguish all 4 two-bit messages.</li>\n          </ul>"
        },
        {
          "label": "(c) Teleportation Circuit & 3-Qubit Flow",
          "html": "<p><strong>Teleportation Protocol Flow:</strong> Entangle <span class=\"math-inline\">q₁, q₂</span> into a Bell pair → Alice applies <span class=\"math-inline\">CNOT(q₀, q₁)</span>, <span class=\"math-inline\">H(q₀)</span>, and measures <span class=\"math-inline\">(m₀, m₁)</span> → Bob applies conditional gates <span class=\"math-inline\">X^(m₁)</span> and <span class=\"math-inline\">Z^(m₀)</span> on <span class=\"math-inline\">q₂</span> to recover <span class=\"math-inline\">|ψ⟩</span>.</p>",
          "image": {
            "file": "teleportation_circuit.png",
            "caption": "Fig. Quantum state transfer circuit diagram",
            "source": "2unit qst/11a quantum teleportaion State transfer.docx · rId4",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Dense Coding Circuit (Dual Gate Order)",
          "html": "<pre class=\"math-block\">     ┌───┐      ░ ┌───┐┌───┐ ░      ┌───┐ ░ ┌─┐   \nq_0: ┤ H ├──■───░─┤ X ├┤ Z ├─░───■──┤ H ├─░─┤M├───\n     └───┘┌─┴─┐ ░ └───┘└───┘ ░ ┌─┴─┐└───┘ ░ └╥┘┌─┐\nq_1: ─────┤ X ├─░────────────░─┤ X ├──────░──╫─┤M├\n          └───┘ ░            ░ └───┘      ░  ║ └╥┘\n(Bob's decoder CNOT + H reverses Alice's teleportation Bell measurement.)</pre>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Teleportation and dense coding are duals: swapping Alice’s and Bob’s steps converts 1 Bell pair + 2 classical bits → 1 qubit into 1 Bell pair + 1 qubit → 2 classical bits.</p>"
        }
      ],
      "studySource": "4 unit qst/quantum_dense_coding.pptx (slide 5), 2unit qst/11a quantum teleportaion State transfer.docx, 2unit qst/11b quantum teleportation eg.docx; full 3-qubit teleportation circuit flow added from textbook.",
      "rememberThese": [
        "Teleportation: 1 ebit + 2 classical bits ⇒ 1 unknown qubit",
        "Dense coding: 1 ebit + 1 qubit ⇒ 2 classical bits",
        "Alice & Bob swap roles: Bell measurement is Alice in teleportation, Bob in dense coding"
      ]
    },
    {
      "number": 60,
      "question": "What is entanglement swapping?",
      "sourceTag": "Mid 2 · Unit IV · Short Q8",
      "marks": 2,
      "intuition": "Suppose Alice is entangled with Relay B, and Relay B’s twin is entangled with Bob—if the relay does a Bell measurement on its two middle qubits, Alice and Bob become directly entangled without ever meeting!",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "html": "<p><strong>Entanglement swapping</strong> is a quantum protocol that creates entanglement between two distant qubits (Alice and Bob) that have never directly interacted. Two separate Bell pairs <span class=\"math-inline\">(A, R₁)</span> and <span class=\"math-inline\">(R₂, B)</span> are prepared; an intermediate station performs a <strong>Bell-state measurement (BSM)</strong> on <span class=\"math-inline\">(R₁, R₂)</span>, projecting <span class=\"math-inline\">(A, B)</span> directly into an entangled Bell state (up to Pauli corrections communicated classically).</p>"
        }
      ],
      "studySource": "Added from textbook (Nielsen & Chuang / quantum networking); 4 unit qst contains only QKD and dense coding.",
      "noDiagramNote": "Not pictured in Unit IV slides; added from standard quantum networking textbook theory.",
      "rememberThese": [
        "Entangles two distant particles that never interacted",
        "Input: 2 short links <span class=\"math-inline\">(A,R₁)</span> and <span class=\"math-inline\">(R₂,B)</span> → BSM at relay <span class=\"math-inline\">R</span> → 1 long link <span class=\"math-inline\">(A,B)</span>",
        "Core mechanism inside quantum repeaters"
      ]
    },
    {
      "number": 61,
      "question": "What are quantum networks? Explain entanglement swapping.",
      "sourceTag": "Mid 2 · Unit IV · Long Q3(b)",
      "marks": 5,
      "intuition": "A quantum network connects quantum chips over distance using photons and shared entanglement; entanglement swapping acts like splicing two short ropes together at a relay station to span cities without losing delicate qubits.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "Part 1: What Are Quantum Networks?",
          "html": "<p>A <strong>quantum network</strong> is an interconnected system of quantum processors (nodes), quantum memories, and optical or free-space channels capable of generating, storing, and distributing qubits and entanglement across long distances—forming the backbone of a future Quantum Internet. Unlike classical routers, quantum networks cannot amplify signals (due to the no-cloning theorem) and are used for multi-party QKD, distributed quantum computing, blind cloud computing, and networked quantum clocks and sensors.</p>"
        },
        {
          "label": "Part 2: Entanglement Swapping Explained Step by Step",
          "html": "<p>To entangle distant nodes Alice (<span class=\"math-inline\">A</span>) and Bob (<span class=\"math-inline\">B</span>) via an intermediate repeater node Charlie holding <span class=\"math-inline\">(R₁, R₂)</span>:</p>\n          <ol>\n            <li><strong>Step 1 (Prepare two short Bell links):</strong> Share <span class=\"math-inline\">|Φ⁺⟩_{A,R₁}</span> between Alice and Charlie, and <span class=\"math-inline\">|Φ⁺⟩_{R₂,B}</span> between Charlie and Bob. Initially <span class=\"math-inline\">A</span> and <span class=\"math-inline\">B</span> are completely unentangled.</li>\n            <li><strong>Step 2 (Joint Bell Measurement at Charlie):</strong> Charlie applies <span class=\"math-inline\">CNOT(R₁→R₂)</span> and <span class=\"math-inline\">H(R₁)</span>, then measures <span class=\"math-inline\">R₁</span> and <span class=\"math-inline\">R₂</span> in one of the 4 Bell states.</li>\n            <li><strong>Step 3 (Collapse & Classical Correction):</strong> Because <span class=\"math-inline\">|Φ⁺⟩_{A,R₁} ⊗ |Φ⁺⟩_{R₂,B}</span> expands into equal Bell states of <span class=\"math-inline\">(R₁,R₂)</span> paired with <span class=\"math-inline\">(A,B)</span>, Charlie’s measurement projects <span class=\"math-inline\">(A, B)</span> into a Bell state. Charlie sends 2 classical bits to Bob so Bob applies <span class=\"math-inline\">I, X, Z,</span> or <span class=\"math-inline\">ZX</span>, leaving Alice and Bob holding <span class=\"math-inline\">|Φ⁺⟩_{A,B}</span>.</li>\n          </ol>\n          <div class=\"math-block\">[A] ═══ [R₁  R₂] ═══ [B]  ──(BSM at Charlie + 2 classical bits)──►  [A] ═══════════════ [B]</div>"
        },
        {
          "label": "(c) Conclusion",
          "html": "<p>Quantum networks link remote quantum nodes, and entanglement swapping stitches short-range entangled segments together into city- and continent-scale quantum links.</p>"
        }
      ],
      "studySource": "Added from textbook (Nielsen & Chuang / quantum networking); 4 unit qst contains only QKD and dense coding.",
      "noDiagramNote": "Unit IV files do not include a network/swapping figure; summarized using standard quantum communication text architecture.",
      "rememberThese": [
        "Quantum network = nodes + quantum memories + photonic channels distributing entanglement",
        "Cannot use classical amplifiers because of No-Cloning",
        "Entanglement swapping = BSM on two middle qubits <span class=\"math-inline\">(R₁, R₂)</span> links outer qubits <span class=\"math-inline\">(A, B)</span>"
      ]
    },
    {
      "number": 62,
      "question": "Why are quantum repeaters needed?",
      "sourceTag": "Mid 2 · Unit IV · Short Q9",
      "marks": 2,
      "intuition": "Optical fiber absorbs photons exponentially over distance, yet the no-cloning theorem forbids copying and boosting weak quantum signals like classical internet repeaters do—so we need quantum repeaters instead.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "html": "<p><strong>Quantum repeaters</strong> are needed because optical photons experience exponential absorption loss in fiber cables over ~100–200 km, yet the <strong>no-cloning theorem</strong> prevents classical optical amplifiers from copying and boosting unknown quantum states. Quantum repeaters overcome distance loss by dividing long links into short segments connected through <strong>entanglement swapping</strong> and <strong>entanglement purification</strong>.</p>"
        }
      ],
      "studySource": "Added from textbook (Briegel et al. / quantum networking); 4 unit qst lacks repeater slides.",
      "noDiagramNote": "No diagram in Unit IV notes; see Q63 for the segmented repeater architecture.",
      "rememberThese": [
        "Fiber attenuation causes exponential photon loss past ~100 km",
        "Classical amplifiers fail because of <strong>No-Cloning</strong> & added noise",
        "Solution: break long links into short segments with repeaters"
      ]
    },
    {
      "number": 63,
      "question": "What are quantum repeaters? Explain their role in long-distance quantum communication.",
      "sourceTag": "Mid 2 · Unit IV · Long Q4(a)",
      "marks": 5,
      "intuition": "Instead of throwing one fragile photon 1,000 km through thick glass hoping it survives, quantum repeaters set up 100 km relay stations that catch, purify, store in memory, and swap entanglement hop by hop.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>A <strong>quantum repeater</strong> is a specialized intermediate network device that extends quantum communication and QKD beyond fiber-loss limits (~100 km) without violating the no-cloning theorem or collapsing the transmitted quantum information.</p>"
        },
        {
          "label": "(b) Three Core Functions of a Quantum Repeater",
          "html": "<ol>\n            <li><strong>Segmentation (Dividing Distance):</strong> Splits a long link (say 1,000 km) into short, manageable segments (<span class=\"math-inline\">L₀ ~ 50–100 km</span>) where direct photon transmission succeeds frequently, storing successful entangled qubits in <strong>quantum memories</strong> until neighboring links succeed.</li>\n            <li><strong>Entanglement Purification / Distillation:</strong> Uses local CNOT gates and measurements on multiple noisy, decohered Bell pairs to distill fewer high-fidelity entangled pairs, fighting channel noise.</li>\n            <li><strong>Entanglement Swapping:</strong> Performs a Bell-state measurement connecting adjacent high-fidelity links (<span class=\"math-inline\">A–R₁</span> and <span class=\"math-inline\">R₂–B</span>) to extend end-to-end entanglement seamlessly across all segments.</li>\n          </ol>\n          <div class=\"math-block\">[Alice] ──100km── [Repeater 1 (Memory+Purify+Swap)] ──100km── [Repeater 2] ──100km── [Bob]</div>"
        },
        {
          "label": "(c) Role in Long-Distance Communication & QKD",
          "html": "<p>Once end-to-end entanglement is established via repeaters, Alice and Bob can run long-distance <strong>teleportation</strong> or <strong>entanglement-based QKD (E91)</strong> at polynomial rather than exponentially decaying key rates.</p>"
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>By combining quantum memories, entanglement purification, and entanglement swapping, quantum repeaters overcome exponential fiber loss and make global quantum networks feasible.</p>"
        }
      ],
      "studySource": "Added from textbook (quantum repeaters: segmentation, purification, swapping); 4 unit qst lacks repeater files.",
      "noDiagramNote": "Not depicted in Unit IV slides; standard quantum repeater schematic shown in text above.",
      "rememberThese": [
        "Three pillars of a quantum repeater: <strong>1. Quantum Memory (short segments)</strong>, <strong>2. Entanglement Purification</strong>, <strong>3. Entanglement Swapping</strong>",
        "Avoids copying unknown qubits (respects No-Cloning)",
        "Turns exponential photon-loss scaling into manageable polynomial scaling"
      ]
    },
    {
      "number": 64,
      "question": "Explain single-photon sources and single-photon detectors.",
      "sourceTag": "Mid 2 · Unit IV · Long Q4(b)",
      "marks": 5,
      "intuition": "Secure QKD needs guns that fire exactly ONE photon at a time (if two escape, Eve could siphon one!) and cameras sensitive enough to hear a single photon’s tiny \"click\" without mistaking dark noise for light.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Optical quantum communication and photonic computing rely on emitting <strong>exactly one indistinguishable photon per pulse</strong> and detecting single-photon arrivals with near-100% efficiency and ultra-low dark counts.</p>"
        },
        {
          "label": "Part 1: Single-Photon Sources",
          "html": "<ul>\n            <li><strong>Ideal Requirement:</strong> On-demand emission of strictly 1 photon (<span class=\"math-inline\">g⁽²⁾(0) ≈ 0</span>, zero multi-photon pulses) to prevent photon-number-splitting (PNS) attacks in QKD.</li>\n            <li><strong>Main Realizations:</strong>\n              <ol>\n                <li><strong>Weak Coherent Pulses (Attenuated Lasers):</strong> Simple lasers dimmed heavily; inexpensive but occasionally emit 2+ photons (Poisson statistics, mitigated using decoy states).</li>\n                <li><strong>SPDC (Spontaneous Parametric Down-Conversion):</strong> Pump laser hits a nonlinear crystal (such as BBO), creating correlated photon pairs—detecting one “heralds” the presence of its twin.</li>\n                <li><strong>Deterministic Solid-State Emitters (Quantum Dots & NV Centers):</strong> Confined semiconductor quantum dots (<span class=\"math-inline\">CdSe, InP, InAs</span>) and diamond NV centers emit single photons on demand upon excitation.</li>\n              </ol>\n            </li>\n          </ul>"
        },
        {
          "label": "Part 2: Single-Photon Detectors",
          "html": "<ul>\n            <li><strong>Key Performance Metrics:</strong> High <em>detection efficiency</em> (<span class=\"math-inline\">η</span>), ultra-low <em>dark-count rate</em> (false clicks in total darkness), low <em>timing jitter</em>, and short <em>dead time</em>.</li>\n            <li><strong>Main Detector Types:</strong>\n              <ol>\n                <li><strong>SNSPDs (Superconducting Nanowire Single-Photon Detectors):</strong> A microscopic superconducting wire biased just below critical current transiently turns resistive when hit by 1 photon, yielding &gt;90% efficiency, picosecond jitter, and minimal dark counts (requires cryogenic cooling).</li>\n                <li><strong>SPADs (Single-Photon Avalanche Diodes / APDs):</strong> Reverse-biased semiconductor photodiodes (InGaAs/Si) operating in Geiger mode where one photon triggers a measurable electron avalanche; compact and lower cost (~20–60% efficiency) but higher dark counts.</li>\n              </ol>\n            </li>\n          </ul>"
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>Deterministic single-photon sources (SPDC and quantum dots) paired with high-efficiency SNSPD or SPAD detectors form the physical transmitter–receiver hardware for secure QKD and photonic quantum processors.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Sections 3 & 8: Quantum Dots, SNSPDs) & 4 unit qst/qkd.pptx (slide 6); weak coherent pulses, SPDC, and SPADs added from textbook.",
      "noDiagramNote": "Unit IV slides mention single photons in fiber; Unit V text describes SNSPDs and Quantum Dot emitters without standalone device images.",
      "rememberThese": [
        "Multi-photon pulses leak info to Eve (PNS attack) ⇒ need <span class=\"math-inline\">g⁽²⁾(0) → 0</span>",
        "Sources: Attenuated lasers (decoy-state), SPDC nonlinear crystals, Quantum Dots / NV centers",
        "Detectors: <strong>SNSPDs</strong> (&gt;90% eff., cryo) and <strong>SPADs/APDs</strong> (Geiger avalanche)"
      ]
    },
    {
      "number": 65,
      "question": "Explain the implementation challenges of quantum communication (loss, decoherence and noise).",
      "sourceTag": "Mid 2 · Unit IV · Long Q5(b)",
      "marks": 5,
      "intuition": "Sending a single photon hundreds of kilometers without letting glass absorb it, stray heat scramble its phase, or detector dark counts mimic a spy is one of the toughest engineering challenges in quantum tech.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Although quantum communication is theoretically secure, physical quantum channels are neither lossless nor error-free and face three major engineering hurdles: <strong>channel loss</strong>, <strong>decoherence</strong>, and <strong>hardware/background noise</strong>.</p>"
        },
        {
          "label": "(b) The Three Core Challenges Explained",
          "html": "<ol>\n            <li><strong>1. Channel Attenuation / Photon Loss:</strong>\n              <ul>\n                <li>Optical fibers absorb and scatter light exponentially with distance (<span class=\"math-inline\">T = 10^(−αL/10)</span>, roughly ~0.2 dB/km at 1550 nm). Past 100–200 km, almost every single photon is absorbed before reaching Bob.</li>\n                <li>Because unknown quantum states cannot be cloned or classically amplified, distance is capped without <strong>quantum repeaters</strong> or <strong>satellite QKD links</strong>.</li>\n              </ul>\n            </li>\n            <li><strong>2. Decoherence & Polarization/Phase Drift:</strong>\n              <ul>\n                <li>Environmental coupling—temperature fluctuations, mechanical vibrations in fiber, and birefringence—rotates photon polarization or scrambles relative phases between <span class=\"math-inline\">|0⟩</span> and <span class=\"math-inline\">|1⟩</span>.</li>\n                <li>In quantum memories inside repeaters, short coherence times limit how long entangled pairs can wait for neighboring links.</li>\n              </ul>\n            </li>\n            <li><strong>3. Noise & Detector Imperfections:</strong>\n              <ul>\n                <li>Stray ambient photons, Raman scattering from classical telecom fibers, and detector <strong>dark counts</strong> add false clicks, raising the Quantum Bit Error Rate (QBER).</li>\n                <li>Small natural noise creates occasional bit mismatches that can mimic an eavesdropper—forcing Alice and Bob to separate acceptable channel noise from Eve using privacy amplification and error correction, or aborting if QBER exceeds ~11%.</li>\n              </ul>\n            </li>\n          </ol>"
        },
        {
          "label": "(c) Mitigations & Practical Trade-offs",
          "html": "<p>Engineers counter these limits using ultra-low-loss telecom wavelengths (1550 nm), cryogenic SNSPD detectors, free-space satellites (for &gt;1,000 km links), classical error-correcting post-processing, and quantum repeaters.</p>"
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>Photon loss restricts range, decoherence degrades state fidelity, and noise raises QBER—driving ongoing advances in repeaters, SNSPDs, and satellite QKD.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 6, 12) & 4 unit qst/quantum_dense_coding.pptx (slide 7); fiber attenuation formula (~0.2 dB/km at 1550 nm) and 11% QBER threshold added from textbook.",
      "noDiagramNote": "4 unit qst/qkd.pptx (slides 6, 12) and 4 unit qst/quantum_dense_coding.pptx (slide 7) discuss channel errors and noise in text only.",
      "rememberThese": [
        "<strong>Loss:</strong> exponential fiber attenuation (~0.2 dB/km) + no-cloning bans amplification",
        "<strong>Decoherence:</strong> fiber vibrations/birefringence/thermal coupling distort polarization & phase",
        "<strong>Noise:</strong> background photons & dark counts inflate QBER (must stay below QKD abort threshold)"
      ]
    }
  ]
});
