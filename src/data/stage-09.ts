import type { StudyStage } from '../types/study';

export const stage09: StudyStage = {
  id: 9,
  part: 'C',
  partTitle: 'Quantum computing',
  title: 'Oracles, Deutsch and Deutsch-Jozsa',
  subtitle:
    'First algorithms: an oracle hides a function, and interference reveals its property.',
  questions: [
    {
      number: 30,
      question: 'What is an oracle?',
      sourceTag: 'Mid 2 · Unit III · Short Q6',
      marks: 2,
      intuition:
        'An oracle is a sealed black box: you cannot peek at its internal wiring, you can only feed in inputs |x⟩ and observe what it outputs or what phase it flips.',
      sections: [
        {
          html: `<p>An <strong>oracle (<span class="math-inline">U_f</span>)</strong> is a reversible unitary “black-box” quantum gate that computes a hidden classical Boolean function <span class="math-inline">f(x)</span> without revealing its internal logic. In quantum algorithms, it either flips a target ancilla qubit (<span class="math-inline">U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩</span>) or—via phase kickback with <span class="math-inline">|−⟩</span>—flips the sign of marked states (<span class="math-inline">U_f|x⟩ = (−1)^f(x)|x⟩</span>).</p>`,
        },
      ],
      studySource: '3rd unit/Grovers_Search_Algorithm.pptx & 3rd unit/deutsch.pptx (oracle U_f blocks).',
      noDiagramNote:
        '3rd unit/Grovers_Search_Algorithm.pptx and 3rd unit/deutsch.pptx show U_f as a circuit block inside full algorithm diagrams (see Q33 and Q35).',
      rememberThese: [
        'Bit-flip oracle: <span class="math-inline">U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩</span>',
        'Phase oracle (via ancilla <span class="math-inline">|−⟩</span>): <span class="math-inline">U_f|x⟩ = (−1)^f(x)|x⟩</span>',
        'Used in Deutsch–Jozsa and Grover’s search to count query complexity',
      ],
    },
    {
      number: 31,
      question:
        'What is the difference between a constant and a balanced function?',
      sourceTag: 'Mid 2 · Unit III · Short Q5',
      marks: 2,
      intuition:
        'Think of a coin-flipping box for every input: a constant box always outputs the same answer (all 0s or all 1s), while a balanced box splits its answers 50–50 (half 0s, half 1s).',
      usesTextbookSupplement: true,
      sections: [
        {
          html: `<p>For a Boolean function <span class="math-inline">f: {0, 1}ⁿ → {0, 1}</span>:</p>
          <ul>
            <li><strong>Constant function:</strong> Returns the exact same value for every input—either <span class="math-inline">f(x) = 0</span> for all <span class="math-inline">x</span>, or <span class="math-inline">f(x) = 1</span> for all <span class="math-inline">x</span>.</li>
            <li><strong>Balanced function:</strong> Returns <span class="math-inline">0</span> for exactly half (<span class="math-inline">2ⁿ⁻¹</span>) of all inputs and <span class="math-inline">1</span> for the remaining half (<span class="math-inline">2ⁿ⁻¹</span>).</li>
          </ul>`,
        },
      ],
      studySource: 'Added from textbook (Nielsen & Chuang); referenced implicitly by 3rd unit/deutsch.pptx.',
      noDiagramNote:
        'Boolean truth-table distinction explained purely mathematically; see Q33 for the Deutsch–Jozsa circuit.',
      rememberThese: [
        'Constant: all outputs identical (all 0s OR all 1s)',
        'Balanced: exact 50/50 split (<span class="math-inline">2ⁿ⁻¹</span> zeros and <span class="math-inline">2ⁿ⁻¹</span> ones)',
        'For <span class="math-inline">n=1</span>: constant means <span class="math-inline">f(0)=f(1)</span>; balanced means <span class="math-inline">f(0)≠f(1)</span>',
      ],
    },
    {
      number: 32,
      question: 'What is the Deutsch algorithm used for?',
      sourceTag: 'Mid 2 · Unit III · Short Q4',
      marks: 2,
      intuition:
        'A classical computer must test both x = 0 and x = 1 to know if a 1-bit mystery box is constant or balanced; Deutsch’s algorithm checks both in a single query.',
      usesTextbookSupplement: true,
      sections: [
        {
          html: `<p>The <strong>Deutsch algorithm</strong> determines whether a hidden 1-bit Boolean function <span class="math-inline">f: {0, 1} → {0, 1}</span> is <strong>constant</strong> (<span class="math-inline">f(0) = f(1)</span>) or <strong>balanced</strong> (<span class="math-inline">f(0) ≠ f(1)</span>) using only <strong>1 oracle query</strong>, whereas any deterministic classical algorithm requires <strong>2 queries</strong>.</p>`,
        },
      ],
      studySource: 'Added from textbook (Nielsen & Chuang); 3rd unit/deutsch.pptx contains only the n-qubit circuit image.',
      noDiagramNote:
        'No 1-qubit Deutsch diagram in the notes; the n-qubit Deutsch–Jozsa circuit diagram is given in Q33.',
      rememberThese: [
        'Tests 1-bit function <span class="math-inline">f: {0,1} → {0,1}</span> (i.e., finds <span class="math-inline">f(0) ⊕ f(1)</span>)',
        'Quantum queries needed: <strong>1</strong>; Classical deterministic queries: <strong>2</strong>',
        'First historical proof that quantum computers outperform classical ones',
      ],
    },
    {
      number: 33,
      question: 'Explain the Deutsch-Jozsa algorithm with a circuit and steps.',
      sourceTag: 'Mid 2 · Unit III · Long Q1(b)',
      marks: 5,
      intuition:
        'Classically, to be 100% sure an n-bit black box isn’t balanced, you might have to check over half of all 2ⁿ inputs (2ⁿ⁻¹ + 1 checks); Deutsch–Jozsa uses phase kickback and interference to solve it in just ONE query.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea & Problem Statement',
          html: `<p>Given an oracle implementing a black-box function <span class="math-inline">f: {0, 1}ⁿ → {0, 1}</span> guaranteed to be either <strong>constant</strong> or <strong>balanced</strong>, the <strong>Deutsch–Jozsa algorithm</strong> decides which one it is in <strong>exactly 1 quantum query</strong> (an exponential speedup over <span class="math-inline">2ⁿ⁻¹ + 1</span> worst-case classical queries).</p>`,
        },
        {
          label: '(b) Circuit Diagram',
          html: `<p>The circuit uses an <span class="math-inline">n</span>-qubit input query register (initialized to <span class="math-inline">|0⟩⊗ⁿ</span>) plus 1 ancilla target qubit (initialized to <span class="math-inline">|1⟩</span>):</p>`,
          image: {
            file: 'deutsch_jozsa_circuit.png',
            caption: 'Fig. Deutsch–Jozsa quantum circuit with Hadamards, oracle U_f, final Hadamards, and measurement (0 if y = 0ⁿ, else 1)',
            source: '3rd unit/deutsch.pptx · slide 1',
            placement: 'inline-top',
          },
        },
        {
          label: '(c) Step-by-Step Mathematical Derivation',
          html: `<p>The quantum state evolves through the circuit stages shown above as follows:</p>
          <ol>
            <li><strong>Step 1 (Initialization):</strong> Set <span class="math-inline">|ψ₀⟩ = |0⟩⊗ⁿ |1⟩</span>.</li>
            <li><strong>Step 2 (Superposition via Hadamards):</strong> Apply <span class="math-inline">H</span> to all <span class="math-inline">n + 1</span> qubits:
              <div class="math-block">|ψ₁⟩ = ( 1/√2ⁿ ∑_{x=0}^{2ⁿ−1} |x⟩ ) ⊗ (|0⟩ − |1⟩)/√2</div>
            </li>
            <li><strong>Step 3 (Oracle Query & Phase Kickback):</strong> Apply <span class="math-inline">U_f</span>. Because the ancilla is in <span class="math-inline">|−⟩</span>, each <span class="math-inline">f(x)</span> kicks back into a sign phase <span class="math-inline">(−1)^f(x)</span>:
              <div class="math-block">|ψ₂⟩ = ( 1/√2ⁿ ∑_x (−1)^f(x) |x⟩ ) ⊗ |−⟩</div>
            </li>
            <li><strong>Step 4 (Final Hadamards & Interference):</strong> Apply <span class="math-inline">H⊗ⁿ</span> to the first <span class="math-inline">n</span> qubits using <span class="math-inline">H⊗ⁿ|x⟩ = (1/√2ⁿ)∑_y (−1)^(x·y)|y⟩</span>:
              <div class="math-block">|ψ₃⟩ = ∑_{y ∈ {0,1}ⁿ} [ (1/2ⁿ) ∑_x (−1)^(f(x) + x·y) ] |y⟩ ⊗ |−⟩</div>
            </li>
            <li><strong>Step 5 (Measurement of Top n Qubits):</strong> Look specifically at the amplitude of <span class="math-inline">|0⟩⊗ⁿ</span> (i.e. <span class="math-inline">y = 0ⁿ</span>), which is <span class="math-inline">(1/2ⁿ)∑_x (−1)^f(x)</span>:
              <ul>
                <li>If <span class="math-inline">f</span> is <strong>constant</strong> (<span class="math-inline">f(x) = c</span>), every term adds constructively: amplitude of <span class="math-inline">|0⟩⊗ⁿ</span> is <span class="math-inline">±1</span>, so probability <span class="math-inline">P(0ⁿ) = 1</span> (output always <span class="math-inline">00…0</span>).</li>
                <li>If <span class="math-inline">f</span> is <strong>balanced</strong>, half the <span class="math-inline">(−1)^f(x)</span> terms are <span class="math-inline">+1</span> and half are <span class="math-inline">−1</span>, cancelling destructively: <span class="math-inline">P(0ⁿ) = 0</span>, so at least one qubit measures <span class="math-inline">1</span>.</li>
              </ul>
            </li>
          </ol>`,
        },
        {
          label: '(d) Quick Worked Check (n = 2, Constant f(x) = 1)',
          html: `<p>Every term gets phase <span class="math-inline">(−1)¹ = −1</span>, so the top register after the oracle is <span class="math-inline">−|+⟩|+⟩</span>. Applying <span class="math-inline">H ⊗ H</span> yields <span class="math-inline">−|00⟩</span>, giving <span class="math-inline">P(00) = |−1|² = 100%</span> → Constant.</p>`,
        },
        {
          label: '(e) Significance & Limitation',
          html: `<p>Provides an exponential speedup (<span class="math-inline">1</span> query vs <span class="math-inline">2ⁿ⁻¹ + 1</span> deterministic classical queries), though the promise problem itself is mainly a theoretical milestone inspiring Simon’s and Shor’s algorithms.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>Deutsch–Jozsa uses Hadamard parallelism, phase kickback, and constructive/destructive interference to distinguish constant from balanced functions in a single oracle evaluation.</p>`,
        },
      ],
      studySource:
        '3rd unit/deutsch.pptx (slide 1 circuit image, no text); step-by-step mathematical derivation added from textbook (Nielsen & Chuang).',
      rememberThese: [
        'Classical deterministic: <span class="math-inline">2ⁿ⁻¹ + 1</span> queries; Quantum: <strong>1 query</strong>',
        'Circuit: <span class="math-inline">|0⟩⊗ⁿ|1⟩ → H⊗ⁿ⁺¹ → U_f → H⊗ⁿ → Measure</span>',
        'Measure all zeros (<span class="math-inline">y = 0ⁿ</span>) ⇒ <strong>Constant</strong>; any <span class="math-inline">1</span> ⇒ <strong>Balanced</strong>',
      ],
    },
  ],
};
