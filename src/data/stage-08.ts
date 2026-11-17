import type { StudyStage } from '../types/study';

export const stage08: StudyStage = {
  id: 8,
  part: 'C',
  partTitle: 'Quantum computing',
  title: 'Parallelism and interference',
  subtitle: 'The two ideas behind every quantum speedup.',
  questions: [
    {
      number: 27,
      question: 'What is quantum parallelism?',
      sourceTag: 'Mid 2 · Unit III · Short Q2',
      marks: 2,
      intuition:
        'Instead of plugging inputs 0, 1, 2, ... into a function one after another, quantum parallelism feeds a Hadamard superposition of every input at once so one oracle pass computes all f(x) values simultaneously.',
      usesTextbookSupplement: true,
      sections: [
        {
          html: `<p><strong>Quantum parallelism</strong> is the ability of a quantum computer to evaluate a function <span class="math-inline">f(x)</span> across many different inputs simultaneously in a single circuit run by acting on a superposition state. Applying unitary <span class="math-inline">U_f</span> to an equal superposition prepares <span class="math-inline">U_f( (1/√2ⁿ) ∑|x⟩|0⟩ ) = (1/√2ⁿ) ∑|x⟩|f(x)⟩</span>—for instance computing both <span class="math-inline">f(0)</span> and <span class="math-inline">f(1)</span> in one query.</p>`,
        },
      ],
      studySource:
        'Added from textbook (Nielsen & Chuang) to supply formal oracle definition beyond overview mentions in Unit I/III notes.',
      noDiagramNote:
        'See Q29 for the 4-pillar quantum mechanics diagram showing superposition and interference from 1unit qst/1unit history.pptx (slide 8).',
      rememberThese: [
        'Evaluates <span class="math-inline">f(x)</span> for all <span class="math-inline">2ⁿ</span> inputs in one query',
        'Key limitation: measuring directly only reveals ONE random <span class="math-inline">(x, f(x))</span>',
        'Must be combined with interference to extract global answers',
      ],
    },
    {
      number: 28,
      question: 'What is quantum interference?',
      sourceTag: 'Mid 2 · Unit III · Short Q3',
      marks: 2,
      intuition:
        'Like noise-canceling headphones canceling unwanted hum while boosting your music, quantum interference adds computational paths together so wrong answers cancel out and the true answer amplifies.',
      usesTextbookSupplement: true,
      sections: [
        {
          html: `<p><strong>Quantum interference</strong> is the combination of complex probability amplitudes from different computational paths: amplitudes with the <em>same phase</em> add up (<strong>constructive interference</strong>, increasing probability), while amplitudes with <em>opposite phases</em> cancel out (<strong>destructive interference</strong>, reducing probability to zero). For example, applying <span class="math-inline">H</span> to <span class="math-inline">|+⟩ = (|0⟩+|1⟩)/√2</span> gives <span class="math-inline">|0⟩</span> because the <span class="math-inline">|1⟩</span> terms cancel (<span class="math-inline">+1/2 − 1/2 = 0</span>).</p>`,
        },
      ],
      studySource:
        '1unit qst/1unit history.pptx (slide 8) & 3rd unit/Grover_s_Search_Decoded good.pptx; Hadamard amplitude example added from textbook.',
      noDiagramNote:
        'Constructive/destructive interference wave diagram is shown inside the 4-pillar overview image in Q29.',
      rememberThese: [
        'Amplitudes (not probabilities) add and can be positive, negative, or complex',
        'Constructive = same sign/phase ⇒ higher probability',
        'Destructive = opposite phase ⇒ cancels wrong answers',
      ],
    },
    {
      number: 29,
      question:
        'Explain quantum parallelism and quantum interference with examples.',
      sourceTag: 'Mid 2 · Unit III · Long Q3(a)',
      marks: 5,
      intuition:
        'Parallelism alone is useless because measurement gives only one random result; quantum algorithms use parallelism to compute everything at once, then interference to erase the wrong answers and amplify the right one.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>Every quantum speedup combines two principles: <strong>quantum parallelism</strong> computes a function across an entire superposition of inputs in one step, and <strong>quantum interference</strong> combines those amplitudes so wrong paths cancel while the solution path reinforces.</p>`,
          image: {
            file: 'quantum_mechanics_4pillars.png',
            caption: 'Fig. Four core quantum principles: superposition, entanglement, measurement, and interference',
            source: '1unit qst/1unit history.pptx · slide 8',
            placement: 'inline-top',
          },
        },
        {
          label: '(b) Quantum Parallelism Explained with Worked Example',
          html: `<p>Given an oracle <span class="math-inline">U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩</span>, prepare input qubit <span class="math-inline">|0⟩</span> in equal superposition <span class="math-inline">|+⟩ = (|0⟩+|1⟩)/√2</span> via Hadamard and feed <span class="math-inline">|+⟩|0⟩</span> into <span class="math-inline">U_f</span>:</p>
          <div class="math-block">U_f( (|0⟩ + |1⟩)/√2 ⊗ |0⟩ ) = ( |0, f(0)⟩ + |1, f(1)⟩ ) / √2</div>
          <p>Both <span class="math-inline">f(0)</span> and <span class="math-inline">f(1)</span> now coexist in one quantum state. For <span class="math-inline">n</span> qubits, <span class="math-inline">(1/√2ⁿ) ∑|x⟩|f(x)⟩</span> evaluates all <span class="math-inline">2ⁿ</span> values in a single call. However, measuring directly reveals only one random pair.</p>`,
        },
        {
          label: '(c) Quantum Interference Explained with Worked Examples',
          html: `<p>Because amplitudes are signed or complex numbers, a Hadamard or QFT layer recombines parallel branches:</p>
          <ul>
            <li><strong>Constructive & Destructive Hadamard Example:</strong> Start with <span class="math-inline">|+⟩ = (|0⟩ + |1⟩)/√2</span> and apply <span class="math-inline">H</span>:
              <div class="math-block">H|+⟩ = (1/√2)( H|0⟩ + H|1⟩ ) = ½( (|0⟩ + |1⟩) + (|0⟩ − |1⟩) ) = ½( 2|0⟩ + 0|1⟩ ) = |0⟩</div>
              The <span class="math-inline">|0⟩</span> terms constructively add (<span class="math-inline">1/2 + 1/2 = 1</span>), while the <span class="math-inline">|1⟩</span> terms destructively cancel (<span class="math-inline">1/2 − 1/2 = 0</span>).
            </li>
            <li><strong>Shor & Grover Examples:</strong> In Shor’s algorithm, QFT interference reinforces peaks at multiples of <span class="math-inline">1/r</span> and cancels wrong phases; in Grover’s search, the diffuser reflects the phase-flipped target amplitude constructively above the mean.</li>
          </ul>`,
        },
        {
          label: '(d) Advantages & Limitations',
          html: `<p>Together they produce exponential (Deutsch–Jozsa, Shor) or quadratic (Grover) speedups, though decoherence can scramble relative phases before interference completes.</p>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>Quantum parallelism evaluates every possibility at once, while quantum interference filters out wrong branches so measurement hits the right answer with high probability.</p>`,
        },
      ],
      studySource:
        '1unit qst/1unit history.pptx (slide 8), 3rd unit/Grover_s_Search_Decoded good.pptx & 3rd unit/5 day shor.pptx; oracle formalism and Hadamard interference derivation added from textbook.',
      rememberThese: [
        'Parallelism: <span class="math-inline">U_f(H⊗ⁿ|0⟩⊗ⁿ|0⟩) = (1/√2ⁿ)∑|x⟩|f(x)⟩</span>',
        'Interference: <span class="math-inline">H|+⟩ = |0⟩</span> (<span class="math-inline">+1/2</span> & <span class="math-inline">−1/2</span> cancel <span class="math-inline">|1⟩</span>)',
        'Parallelism alone gives 1 random answer; Interference extracts global patterns (period, parity, target)',
      ],
    },
  ],
};
