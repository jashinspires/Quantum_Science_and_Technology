import type { StudyStage } from '../types/study';

export const stage18: StudyStage = {
  id: 18,
  part: 'E',
  partTitle: 'Quantum technologies and applications',
  title: 'Hardware platforms',
  subtitle: 'How qubits are physically built, then how the platforms compare.',
  questions: [
    {
      number: 78,
      question: 'What is a qubit? Name two types of qubit hardware.',
      sourceTag: 'Mid 2 · Unit V · Short Q8',
      marks: 2,
      intuition:
        'A qubit is any well-isolated quantum two-level system—and engineers can build those two levels out of tiny cold superconducting circuits, hovering charged atoms, or single photons of light.',
      sections: [
        {
          html: `<p>A <strong>qubit (quantum bit)</strong> is the basic unit of quantum information, represented physically by any controllable two-level quantum system capable of superposition (<span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span>, <span class="math-inline">|α|² + |β|² = 1</span>). Two major hardware implementations are: <strong>(1) Superconducting qubits</strong> (Josephson junction circuits cooled below 15 mK, such as IBM and Google chips) and <strong>(2) Trapped ion qubits</strong> (electromagnetically levitated ions driven by lasers, such as IonQ systems).</p>`,
        },
      ],
      studySource:
        '3rd unit/5 unit.docx (Sections 6–8) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 3).',
      noDiagramNote:
        'Physical hardware platforms are described in Unit V text/tables without standalone engineering images.',
      rememberThese: [
        'Qubit state: <span class="math-inline">|ψ⟩ = α|0⟩ + β|1⟩</span> with <span class="math-inline">|α|² + |β|² = 1</span>',
        'Two leading hardware types: <strong>Superconducting qubits</strong> and <strong>Trapped ion qubits</strong> (plus Photonic qubits)',
      ],
    },
    {
      number: 79,
      question:
        'Explain superconducting qubits and trapped ion qubits with their advantages and limitations.',
      sourceTag: 'Mid 2 · Unit V · Long Q1(a)',
      marks: 5,
      intuition:
        'Superconducting qubits act like ultra-fast artificial atoms printed on microchips inside giant freezers, while trapped ions use real identical atoms floating in vacuum that hold their quantum state much longer but compute slower.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p><strong>Superconducting qubits</strong> and <strong>trapped ion qubits</strong> are the two leading programmable quantum computing architectures today, trading off gate speed and lithographic scalability against coherence time and gate fidelity.</p>`,
        },
        {
          label: '(b) 1. Superconducting Qubits (IBM Quantum, Google Quantum AI)',
          html: `<ul>
            <li><strong>How They Work:</strong> Micro-fabricated circuits made of superconducting metals (Aluminum or Niobium) pair a capacitor with a nonlinear <strong>Josephson junction</strong> (a thin insulator sandwiched between superconductors). Unlike linear LC oscillators whose energy steps are uniform, the Josephson junction creates unequal (anharmonic) spacing so <span class="math-inline">|0⟩ → |1⟩</span> (~5 GHz) can be addressed selectively by microwave pulses inside dilution refrigerators (&lt; 15 mK).</li>
            <li><strong>Advantages:</strong> Very fast gate speeds (nanoseconds), scalable microchip lithography, strong resonator coupling.</li>
            <li><strong>Limitations:</strong> Needs expensive cryogenic dilution refrigerators (~15 mK), shorter coherence times (microseconds), and slight qubit-to-qubit manufacturing variation with limited nearest-neighbor wiring.</li>
          </ul>`,
        },
        {
          label: '(c) 2. Trapped Ion Qubits (IonQ, Quantinuum)',
          html: `<ul>
            <li><strong>How They Work:</strong> Individual charged atoms (such as <span class="math-inline">¹⁷¹Yb⁺</span> or <span class="math-inline">⁴³Ca⁺</span>) are levitated in ultra-high vacuum using oscillating RF electromagnetic Paul traps. Logic states <span class="math-inline">|0⟩, |1⟩</span> live in stable atomic hyperfine energy levels, and focused laser beams couple ions via shared vibrational phonon modes (Mølmer–Sørensen gates).</li>
            <li><strong>Advantages:</strong> Nature-made identical qubits (zero manufacturing defects), exceptionally long coherence times (seconds to minutes), highest 2-qubit gate fidelities (&gt;99.9%), and all-to-all connectivity across an ion chain.</li>
            <li><strong>Limitations:</strong> Slower gate speeds (microseconds–milliseconds), bulky laser optics and vacuum chambers, and scaling challenges when ion chains grow too long.</li>
          </ul>`,
        },
        {
          label: '(d) Conclusion',
          html: `<p>Superconducting circuits excel in speed and chip fabrication, whereas trapped ions lead in qubit uniformity, coherence time, and gate accuracy.</p>`,
        },
      ],
      studySource:
        '3rd unit/5 unit.docx (Sections 6–7) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 3).',
      noDiagramNote:
        '5 unit.docx Sections 6–7 depict the Josephson anharmonic levels and Paul-trap ion chain using ASCII text diagrams.',
      rememberThese: [
        '<strong>Superconducting:</strong> Josephson junction (anharmonic levels), ~15 mK cryo, fast (ns), short coherence (μs)',
        '<strong>Trapped Ions:</strong> RF Paul trap + laser pulses on <span class="math-inline">Yb⁺</span>/<span class="math-inline">Ca⁺</span>, long coherence (s), all-to-all links, slower gates',
      ],
    },
    {
      number: 80,
      question: 'Explain photonic quantum processors.',
      sourceTag: 'Mid 2 · Unit V · Long Q2(a)',
      marks: 5,
      intuition:
        'Instead of trapping chilly electrons or hovering atoms, photonic processors shoot single particles of light through etched silicon waveguides—meaning the chip works right at room temperature and plugs straight into fiber-optic networks.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p><strong>Photonic quantum processors</strong> encode qubits into quantum properties of single photons (or continuous optical squeezed states) and route them through integrated silicon micro-optical circuits without needing cryogenic cooling for the processor chip itself.</p>`,
        },
        {
          label: '(b) Working Components Step by Step',
          html: `<ol>
            <li><strong>Encoding Qubits:</strong> Information is stored in photon <em>polarization</em> (<span class="math-inline">|H⟩, |V⟩</span>), <em>dual-rail path</em> (photon traveling in waveguide A vs. waveguide B), or arrival time-bins.</li>
            <li><strong>Single-Photon Sources:</strong> Integrated nonlinear crystals (<span class="math-inline">SPDC</span>) or quantum dots inject indistinguishable single photons into silicon waveguides.</li>
            <li><strong>Optical Gate Operations:</strong> Integrated <strong>Beam Splitters (BS)</strong> and controllable <strong>Phase Shifters (PS)</strong> apply arbitrary single-qubit unitary rotations and multi-photon interference. Because photons do not naturally collide with each other, two-qubit entangling gates use <strong>measurement-induced nonlinearity</strong> (such as the KLM protocol or Measurement-Based Quantum Computing on cluster states).</li>
            <li><strong>Detection:</strong> Superconducting Nanowire Single-Photon Detectors (<strong>SNSPDs</strong>) read output photon paths with &gt;90% efficiency.</li>
          </ol>`,
        },
        {
          label: '(c) Processor Signal Flow',
          html: `<div class="math-block">[Single-Photon Source] → [Phase Shifter (φ)] → [Beam Splitter (Interference)] → [SNSPD Detectors]</div>`,
        },
        {
          label: '(d) Advantages & Limitations',
          html: `<ul>
            <li><strong>Advantages:</strong> Chip operates at <strong>room temperature</strong> (avoiding massive dilution refrigerators for the processor), negligible thermal decoherence, and direct compatibility with optical fiber QKD/quantum networks.</li>
            <li><strong>Limitations:</strong> Photon absorption loss in waveguides/switches, probabilistic two-qubit entangling operations requiring heavy multiplexing, and SNSPD detectors still requiring ~1–4 K cooling.</li>
          </ul>`,
        },
        {
          label: '(e) Conclusion',
          html: `<p>Photonic processors replace cryogenic solid-state qubits with room-temperature integrated optical interference, making them uniquely suited for distributed and networked quantum computing.</p>`,
        },
      ],
      studySource:
        '3rd unit/5 unit.docx (Section 8) & 5 unit qst/5 unit qst 2 full.pptx (slide 10).',
      noDiagramNote:
        '5 unit.docx Section 8 and 5 unit qst 2 full.pptx slide 10 present photonic circuits in text/bullet layout with no separate image file.',
      rememberThese: [
        'Qubit encoding: polarization, dual-rail waveguide path, or time-bin',
        'Components: Single-photon source + Phase Shifters + Beam Splitters + SNSPD detectors',
        'Biggest strength: Room-temperature processor + native telecom fiber compatibility; Biggest challenge: photon loss & probabilistic 2-qubit gates',
      ],
    },
    {
      number: 81,
      question:
        'Compare photonic processors with superconducting and trapped ion platforms.',
      sourceTag: 'Mid 2 · Unit V · Long Q6(b)',
      marks: 5,
      intuition:
        'Each qubit platform trades off temperature, speed, and wiring: superconducting chips are fast but freezing; trapped ions are ultra-accurate but slower; photonic chips run warm on fiber-friendly light but fight photon loss.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>Choosing a physical qubit platform involves balancing coherence time, gate speed, operating temperature, connectivity, and manufacturability across <strong>photonic</strong>, <strong>superconducting</strong>, and <strong>trapped ion</strong> architectures.</p>`,
        },
        {
          label: '(b) Comprehensive Platform Comparison Table',
          html: `<table class="q-table">
            <thead><tr><th>Criterion</th><th>Photonic Processors</th><th>Superconducting Qubits</th><th>Trapped Ion Qubits</th></tr></thead>
            <tbody>
              <tr><td><strong>Physical Carrier</strong></td><td>Single photons (polarization / waveguide path)</td><td>Anharmonic LC + Josephson junction circuits</td><td>Charged atoms (<span class="math-inline">Yb⁺, Ca⁺</span>) in vacuum RF traps</td></tr>
              <tr><td><strong>Control Hardware</strong></td><td>Integrated silicon waveguides, beam splitters, phase shifters</td><td>Microwave pulses on microchip resonators</td><td>Precision focused lasers coupling phonon modes</td></tr>
              <tr><td><strong>Operating Temperature</strong></td><td><strong>Room temperature</strong> processor (only SNSPDs cooled)</td><td>Deep cryogenic (&lt; 15 mK dilution fridge)</td><td>Room/cryo vacuum chamber + laser trapping</td></tr>
              <tr><td><strong>Coherence Time</strong></td><td>Negligible thermal decoherence (limited by photon loss)</td><td>Short (~10–300 μs)</td><td><strong>Longest</strong> (seconds to hours)</td></tr>
              <tr><td><strong>Gate Speed</strong></td><td>Very fast (picosecond optical transit)</td><td><strong>Fastest programmable gates</strong> (tens of ns)</td><td>Slower (microseconds to milliseconds)</td></tr>
              <tr><td><strong>Connectivity</strong></td><td>Flexible optical routing & telecom fiber native</td><td>2D nearest-neighbor grid only</td><td><strong>All-to-all</strong> within an ion chain</td></tr>
              <tr><td><strong>Key Limitation</strong></td><td>Photon loss & probabilistic multi-qubit gates</td><td>Cryo cooling overhead & fabrication variance</td><td>Slow gates & scaling large multi-zone traps</td></tr>
              <tr><td><strong>Key Players</strong></td><td>PsiQuantum, Xanadu</td><td>IBM Quantum, Google Quantum AI</td><td>IonQ, Quantinuum</td></tr>
            </tbody>
          </table>`,
        },
        {
          label: '(c) Synthesis & Trade-Off Analysis',
          html: `<p>Photonic systems uniquely avoid thermal decoherence and plug straight into quantum communication links, whereas superconducting systems scale well with CMOS-like chip fabrication and trapped ions provide the cleanest two-qubit fidelities (&gt;99.9%).</p>`,
        },
        {
          label: '(d) Conclusion',
          html: `<p>No single platform wins every metric yet: superconducting dominates near-term fast processors, trapped ions lead in fidelity, and photonics leads for room-temperature networked systems.</p>`,
        },
      ],
      studySource:
        '3rd unit/5 unit.docx (Sections 6–8) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 3).',
      noDiagramNote:
        'Compiled from Sections 6–8 of 3rd unit/5 unit.docx and Study Guide.pdf; notes contain no comparative chart image.',
      rememberThese: [
        '<strong>Photonic:</strong> Room-temp chip, zero thermal noise, fiber-compatible, suffers photon loss',
        '<strong>Superconducting:</strong> Fastest gates (ns), chip lithography, needs &lt;15 mK dilution fridge',
        '<strong>Trapped Ion:</strong> Highest fidelity & longest coherence (s), all-to-all links, slower laser gates',
      ],
    },
  ],
};
