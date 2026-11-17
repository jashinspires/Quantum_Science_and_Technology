export interface GuideStageSource {
  stageId: number;
  title: string;
  questionRange: string;
  primaryFiles: string;
  supplementalNotes: string;
}

export interface DisagreementItem {
  topic: string;
  difference: string;
  howHandled: string;
}

export interface MissingDiagramGroup {
  category: string;
  questions: string;
  reason: string;
}

export interface UncoveredUnitGroup {
  unit: string;
  topicsNotInQuestions: string[];
}

export const QUICK_START_LINES: string[] = [
  'This site holds clean, exam-ready answers for all 107 questions (the 87 questions from QST_Mid1_Mid2_Study_Order.pdf plus 20 Unit I & II 2-mark questions from the attached answer booklet), arranged in 19 progressive stages (Parts A–E).',
  'Start at Part A · Stage 1 (or pick any stage/filter from the menu, or switch to Unit-wise Exam View) and read "Understand it" before memorizing "Write this in the exam".',
  'Use Practice mode (top bar) to hide answers, write or say your response from memory, then click "Show answer" to check every step and diagram.',
  'Click "Mark done" after mastering a question — saved in this browser only (localStorage) — and open "Start Here" or "?" anytime for study plans and sources.',
];

export const HELP_MODAL_ITEMS: { title: string; body: string }[] = [
  {
    title: 'Four Clear Card Sections',
    body: 'Every question separates study help from exam writing: "Understand it" (intuition only), "Write this in the exam" (clean textbook prose to write on your answer sheet), "Remember these" (quick revision formulas), and "Source (for study, not for the exam)".',
  },
  {
    title: 'Practice Mode (Recall Test)',
    body: 'Click "Practice mode" in the top bar to hide all answer sections across cards. Recite 2-mark definitions aloud or sketch 5-mark outlines/circuits on paper first, then press "Show answer".',
  },
  {
    title: 'Search & Filters',
    body: 'Search across questions, exam answers, key terms, and sources, or filter by Remaining, Done, 2 marks, or 5 marks inside any stage.',
  },
  {
    title: 'Browser-Only Progress Saving',
    body: '"Mark done" is saved only in this browser via localStorage. Clearing site data resets your checkmarks, and progress stays on this device/browser.',
  },
  {
    title: 'Offline Use Anytime',
    body: 'Open offline-study/index.html directly by double-clicking in your file manager — zero internet or server needed.',
  },
];

