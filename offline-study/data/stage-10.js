window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 10,
  "part": "C",
  "partTitle": "Quantum computing",
  "title": "Grover’s search",
  "subtitle": "Reuses the oracle idea and adds amplitude amplification.",
  "questions": [
    {
      "number": 34,
      "question": "What is the speedup of Grover’s algorithm?",
      "sourceTag": "Mid 2 · Unit III · Short Q7",
      "marks": 2,
      "intuition": "Searching an unsorted phone book of N names classically takes on average N/2 checks; Grover’s algorithm takes roughly √N steps—shrinking 1,000,000 checks down to ~1,000.",
      "sections": [
        {
          "html": "<p>Grover’s algorithm provides a <strong>quadratic speedup</strong> for searching an unstructured database of <span class=\"math-inline\">N</span> items: it reduces query complexity from classical <span class=\"math-inline\">O(N)</span> down to <span class=\"math-inline\">O(√N)</span> (specifically <span class=\"math-inline\">k* ≈ (π/4)√N</span> iterations). By the BBBV theorem, this <span class=\"math-inline\">Θ(√N)</span> bound is provably optimal for black-box unstructured search.</p>",
          "image": {
            "file": "grover_amplitude_diagram.png",
            "caption": "Fig. Amplitude amplification peak on marked element x̃ and quadratic scaling",
            "source": "3rd unit/Grover_s_Search_Decoded good.pptx · slide 7",
            "placement": "inline-bottom"
          }
        }
      ],
      "studySource": "3rd unit/Grover_s_Search_Decoded good.pptx (slide 7) & 3rd unit/Grovers_Search_Algorithm.pptx (slides 6, 8).",
      "rememberThese": [
        "Speedup type: <strong>Quadratic</strong> (<span class=\"math-inline\">O(N) → O(√N)</span>)",
        "Example: <span class=\"math-inline\">N = 1,048,576</span> → ~524,288 classical vs ~804 quantum queries",
        "Halves effective brute-force security of symmetric ciphers (e.g. AES-128 → 64-bit)"
      ]
    },
    {
      "number": 35,
      "question": "Explain Grover’s search algorithm with the oracle and diffuser.",
      "sourceTag": "Mid 2 · Unit III · Long Q2(a)",
      "marks": 5,
      "intuition": "First, the oracle tags the hidden needle in the haystack by flipping its sign upside-down (negative amplitude). Next, the diffuser mirrors every amplitude across the slightly lowered average—making that negative spike bounce way above all the others.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Given an unstructured search space of <span class=\"math-inline\">N = 2ⁿ</span> items containing one marked target <span class=\"math-inline\">|w⟩</span> (where <span class=\"math-inline\">f(w)=1</span> and <span class=\"math-inline\">f(x)=0</span> elsewhere), <strong>Grover’s Search Algorithm</strong> locates <span class=\"math-inline\">|w⟩</span> in <span class=\"math-inline\">O(√N)</span> queries using <strong>amplitude amplification</strong>.</p>"
        },
        {
          "label": "(b) Circuit Architecture & Algorithm Loop",
          "html": "<ol>\n            <li><strong>Step 1 — Uniform Superposition (<span class=\"math-inline\">H⊗ⁿ</span>):</strong> Initialize <span class=\"math-inline\">n</span> qubits to <span class=\"math-inline\">|0⟩⊗ⁿ</span> and apply Hadamards to give every state equal initial amplitude <span class=\"math-inline\">1/√N</span>:\n              <div class=\"math-block\">|s⟩ = H⊗ⁿ|0⟩⊗ⁿ = (1/√N) ∑_{x=0}^{N−1} |x⟩</div>\n            </li>\n            <li><strong>Step 2 — Grover Iteration Loop (<span class=\"math-inline\">G = D · U_f</span>), repeated <span class=\"math-inline\">R ≈ ⌊(π/4)√N⌋</span> times:</strong></li>\n          </ol>",
          "image": {
            "file": "grover_loop_diagram.png",
            "caption": "Fig. Grover iteration cycle alternating phase oracle U_f and diffusion operator D",
            "source": "3rd unit/Grovers_Search_Algorithm.pptx · slide 12",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) The Oracle (U_f) and Diffuser (D) Explained",
          "html": "<ul>\n            <li><strong>Oracle (<span class=\"math-inline\">U_f</span> — Phase Flip):</strong> Recognizes target <span class=\"math-inline\">|w⟩</span> without prior knowledge of its address and flips only its sign:\n              <div class=\"math-block\">U_f|x⟩ = (−1)^f(x)|x⟩ = { −|x⟩ if x = w ;  +|x⟩ if x ≠ w }</div>\n              On a single flip, the probability <span class=\"math-inline\">|−1/√N|² = 1/N</span> has not changed yet—only its phase is marked.</li>\n            <li><strong>Diffuser (<span class=\"math-inline\">D</span> — Inversion About the Mean):</strong> Reflects every amplitude <span class=\"math-inline\">a_x</span> across the mean <span class=\"math-inline\">μ</span> of all amplitudes (<span class=\"math-inline\">a_x → 2μ − a_x</span>):\n              <div class=\"math-block\">D = 2|s⟩⟨s| − I = H⊗ⁿ ( 2|0⟩⟨0| − I ) H⊗ⁿ</div>\n              Because the target was negative while <span class=\"math-inline\">μ</span> stayed near <span class=\"math-inline\">+1/√N</span>, flipping <span class=\"math-inline\">a_w</span> across <span class=\"math-inline\">μ</span> boosts its amplitude sharply positive while shrinking unmarked states.</li>\n          </ul>",
          "image": {
            "file": "grover_circuit_arch.png",
            "caption": "Fig. End-to-end Grover quantum circuit architecture showing initialization, oracle U_f, diffuser D, and measurement",
            "source": "3rd unit/Grovers_Search_Algorithm.pptx · slide 15",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Worked Example: N = 4 (2 Qubits, Target |11⟩)",
          "html": "<ol>\n            <li><strong>Initialize (<span class=\"math-inline\">H⊗²</span>):</strong> Amplitudes = <span class=\"math-inline\">[+0.5, +0.5, +0.5, +0.5]</span> for <span class=\"math-inline\">|00⟩, |01⟩, |10⟩, |11⟩</span>.</li>\n            <li><strong>Oracle (<span class=\"math-inline\">U_f</span>):</strong> Flips target <span class=\"math-inline\">|11⟩</span> negative → <span class=\"math-inline\">[+0.5, +0.5, +0.5, −0.5]</span>.</li>\n            <li><strong>Compute Mean:</strong> <span class=\"math-inline\">μ = (0.5 + 0.5 + 0.5 − 0.5) / 4 = +0.25</span>.</li>\n            <li><strong>Diffuser (<span class=\"math-inline\">2μ − a_x</span>):</strong>\n              <ul>\n                <li>Unmarked states (<span class=\"math-inline\">0.5</span>) → <span class=\"math-inline\">2(0.25) − 0.5 = 0</span>.</li>\n                <li>Marked state <span class=\"math-inline\">|11⟩</span> (<span class=\"math-inline\">−0.5</span>) → <span class=\"math-inline\">2(0.25) − (−0.5) = +1.0</span>.</li>\n              </ul>\n              Final amplitudes = <span class=\"math-inline\">[0, 0, 0, +1.0]</span> ⇒ <strong>100% chance</strong> of measuring <span class=\"math-inline\">|11⟩</span> in just <strong>1 iteration</strong> (<span class=\"math-inline\">R ≈ (π/4)√4 − ½ ≈ 1</span>).</li>\n          </ol>"
        },
        {
          "label": "(e) Uses, Over-Rotation Caution & Limitations",
          "html": "<p>Used for unstructured database search, SAT solvers, optimization, and halving symmetric key security (AES-256 → AES-128 equivalent). Iterating past <span class=\"math-inline\">R ≈ (π/4)√N</span> causes over-rotation and drops success probability.</p>"
        },
        {
          "label": "(f) Conclusion",
          "html": "<p>By repeatedly pairing a phase-marking oracle with an inversion-about-the-mean diffuser, Grover’s algorithm amplifies the target state in <span class=\"math-inline\">O(√N)</span> queries.</p>"
        }
      ],
      "studySource": "3rd unit/Grovers_Search_Algorithm.pptx (slides 12, 15), 3rd unit/Grover.docx & 3rd unit/Grover's Search Algorithm exampel.pptx.",
      "rememberThese": [
        "Oracle flips target phase: <span class=\"math-inline\">U_f|x⟩ = (−1)^f(x)|x⟩</span>",
        "Diffuser inverts about mean (<span class=\"math-inline\">a_x → 2μ − a_x</span>): <span class=\"math-inline\">D = H⊗ⁿ(2|0⟩⟨0| − I)H⊗ⁿ</span>",
        "Optimal iterations: <span class=\"math-inline\">R ≈ (π/4)√N</span> (<span class=\"math-inline\">1</span> iteration gives 100% for <span class=\"math-inline\">N = 4</span>)"
      ]
    }
  ]
});
