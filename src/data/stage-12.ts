import type { StudyStage } from '../types/study';

export const stage12: StudyStage = {
  id: 12,
  part: 'C',
  partTitle: 'Quantum computing',
  title: 'Errors, error correction and programming',
  subtitle:
    'Decoherence causes errors, codes fight them, and Qiskit is how you run it all. (The decoherence question is from Unit IV but belongs here.)',
  questions: [
    {
      number: 41,
      question: 'What is decoherence?',
      sourceTag: 'Mid 2 · Unit IV · Short Q10',
      marks: 2,
      intuition:
        'A spinning qubit is like a delicate soap bubble—any stray vibration, heat photon, or magnetic bump from the outside world pops its fragile relative phases and turns pure quantum information into ordinary classical noise.',
      sections: [
        {
          html: `<p><strong>Decoherence</strong> is the loss of a qubit’s delicate quantum superposition and relative phase relationships caused by unwanted interactions with its surrounding environment (such as thermal vibrations, stray electromagnetic fields, or photon scattering). It causes quantum information to decay into classical probabilistic mixtures before long computations finish, making <strong>Quantum Error Correction (QEC)</strong> essential.</p>`,
        },
      ],
      studySource: '3rd unit/Grover_s_Search_Decoded good.pptx & 5 unit qst/5 unit qst 2 full.pptx (NISQ noise limits).',
      noDiagramNote:
        'Discussed conceptually across Unit III (Grover’s hardware challenges) and Unit V (NISQ limitations) without a standalone diagram.',
      rememberThese: [
        'Decoherence = loss of quantum phase/coherence due to environmental coupling',
        'Turns coherent superpositions <span class="math-inline">α|0⟩ + β|1⟩</span> into noisy classical mixtures',
        'Major bottleneck limiting circuit depth in today’s NISQ processors',
      ],
    },
    {
      number: 42,
      question: 'What is a bit-flip error?',
      sourceTag: 'Mid 2 · Unit III · Short Q10',
      marks: 2,
      intuition:
        'Just like static flipping a 0 to a 1 in a phone wire, a bit-flip error accidentally applies a Pauli-X gate to a qubit.',
      sections: [
        {
          html: `<p>A <strong>bit-flip error</strong> occurs when environmental noise accidentally applies the Pauli-<span class="math-inline">X</span> operator to a qubit, swapping <span class="math-inline">|0⟩ ↔ |1⟩</span>. On a general superposition <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>, a bit-flip error turns it into <span class="math-inline">X|ψ⟩ = α|1⟩ + β|0⟩</span>, which is corrected using the 3-qubit repetition code.</p>`,
        },
      ],
      studySource: '3rd unit/shor 9 qubit code.pptx (slide 2).',
      noDiagramNote:
        'Circuit illustration appears in Q44 and in Shor’s 9-qubit error-correcting code in Q45.',
      rememberThese: [
        'Bit-flip error = unintended Pauli-<span class="math-inline">X</span> gate (<span class="math-inline">|0⟩ ↔ |1⟩</span>)',
        'Transforms <span class="math-inline">α|0⟩ + β|1⟩ → α|1⟩ + β|0⟩</span>',
        'Protected by encoding <span class="math-inline">|0⟩ → |000⟩</span> and <span class="math-inline">|1⟩ → |111⟩</span>',
      ],
    },
    {
      number: 43,
      question:
        'Why is quantum error correction needed? Explain the types of errors in a qubit.',
      sourceTag: 'Mid 2 · Unit III · Long Q5(b)',
      marks: 5,
      intuition:
        'Classical computers fix errors by making spare copies and checking bits directly—but quantum rules forbid copying unknown states (no-cloning) and direct reading collapses superpositions, so QEC uses clever parity checks on entangled qubits.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea & Why Classical Error Correction Fails',
          html: `<p>Physical qubits suffer rapid errors from <strong>decoherence</strong> and imperfect gates. Unlike classical error correction (which clones bits and reads them directly), <strong>Quantum Error Correction (QEC)</strong> is uniquely needed and must overcome three quantum obstacles:</p>
          <ul>
            <li><strong>No-Cloning Theorem:</strong> Unknown states cannot simply be copied as <span class="math-inline">|ψ⟩|ψ⟩|ψ⟩</span>.</li>
            <li><strong>Measurement Collapse:</strong> Measuring data qubits directly destroys quantum superposition.</li>
            <li><strong>Continuous Error Space:</strong> Errors are not just discrete 0↔1 flips; small continuous phase and amplitude drifts occur—yet measuring error syndromes discretizes any error into combinations of Pauli operators <span class="math-inline">{I, X, Y, Z}</span>.</li>
          </ul>`,
        },
        {
          label: '(b) Types of Single-Qubit Errors',
          html: `<p>Every arbitrary single-qubit error can be decomposed into four fundamental error types (identity <span class="math-inline">I</span> = no error, plus three Pauli error types):</p>
          <ol>
            <li><strong>Bit-Flip Error (<span class="math-inline">X</span> error):</strong> Flips basis states <span class="math-inline">|0⟩ ↔ |1⟩</span>, mapping <span class="math-inline">α|0⟩ + β|1⟩ → α|1⟩ + β|0⟩</span> (classical analogue).</li>
            <li><strong>Phase-Flip Error (<span class="math-inline">Z</span> error):</strong> Leaves basis labels unchanged but reverses the relative phase sign (<span class="math-inline">|1⟩ → −|1⟩</span>), mapping <span class="math-inline">α|0⟩ + β|1⟩ → α|0⟩ − β|1⟩</span> (purely quantum error, swaps <span class="math-inline">|+⟩ ↔ |−⟩</span>).</li>
            <li><strong>Combined Bit-and-Phase-Flip Error (<span class="math-inline">XZ = −iY</span> error):</strong> Simultaneously flips both the bit value and relative phase, mapping <span class="math-inline">α|0⟩ + β|1⟩ → α|1⟩ − β|0⟩</span>.</li>
          </ol>`,
        },
        {
          label: '(c) QEC Diagram & Hierarchy',
          html: `<p>Shor’s 9-qubit code (1995) proved that correcting <span class="math-inline">X</span>, <span class="math-inline">Z</span>, and <span class="math-inline">XZ</span> errors protects against <em>any</em> arbitrary continuous single-qubit error without collapsing the logical superposition:</p>`,
          image: {
            file: 'shor_9qubit_circuit.png',
            caption: 'Fig. Shor 9-qubit QEC encoding circuit combining inner bit-flip blocks and outer phase-flip protection',
            source: '3rd unit/shor 9 qubit code.pptx · slide 6',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Quick Syndrome Example',
          html: `<p>By entangling data qubits with ancilla qubits and measuring parity syndromes (such as <span class="math-inline">Z₁Z₂</span> and <span class="math-inline">Z₂Z₃</span>), error-correction circuits detect <em>which</em> qubit flipped and <em>what</em> error occurred without ever learning <span class="math-inline">α</span> or <span class="math-inline">β</span>.</p>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>QEC is essential to bridge noisy NISQ chips to fault-tolerant quantum computers by discretizing and correcting bit-flip (<span class="math-inline">X</span>), phase-flip (<span class="math-inline">Z</span>), and combined (<span class="math-inline">XZ</span>) qubit errors without destroying superposition.</p>`,
        },
      ],
      studySource:
        '3rd unit/shor 9 qubit code.pptx (slides 2, 6); the 3 obstacles (no-cloning, collapse, continuous error discretization) added from textbook (Nielsen & Chuang).',
      rememberThese: [
        '3 obstacles overcome by QEC: No-cloning, Measurement collapse, Continuous errors',
        '3 fundamental error types: Bit-flip (<span class="math-inline">X</span>), Phase-flip (<span class="math-inline">Z</span>), Combined (<span class="math-inline">XZ / Y</span>)',
        'Syndrome measurements reveal the <em>error location/type</em> without reading the secret data',
      ],
    },
    {
      number: 44,
      question:
        'Explain bit-flip and phase-flip errors and illustrate how the 3-qubit codes correct them.',
      sourceTag: 'Mid 2 · Unit III · Long Q4(b)',
      marks: 5,
      intuition:
        'Bit-flip protection acts like majority voting in the {|0⟩, |1⟩} basis; phase-flip protection uses Hadamard gates to turn phase flips into ordinary bit flips in the {|+⟩, |−⟩} basis and then applies the exact same majority vote!',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>Two foundational 3-qubit codes protect a logical state <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span> against single-qubit errors: the <strong>3-qubit bit-flip code</strong> corrects any single <span class="math-inline">X</span> error, while the <strong>3-qubit phase-flip code</strong> adds Hadamard gates so it corrects any single <span class="math-inline">Z</span> error.</p>`,
        },
        {
          label: '(b) 3-Qubit Bit-Flip Code (Corrects X Errors)',
          html: `<ol>
            <li><strong>Encode (via 2 CNOTs):</strong> Map <span class="math-inline">|0⟩ → |000⟩</span> and <span class="math-inline">|1⟩ → |111⟩</span> (creating entanglement, <em>not</em> cloning), so <span class="math-inline">|ψ⟩_L = α|000⟩ + β|111⟩</span>.</li>
            <li><strong>Error occurs:</strong> Suppose noise flips qubit 2 (<span class="math-inline">X₂</span>): state becomes <span class="math-inline">α|010⟩ + β|101⟩</span>.</li>
            <li><strong>Syndrome Detection (Compare parities without reading α, β):</strong> Measure <span class="math-inline">Z₁Z₂</span> (does q1 equal q2?) and <span class="math-inline">Z₂Z₃</span> (does q2 equal q3?) using ancilla qubits:
              <table class="q-table">
                <thead><tr><th>Syndrome (Z₁Z₂, Z₂Z₃)</th><th>Diagnosis</th><th>Recovery Gate</th></tr></thead>
                <tbody>
                  <tr><td>(+1, +1) or 00</td><td>No error</td><td>I (none)</td></tr>
                  <tr><td>(−1, +1) or 10</td><td>Bit-flip on Qubit 1</td><td>Apply X₁</td></tr>
                  <tr><td>(−1, −1) or 11</td><td>Bit-flip on Qubit 2</td><td>Apply X₂</td></tr>
                  <tr><td>(+1, −1) or 01</td><td>Bit-flip on Qubit 3</td><td>Apply X₃</td></tr>
                </tbody>
              </table>
            </li>
            <li><strong>Correction:</strong> Applying <span class="math-inline">X₂</span> restores <span class="math-inline">α|000⟩ + β|111⟩</span> cleanly.</li>
          </ol>`,
        },
        {
          label: '(c) 3-Qubit Phase-Flip Code (Corrects Z Errors)',
          html: `<p>Because <span class="math-inline">H Z H = X</span>, a phase-flip (<span class="math-inline">Z</span>) in the Hadamard <span class="math-inline">{|+⟩, |−⟩}</span> basis acts identically to a bit-flip (<span class="math-inline">X</span>) in the <span class="math-inline">{|0⟩, |1⟩}</span> basis.</p>
          <ol>
            <li><strong>Encode (2 CNOTs + 3 Hadamards):</strong> Encode into <span class="math-inline">|0_L⟩ = |+++⟩</span> and <span class="math-inline">|1_L⟩ = |−−−⟩</span>, giving <span class="math-inline">α|+++⟩ + β|−−−⟩</span>.</li>
            <li><strong>Error occurs:</strong> A <span class="math-inline">Z</span> error on qubit 1 flips <span class="math-inline">|+⟩ ↔ |−⟩</span> on that qubit, giving <span class="math-inline">α|−++⟩ + β|+−−⟩</span>.</li>
            <li><strong>Syndrome & Recovery:</strong> Measure <span class="math-inline">X₁X₂</span> and <span class="math-inline">X₂X₃</span> (or apply <span class="math-inline">H⊗³</span> to map back to bit-flip basis, detect minority qubit, flip back with <span class="math-inline">Z</span> / <span class="math-inline">H X H</span>), restoring <span class="math-inline">α|+++⟩ + β|−−−⟩</span>.</li>
          </ol>`,
          image: {
            file: 'shor_9qubit_states.png',
            caption: 'Fig. Logical encoding formulas for concatenated 3-qubit blocks',
            source: '3rd unit/shor 9 qubit code.pptx · slide 8',
            placement: 'inline-bottom',
          },
        },
        {
          label: '(d) Conclusion',
          html: `<p>The 3-qubit bit-flip code uses majority parity in the Z basis, and wrapping it with Hadamards turns it into the 3-qubit phase-flip code—together forming the building blocks of Shor’s 9-qubit code.</p>`,
        },
      ],
      studySource:
        '3rd unit/shor 9 qubit code.pptx (slide 8); 3-qubit stabilizer syndrome tables and phase-flip recovery steps added from textbook (Nielsen & Chuang).',
      rememberThese: [
        'Bit-flip encoding: <span class="math-inline">|0⟩→|000⟩, |1⟩→|111⟩</span> (detects <span class="math-inline">X</span> via <span class="math-inline">Z₁Z₂, Z₂Z₃</span>)',
        'Phase-flip encoding: <span class="math-inline">|0⟩→|+++⟩, |1⟩→|−−−⟩</span> (since <span class="math-inline">HZH = X</span>)',
        'Each 3-qubit code alone fixes only 1 error type; concatenating both yields Shor’s 9-qubit code',
      ],
    },
    {
      number: 45,
      question:
        'Explain Shor’s 9-qubit code. Write a short note on Qiskit, Cirq and IBM Quantum.',
      sourceTag: 'Mid 2 · Unit III · Long Q3(b)',
      marks: 5,
      intuition:
        'Shor’s 9-qubit code puts one 3-qubit bit-flip defense inside another 3-qubit phase-flip defense (3 × 3 = 9 qubits), while Qiskit, Cirq, and IBM Quantum are the software frameworks and cloud computers used to build and run quantum circuits.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: 'Part 1: Shor’s 9-Qubit Code',
          html: `<p>Discovered by Peter Shor (1995), <strong>Shor’s 9-qubit code</strong> was the first quantum error-correcting code able to protect 1 logical qubit against <em>any</em> arbitrary single-qubit error (<span class="math-inline">X</span> bit-flip, <span class="math-inline">Z</span> phase-flip, or combined <span class="math-inline">XZ</span>) across 9 physical qubits.</p>
          <ol>
            <li><strong>Two-Layer Concatenation:</strong>
              <ul>
                <li><strong>Outer code (Phase-flip protection):</strong> First encode the qubit into 3 qubits using the phase-flip repetition code (<span class="math-inline">|0⟩ → |+++⟩, |1⟩ → |−−−⟩</span>).</li>
                <li><strong>Inner code (Bit-flip protection):</strong> Next encode each of those 3 qubits independently into a 3-qubit block (blocks 0, 1, 2) using ordinary bit-flip repetition (<span class="math-inline">|+⟩ → (|000⟩+|111⟩)/√2</span>).</li>
              </ul>
            </li>
            <li><strong>Logical Basis States (9 qubits total, normalization <span class="math-inline">1/(2√2) = (1/√2)³</span>):</strong>
              <div class="math-block">|0_L⟩ = (1 / 2√2) (|000⟩ + |111⟩) ⊗ (|000⟩ + |111⟩) ⊗ (|000⟩ + |111⟩)<br/>|1_L⟩ = (1 / 2√2) (|000⟩ − |111⟩) ⊗ (|000⟩ − |111⟩) ⊗ (|000⟩ − |111⟩)</div>
            </li>
            <li><strong>Error Recovery:</strong> Majority voting inside each 3-qubit block fixes any bit-flip <span class="math-inline">X</span>, while checking relative sign parity (<span class="math-inline">+</span> vs <span class="math-inline">−</span>) across the 3 blocks fixes any phase-flip <span class="math-inline">Z</span>.</li>
          </ol>`,
          image: {
            file: 'shor_9qubit_circuit.png',
            caption: 'Fig. Encoding circuit of Shor’s 9-qubit code showing 3 concatenated blocks (blocks 0, 1, 2)',
            source: '3rd unit/shor 9 qubit code.pptx · slide 6',
            placement: 'inline-mid',
          },
        },
        {
          label: 'Part 2: Short Note on Qiskit, Cirq and IBM Quantum',
          html: `<ul>
            <li><strong>Qiskit (IBM):</strong> Open-source Python SDK developed by IBM for creating quantum circuits (<span class="math-inline">QuantumCircuit</span>), transpiling gates, simulating circuits locally (<span class="math-inline">AerSimulator</span> / <span class="math-inline">Statevector</span>), and running jobs on real hardware.</li>
            <li><strong>Cirq (Google):</strong> Open-source Python framework created by Google Quantum AI tailored for building, optimizing, and simulating noisy NISQ circuits matching physical qubit layouts and native gate sets.</li>
            <li><strong>IBM Quantum (IBM Quantum Experience):</strong> Cloud-accessible quantum platform (launched 2016) providing superconducting quantum processors (such as Eagle, Heron, and Condor) and the visual Quantum Composer and Qiskit Runtime for students and researchers worldwide.</li>
          </ul>`,
        },
      ],
      studySource:
        '3rd unit/shor 9 qubit code.pptx (slides 6, 8), Unit II/III Qiskit slides (3a Quantum superposition.pptx, 9b exe1 qc circuit.pptx) & Unit V ecosystem notes; Cirq description added from textbook/official documentation.',
      rememberThese: [
        'Shor’s 9-qubit code = Outer 3-qubit phase-flip code + Inner 3-qubit bit-flip code (<span class="math-inline">3×3 = 9</span>)',
        'Fixes any <span class="math-inline">X</span>, <span class="math-inline">Z</span>, or <span class="math-inline">XZ</span> error on any 1 of the 9 qubits',
        'Qiskit = IBM Python SDK; Cirq = Google NISQ Python SDK; IBM Quantum = cloud superconducting hardware',
      ],
    },
    {
      number: 46,
      question:
        'Explain the workflow of quantum programming in Qiskit (build the circuit, run it, get the results).',
      sourceTag: 'Mid 2 · Unit III · Long Q6(a)',
      marks: 5,
      intuition:
        'Writing a Qiskit program works just like baking a recipe: first you write down the circuit blueprint (gates + measurements), then you compile and send it to a simulator or real chip, and finally you collect the measurement counts.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p><strong>Qiskit</strong> follows a structured three-stage workflow for executing quantum algorithms: <strong>(1) Build</strong> the quantum circuit, <strong>(2) Compile & Run</strong> on a simulator or backend, and <strong>(3) Analyze Results</strong> via shot counts or statevectors.</p>`,
        },
        {
          label: '(b) Step-by-Step Qiskit Workflow',
          html: `<ol>
            <li><strong>Stage 1 — Build the Circuit:</strong>
              <ul>
                <li>Import <span class="math-inline">QuantumCircuit</span> from <span class="math-inline">qiskit</span>.</li>
                <li>Create registers specifying quantum qubits and classical readout bits: e.g., <span class="math-inline">qc = QuantumCircuit(2, 2)</span>.</li>
                <li>Add quantum gates (<span class="math-inline">qc.h(0)</span>, <span class="math-inline">qc.cx(0, 1)</span>) and attach measurements (<span class="math-inline">qc.measure([0,1], [0,1])</span>) or inspect via <span class="math-inline">qc.draw('mpl')</span>.</li>
              </ul>
            </li>
            <li><strong>Stage 2 — Compile (Transpile) & Run:</strong>
              <ul>
                <li>Select a backend: local simulator (<span class="math-inline">AerSimulator()</span> or <span class="math-inline">StatevectorSampler</span>) or cloud IBM hardware.</li>
                <li>If needed, transpile the circuit into hardware-native gates (<span class="math-inline">transpile(qc, simulator)</span>).</li>
                <li>Execute for multiple shots (repetitions, e.g. <span class="math-inline">shots=1000</span>): <span class="math-inline">job = simulator.run(qc, shots=1000)</span>.</li>
              </ul>
            </li>
            <li><strong>Stage 3 — Get & Visualize Results:</strong>
              <ul>
                <li>Retrieve finished job data: <span class="math-inline">result = job.result()</span>.</li>
                <li>Extract bitstring frequencies: <span class="math-inline">counts = result.get_counts(qc)</span> (e.g., <span class="math-inline">{'00': 518, '11': 482}</span>) and plot histograms (<span class="math-inline">plot_histogram(counts)</span>).</li>
              </ul>
            </li>
          </ol>`,
          image: {
            file: 'qiskit_workflow_code.png',
            caption: 'Fig. Complete Qiskit Python workflow: build QuantumCircuit(2,2), add gates, measure, and run on AerSimulator',
            source: '2unit qst/3a Quantum superposition.pptx · slide 8',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Inspecting Statevector & Measurement Output',
          html: `<p>Before measurement, Qiskit’s <span class="math-inline">quantum_info.Statevector</span> module allows inspection of amplitudes and Bloch spheres (<span class="math-inline">psi.draw('bloch')</span> or <span class="math-inline">psi.draw('latex')</span>); after measurement, <span class="math-inline">get_counts()</span> reports empirical probabilities:</p>`,
          image: {
            file: 'qiskit_circuit_bloch.png',
            caption: 'Fig. Qiskit Statevector simulation showing printed amplitudes and LaTeX output',
            source: '2unit qst/9b exe1 qc circuit.pptx · slide 7',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Advantages & Limitations',
          html: `<p>Simulators run fast and noise-free for small qubit counts (≤ ~30 qubits), while real IBM Quantum backends include physical gate noise and require transpilation to match hardware coupling maps.</p>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>Qiskit’s Build → Transpile & Run → Get Results workflow provides a uniform interface from classroom simulations on a laptop to real cloud quantum processors.</p>`,
        },
      ],
      studySource: '2unit qst/3a Quantum superposition.pptx (slide 8) & 2unit qst/9b exe1 qc circuit.pptx (slide 7).',
      rememberThese: [
        '<strong>1. Build:</strong> <span class="math-inline">qc = QuantumCircuit(n, c)</span> → add gates & <span class="math-inline">qc.measure(...)</span>',
        '<strong>2. Run:</strong> <span class="math-inline">transpile(qc, backend)</span> → <span class="math-inline">job = backend.run(qc, shots=1000)</span>',
        '<strong>3. Results:</strong> <span class="math-inline">counts = job.result().get_counts()</span> & <span class="math-inline">plot_histogram(counts)</span>',
      ],
    },
  ],
};