export const GUIDE_SECTIONS = {
  part1WhatThisIs: {
    heading: 'Part 1 — What This Site Is',
    bullets: [
      'Complete QST Exam Companion: Covers all 107 questions across 5 units (87 questions from QST_Mid1_Mid2_Study_Order.pdf plus 20 Unit I & II 2-mark questions added from the attached answer booklet), split into 53 two-mark questions and 54 five-mark questions.',
      'Reordered Into 19 Learning Stages (Parts A–E): Instead of jumping blindly across syllabi, related concepts sit together so each stage unlocks the next (for example, No-Cloning and Teleportation move into Stage 6 alongside Qubits and Entanglement, and Decoherence sits in Stage 12 next to Quantum Error Correction).',
      'Exact Source Tags & Sequential Exam Numbering: Every card keeps its original grey tag (for example, "Mid 1 · Unit II · Q6", "Mid 2 · Unit III · Long Q4(b)", or "Added from attached PDF · Unit I · Q1"). In Unit-wise Exam View, every 2-Mark and 5-Mark section is numbered sequentially starting from 1, independent of Study Order IDs.',
      'How 2-Mark vs. 5-Mark Badges Were Assigned: Mid 2 questions follow the Short (2 marks) and Long (5 marks) labels printed in the Mid 2 PDF and study order PDF. Original Mid 1 questions follow the Short vs. Long classification in the Mid 1 PDF, and the 20 added Unit I & II Short questions come directly from the attached Unit I–V answer booklet.',
      'Study Help Separated From Exam Text: Only the "Write this in the exam" box is written in neutral textbook exam style with zero file names, slide numbers, or hints—so you can study intuitively without accidentally writing "from Unit 2 PPT" on your exam script.',
    ],
  },
  part2HowToStudy: {
    heading: 'Part 2 — How to Study Step by Step',
    routineSteps: [
      'Step 1 — Read "Understand it" first: Grasp WHY the concept or rule works in everyday words before touching symbols.',
      'Step 2 — Read "Write this in the exam": Check the structure—clean 3–5 sentences for 2-mark answers, or Idea → Steps → Formula/Diagram → Example → Uses/Limits → Conclusion for 5-mark answers.',
      'Step 3 — Switch on Practice mode: Scroll to a card, cover or hide the answer, and force your brain to recall the steps without peeking.',
      'Step 4 — Check gaps & "Remember these": Click "Show answer", catch any missing formula, sign, or ket, and drill those bullets in "Remember these".',
      'Step 5 — Click "Mark done": Only check off a card once you can reproduce its core steps or circuit cleanly from memory.',
    ],
    shortVsLong:
      'Practice 2-mark questions out loud in 30 seconds (definition + 1 key formula or example, no headings needed). For 5-mark questions, never just read passively: jot a 5-point skeleton on rough paper and hand-draw every quantum circuit, matrix multiplication, and Bloch sphere diagram from scratch.',
    twinQuestionsNote:
      'Watch out for twin/overlapping questions: Q17 & Q18 both ask about quantum entanglement and Bell states, and Q25 & Q26 both ask to differentiate classical computing from quantum computing. Study each pair deeply once, click Mark done on both after checking any wording nuance, and save 20–30 minutes.',
    memorizeMustKnow: {
      formulas: [
        'Wave mechanics & wells: iℏ ∂ψ/∂t = Ĥψ, Infinite well Eₙ = n²π²ℏ²/(2mL²), [x̂, p̂ₓ] = iℏ, Δx·Δp ≥ ℏ/2',
        'Qubit & Bloch sphere: |ψ⟩ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1; Bloch form cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩',
        'Single & multi-qubit gates: X, Y, Z, H = (1/√2)[[1,1],[1,−1]], T = diag(1, e^(iπ/4)), CNOT, and U†U = I',
        'Four Bell states: |Φ±⟩ = (|00⟩ ± |11⟩)/√2, |Ψ±⟩ = (|01⟩ ± |10⟩)/√2',
        'Algorithms & QEC: Deutsch–Jozsa (1 query vs 2ⁿ⁻¹+1), Grover (k* ≈ (π/4)√N, diffuser 2μ − aₓ), QFT O(n²) & CR₂ = diag(1,i), Shor factors gcd(a^(r/2) ± 1, N), Shor 9-qubit |0_L⟩ / |1_L⟩',
        'Communication & Tech: BB84 QBER ≈ 25% ((3/4)^m stealth), E91 CHSH |S| = 2√2 > 2, NOON lithography λ_eff = λ/N, NV⁻ Zeeman Δν = 2γ_e B',
      ],
      circuitsAndDiagrams: [
        'Unit I–II: Step potential reflection/transmission sketch (E < V₀ vs E > V₀), Bloch sphere axes (|0⟩, |1⟩, |+⟩, |−⟩, |i⟩), H + CNOT Bell-state generator, 2-qubit state transfer & 3-qubit teleportation circuit',
        'Unit III: Deutsch–Jozsa circuit (H → U_f → H → Measure), Grover Oracle + Diffuser loop, 2-qubit QFT (H → CR₂ → H → SWAP), Shor period-finding circuit & 9-qubit code blocks',
        'Unit IV–V: BB84 Z/X basis + sifting table diagram, Dense coding circuit (Bell pair → Alice gate → CNOT + H), Diamond NV⁻ energy-level diagram (532 nm pump / 637 nm fluorescence)',
      ],
      understandWhyRule:
        'Always link the math to WHY it happens: linear unitaries forbid unknown cloning (No-Cloning); opposite phases erase wrong outputs (Quantum Interference); measurement collapse forces Eve to disturb BB84 photons (~25% QBER). Understanding why lets you rebuild forgotten exam lines calmly.',
    },
    studyPlans: [
      {
        name: '12-Hour Complete Plan (All 107 Questions)',
        summary: 'Best when you have a full day before the exam.',
        blocks: [
          'Hours 1–2.5 · Parts A & B (Stages 1–6): Wave basics, Schrödinger/step potential, Hilbert space, Pauli/H/CNOT calculations (practice matrix multiplications by hand!), Bloch sphere, No-cloning & Teleportation.',
          'Break (15 min): Hydrate and step away from screens.',
          'Hours 2.75–6.0 · Part C (Stages 7–12): Spend extra time on Stage 11 (QFT/Shor) and Stage 12 (3-qubit QEC, Shor 9-qubit, Qiskit workflow). Drill Q33, Q35, Q37, Q39 on rough paper.',
          'Break (20 min): Walk/meal, zero cramming.',
          'Hours 6.25–8.5 · Part D (Stages 13–14): BB84 table & 25% QBER math, E91 CHSH inequality, Dense Coding vs Teleportation dual circuits, Repeaters & Channel loss.',
          'Hours 8.75–10.5 · Part E (Stages 15–19): Magnetometry/Gravimetry/Atomic clocks, Ghost imaging & NOON lithography, Quantum Dots/Topological Insulators/NV⁻, Superconducting vs Trapped-Ion vs Photonics, NISQ, NQM & Ethics.',
          'Hours 10.5–12.0 · Timed Practice-Mode Mock + Next Morning: Filter by Remaining or 5 marks in Practice mode, hand-write 4–5 long answers under a 45-min timer without peeking, get full sleep, then do a 30-min morning skim of "Remember these".',
        ],
      },
      {
        name: '10-Hour Focused Plan (High-Yield + Calculations)',
        summary: 'Balances full syllabus coverage with calculation & diagram mastery.',
        blocks: [
          'Hours 1–2 · Parts A & B (Stages 1–6): Focus on Stage 4–5 gate/eigenvalue math and Bell/Teleportation circuits. Use the twin shortcut on Q17/Q18.',
          'Hours 2–5 · Part C (Stages 7–12): Use twin shortcut on Q25/Q26. Spend heavy paper-practice time on Stage 11 (Q37, Q39) and Stage 12 (Q43–Q46).',
          'Break (20 min) between Parts C and D.',
          'Hours 5.25–7.25 · Part D (Stages 13–14): Lock in BB84 worked table (Q50), 25% QBER (Q52), E91 (Q55), Dense coding (Q58), and Repeaters (Q63).',
          'Hours 7.5–9.0 · Part E (Stages 15–19): Learn clear 2-mark definitions first, then Group 5-mark comparisons (Sensors, NV⁻, Hardware platforms table, NQM/Ethics).',
          'Hours 9.0–10.0 · Timed Recall + Next-Morning Review: Run Practice mode on hardest stages (4, 5, 11, 12, 13), sleep properly, and review "Remember these" cards the next morning.',
        ],
      },
      {
        name: '5-Hour Crash Plan (Exam Tomorrow)',
        summary: 'Maximizes marks across all 5 units when time is tight.',
        blocks: [
          'Hour 1 · All 53 Two-Mark Questions: Filter by "2 marks" across Stages 1–19 in Practice mode—secure fast, exact definitions and formulas first.',
          'Hours 1.25–2.25 · Core Unit I–II Calculations & Circuits (Stages 3–6): Pauli action on |0⟩/|1⟩, Unitary check U†U=I, H+CNOT Bell states, Teleportation, Step potential.',
          'Hours 2.25–3.5 · Core Unit III & IV 5-Mark Flagships (Stages 9–14): Deutsch–Jozsa, Grover N=4 example, Shor N=15 example, Shor 9-qubit QEC + Qiskit, BB84 + Dense Coding.',
          'Hours 3.5–4.25 · Unit V High-Probability Topics (Stages 15–19): Sensors & NV⁻ centers, Superconducting vs Trapped-Ion vs Photonics, NISQ, National Quantum Mission & Ethics.',
          'Hours 4.25–5.0 · Timed Writing + Sleep + Morning Refresh: Sketch 3 flagship circuits + tables strictly from memory (no notes), sleep at least 6–7 hours so recall works, and spend 20 minutes next morning scanning "Remember these".',
        ],
      },
    ],
  },
  part3HowToUseApp: {
    heading: 'Part 3 — How to Use This App',
    features: [
      {
        name: 'Sidebar Navigation (Top to Bottom)',
        detail:
          'At the top of the left menu you will find Start Here (this full study guide) and Sources (exact note mappings and missing diagrams). Below them are Parts A–E holding Stages 1–19 with live completion counters (for example, "3/4 done"). On mobile, tap the Menu button at top left.',
      },
      {
        name: 'Quick Start Banner & "?" Help Button',
        detail:
          'The 5-line Quick Start card sits at the top of the Stages view when you open the site (you can dismiss or re-open it anytime). Every page also shows a "?" Help button in the top bar for a quick reminder of controls.',
      },
      {
        name: 'Search Bar & Filter Chips',
        detail:
          'Type any keyword ("Grover", "BB84", "CNOT", "Mid 1", "Q39") into the stage search box to match across question titles, exam text, key terms, and sources. Use the filter buttons for All, Remaining, Done, 2 marks, or 5 marks.',
      },
      {
        name: 'Practice Mode',
        detail:
          'Toggle "Practice mode" in the top header bar. Every card hides its "Understand it", "Write this in the exam", "Remember these", and "Source" blocks until you click "Show answer" on that card.',
      },
      {
        name: 'Mark Done & Browser-Only Storage Warning',
        detail:
          'Click "Mark done" at the bottom of a card (or top right) to track finished questions across the header progress bar. Important: progress is stored ONLY in this browser via localStorage (key "qst_exam_done_v1"). It does not sync across devices, and clearing browser data or site cookies will erase your checkmarks.',
      },
      {
        name: 'Offline Double-Click Copy',
        detail:
          'The standalone offline-study/index.html file contains the exact same 107 questions, diagrams, Start Here guide, Sources, and Practice mode, and works by double-clicking without internet or servers.',
      },
    ],
  },
  part4Sources: {
    heading: 'Part 4 — Where the Answers Came From (Sources)',
    overview:
      'Every answer was built first from your class folder (1unit qst/, 2unit qst/, 3rd unit/, 4 unit qst/, 5 unit qst/), QST_Mid1_Mid2_Study_Order.pdf, and the attached Unit I–V answer booklet. Where your notes were empty, had only an unannotated image, or skipped a syllabus topic (notably QFT.pptx being 0 bytes, deutsch.pptx having no text, and 4 unit qst/ containing only QKD and dense coding), standard textbook derivations (Nielsen & Chuang, Zettili, Ekert 1991) were used and marked as "Added from textbook" in each card\'s Source box.',
    stageSources: [
      {
        stageId: 1,
        title: 'Foundations of quantum mechanics',
        questionRange: 'Q1–Q3 (+ Q1a–Q1c, Q3a)',
        primaryFiles:
          '1unit qst/1Fundamentals of quantum mechanics.html, 1a Quantum mechanics.docx, 1unit history.pptx (s5, s12–s22), 3 black body radiation.docx, 4 Photoelectric effect.docx, 5 crompton scattering.docx, 6 dual nature of light and matter.docx, 7 Scrodinger eqn.pptx (s4–s17), 9 Infinite potential well.docx; attached PDF (Unit I Short Q1–Q4)',
        supplementalNotes:
          'Q1 includes p–n junction photovoltaic mechanism and Q1a adds Rayleigh–Jeans ultraviolet catastrophe terminology from standard quantum physics.',
      },
      {
        stageId: 2,
        title: 'Step potential & applications',
        questionRange: 'Q4–Q7 (+ Q4a, Q5a–Q5b)',
        primaryFiles:
          '1unit qst/10 step potential.docx, 1a Quantum mechanics.docx, 13e eigen values and eigen functions.pptx, 2unit qst/7 Hilbert Hermitian hamiltonian.pptx; attached PDF (Unit I Short Q6, Q8–Q9)',
        supplementalNotes: 'Exact piecewise reflection/transmission amplitudes verified directly from 10 step potential.docx.',
      },
      {
        stageId: 3,
        title: 'Operators, eigenstates and qubits',
        questionRange: 'Q8–Q11 (+ Q9a, Q10a–Q10b)',
        primaryFiles:
          '1unit qst/8 Free particle.docx, 13a uncertainty principle.pptx, 13c Hamiltonian operator.pptx, 13d commutation relations.pptx, 13e eigen values and eigen functions.pptx, 13f quantum postulates.pptx; 2unit qst/1day.pptx, 2bloch sphere.pptx, 3a Quantum superposition.pptx; attached PDF (Unit I Short Q5, Q7, Q10)',
        supplementalNotes: 'All 4×4 or 2×2 calculations, free-particle energy, canonical commutator, and uncertainty bound checked directly.',
      },
      {
        stageId: 4,
        title: 'Dirac notation, Hilbert spaces and gates',
        questionRange: 'Q12–Q15 (+ Q12a, Q13a, Q14a, Q15a–Q15b)',
        primaryFiles:
          '2unit qst/1day.pptx, 2bloch sphere.pptx, 3a Quantum superposition.pptx, 4 DIRAC notation.pptx, 7 Hilbert Hermitian hamiltonian.pptx, 8 quantum gates pauli x y z t.pptx, ex1 problems on hilbert space.docx, good pdf gates.pdf; attached PDF (Unit II Short Q1–Q2, Q4–Q5, Q7)',
        supplementalNotes: 'All worked inner products, unitary U†U=I checks, Pauli-X, H|1⟩, and Born probability calculations verified.',
      },
      {
        stageId: 5,
        title: 'Tensor products, circuits and entanglement',
        questionRange: 'Q16–Q18 (+ Q17a–Q17b, Q18a)',
        primaryFiles:
          '2unit qst/5 tensor products and composite systems.pptx, 3b Quantum entanglement.pptx, 8 quantum gates pauli x y z t.pptx, 9a quantum circuits.pptx, 9b exe1 qc circuit.pptx, 6 bell and epr paradox.pptx; attached PDF (Unit II Short Q3, Q6, Q10)',
        supplementalNotes: 'Covers twin entanglement questions Q17 & Q18 plus T-gate, CNOT|10⟩, and Φ+ separability check.',
      },
      {
        stageId: 6,
        title: 'No-cloning and teleportation',
        questionRange: 'Q19–Q22 (+ Q19a, Q21a)',
        primaryFiles:
          '1unit qst/11 no cloning theorem.docx, 12 quantum teleportation.docx; 2unit qst/10 no cloning.docx, 11a State transfer.docx, 11b teleportation eg.docx, 11b teleportation example.pdf; attached PDF (Unit II Short Q8–Q9)',
        supplementalNotes: 'Q22 combines class 2-qubit state-transfer notes with standard textbook 3-qubit teleportation circuit flow.',
      },
      {
        stageId: 7,
        title: 'Why quantum computing?',
        questionRange: 'Q23–Q26',
        primaryFiles:
          '3rd unit/New Microsoft Word Document.docx, 1unit qst/1unit history.pptx (s6), 2unit qst/1a differences between classical computing and quantum computing.docx, 1b introduction to quantum computing.pptx',
        supplementalNotes: 'Covers twin classical-vs-quantum computing questions Q25 & Q26.',
      },
      {
        stageId: 8,
        title: 'Parallelism and interference',
        questionRange: 'Q27–Q29',
        primaryFiles: '1unit qst/1unit history.pptx (s8), 3rd unit/Grover_s_Search_Decoded good.pptx, 5 day shor.pptx',
        supplementalNotes: 'Q27–Q29 formalize U_f parallelism and H|+⟩ = |0⟩ interference example from Nielsen & Chuang.',
      },
      {
        stageId: 9,
        title: 'Oracles, Deutsch and Deutsch-Jozsa',
        questionRange: 'Q30–Q33',
        primaryFiles: '3rd unit/deutsch.pptx (s1 circuit image, no text), Grovers_Search_Algorithm.pptx',
        supplementalNotes: 'Q31–Q33 add constant/balanced formal rules and Deutsch–Jozsa 4-step proof from Nielsen & Chuang.',
      },
      {
        stageId: 10,
        title: 'Grover’s search',
        questionRange: 'Q34–Q35',
        primaryFiles:
          '3rd unit/Grovers_Search_Algorithm.pptx (s6, s8, s12, s15), Grover_s_Search_Decoded good.pptx (s7), Grover.docx, Grover\'s Search Algorithm exampel.pptx',
        supplementalNotes: 'All amplitudes and N=4 diffusion math verified.',
      },
      {
        stageId: 11,
        title: 'QFT and Shor’s algorithm',
        questionRange: 'Q36–Q40',
        primaryFiles: '3rd unit/5 day shor.pptx (s11–14, s23, s29, s32, s34, s36, s40), 5 shor prg.docx, Study Guide.pdf (p.4); 3rd unit/QFT.pptx (0 bytes)',
        supplementalNotes: 'Q36–Q37 add QFT formula, 2-qubit CR₂+SWAP circuit, and |01⟩ example from Nielsen & Chuang because QFT.pptx is 0 bytes.',
      },
      {
        stageId: 12,
        title: 'Errors, error correction and programming',
        questionRange: 'Q41–Q46',
        primaryFiles:
          '3rd unit/shor 9 qubit code.pptx (s2, s6, s8), 2unit qst/3a Quantum superposition.pptx (s8), 9b exe1 qc circuit.pptx (s7), 5 unit qst 2 full.pptx',
        supplementalNotes: 'Q43–Q45 add 3 QEC obstacles, 3-qubit parity syndrome tables, and Google Cirq overview from textbook/docs.',
      },
      {
        stageId: 13,
        title: 'Quantum cryptography and QKD',
        questionRange: 'Q47–Q56',
        primaryFiles: '4 unit qst/qkd.pptx (s1–s13), 2unit qst/6 bell and epr paradox.pptx, 1day.pptx (s44)',
        supplementalNotes: 'Q52–Q56 add 25% QBER derivation, side-channel caveats, and complete E91 CHSH Bell protocol from textbook (4 unit qst lacks E91).',
      },
      {
        stageId: 14,
        title: 'Dense coding, networks and repeaters',
        questionRange: 'Q57–Q65',
        primaryFiles:
          '4 unit qst/quantum_dense_coding.pptx (s1–s7), qkd.pptx (s6, s12), 2unit qst/3b Quantum entanglement.pptx (s2), 11a State transfer.docx, 3rd unit/5 unit.docx (Sec 3, 8)',
        supplementalNotes: 'Q59–Q65 add 3-qubit teleportation flow, entanglement swapping, quantum networks/repeaters, SPDC/SPADs, and 0.2 dB/km fiber attenuation from textbook.',
      },
      {
        stageId: 15,
        title: 'Quantum sensing and metrology',
        questionRange: 'Q66–Q70',
        primaryFiles: '3rd unit/5 unit.docx (Sec 1–2), Study Guide.pdf (p.1), 5 unit qst/5 unit qst 2 full.pptx',
        supplementalNotes: 'All from Unit V class notes.',
      },
      {
        stageId: 16,
        title: 'Quantum imaging and lithography',
        questionRange: 'Q71–Q72',
        primaryFiles: '3rd unit/5 unit.docx (Sec 4), Study Guide.pdf (p.2), 5 unit qst/5 unit qst 2 full.pptx',
        supplementalNotes: 'All from Unit V class notes.',
      },
      {
        stageId: 17,
        title: 'Quantum materials',
        questionRange: 'Q73–Q77',
        primaryFiles: '3rd unit/Quantum Technologies and Applications Study Guide.pdf (p.2), 5 unit qst/5 unit qst 2 full.pptx (s7–s8), 3rd unit/5 unit.docx (Sec 3, 5)',
        supplementalNotes: 'Includes cropped diamond NV⁻ energy diagram from Study Guide.pdf p.2.',
      },
      {
        stageId: 18,
        title: 'Hardware platforms',
        questionRange: 'Q78–Q81',
        primaryFiles: '3rd unit/5 unit.docx (Sec 6–8), Study Guide.pdf (p.3), 5 unit qst/5 unit qst 2 full.pptx (s10)',
        supplementalNotes: 'All from Unit V class notes.',
      },
      {
        stageId: 19,
        title: 'Supremacy, NISQ and the global race',
        questionRange: 'Q82–Q87',
        primaryFiles: '3rd unit/5 unit.docx (Sec 9–11), Study Guide.pdf (p.3–4), 5 unit qst/5 unit qst 2 full.pptx (s11, s13–s14)',
        supplementalNotes: 'All from Unit V class notes.',
      },
    ] as GuideStageSource[],
    textbookQuestionNumbers:
      '26 questions include textbook supplements (shown in their Source box): Q1, Q1a, Q22, Q27, Q28, Q29, Q31, Q32, Q33, Q36, Q37, Q43, Q44, Q45, Q52, Q53, Q54, Q55, Q56, Q59, Q60, Q61, Q62, Q63, Q64, Q65.',
    disagreements: [
      {
        topic: 'Photoelectric vs. Photovoltaic Effect (Q1)',
        difference:
          'Q1 asks about the "photo voltaic effect", whereas 1unit qst/4 Photoelectric effect.docx and 1unit history.pptx (s22) cover the photoelectric effect (electrons ejected into vacuum rather than voltage across a semiconductor p–n junction).',
        howHandled:
          'Both are explained cleanly in Q1 so whichever examiner focus is graded, your answer is complete.',
      },
      {
        topic: 'de Broglie Electron Constant Rounding (Q3 vs. Q3a)',
        difference:
          '1unit qst/6 dual nature of light and matter.docx and Q3 write λ ≈ 1.227 / √V nm, whereas the attached Unit I–V PDF prints ≈ 1.226 / √V nm (because h / √(2m_e e) ≈ 1.2264 nm·V^(1/2)).',
        howHandled:
          'Q3 preserves 1.227 / √V nm from the class note image, while Q3a states 1.226 / √V nm alongside the 1.227 / √V nm rounding.',
      },
      {
        topic: 'Attached Answer PDF Cover Label & Measurement State Assumption (Q15b)',
        difference:
          'Page 1 of the attached answer booklet prints the subtitle "Units III, IV and V" even though pages 1–7 contain Unit I & Unit II questions, and Unit II Short Q7 ("Probability of 0") omits explicitly naming the state being measured (|+⟩ = (|0⟩ + |1⟩)/√2).',
        howHandled:
          'Unit I and II Short questions are placed in their true Unit I and II sections, and Q15b explains the general Born rule |α|² before giving the equal-superposition result 1/2.',
      },
      {
        topic: 'Teleportation Bit Order & Circuit Variant (Q21, Q22, Q59)',
        difference:
          '1unit qst/12 quantum teleportation.docx and 2unit qst/11a State transfer.docx show a 2-qubit CX → H → CZ state-transfer circuit using Qiskit little-endian ordering (|q₁⟩⊗|q₀⟩), while 11b quantum teleportation eg.docx shows the standard 3-qubit Bennett protocol and 5 tensor products...pptx uses big-endian |q₀ q₁⟩.',
        howHandled:
          'Both circuit styles are clearly explained and kept distinct in Q21/Q22.',
      },
      {
        topic: 'Dense Coding Encoding Gate for 11 (Q58)',
        difference:
          '4 unit qst/quantum_dense_coding.pptx (s4–s5) applies X then Z (operator ZX, yielding |Ψ⁻⟩ and reading 11 in Qiskit), whereas some textbooks write XZ (which differs by only a global −1 phase).',
        howHandled:
          'Follows your class notes (Z after X / ZX) consistently.',
      },
      {
        topic: 'Grover Optimal Iteration Count Notation (Q34, Q35)',
        difference:
          '3rd unit/Grovers_Search_Algorithm.pptx (s6, s8) writes k* ≈ (π/4)√N (and notes (π/4)√4 − 1/2 ≈ 1 for N=4), while Grover.docx and Grover_s_Search_Decoded good.pptx write R ≈ ⌊(π/4)√N⌋.',
        howHandled:
          'Both expressions give R = 1 iteration for N = 4 and scale as O(√N).',
      },
      {
        topic: 'Shor Trial Base Symbol (Q39)',
        difference:
          '3rd unit/5 day shor.pptx slides 11–14 label the guessed base K (computing remainder p with initial q=1), while slide 40 writes a = 7 and a^(r/2) mod N.',
        howHandled:
          'Uses standard a = 7 (matching slide 40 and Qiskit scripts) to factor 15 = 3 × 5.',
      },
      {
        topic: 'NQM Budget & Optical Clock Numbers (Q69, Q70, Q86, Q87)',
        difference:
          'Study Guide.pdf (p.4) prints exact NQM budget ₹6,003 Crore (2023–2031) and fractional optical clock instability 10⁻¹⁸, whereas 5 unit.docx summarizes ₹6,000+ Crore and < 1 second loss in 30 billion years.',
        howHandled:
          'Preserves both ways of stating the figure accurately.',
      },
    ] as DisagreementItem[],
    missingDiagramsSummary:
      '42 questions include extracted note diagrams or PDF figure crops (including Q13a reusing the Bloch sphere figure), while 65 questions have no separate image file in the notes. Those 65 fall into four exact reasons explained inside each card\'s Source box:',
    missingDiagramGroups: [
      {
        category: '1. Pure math derivations, matrices & concise 2-mark definitions (text/equations only)',
        questions:
          'Q1a, Q1b, Q1c, Q3a, Q4a, Q5a, Q5b, Q9a, Q10a, Q10b, Q12a, Q14a, Q15a, Q15b, Q17a, Q17b, Q18a, Q19, Q19a, Q20, Q21a, Q23, Q42, Q73, Q74, Q75, Q78, Q81, Q85',
        reason:
          'Notes derive these via Schrödinger equations, kets, 2×2/4×4 unitary matrices, comparison tables, or short formulas rather than embedded bitmap images.',
      },
      {
        category: '2. Short 2-mark questions sharing a diagram shown on their companion 5-mark card',
        questions:
          'Q27 & Q28 (→ Q29), Q30 & Q32 (→ Q33), Q38 (→ Q39), Q41 (→ Q43/Q44), Q47, Q48 & Q51 (→ Q50), Q57 (→ Q58), Q66, Q67, Q69 & Q76 (→ Q77)',
        reason:
          'Keeps 2-mark cards concise while linking straight to the full note diagram in the paired 5-mark question.',
      },
      {
        category: '3. Files empty or missing diagrams in your unit notes',
        questions:
          'Q31, Q36, Q37, Q54, Q56, Q60, Q61, Q62, Q63, Q64, Q65',
        reason:
          '3rd unit/QFT.pptx is 0 bytes (so Q36–Q37 use an ASCII 2-qubit QFT schematic); 4 unit qst/ only contains qkd.pptx and quantum_dense_coding.pptx (no E91, swapping, network, repeater, or fiber-loss images).',
      },
      {
        category: '4. Unit V text & ASCII flow schematics',
        questions: 'Q68, Q70, Q71, Q72, Q79, Q80, Q82, Q83, Q84, Q86, Q87',
        reason:
          '5 unit.docx and Study Guide.pdf explain sensing, atomic clocks, NOON lithography, superconducting/ion/photonic hardware, NISQ VQE, and NQM using text blocks and ASCII flows rather than figures (only the NV⁻ center had a diagram PDF crop).',
      },
    ] as MissingDiagramGroup[],
  },
  part5Uncovered: {
    heading: 'Part 5 — What This Site Does NOT Cover',
    intro:
      'Comparing your official course syllabus (0 Quantum Science &Technology syllabus.pdf, Course Code 231EE7O04) and all unit note folders against the 107 exam questions reveals these topics that are in the notes/syllabus but not asked as dedicated questions (plus the .mp4 video 5 unit qst/qkd screen recording.mp4, which was excluded as requested):',
    units: [
      {
        unit: 'Unit I — Quantum Mechanics Foundations',
        topicsNotInQuestions: [
          'Blackbody radiation full Planck spectral law derivation beyond the ultraviolet catastrophe (3 black body radiation.docx; UV catastrophe covered in Q1a)',
          'Full relativistic derivation of Compton scattering (5 crompton scattering.docx; Compton wavelength & Δλ formula covered in Q1c)',
          'Photoelectric effect 5-mark standalone derivation (4 Photoelectric effect.docx; covered inside Q1 and Q1b)',
          'Free particle wave packet dispersion & continuous spectrum normalization (8 Free particle.docx; energy-momentum relation covered in Q9a)',
          'Infinite potential well full derivation standalone (9 Infinite potential well.docx; formula summarized inside Q4)',
          'Position operator x̂ & Momentum operator p̂ₓ full proofs (13a, 13b .pptx; canonical commutator & uncertainty bound covered in Q10a–Q10b)',
          'Quantum measurement theory & Expectation values ⟨A⟩ standalone (13g, 13h .pptx)',
          'Differences between Classical Mechanics vs Quantum Mechanics (2 differences between classical mechanics and quantum mechanics.docx) & History of Quantum Computing (1b, 1unit history.pptx)',
        ],
      },
      {
        unit: 'Unit II — Qubits, Hilbert Space & Gates',
        topicsNotInQuestions: [
          'Quantum state tomography (listed in Unit II syllabus, no dedicated question in the question list)',
          'Hermitian operator full eigenvalue/orthogonality proofs & S-gate standalone (7 Hilbert Hermitian hamiltonian.pptx, ex1 problems on hilbert space.docx, good pdf gates.pdf; Hermitian definition covered in Q5a)',
          'EPR paradox & Bell’s theorem standalone derivation (6 bell and epr paradox.pptx; connected only via E91 in Q55–Q56)',
        ],
      },
      {
        unit: 'Unit III — Quantum Algorithms',
        topicsNotInQuestions: [
          'Generalized multi-target Grover complexity O(√(N/M)) & BBHT unknown-M search (Grovers_Search_Algorithm.pptx s9, Grover.docx)',
          'Shor’s algorithm Qiskit/Python code walk-through (5 shor prg.docx)',
        ],
      },
      {
        unit: 'Unit IV — Quantum Communication',
        topicsNotInQuestions: [
          'Standalone E91, entanglement swapping, quantum repeaters, and SPAD source slides (absent from 4 unit qst/; covered via textbook supplements in Q54–Q56 & Q60–Q65)',
          'Recorded QKD screen-recording demo (5 unit qst/qkd screen recording.mp4 — excluded)',
        ],
      },
      {
        unit: 'Unit V — Quantum Technologies & Applications',
        topicsNotInQuestions: [
          'Detailed SQUID magnetometry mechanism (briefly named inside Q68; full detail in Study Guide.pdf p.1 & 5 unit.docx)',
          'Gaussian Boson Sampling (noted in Study Guide.pdf p.3 under Xanadu/supremacy)',
          'Mathematical details of Post-Quantum Cryptography (NIST lattice schemes, noted briefly in Study Guide.pdf p.4 & Q40)',
        ],
      },
    ] as UncoveredUnitGroup[],
  },
  part6ExamWriting: {
    heading: 'Part 6 — Writing Answers in the Exam',
    tips: [
      'Match length to marks: Write 2-mark answers as 3–5 crisp sentences with 1 clear definition and 1 key formula, matrix, or example (skip big subheadings). Structure 5-mark answers visibly using short exam headings: Core Idea → Steps / Derivation → Formula / Labeled Diagram → Worked Example → Uses & Limits → Conclusion.',
      'Draw clean circuits and tables with a pen/pencil: Examiners award clear marks for neatly labeled Hadamard/CNOT wires, 2×2 matrix multiplications, BB84 basis tables, and diamond NV⁻ energy levels—never leave a circuit unlabeled.',
      'Show every algebra step: In eigenvalue (Ĥψ = Eψ), unitary (U†U = I), Bell state (CNOT(H⊗I)|00⟩), Grover N=4, and Shor N=15 problems, write each intermediate state vector so partial credit is guaranteed.',
      'Check your model paper for exam pattern & internal choice: Do not assume unit-wise mark splits or mandatory-question rules from this site—always verify your official semester question paper format.',
    ],
  },
};

export const VIEW_SWITCH_GUIDE = {
  heading: 'Using the Two Views: Study Order vs. Unit-wise Exam View',
  lines: [
    'Use the switch at the very top of every page to flip anytime between Study Order (#study) and Unit-wise Exam View (#units), keeping the exact question you were reading in view.',
    'Study Order (learn step by step): Use this first to learn topics in the sequence that makes each new idea easy to understand (Parts A–E, Stages 1–19).',
    'Unit-wise (exam view): Use this for revision and exam practice—arranged by Mid 1 (Units I–II) and Mid 2 (Units III–V), split into 2-Mark and 5-Mark sections, with each section numbered sequentially starting at 1 (independent of Study Order IDs).',
    'Both views read from one single question store: every question text, answer, formula, diagram, "Mark done" tick, and revision Star is identical and shared across both views.',
    'In Unit-wise Exam View, click "Study order: #N · Stage X" or any "Builds on" link on a card to jump straight to earlier prerequisites.',
    'Check your model paper for the official exam question pattern, internal choice rules, and total marks.',
  ],
};

