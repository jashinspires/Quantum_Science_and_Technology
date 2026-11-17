import type { StudyStage } from '../types/study';

export const stage04: StudyStage = {
  id: 4,
  part: 'B',
  partTitle: 'Qubits, gates and entanglement',
  title: 'The qubit and single-qubit gates',
  subtitle:
    'Qubit, then its Bloch-sphere picture, then the gates that move it around, then superposition.',
  questions: [
    {
      number: 12,
      question:
        'What is qubit? Give qubit state representation in state vector and Bloch sphere.',
      sourceTag: 'Mid 1 · Unit I · Q9',
      marks: 5,
      intuition:
        'A classical coin on a table is either heads (0) or tails (1); a spinning coin—or a qubit—can point anywhere on a 3D globe until you slap it flat to read 0 or 1.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>A <strong>qubit (quantum bit)</strong> is the fundamental unit of quantum information. Unlike a classical bit restricted strictly to 0 or 1, a qubit can exist in a coherent <strong>superposition</strong> of <span class="math-inline">|0⟩</span> and <span class="math-inline">|1⟩</span> simultaneously until measured.</p>`,
        },
        {
          label: '(b) State Vector Representation',
          html: `<p>In a 2D complex Hilbert space (<span class="math-inline">ℂ²</span>), computational basis states are column vectors <span class="math-inline">|0⟩ = [1, 0]ᵀ</span> and <span class="math-inline">|1⟩ = [0, 1]ᵀ</span>. Any pure single-qubit state vector is a linear combination:</p>
          <div class="math-block">|ψ⟩ = α|0⟩ + β|1⟩ = <table class="q-matrix"><tr><td>α</td></tr><tr><td>β</td></tr></table>, &nbsp; where α, β ∈ ℂ &nbsp; and &nbsp; |α|² + |β|² = 1</div>
          <p>Here <span class="math-inline">|α|²</span> is the probability of measuring 0, and <span class="math-inline">|β|²</span> is the probability of measuring 1.</p>`,
          image: {
            file: 'bit_vs_qubit.jpg',
            caption: 'Fig. 1: Classical discrete bit (0 or 1) versus a qubit state |ψ⟩ = α|0⟩ + β|1⟩',
            source: '2unit qst/1b introduction to quantum computing.pptx · slide 10',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Bloch Sphere Representation',
          html: `<p>Ignoring an unobservable global phase, two real angles—polar angle <span class="math-inline">θ ∈ [0, π]</span> and azimuthal phase angle <span class="math-inline">φ ∈ [0, 2π)</span>—map every pure qubit state to a unique point on the surface of a unit 3D sphere (the <strong>Bloch sphere</strong>):</p>
          <div class="math-block">|ψ(θ, φ)⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩</div>
          <ul>
            <li><span class="math-inline">θ = 0</span> ⇒ North pole <span class="math-inline">|0⟩</span>; &nbsp;<span class="math-inline">θ = π</span> ⇒ South pole <span class="math-inline">|1⟩</span>.</li>
            <li><span class="math-inline">θ = π/2, φ = 0</span> ⇒ <span class="math-inline">|+⟩ = (|0⟩+|1⟩)/√2</span> (+x axis); &nbsp;<span class="math-inline">φ = π</span> ⇒ <span class="math-inline">|−⟩</span> (−x axis).</li>
          </ul>`,
          image: {
            file: 'bloch_sphere_coords.png',
            caption: 'Fig. 2: Bloch sphere parameterization with polar angle θ and azimuthal angle φ',
            source: '2unit qst/2bloch sphere.pptx · slide 2',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Worked Example',
          html: `<p>Check <span class="math-inline">|ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩</span>: <span class="math-inline">|α|² + |β|² = 1/2 + 1/2 = 1</span> (valid qubit), matching Bloch angles <span class="math-inline">θ = π/2, φ = 0</span> (<span class="math-inline">cos(π/4)=1/√2</span>).</p>`,
        },
        {
          label: '(e) Uses',
          html: `<p>With <span class="math-inline">n</span> qubits, the state vector spans <span class="math-inline">2ⁿ</span> states simultaneously, enabling quantum parallelism, interference, and cryptography.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>A qubit combines discrete readout (0 or 1 on measurement) with continuous complex amplitudes (<span class="math-inline">α, β</span>) visualized geometrically on the unit Bloch sphere.</p>`,
        },
      ],
      studySource: '2unit qst/1b introduction to quantum computing.pptx (slide 10) & 2unit qst/2bloch sphere.pptx (slide 2).',
      rememberThese: [
        'State vector: <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span> with <span class="math-inline">|α|² + |β|² = 1</span>',
        'Bloch form: <span class="math-inline">|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩</span>',
        'North pole = <span class="math-inline">|0⟩</span> (<span class="math-inline">θ=0</span>), South pole = <span class="math-inline">|1⟩</span> (<span class="math-inline">θ=π</span>)',
      ],
    },
    {
      number: '12a',
      question: 'Qubit',
      sourceTag: 'Added from attached PDF · Unit II · Q1',
      marks: 2,
      intuition:
        'A classical bit is stuck at 0 or 1, whereas a qubit blends both basis states simultaneously using complex amplitudes until measured.',
      sections: [
        {
          html: `<p>A <strong>qubit (quantum bit)</strong> is the fundamental unit of quantum information, represented by a normalized vector in a two-dimensional complex Hilbert space (<span class="math-inline">ℂ²</span>): <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>, where <span class="math-inline">α, β ∈ ℂ</span> satisfy <span class="math-inline">|α|² + |β|² = 1</span>. Upon computational-basis measurement, it collapses to <span class="math-inline">0</span> with probability <span class="math-inline">|α|²</span> or <span class="math-inline">1</span> with probability <span class="math-inline">|β|²</span>.</p>`,
        },
      ],
      studySource:
        '2unit qst/1b introduction to quantum computing.pptx, 2unit qst/1day.pptx, & attached PDF (Unit II · Short Q1).',
      noDiagramNote:
        'Concise 2-mark definition; see Q12 for the bit-vs-qubit and Bloch sphere illustrations.',
      rememberThese: [
        'Superposition state: <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>',
        'Normalization: <span class="math-inline">|α|² + |β|² = 1</span> (probabilities sum to 1)',
      ],
    },
    {
      number: 13,
      question: 'Write about Bloch sphere visualization.',
      sourceTag: 'Mid 1 · Unit II · Q5',
      marks: 5,
      intuition:
        'Because complex amplitudes are hard to picture in your head, the Bloch sphere turns single-qubit algebra into 3D geometry where every quantum gate is just a rotation of an arrow on a globe.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>The <strong>Bloch sphere</strong> is a unit-radius 3D sphere whose surface represents every possible pure state of a single qubit. Points inside the sphere represent mixed states, while orthogonal states sit at opposite antipodal points (180° apart, not 90°).</p>`,
        },
        {
          label: '(b) Axes, Angles & Key States Explained',
          html: `<ol>
            <li><strong>Formula:</strong> Using <span class="math-inline">|ψ(θ, φ)⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩</span>, the polar angle <span class="math-inline">θ ∈ [0, π]</span> controls the probability weights of <span class="math-inline">|0⟩</span> and <span class="math-inline">|1⟩</span>, while azimuth <span class="math-inline">φ ∈ [0, 2π)</span> controls their relative quantum phase.</li>
            <li><strong>Six Principal Axis States:</strong>
              <ul>
                <li><strong>Z-axis (Computational basis):</strong> <span class="math-inline">+z</span> is <span class="math-inline">|0⟩</span> (<span class="math-inline">θ=0</span>); <span class="math-inline">−z</span> is <span class="math-inline">|1⟩</span> (<span class="math-inline">θ=π</span>).</li>
                <li><strong>X-axis:</strong> <span class="math-inline">+x</span> is <span class="math-inline">|+⟩ = (|0⟩+|1⟩)/√2</span> (<span class="math-inline">θ=π/2, φ=0</span>); <span class="math-inline">−x</span> is <span class="math-inline">|−⟩ = (|0⟩−|1⟩)/√2</span> (<span class="math-inline">θ=π/2, φ=π</span>).</li>
                <li><strong>Y-axis:</strong> <span class="math-inline">+y</span> is <span class="math-inline">|y+⟩ = |R⟩ = (|0⟩+i|1⟩)/√2</span> (<span class="math-inline">φ=π/2</span>); <span class="math-inline">−y</span> is <span class="math-inline">|y−⟩ = |L⟩ = (|0⟩−i|1⟩)/√2</span> (<span class="math-inline">φ=3π/2</span>).</li>
              </ul>
            </li>
          </ol>`,
          image: {
            file: 'bloch_sphere_states.png',
            caption: 'Fig. Bloch sphere showing coordinates and X, Y, Z basis states',
            source: '2unit qst/2bloch sphere.pptx · slide 3',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Gates as Rotations on the Bloch Sphere',
          html: `<p>Every unitary single-qubit gate rotates the Bloch vector without changing its unit length:</p>
          <ul>
            <li><strong>Pauli X, Y, Z gates:</strong> Rotate by <strong>180° (<span class="math-inline">π</span> rad)</strong> around the X, Y, and Z axes respectively.</li>
            <li><strong>Hadamard (H) gate:</strong> Rotates by <strong>180°</strong> around the diagonal <span class="math-inline">x + z</span> axis, swapping <span class="math-inline">|0⟩ ↔ |+⟩</span> and <span class="math-inline">|1⟩ ↔ |−⟩</span>.</li>
            <li><strong>S and T gates:</strong> Rotate around the Z-axis by <strong>90° (<span class="math-inline">π/2</span>)</strong> and <strong>45° (<span class="math-inline">π/4</span>)</strong> respectively.</li>
          </ul>`,
        },
        {
          label: '(d) Worked Example (Orthogonal Basis Check)',
          html: `<p>On the Bloch sphere, <span class="math-inline">|+⟩</span> (<span class="math-inline">+x</span>) and <span class="math-inline">|−⟩</span> (<span class="math-inline">−x</span>) sit 180° apart geometrically, yet algebraically they are orthogonal (<span class="math-inline">⟨+|−⟩ = 0</span>). In addition, <span class="math-inline">(|+⟩ + |−⟩)/√2 = |0⟩</span> and <span class="math-inline">(|+⟩ − |−⟩)/√2 = |1⟩</span>.</p>`,
        },
        {
          label: '(e) Limitations',
          html: `<p>The Bloch sphere visualizes only <em>one</em> qubit at a time—multi-qubit entangled states cannot be factored into separate single-qubit Bloch arrows.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>The Bloch sphere gives an immediate geometric picture of superposition, relative phase, and single-qubit gate rotations.</p>`,
        },
      ],
      studySource: '2unit qst/2bloch sphere.pptx (slides 1–14).',
      rememberThese: [
        '<span class="math-inline">|ψ(θ,φ)⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</span>',
        'Orthogonal states are <strong>180° (antipodal)</strong> apart on the Bloch sphere',
        'X/Y/Z = 180° rotations; S = 90° around Z; T = 45° around Z; H = 180° around x+z',
      ],
    },
    {
      number: '13a',
      question: 'Bloch sphere',
      sourceTag: 'Added from attached PDF · Unit II · Q2',
      marks: 2,
      intuition:
        'The Bloch sphere turns a single qubit’s complex amplitudes into a 3D arrow pointing anywhere on a unit globe, with |0⟩ at the north pole and |1⟩ at the south pole.',
      sections: [
        {
          html: `<p>The <strong>Bloch sphere</strong> is a geometric representation of any pure single-qubit state as a point on the surface of a unit 3D sphere via <span class="math-inline">|ψ(θ, φ)⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩</span>. The north and south poles represent <span class="math-inline">|0⟩</span> and <span class="math-inline">|1⟩</span>, equatorial points such as <span class="math-inline">|+⟩</span> and <span class="math-inline">|−⟩</span> represent equal superpositions, and single-qubit gates act as sphere rotations.</p>`,
          image: {
            file: 'bloch_sphere_coords.png',
            caption: 'Fig. Bloch sphere parameterization of a single-qubit state using angles θ and φ',
            source: '2unit qst/2bloch sphere.pptx · slide 2',
            placement: 'inline-bottom',
          },
        },
      ],
      studySource: '2unit qst/2bloch sphere.pptx (slide 2) & attached PDF (Unit II · Short Q2).',
      rememberThese: [
        'Surface points = pure states; interior points = mixed states',
        '<span class="math-inline">|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩</span>; orthogonal states sit 180° apart',
      ],
    },
    {
      number: 14,
      question:
        'Write matrix representation of Pauli X, Y, Z gates and analyze their outcomes on |0⟩ and |1⟩.',
      sourceTag: 'Mid 1 · Unit II · Q4',
      marks: 5,
      intuition:
        'Pauli X flips the bit (north ↔ south pole), Pauli Z flips only the phase sign of |1⟩, and Pauli Y does both simultaneously (bit + phase flip with an imaginary i factor).',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>The three <strong>Pauli gates (X, Y, Z)</strong> are fundamental single-qubit unitary and Hermitian (<span class="math-inline">U² = I</span>) gates corresponding to 180° (<span class="math-inline">π</span>) rotations around the X, Y, and Z axes of the Bloch sphere.</p>`,
        },
        {
          label: '(b) Matrix Representations & Outcomes on |0⟩ and |1⟩',
          html: `<p>Using <span class="math-inline">|0⟩ = <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table></span> and <span class="math-inline">|1⟩ = <table class="q-matrix"><tr><td>0</td></tr><tr><td>1</td></tr></table></span>, each gate outcome is computed step by step:</p>
          <p><strong>1. Pauli-X Gate (Quantum NOT / Bit-Flip Gate):</strong></p>
          <div class="math-block">X = <table class="q-matrix"><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table><br/>X|0⟩ = <table class="q-matrix"><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table> <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> = <table class="q-matrix"><tr><td>0</td></tr><tr><td>1</td></tr></table> = |1⟩<br/>X|1⟩ = <table class="q-matrix"><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table> <table class="q-matrix"><tr><td>0</td></tr><tr><td>1</td></tr></table> = <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> = |0⟩</div>`,
          image: {
            file: 'pauli_x_matrix_action.png',
            caption: 'Fig. 1: Pauli X gate matrix and action on basis states |0⟩ and |1⟩',
            source: '2unit qst/8 quantum gates pauli x y z t.pptx · slide 13',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Pauli-Y Gate (Bit + Phase Flip)',
          html: `<div class="math-block">Y = <table class="q-matrix"><tr><td>0</td><td>−i</td></tr><tr><td>i</td><td>0</td></tr></table><br/>Y|0⟩ = <table class="q-matrix"><tr><td>0</td><td>−i</td></tr><tr><td>i</td><td>0</td></tr></table> <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> = <table class="q-matrix"><tr><td>0</td></tr><tr><td>i</td></tr></table> = i|1⟩<br/>Y|1⟩ = <table class="q-matrix"><tr><td>0</td><td>−i</td></tr><tr><td>i</td><td>0</td></tr></table> <table class="q-matrix"><tr><td>0</td></tr><tr><td>1</td></tr></table> = <table class="q-matrix"><tr><td>−i</td></tr><tr><td>0</td></tr></table> = −i|0⟩</div>`,
          image: {
            file: 'pauli_y_matrix_action.png',
            caption: 'Fig. 2: Pauli Y matrix action on |0⟩ and |1⟩',
            source: '2unit qst/8 quantum gates pauli x y z t.pptx · slide 22',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Pauli-Z Gate (Phase-Flip Gate)',
          html: `<div class="math-block">Z = <table class="q-matrix"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>−1</td></tr></table><br/>Z|0⟩ = <table class="q-matrix"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>−1</td></tr></table> <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> = <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> = +|0⟩<br/>Z|1⟩ = <table class="q-matrix"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>−1</td></tr></table> <table class="q-matrix"><tr><td>0</td></tr><tr><td>1</td></tr></table> = <table class="q-matrix"><tr><td>0</td></tr><tr><td>−1</td></tr></table> = −|1⟩</div>`,
          image: {
            file: 'pauli_z_matrix_action.png',
            caption: 'Fig. 3: Pauli Z (phase-flip) gate matrix and outcomes on |0⟩ and |1⟩',
            source: '2unit qst/8 quantum gates pauli x y z t.pptx · slide 29',
            placement: 'inline-mid',
          },
        },
        {
          label: '(e) Analysis on General Superposition State',
          html: `<p>On <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>: <span class="math-inline">X|ψ⟩ = β|0⟩ + α|1⟩</span> swaps amplitudes; <span class="math-inline">Y|ψ⟩ = −iβ|0⟩ + iα|1⟩</span> swaps and shifts phase; <span class="math-inline">Z|ψ⟩ = α|0⟩ − β|1⟩</span> leaves measurement probabilities unchanged in Z-basis while flipping phase between <span class="math-inline">|+⟩ ↔ |−⟩</span>.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>Together, X, Y, and Z form the basis for single-qubit bit-flip, phase-flip, and combined error operators as well as Bloch-sphere 180° rotations.</p>`,
        },
      ],
      studySource: '2unit qst/8 quantum gates pauli x y z t.pptx (slides 13, 22, 29) & 2unit qst/good pdf gates.pdf.',
      rememberThese: [
        '<span class="math-inline">X = [0 1; 1 0]</span>: <span class="math-inline">X|0⟩=|1⟩, X|1⟩=|0⟩</span>',
        '<span class="math-inline">Y = [0 −i; i 0]</span>: <span class="math-inline">Y|0⟩=i|1⟩, Y|1⟩=−i|0⟩</span>',
        '<span class="math-inline">Z = [1 0; 0 −1]</span>: <span class="math-inline">Z|0⟩=|0⟩, Z|1⟩=−|1⟩</span>',
        'All three satisfy <span class="math-inline">X² = Y² = Z² = I</span>',
      ],
    },
    {
      number: '14a',
      question: 'Pauli-X matrix',
      sourceTag: 'Added from attached PDF · Unit II · Q5',
      marks: 2,
      intuition:
        'The Pauli-X gate is the quantum NOT gate—multiplying by its matrix swaps the top and bottom components so |0⟩ becomes |1⟩ and |1⟩ becomes |0⟩.',
      sections: [
        {
          html: `<p>The <strong>Pauli-X matrix</strong> is the quantum NOT (bit-flip) gate defined by <span class="math-inline">X = <table class="q-matrix"><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table></span>. It maps <span class="math-inline">X|0⟩ = |1⟩</span> and <span class="math-inline">X|1⟩ = |0⟩</span> (swapping amplitudes in <span class="math-inline">α|0⟩ + β|1⟩ → β|0⟩ + α|1⟩</span>), rotates the Bloch vector by <span class="math-inline">π</span> radians about the X-axis, and is both unitary and Hermitian (<span class="math-inline">X² = I</span>).</p>`,
        },
      ],
      studySource:
        '2unit qst/8 quantum gates pauli x y z t.pptx (slide 13) & attached PDF (Unit II · Short Q5).',
      noDiagramNote:
        'Concise 2-mark matrix definition; see Q14 for the Pauli-X action figure.',
      rememberThese: [
        '<span class="math-inline">X = [[0, 1], [1, 0]]</span> (quantum bit-flip / NOT gate)',
        '<span class="math-inline">X|0⟩ = |1⟩</span>, <span class="math-inline">X|1⟩ = |0⟩</span>, and <span class="math-inline">X² = I</span>',
      ],
    },
    {
      number: 15,
      question: 'Illustrate superposition principle with suitable gate.',
      sourceTag: 'Mid 1 · Unit II · Q2',
      marks: 5,
      intuition:
        'Starting a qubit in |0⟩ is like placing a coin strictly heads-up; applying a Hadamard gate puts it into a perfectly balanced 50/50 quantum superposition where neither 0 nor 1 is chosen until measurement.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>The <strong>superposition principle</strong> allows a quantum system to exist in a linear combination of basis states (<span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>) at the same time. The standard gate that creates equal superposition from a definite state is the <strong>Hadamard (H) gate</strong>.</p>`,
        },
        {
          label: '(b) Step-by-Step Illustration with the Hadamard (H) Gate',
          html: `<ol>
            <li><strong>Initial state:</strong> Initialize the qubit in <span class="math-inline">|0⟩ = [1, 0]ᵀ</span> (100% probability of 0).</li>
            <li><strong>Apply Hadamard gate:</strong> Multiply <span class="math-inline">|0⟩</span> by <span class="math-inline">H = (1/√2)<table class="q-matrix"><tr><td>1</td><td>1</td></tr><tr><td>1</td><td>−1</td></tr></table></span>.</li>
            <li><strong>Interpret probabilities:</strong> Both <span class="math-inline">|0⟩</span> and <span class="math-inline">|1⟩</span> have amplitude <span class="math-inline">1/√2</span>, so measurement yields 0 with probability <span class="math-inline">(1/√2)² = 50%</span> and 1 with probability <span class="math-inline">(1/√2)² = 50%</span>.</li>
          </ol>`,
          image: {
            file: 'hadamard_superposition.png',
            caption: 'Fig. 1: Matrix application of the Hadamard gate H to initial state |0⟩',
            source: '2unit qst/3a Quantum superposition.pptx · slide 4',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Matrix Calculation for H|0⟩ and H|1⟩',
          html: `<div class="math-block">H|0⟩ = (1/√2)<table class="q-matrix"><tr><td>1</td><td>1</td></tr><tr><td>1</td><td>−1</td></tr></table> <table class="q-matrix"><tr><td>1</td></tr><tr><td>0</td></tr></table> = (1/√2)<table class="q-matrix"><tr><td>1</td></tr><tr><td>1</td></tr></table> = (1/√2)(|0⟩ + |1⟩) = |+⟩<br/>H|1⟩ = (1/√2)<table class="q-matrix"><tr><td>1</td><td>1</td></tr><tr><td>1</td><td>−1</td></tr></table> <table class="q-matrix"><tr><td>0</td></tr><tr><td>1</td></tr></table> = (1/√2)<table class="q-matrix"><tr><td>1</td></tr><tr><td>−1</td></tr></table> = (1/√2)(|0⟩ − |1⟩) = |−⟩</div>`,
          image: {
            file: 'hadamard_bloch.png',
            caption: 'Fig. 2: Bloch sphere rotation by the Hadamard gate mapping |0⟩ to the +x axis',
            source: '2unit qst/8 quantum gates pauli x y z t.pptx · slide 35',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Scaling to Multiple Qubits (Example)',
          html: `<p>Applying Hadamards to two qubits initialized in <span class="math-inline">|00⟩</span> produces <span class="math-inline">(H ⊗ H)|00⟩ = ½(|00⟩ + |01⟩ + |10⟩ + |11⟩)</span>—representing all <span class="math-inline">2² = 4</span> states at once. For <span class="math-inline">n</span> qubits, <span class="math-inline">H⊗ⁿ</span> puts the register into a superposition of all <span class="math-inline">2ⁿ</span> states simultaneously.</p>`,
        },
        {
          label: '(e) Uses & Advantage',
          html: `<p>Hadamard superposition is the opening step of almost every quantum algorithm—Deutsch–Jozsa, Grover’s search, QFT, Shor’s algorithm, and Bell-state entanglement circuits.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>The Hadamard gate turns a definite computational state into a coherent equal superposition, unlocking <span class="math-inline">2ⁿ</span>-dimensional state representation with just <span class="math-inline">n</span> qubits.</p>`,
        },
      ],
      studySource: '2unit qst/3a Quantum superposition.pptx (slide 4) & 2unit qst/8 quantum gates pauli x y z t.pptx (slide 35).',
      rememberThese: [
        '<span class="math-inline">H = (1/√2)[1 1; 1 −1]</span>',
        '<span class="math-inline">H|0⟩ = (|0⟩+|1⟩)/√2 = |+⟩</span>; &nbsp;<span class="math-inline">H|1⟩ = (|0⟩−|1⟩)/√2 = |−⟩</span>',
        '<span class="math-inline">n</span> Hadamards prepare <span class="math-inline">2ⁿ</span> equally weighted basis states (<span class="math-inline">1/√(2ⁿ)</span> each)',
      ],
    },
    {
      number: '15a',
      question: 'H|1⟩',
      sourceTag: 'Added from attached PDF · Unit II · Q4',
      marks: 2,
      intuition:
        'Multiplying the Hadamard matrix by |1⟩ selects its second column, yielding an equal superposition with a minus sign on |1⟩—the |−⟩ state.',
      sections: [
        {
          html: `<p>Applying the Hadamard gate <span class="math-inline">H = (1/√2)<table class="q-matrix"><tr><td>1</td><td>1</td></tr><tr><td>1</td><td>−1</td></tr></table></span> to <span class="math-inline">|1⟩ = [0, 1]ᵀ</span> gives <span class="math-inline">H|1⟩ = (1/√2)[1, −1]ᵀ = (|0⟩ − |1⟩)/√2 = |−⟩</span>. This places the qubit on the <span class="math-inline">−x</span> axis of the Bloch sphere with equal 50% probabilities for measuring <span class="math-inline">0</span> or <span class="math-inline">1</span>.</p>`,
        },
      ],
      studySource:
        '2unit qst/3a Quantum superposition.pptx, 2unit qst/8 quantum gates pauli x y z t.pptx (slide 35), & attached PDF (Unit II · Short Q4).',
      noDiagramNote:
        'Concise 2-mark vector computation; see Q15 for the Hadamard Bloch rotation figure.',
      rememberThese: [
        '<span class="math-inline">H|1⟩ = (|0⟩ − |1⟩)/√2 = |−⟩</span>',
        'Measuring <span class="math-inline">|−⟩</span> in the Z-basis gives 0 or 1 with probability <span class="math-inline">|±1/√2|² = 1/2</span> each',
      ],
    },
    {
      number: '15b',
      question: 'Probability of 0',
      orderNote:
        'Refers to measuring 0 on an equal superposition state such as |+⟩ = (|0⟩ + |1⟩)/√2, where the amplitude of |0⟩ is 1/√2.',
      sourceTag: 'Added from attached PDF · Unit II · Q7',
      marks: 2,
      intuition:
        'By the Born rule, the probability of reading outcome 0 is always the squared magnitude of |0⟩’s amplitude—for an equal superposition with amplitude 1/√2, that squares to 1/2.',
      sections: [
        {
          html: `<p>By the <strong>Born rule</strong>, for a single-qubit state <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>, the probability of measuring outcome <span class="math-inline">0</span> is <span class="math-inline">P(0) = |⟨0|ψ⟩|² = |α|²</span>. For an equal superposition state such as <span class="math-inline">|+⟩ = H|0⟩ = (|0⟩ + |1⟩)/√2</span>, where <span class="math-inline">α = 1/√2</span>, the probability is <span class="math-inline">P(0) = |1/√2|² = 1/2</span> (50%).</p>`,
        },
      ],
      studySource:
        '1unit qst/13f quantum postulates.pptx, 2unit qst/3a Quantum superposition.pptx, & attached PDF (Unit II · Short Q7).',
      noDiagramNote:
        'Born-rule scalar probability calculation with no separate diagram needed.',
      rememberThese: [
        'General Born rule: <span class="math-inline">P(0) = |⟨0|ψ⟩|² = |α|²</span>',
        'For <span class="math-inline">α = 1/√2</span> (e.g., <span class="math-inline">|+⟩</span>): <span class="math-inline">P(0) = |1/√2|² = 1/2</span> (50%)',
      ],
    },
  ],
};
