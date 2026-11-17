import type { StudyStage } from '../types/study';

export const stage11: StudyStage = {
  id: 11,
  part: 'C',
  partTitle: 'Quantum computing',
  title: 'QFT and Shor’s algorithm',
  subtitle: 'Shor’s algorithm is built on the QFT, so the QFT comes first.',
  questions: [
    {
      number: 36,
      question: 'What is the QFT?',
      sourceTag: 'Mid 2 · Unit III · Short Q9',
      marks: 2,
      intuition:
        'Just as a prism or classical Fourier transform splits a sound wave into its hidden musical frequencies, the QFT transforms quantum amplitudes so hidden repeating periods jump out as sharp peaks.',
      usesTextbookSupplement: true,
      sections: [
        {
          html: `<p>The <strong>Quantum Fourier Transform (QFT)</strong> is the quantum analog of the discrete Fourier transform (DFT) applied to quantum state amplitudes: <span class="math-inline">|j⟩ → (1/√N) ∑_{k=0}^{N−1} e^(2πijk/N)|k⟩</span>. While classical FFT takes <span class="math-inline">O(N log N) = O(n 2ⁿ)</span> operations, QFT needs only <span class="math-inline">O(n²)</span> quantum gates and serves as the key period-finding engine inside Shor’s algorithm.</p>`,
        },
      ],
      studySource:
        '3rd unit/5 day shor.pptx (slides 23, 32, 34, 36); 3rd unit/QFT.pptx is 0 bytes so definition and gate complexity added from textbook (Nielsen & Chuang).',
      noDiagramNote:
        '3rd unit/QFT.pptx is an empty 0-byte file; QFT appears inside 3rd unit/5 day shor.pptx (slides 23, 32, 34, 36). See Q37 for the 2-qubit QFT text circuit.',
      rememberThese: [
        'Quantum version of Discrete Fourier Transform (DFT)',
        'Exponentially faster gate count: <span class="math-inline">O(n²)</span> gates vs classical FFT <span class="math-inline">O(n 2ⁿ)</span>',
        'Inverse <span class="math-inline">QFT⁻¹</span> extracts periodicity in Shor’s and Phase Estimation algorithms',
      ],
    },
    {
      number: 37,
      question:
        'Explain the Quantum Fourier Transform (QFT) with its circuit for 2 qubits.',
      sourceTag: 'Mid 2 · Unit III · Long Q4(a)',
      marks: 5,
      intuition:
        'QFT rotates computational states into frequency-encoded phase waves using Hadamard gates plus tiny conditional phase rotations—turning periodic repetitions into interference peaks at multiples of 1/r.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>The <strong>Quantum Fourier Transform (QFT)</strong> is a unitary linear transformation over <span class="math-inline">N = 2ⁿ</span> basis states that maps time- or position-domain amplitudes into frequency-domain phases, enabling period extraction in <span class="math-inline">O(n²)</span> gates.</p>`,
        },
        {
          label: '(b) Definition & Product Representation',
          html: `<p>For an orthonormal basis <span class="math-inline">|0⟩, |1⟩, …, |N−1⟩</span> where <span class="math-inline">N = 2ⁿ</span>, the QFT acts on <span class="math-inline">|j⟩</span> as:</p>
          <div class="math-block">QFT|j⟩ = (1/√N) ∑_{k=0}^{N−1} e^(2πi j k / N) |k⟩</div>
          <p>For <strong>2 qubits (<span class="math-inline">n = 2, N = 4</span>)</strong> with input <span class="math-inline">|j₁ j₂⟩</span>, it factors into single-qubit product states (in MSB-to-LSB order after the final SWAP):</p>
          <div class="math-block">QFT|j₁ j₂⟩ = (1/2) (|0⟩ + e^(2πi · 0.j₂)|1⟩) ⊗ (|0⟩ + e^(2πi · 0.j₁j₂)|1⟩)</div>`,
        },
        {
          label: '(c) 2-Qubit QFT Circuit & Gates Used',
          html: `<p>The 2-qubit QFT circuit uses Hadamard (<span class="math-inline">H</span>), controlled phase rotation <span class="math-inline">R₂ = diag(1, e^(2πi/2²)) = diag(1, i) = S</span>, and a final <span class="math-inline">SWAP</span> to restore bit order:</p>
          <div class="math-block">q₀: ──[ H ]──[ R₂ (S) ]──────────────×── (MSB out)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br/>q₁: ─────────────●──────────[ H ]──────×── (LSB out)</div>
          <ol>
            <li><strong>Step 1:</strong> Apply <span class="math-inline">H</span> to <span class="math-inline">q₀</span> → <span class="math-inline">(|0⟩ + e^(2πi·0.j₁)|1⟩)/√2</span>.</li>
            <li><strong>Step 2:</strong> Apply controlled-<span class="math-inline">R₂</span> (phase <span class="math-inline">π/2</span>) controlled by <span class="math-inline">q₁</span> onto <span class="math-inline">q₀</span> → yields <span class="math-inline">(|0⟩ + e^(2πi·0.j₁j₂)|1⟩)/√2</span> on <span class="math-inline">q₀</span>.</li>
            <li><strong>Step 3:</strong> Apply <span class="math-inline">H</span> to <span class="math-inline">q₁</span> → yields <span class="math-inline">(|0⟩ + e^(2πi·0.j₂)|1⟩)/√2</span> on <span class="math-inline">q₁</span>.</li>
            <li><strong>Step 4:</strong> Apply <span class="math-inline">SWAP(q₀, q₁)</span> to reverse qubit ordering, giving <span class="math-inline">½(|0⟩ + e^(2πi·0.j₂)|1⟩) ⊗ (|0⟩ + e^(2πi·0.j₁j₂)|1⟩)</span>.</li>
          </ol>`,
        },
        {
          label: '(d) Worked Example (2-Qubit QFT on |01⟩, j = 1)',
          html: `<p>Let <span class="math-inline">j = 1</span> (<span class="math-inline">j₁=0, j₂=1</span>), <span class="math-inline">N=4</span>: <span class="math-inline">QFT|01⟩ = ½ ∑_{k=0}^3 e^(2πi k/4)|k⟩ = ½(|00⟩ + i|01⟩ − |10⟩ − i|11⟩) = ½(|0⟩ − |1⟩) ⊗ (|0⟩ + i|1⟩)</span>. Every basis term <span class="math-inline">|k⟩</span> receives a 90° (<span class="math-inline">i = e^(iπ/2)</span>) step in complex phase.</p>`,
        },
        {
          label: '(e) Uses & Significance',
          html: `<p>Used (as <span class="math-inline">QFT⁻¹</span>) in Quantum Phase Estimation (QPE), Shor’s integer factorization, and solving discrete logarithms. It requires <span class="math-inline">O(n²)</span> quantum gates versus <span class="math-inline">O(n 2ⁿ)</span> classical FFT operations, though measurement yields a single sample rather than the full amplitude vector.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>QFT efficiently transforms computational states into Fourier frequency bases using only Hadamards, controlled phase gates, and swaps.</p>`,
        },
      ],
      studySource:
        'Added from textbook (Nielsen & Chuang) because 3rd unit/QFT.pptx is 0 bytes; cross-referenced with 3rd unit/5 day shor.pptx (slides 32, 34). (Note: 2-qubit product exponent order verified against QFT|01⟩.)',
      noDiagramNote:
        'No diagram image exists in the notes (3rd unit/QFT.pptx is 0 bytes); the 2-qubit circuit is shown above using standard Hadamard + controlled-R₂ + SWAP schematic.',
      rememberThese: [
        '<span class="math-inline">QFT|j⟩ = (1/√N) ∑ e^(2πijk/N)|k⟩</span>',
        '2-qubit gates: <span class="math-inline">H(q₀) → CR₂(q₁→q₀) → H(q₁) → SWAP</span>',
        'Controlled-<span class="math-inline">R₂ = diag(1, i)</span> (same as controlled-<span class="math-inline">S</span> gate)',
        'Complexity: <span class="math-inline">O(n²)</span> quantum gates vs <span class="math-inline">O(n 2ⁿ)</span> classical FFT',
      ],
    },
    {
      number: 38,
      question: 'Why is Shor’s algorithm important?',
      sourceTag: 'Mid 2 · Unit III · Short Q8',
      marks: 2,
      intuition:
        'Modern banking and internet locks (RSA) trust that nobody can factor a 600-digit number in a lifetime; Shor’s algorithm shrinks factoring from exponential years down to polynomial time.',
      sections: [
        {
          html: `<p><strong>Shor’s algorithm</strong> (Peter Shor, 1994) is important because it factors large composite integers <span class="math-inline">N = p × q</span> (and solves discrete logarithms) in <strong>polynomial time <span class="math-inline">O((log N)³)</span></strong>, giving an exponential speedup over the best classical algorithms. Consequently, large fault-tolerant quantum computers running Shor’s algorithm can break <strong>RSA and ECC public-key encryption</strong>, driving the global transition to Post-Quantum Cryptography (PQC) and QKD.</p>`,
        },
      ],
      studySource: '3rd unit/5 day shor.pptx & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 4).',
      noDiagramNote:
        'See Q39 for the period-finding plot and Shor quantum circuit diagram from 3rd unit/5 day shor.pptx.',
      rememberThese: [
        'Time complexity: <span class="math-inline">O((log N)³)</span> (polynomial) vs classical sub-exponential',
        'Directly threatens <strong>RSA</strong> (factoring) and <strong>ECC</strong> (discrete logarithm)',
        'Motivated NIST Post-Quantum Cryptography (lattice-based) standards',
      ],
    },
    {
      number: 39,
      question: 'Explain Shor’s algorithm with steps and a simple example.',
      sourceTag: 'Mid 2 · Unit III · Long Q2(b)',
      marks: 5,
      intuition:
        'Factoring a giant number N directly is hard, so Shor’s trick turns factoring into finding the repeating rhythm (period r) of aˣ mod N—which QFT spots easily—and then GCD turns that period into factors.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p><strong>Shor’s algorithm</strong> reduces integer factorization (<span class="math-inline">N = p × q</span>) to <strong>period finding</strong> for the modular function <span class="math-inline">f(x) = aˣ mod N</span>. A quantum computer finds period <span class="math-inline">r</span> in polynomial time via superposition, modular exponentiation, and inverse QFT, and classical GCD extracts the factors.</p>`,
        },
        {
          label: '(b) Hybrid Quantum–Classical Steps',
          html: `<ol>
            <li><strong>Step 1 (Pick co-prime base):</strong> Choose random <span class="math-inline">a</span> with <span class="math-inline">1 &lt; a &lt; N</span>. Compute <span class="math-inline">gcd(a, N)</span> using Euclid’s algorithm. If <span class="math-inline">gcd(a, N) &gt; 1</span>, a non-trivial factor is already found; otherwise proceed.</li>
            <li><strong>Step 2 (Quantum Superposition & Modular Exponentiation):</strong> Prepare two registers in <span class="math-inline">|0⟩⊗ᵗ |1⟩</span>. Apply Hadamards to the control register (<span class="math-inline">H⊗ᵗ</span>) to form <span class="math-inline">∑|x⟩</span>, then evaluate controlled-<span class="math-inline">U^(aˣ mod N)</span> to create the periodic state <span class="math-inline">∑|x⟩|aˣ mod N⟩</span>.</li>
            <li><strong>Step 3 (Inverse QFT & Measurement):</strong> Apply <span class="math-inline">QFT⁻¹</span> to the first register. Interference concentrates amplitudes at peaks near multiples of <span class="math-inline">2ᵗ/r</span>; measuring and applying continued fractions yields the period <span class="math-inline">r</span>.</li>
            <li><strong>Step 4 (Check Period & Extract Factors):</strong> Ensure <span class="math-inline">r</span> is even and <span class="math-inline">a^(r/2) ≢ −1 (mod N)</span> (if not, pick a new <span class="math-inline">a</span>). Then compute:
              <div class="math-block">f₁ = gcd(a^(r/2) − 1, N) &nbsp;&nbsp; and &nbsp;&nbsp; f₂ = gcd(a^(r/2) + 1, N)</div>
            </li>
          </ol>`,
          image: {
            file: 'shor_circuit.jpg',
            caption: 'Fig. Quantum period-finding circuit in Shor’s algorithm (Hadamards, controlled modular multiplication, and QFT⁻¹)',
            source: '3rd unit/5 day shor.pptx · slide 36',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Visual Intuition of Periodicity',
          html: `<p>Because <span class="math-inline">f(x) = aˣ mod N</span> repeats every <span class="math-inline">r</span> steps (for example, <span class="math-inline">3ˣ mod 35</span> repeats with period <span class="math-inline">r = 12</span>), <span class="math-inline">QFT⁻¹</span> acts as a frequency analyzer that extracts <span class="math-inline">r</span>:</p>`,
          image: {
            file: 'shor_period_graph.png',
            caption: 'Fig. Periodic behavior of 3ˣ mod 35 repeating every r = 12 steps',
            source: '3rd unit/5 day shor.pptx · slide 29',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Worked Example: Factor N = 15 with a = 7',
          html: `<ol>
            <li>Check <span class="math-inline">gcd(7, 15) = 1</span> (co-prime, proceed).</li>
            <li>Compute sequence <span class="math-inline">7ˣ mod 15</span>:
              <br/><span class="math-inline">7¹ mod 15 = 7</span>, &nbsp;<span class="math-inline">7² mod 15 = 4</span>, &nbsp;<span class="math-inline">7³ mod 15 = 13</span>, &nbsp;<span class="math-inline">7⁴ mod 15 = 1</span> → sequence repeats, giving period <span class="math-inline">r = 4</span>.</li>
            <li>Since <span class="math-inline">r = 4</span> is even, compute <span class="math-inline">p = a^(r/2) mod 15 = 7² mod 15 = 4</span>. Check <span class="math-inline">p + 1 = 5 ≠ 15</span> (valid).</li>
            <li>Extract factors: <span class="math-inline">f₁ = gcd(4 − 1, 15) = gcd(3, 15) = 3</span> and <span class="math-inline">f₂ = gcd(4 + 1, 15) = gcd(5, 15) = 5</span>. Result: <strong>15 = 3 × 5</strong>.</li>
          </ol>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>Shor’s algorithm combines quantum period-finding (<span class="math-inline">QFT⁻¹</span>) with classical Euclidean GCD to factor composite numbers exponentially faster than classical machines.</p>`,
        },
      ],
      studySource: '3rd unit/5 day shor.pptx (slides 11–14, 29, 36, 40) & 3rd unit/5 shor prg.docx.',
      rememberThese: [
        'Reduces factoring <span class="math-inline">N</span> → finding period <span class="math-inline">r</span> of <span class="math-inline">f(x) = aˣ mod N</span>',
        'Condition: <span class="math-inline">r</span> must be even and <span class="math-inline">a^(r/2) mod N ≠ N − 1</span>',
        'Factors: <span class="math-inline">gcd(a^(r/2) ± 1, N)</span>',
        'Example <span class="math-inline">N=15, a=7</span>: sequence <span class="math-inline">7, 4, 13, 1</span> ⇒ <span class="math-inline">r=4</span> ⇒ <span class="math-inline">gcd(3,15)=3</span>, <span class="math-inline">gcd(5,15)=5</span>',
      ],
    },
    {
      number: 40,
      question:
        'What is the significance of Shor’s algorithm? Explain its impact on RSA encryption.',
      sourceTag: 'Mid 2 · Unit III · Long Q6(b)',
      marks: 5,
      intuition:
        'RSA guards online banking because multiplying two huge primes is instant while reversing the product takes billions of years on supercomputers—Shor’s algorithm removes that one-way trapdoor.',
      sections: [
        {
          label: '(a) Core Significance',
          html: `<p><strong>Shor’s algorithm (1994)</strong> proved that quantum computers can achieve an <strong>exponential speedup</strong> over classical algorithms for real-world number-theoretic problems, running in polynomial time <span class="math-inline">O((log N)³)</span> compared to sub-exponential classical General Number Field Sieve methods.</p>`,
        },
        {
          label: '(b) How RSA Works & Why Shor Breaks It',
          html: `<ol>
            <li><strong>RSA’s Classical Foundation:</strong> Public-key RSA multiplies two secret large primes (<span class="math-inline">N = p × q</span>, e.g. 2048-bit integers). Finding <span class="math-inline">p</span> and <span class="math-inline">q</span> from <span class="math-inline">N</span> classically requires infeasible supercomputing time, protecting TLS/HTTPS, digital signatures, and banking.</li>
            <li><strong>Shor’s Period-Finding Attack:</strong> By converting factoring into modular period-finding via <span class="math-inline">f(x) = aˣ mod N</span> and inverse QFT, Shor’s algorithm recovers <span class="math-inline">p</span> and <span class="math-inline">q</span> in polynomial steps.</li>
            <li><strong>Recovering the Private Key:</strong> Once an attacker knows <span class="math-inline">p</span> and <span class="math-inline">q</span>, computing Euler’s totient <span class="math-inline">φ(N) = (p − 1)(q − 1)</span> and modular inverse <span class="math-inline">d = e⁻¹ mod φ(N)</span> reveals the private decryption key completely.</li>
          </ol>`,
          image: {
            file: 'shor_circuit.jpg',
            caption: 'Fig. Quantum period-finding circuit enabling polynomial-time factoring against RSA moduli',
            source: '3rd unit/5 day shor.pptx · slide 36',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Impact on Cybersecurity Ecosystem',
          html: `<ul>
            <li><strong>Threat to Public-Key Systems:</strong> Renders RSA, Diffie–Hellman, and Elliptic Curve Cryptography (ECC) insecure once fault-tolerant quantum computers reach scale.</li>
            <li><strong>“Harvest Now, Decrypt Later” Risk:</strong> Adversaries can record encrypted traffic today and decrypt it years later when large quantum hardware matures.</li>
            <li><strong>Global Cryptography Transition:</strong> Accelerates adoption of <strong>Post-Quantum Cryptography (PQC)</strong> (NIST lattice-based mathematical schemes) and physics-based <strong>Quantum Key Distribution (QKD)</strong>.</li>
          </ul>`,
        },
        {
          label: '(d) Current Hardware Limitation',
          html: `<p>Shor’s algorithm cannot break 2048-bit RSA on today’s noisy NISQ devices—breaking RSA requires <strong>thousands of error-corrected logical qubits</strong> (translating to millions of physical qubits).</p>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>Shor’s algorithm transforms factoring from an intractable problem into a polynomial-time quantum task, forcing modern cybersecurity to migrate from RSA and ECC to quantum-resistant cryptography.</p>`,
        },
      ],
      studySource:
        '3rd unit/5 day shor.pptx (slide 36), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 4) & 5 unit qst/5 unit qst 1 Quantum Technologies and Applications full1.pdf.',
      rememberThese: [
        'RSA security relies on hardness of factoring <span class="math-inline">N = p × q</span>',
        'Shor breaks RSA & ECC in <span class="math-inline">O((log N)³)</span> once fault-tolerant hardware exists',
        'Mitigations: <strong>Post-Quantum Cryptography (PQC)</strong> + <strong>QKD</strong>',
        'Immediate threat: <em>"Harvest Now, Decrypt Later"</em> data collection',
      ],
    },
  ],
};
