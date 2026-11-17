window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 2,
  "part": "A",
  "partTitle": "Foundations (Unit I)",
  "title": "The math language",
  "subtitle": "Vector spaces, bra-ket notation and eigenvalues: the toolkit every later question assumes.",
  "questions": [
    {
      "number": 4,
      "question": "What do you mean by Hilbert space? Explain.",
      "sourceTag": "Mid 1 · Unit I · Q11",
      "marks": 5,
      "intuition": "Just as 3D space lets you measure lengths and angles between arrows, a Hilbert space is a complex vector arena where quantum states live, superpose, and overlap to yield measurement probabilities.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>A <strong>Hilbert space (ℋ)</strong> is a complete complex vector space equipped with an <strong>inner product</strong>. It provides the mathematical stage on which every quantum state vector lives and interacts.</p>"
        },
        {
          "label": "(b) Key Properties Explained Step by Step",
          "html": "<ol>\n            <li><strong>Linear Vector Space (Superposition):</strong> Quantum states can be added together and multiplied by complex scalars while remaining inside the space. If <span class=\"math-inline\">|0⟩</span> and <span class=\"math-inline\">|1⟩</span> are valid states, any superposition <span class=\"math-inline\">|ψ⟩ = α|0⟩ + β|1⟩</span> is also a valid state.</li>\n            <li><strong>Inner Product (<span class=\"math-inline\">⟨φ|ψ⟩</span>):</strong> Given two states <span class=\"math-inline\">|ψ⟩</span> and <span class=\"math-inline\">|φ⟩</span>, their inner product outputs a complex scalar measuring their overlap. It satisfies conjugate symmetry (<span class=\"math-inline\">⟨φ|ψ⟩ = ⟨ψ|φ⟩*</span>) and linearity in the second argument.</li>\n            <li><strong>Norm & Normalization:</strong> The length (norm) of a state is <span class=\"math-inline\">‖ψ‖ = √⟨ψ|ψ⟩</span>. Physical quantum states are normalized so <span class=\"math-inline\">⟨ψ|ψ⟩ = 1</span> (total probability equals 1).</li>\n            <li><strong>Orthogonality & Completeness:</strong> Two states are orthogonal—meaning perfectly distinguishable in measurement—if <span class=\"math-inline\">⟨φ|ψ⟩ = 0</span>. Completeness ensures limits of Cauchy sequences stay inside the space (vital for infinite-dimensional wavefunctions).</li>\n          </ol>"
        },
        {
          "label": "(c) Equations & Geometric Diagram",
          "html": "<div class=\"math-block\">Single qubit Hilbert space: ℂ² spanned by |0⟩ = [1, 0]ᵀ and |1⟩ = [0, 1]ᵀ<br/>Normalization condition: ⟨ψ|ψ⟩ = |α|² + |β|² = 1<br/>Born rule probability: P(φ) = |⟨φ|ψ⟩|²</div>",
          "image": {
            "file": "hilbert_norm_ortho.png",
            "caption": "Fig. Hilbert space normalization and orthogonality worked conditions",
            "source": "2unit qst/ex1 problems on hilbert space.docx · image11",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Worked Example",
          "html": "<p>Check normalization for <span class=\"math-inline\">|ψ⟩ = (1/√3)|0⟩ + c|1⟩</span> in <span class=\"math-inline\">ℂ²</span>: requiring <span class=\"math-inline\">⟨ψ|ψ⟩ = (1/√3)² + c² = 1</span> gives <span class=\"math-inline\">1/3 + c² = 1 ⇒ c = √(2/3)</span>. Also, <span class=\"math-inline\">|0⟩</span> and <span class=\"math-inline\">|1⟩</span> are orthonormal because <span class=\"math-inline\">⟨0|1⟩ = 1·0 + 0·1 = 0</span> and <span class=\"math-inline\">⟨0|0⟩ = ⟨1|1⟩ = 1</span>.</p>"
        },
        {
          "label": "(e) Uses & Significance",
          "html": "<p>For <span class=\"math-inline\">n</span> qubits, the composite Hilbert space has dimension <span class=\"math-inline\">2ⁿ</span> via tensor products, explaining why simulating quantum systems scales exponentially on classical computers.</p>"
        },
        {
          "label": "(f) Conclusion",
          "html": "<p>Hilbert space turns abstract quantum mechanics into concrete geometry—vectors represent states, inner products give probabilities, and orthogonal axes represent distinguishable outcomes.</p>"
        }
      ],
      "studySource": "2unit qst/7 Hilbert Hermitian hamiltonian.pptx (slides 1–4) & 2unit qst/ex1 problems on hilbert space.docx (image11).",
      "rememberThese": [
        "Hilbert space = complex vector space + inner product + completeness",
        "Single-qubit space is <span class=\"math-inline\">ℂ²</span>; <span class=\"math-inline\">n</span>-qubit space is <span class=\"math-inline\">ℂ^(2ⁿ)</span>",
        "Normalized state: <span class=\"math-inline\">⟨ψ|ψ⟩ = 1</span>; Orthogonal states: <span class=\"math-inline\">⟨φ|ψ⟩ = 0</span>",
        "Measurement overlap probability: <span class=\"math-inline\">P = |⟨φ|ψ⟩|²</span>"
      ]
    },
    {
      "number": "4a",
      "question": "Normalization",
      "sourceTag": "Added from attached PDF · Unit I · Q8",
      "marks": 2,
      "intuition": "Since |ψ|² represents probability, scaling the wavefunction so all probabilities sum to 1 guarantees the particle exists somewhere in space.",
      "sections": [
        {
          "html": "<p><strong>Normalization</strong> is the condition that the total probability of finding a quantum particle over all space—or across all basis outcomes—equals unity. Mathematically, a wavefunction <span class=\"math-inline\">ψ(x)</span> satisfies <span class=\"math-inline\">∫<sub>−∞</sub><sup>∞</sup> |ψ(x)|² dx = 1</span>, and a state vector satisfies <span class=\"math-inline\">⟨ψ|ψ⟩ = 1</span>; for a qubit <span class=\"math-inline\">α|0⟩ + β|1⟩</span>, this requires <span class=\"math-inline\">|α|² + |β|² = 1</span>.</p>"
        }
      ],
      "studySource": "2unit qst/ex1 problems on hilbert space.docx, 1unit qst/7 Scrodinger eqn.pptx, & attached PDF (Unit I · Short Q8).",
      "noDiagramNote": "Concise 2-mark definition; see Q4 for the worked Hilbert-space normalization equation image.",
      "rememberThese": [
        "Wavefunction normalization: <span class=\"math-inline\">∫|ψ(x)|² dx = 1</span>",
        "State-vector / qubit normalization: <span class=\"math-inline\">⟨ψ|ψ⟩ = |α|² + |β|² = 1</span>"
      ]
    },
    {
      "number": 5,
      "question": "Explain DiRAC notation and give an example for inner product.",
      "sourceTag": "Mid 1 · Unit II · Q3",
      "marks": 5,
      "intuition": "Paul Dirac split the word \"bracket\" ⟨bra|ket⟩ into a row vector ⟨bra| on the left and a column vector |ket⟩ on the right so multiplying them snaps cleanly into a single number.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p><strong>Dirac (bra-ket) notation</strong> is the standard shorthand used in quantum mechanics to write state vectors and inner products cleanly, independent of coordinate choices.</p>"
        },
        {
          "label": "(b) Bra, Ket & Rules Step by Step",
          "html": "<ul>\n            <li><strong>Ket <span class=\"math-inline\">|ψ⟩</span>:</strong> A column vector representing a quantum state. For computational basis qubits: <span class=\"math-inline\">|0⟩ = [1, 0]ᵀ</span> and <span class=\"math-inline\">|1⟩ = [0, 1]ᵀ</span>.</li>\n            <li><strong>Bra <span class=\"math-inline\">⟨ψ|</span>:</strong> The <strong>conjugate transpose</strong> (Hermitian adjoint, †) of the ket, turning a column vector into a row vector while flipping the sign of every imaginary term (<span class=\"math-inline\">+i ↔ −i</span>).</li>\n            <li><strong>Bracket (Inner Product) <span class=\"math-inline\">⟨φ|ψ⟩</span>:</strong> Multiplying a row bra <span class=\"math-inline\">⟨φ|</span> (size <span class=\"math-inline\">1×N</span>) by a column ket <span class=\"math-inline\">|ψ⟩</span> (size <span class=\"math-inline\">N×1</span>) yields a single scalar number measuring overlap.</li>\n          </ul>",
          "image": {
            "file": "bra_to_ket_rule.png",
            "caption": "Fig. Conversion between column ket |a⟩ and conjugate-transpose row bra ⟨a|",
            "source": "2unit qst/1day.pptx · slide 20",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Matrix Conversion & Inner Product Formula",
          "html": "<div class=\"math-block\">If |a⟩ = <table class=\"q-matrix\"><tr><td>α</td></tr><tr><td>β</td></tr></table> &nbsp;then&nbsp; ⟨a| = (|a⟩)† = [ α* &nbsp; β* ]<br/>Inner product: ⟨a|b⟩ = α₁* b₁ + α₂* b₂ + … + α_n* b_n</div>"
        },
        {
          "label": "(d) Worked Examples for Inner Product",
          "html": "<p><strong>Example 1 (Complex Ket to Bra):</strong> If <span class=\"math-inline\">|a⟩ = [2 − 3i, 4 + 2i, 1 − 2i]ᵀ</span>, taking the conjugate transpose yields <span class=\"math-inline\">⟨a| = [2 + 3i, 4 − 2i, 1 + 2i]</span>.</p>\n          <p><strong>Example 2 (Orthogonal and Complex Inner Products):</strong> For computational basis states <span class=\"math-inline\">|u⟩ = [1, 0]ᵀ = |0⟩</span> and <span class=\"math-inline\">|v⟩ = [0, 1]ᵀ = |1⟩</span>, and for complex states <span class=\"math-inline\">|a⟩ = [1, i]ᵀ</span> and <span class=\"math-inline\">|b⟩ = [2, −i]ᵀ</span>:</p>\n          <div class=\"math-block\">⟨u|v⟩ = [1 &nbsp; 0] <table class=\"q-matrix\"><tr><td>0</td></tr><tr><td>1</td></tr></table> = (1)(0) + (0)(1) = 0 &nbsp;(orthogonal states)<br/>⟨a|b⟩ = [1 &nbsp; −i] <table class=\"q-matrix\"><tr><td>2</td></tr><tr><td>−i</td></tr></table> = (1)(2) + (−i)(−i) = 2 + i² = 2 − 1 = 1</div>"
        },
        {
          "label": "(e) Uses in Quantum Computing",
          "html": "<p>Bra-ket notation simplifies outer products (<span class=\"math-inline\">|0⟩⟨0|</span> projection matrices), expectation values (<span class=\"math-inline\">⟨ψ|Ĥ|ψ⟩</span>), and measurement probabilities (<span class=\"math-inline\">|⟨φ|ψ⟩|²</span>).</p>"
        },
        {
          "label": "(f) Conclusion",
          "html": "<p>Dirac notation turns matrix algebra into compact bra-ket expressions, making quantum state overlaps, orthogonality, and probabilities immediate to compute.</p>"
        }
      ],
      "studySource": "2unit qst/4 DIRAC notation.pptx & 2unit qst/1day.pptx (slide 20).",
      "rememberThese": [
        "Ket <span class=\"math-inline\">|ψ⟩</span> = column vector; Bra <span class=\"math-inline\">⟨ψ|</span> = conjugate transpose (row vector)",
        "Always conjugate imaginary parts (<span class=\"math-inline\">a + bi → a − bi</span>) when making a bra",
        "<span class=\"math-inline\">⟨a|b⟩ = 0</span> ⇒ orthogonal vectors; <span class=\"math-inline\">⟨a|a⟩ = 1</span> ⇒ normalized vector",
        "<span class=\"math-inline\">|0⟩ = [1, 0]ᵀ</span>, <span class=\"math-inline\">|1⟩ = [0, 1]ᵀ</span>"
      ]
    },
    {
      "number": "5a",
      "question": "Hermitian operator",
      "sourceTag": "Added from attached PDF · Unit I · Q6",
      "marks": 2,
      "intuition": "An observable you measure in a lab must yield an ordinary real number, so its quantum operator must match its own conjugate transpose.",
      "sections": [
        {
          "html": "<p>A <strong>Hermitian operator</strong> is a linear operator <span class=\"math-inline\">Â</span> that equals its own Hermitian adjoint (conjugate transpose): <span class=\"math-inline\">Â† = Â</span>, meaning <span class=\"math-inline\">⟨φ|Âψ⟩ = ⟨Âφ|ψ⟩</span>. Every Hermitian operator guarantees real eigenvalues and orthogonal eigenfunctions for distinct eigenvalues, so all physical observables (position, momentum, Hamiltonian) are represented by Hermitian operators.</p>"
        }
      ],
      "studySource": "2unit qst/7 Hilbert Hermitian hamiltonian.pptx, 1unit qst/13c Hamiltonian operator.pptx, & attached PDF (Unit I · Short Q6).",
      "noDiagramNote": "Algebraic operator property defined via Â† = Â with no standalone diagram needed.",
      "rememberThese": [
        "Condition: <span class=\"math-inline\">Â† = Â</span> (conjugate transpose equals itself)",
        "Real eigenvalues + orthogonal eigenfunctions for distinct eigenvalues"
      ]
    },
    {
      "number": "5b",
      "question": "Eigenvalue equation",
      "sourceTag": "Added from attached PDF · Unit I · Q9",
      "marks": 2,
      "intuition": "Most states change direction when an operator acts on them, but an eigenstate comes right back unchanged except for a simple number factor called the eigenvalue.",
      "sections": [
        {
          "html": "<p>The <strong>eigenvalue equation</strong> for an operator <span class=\"math-inline\">Â</span> is <span class=\"math-inline\">Âψ = aψ</span> (or <span class=\"math-inline\">Â|ψ⟩ = a|ψ⟩</span>), where <span class=\"math-inline\">ψ</span> is a non-zero eigenfunction (eigenstate) and the scalar <span class=\"math-inline\">a</span> is the corresponding eigenvalue. When a physical observable <span class=\"math-inline\">Â</span> is measured on eigenstate <span class=\"math-inline\">ψ</span>, the outcome is guaranteed to be the eigenvalue <span class=\"math-inline\">a</span> (for example, <span class=\"math-inline\">Ĥψ = Eψ</span>).</p>"
        }
      ],
      "studySource": "1unit qst/13e operators and observables - eigen values and eigen functions.pptx & attached PDF (Unit I · Short Q9).",
      "noDiagramNote": "Concise 2-mark statement; see Q6 and Q7 for matrix eigenvalue verification figures.",
      "rememberThese": [
        "Form: <span class=\"math-inline\">Âψ = aψ</span> (<span class=\"math-inline\">ψ ≠ 0</span>)",
        "Example: time-independent Schrödinger equation <span class=\"math-inline\">Ĥψ = Eψ</span>"
      ]
    },
    {
      "number": 6,
      "question": "How do you find out Eigen values and Eigen functions of a matrix?",
      "sourceTag": "Mid 1 · Unit I · Q6",
      "marks": 5,
      "intuition": "Most vectors spin or warp when a matrix acts on them; eigenvectors are the special directions that only stretch or shrink by a pure scalar factor—that stretch factor is the eigenvalue.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>When an operator or matrix <span class=\"math-inline\">A</span> acts on a special non-zero vector (or eigenfunction) <span class=\"math-inline\">|ψ⟩</span> and returns a scalar multiple of the same vector, <span class=\"math-inline\">A|ψ⟩ = λ|ψ⟩</span>, <span class=\"math-inline\">λ</span> is the <strong>eigenvalue</strong> and <span class=\"math-inline\">|ψ⟩</span> is the <strong>eigenvector (eigenfunction)</strong>. In quantum mechanics, eigenvalues represent the only possible measured outcomes of an observable.</p>"
        },
        {
          "label": "(b) Step-by-Step Procedure",
          "html": "<ol>\n            <li><strong>Set up the eigenvalue equation:</strong> Write <span class=\"math-inline\">A v = λ v</span>, which rearranges to <span class=\"math-inline\">(A − λI) v = 0</span>, where <span class=\"math-inline\">I</span> is the identity matrix.</li>\n            <li><strong>Solve the characteristic equation for eigenvalues (<span class=\"math-inline\">λ</span>):</strong> For a non-zero eigenvector <span class=\"math-inline\">v</span> to exist, the determinant must vanish: <span class=\"math-inline\">det(A − λI) = 0</span>. Expand and solve the polynomial for <span class=\"math-inline\">λ₁, λ₂, …</span>.</li>\n            <li><strong>Substitute each <span class=\"math-inline\">λ</span> back to find eigenvectors:</strong> Plug each <span class=\"math-inline\">λ_i</span> into <span class=\"math-inline\">(A − λ_i I) v_i = 0</span> and solve the linear equations for the components of <span class=\"math-inline\">v_i</span>.</li>\n            <li><strong>Normalize (for quantum states):</strong> Divide <span class=\"math-inline\">v_i</span> by its length <span class=\"math-inline\">‖v_i‖</span> so <span class=\"math-inline\">⟨v_i|v_i⟩ = 1</span>.</li>\n          </ol>"
        },
        {
          "label": "(c) Characteristic Equation & Matrix Verification",
          "html": "<div class=\"math-block\">Characteristic equation: det(A − λI) = 0<br/>Eigenfunction differential form: Ô f(x) = λ f(x)</div>",
          "image": {
            "file": "eigenvalue_pauli_z.png",
            "caption": "Fig. 1: Matrix eigenvalue verification for Pauli-Z giving eigenstates |0⟩ (+1) and |1⟩ (−1)",
            "source": "1unit qst/13a operators and observables - position operator.pptx · slide 12",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Worked Examples (Matrix and Differential Operator)",
          "html": "<p><strong>Matrix Example:</strong> Let <span class=\"math-inline\">H = <table class=\"q-matrix\"><tr><td>2</td><td>−i</td></tr><tr><td>i</td><td>3</td></tr></table></span>. Then <span class=\"math-inline\">det(H − λI) = (2−λ)(3−λ) − (−i)(i) = λ² − 5λ + 6 − 1 = λ² − 5λ + 5 = 0</span>, giving real energy eigenvalues <span class=\"math-inline\">λ = (5 ± √5)/2 ≈ 3.62, 1.38</span>.</p>\n          <p><strong>Function Example:</strong> For <span class=\"math-inline\">Ô = d/dx</span> and <span class=\"math-inline\">f(x) = e^(2x)</span>, <span class=\"math-inline\">Ô(e^(2x)) = 2e^(2x)</span>, so the eigenfunction is <span class=\"math-inline\">e^(2x)</span> with eigenvalue <span class=\"math-inline\">λ = 2</span>.</p>",
          "image": {
            "file": "eigenvalue_worked_deriv.png",
            "caption": "Fig. 2: Worked differential eigenfunction example showing Ô(e²ˣ) = 2e²ˣ",
            "source": "1unit qst/13e operators and observables - eigen values and eigen functions.pptx · slide 3",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(e) Quantum Significance",
          "html": "<p>For Hermitian observables (<span class=\"math-inline\">A = A†</span>), eigenvalues are guaranteed to be real numbers (valid physical measurements) and eigenvectors for distinct eigenvalues are orthogonal.</p>"
        },
        {
          "label": "(f) Conclusion",
          "html": "<p>Solving <span class=\"math-inline\">det(A − λI) = 0</span> yields the allowed measurement values, and solving <span class=\"math-inline\">(A − λI)v = 0</span> yields the corresponding quantum eigenstates.</p>"
        }
      ],
      "studySource": "1unit qst/13e operators and observables - eigen values and eigen functions.pptx (slides 3–6) & 1unit qst/13a operators and observables - position operator.pptx (slide 12).",
      "rememberThese": [
        "Eigenvalue equation: <span class=\"math-inline\">A|ψ⟩ = λ|ψ⟩</span>",
        "Characteristic equation: <span class=\"math-inline\">det(A − λI) = 0</span>",
        "Find eigenvectors by solving <span class=\"math-inline\">(A − λI)v = 0</span> and normalizing",
        "Hermitian matrices (<span class=\"math-inline\">A = A†</span>) always have real eigenvalues"
      ]
    },
    {
      "number": 7,
      "question": "Solve for Eigen values of the following matrix:",
      "questionMathHtml": "<div class=\"math-block\">A = <table class=\"q-matrix\"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>−1</td></tr></table></div>",
      "sourceTag": "Mid 1 · Unit I · Q8",
      "marks": 2,
      "intuition": "A diagonal matrix does not mix coordinates at all—its entries directly scale each basis axis, so the eigenvalues sit right on the main diagonal.",
      "sections": [
        {
          "html": "<p>Set up the characteristic equation <span class=\"math-inline\">det(A − λI) = 0</span>:</p>\n          <div class=\"math-block\">det <table class=\"q-matrix\"><tr><td>1 − λ</td><td>0</td></tr><tr><td>0</td><td>−1 − λ</td></tr></table> = (1 − λ)(−1 − λ) − (0)(0) = 0<br/>⇒ −(1 − λ)(1 + λ) = λ² − 1 = 0<br/>⇒ λ₁ = +1, &nbsp; λ₂ = −1</div>\n          <p><strong>Check:</strong> Trace = <span class=\"math-inline\">1 + (−1) = 0 = λ₁ + λ₂</span>; Determinant = <span class=\"math-inline\">(1)(−1) − 0 = −1 = λ₁·λ₂</span>. (This matrix is the Pauli-Z operator, with eigenstates <span class=\"math-inline\">|0⟩</span> for <span class=\"math-inline\">+1</span> and <span class=\"math-inline\">|1⟩</span> for <span class=\"math-inline\">−1</span>.)</p>",
          "image": {
            "file": "eigenvalue_pauli_z.png",
            "caption": "Fig. Eigenvalue verification for diagonal matrix [1 0; 0 -1] yielding +1 and −1",
            "source": "1unit qst/13a operators and observables - position operator.pptx · slide 12",
            "placement": "inline-bottom"
          }
        }
      ],
      "studySource": "1unit qst/13e operators and observables - eigen values and eigen functions.pptx & 1unit qst/13a operators and observables - position operator.pptx (slide 12).",
      "rememberThese": [
        "<span class=\"math-inline\">det(A − λI) = (1 − λ)(−1 − λ) = 0</span>",
        "Eigenvalues are <span class=\"math-inline\">λ = +1</span> and <span class=\"math-inline\">λ = −1</span>",
        "Quick check: sum of eigenvalues = trace, product = determinant"
      ]
    }
  ]
});
