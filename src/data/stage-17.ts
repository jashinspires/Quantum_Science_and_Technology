import type { StudyStage } from '../types/study';

export const stage17: StudyStage = {
  id: 17,
  part: 'E',
  partTitle: 'Quantum technologies and applications',
  title: 'Quantum materials',
  subtitle:
    'Materials where quantum effects dominate, ending with NV centers, which link back to sensing.',
  questions: [
    {
      number: 73,
      question: 'What is a quantum dot?',
      sourceTag: 'Mid 2 · Unit V · Short Q6',
      marks: 2,
      intuition:
        'Think of a quantum dot as a microscopic "box" (like the infinite potential well in Unit I) shrunk to a few nanometers—just changing the box width shifts the electron energy gap and therefore changes the exact color of light it glows!',
      sections: [
        {
          html: `<p>A <strong>quantum dot (QD)</strong> is a nanoscale semiconductor particle (typically 2–10 nm, such as <span class="math-inline">CdSe</span> or <span class="math-inline">InP</span>) that confines electrons in all three spatial dimensions, replacing continuous energy bands with <strong>discrete atom-like energy levels</strong> (“artificial atoms”). Because its bandgap depends inversely on radius (<span class="math-inline">E_g ∝ 1/R²</span>), tuning dot size controls its emitted light color—used in QLED displays, bio-imaging markers, and single-photon sources.</p>`,
        },
      ],
      studySource:
        '3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2), 5 unit qst/5 unit qst 2 full.pptx (slide 8) & 3rd unit/5 unit.docx (Section 3).',
      noDiagramNote:
        'Described in Unit V text/tables (Study Guide.pdf p.2, 5 unit qst 2 full.pptx s8) without a standalone diagram.',
      rememberThese: [
        '3D quantum confinement → discrete energy levels ("artificial atoms")',
        'Size-tunable bandgap (<span class="math-inline">E_g ∝ 1/R²</span>): smaller dot = bluer light, larger dot = redder light',
        'Uses: QLED screens, cancer bio-tags, single-photon sources, spin qubits',
      ],
    },
    {
      number: 74,
      question: 'What is a topological insulator?',
      sourceTag: 'Mid 2 · Unit V · Short Q7',
      marks: 2,
      intuition:
        'Like an electrical wire coated backwards—its deep interior blocks electricity like glass, yet its outer skin acts as a highway where electron spins glide forward without bouncing backward off impurities.',
      sections: [
        {
          html: `<p>A <strong>topological insulator</strong> (such as <span class="math-inline">Bi₂Se₃</span>) is a quantum material that behaves as an <strong>electrical insulator in its bulk interior</strong> while supporting <strong>highly conductive, topologically protected surface (or edge) states</strong>. Strong spin–orbit coupling creates spin–momentum locking, preventing non-magnetic impurities from backscattering electrons—enabling dissipationless spintronics and fault-tolerant Majorana topological qubits.</p>`,
        },
      ],
      studySource:
        '3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2), 5 unit qst/5 unit qst 2 full.pptx (slide 7) & 3rd unit/5 unit.docx (Section 3).',
      noDiagramNote:
        'Summarized in Study Guide.pdf p.2 table and 5 unit qst 2 full.pptx slide 7 without a separate bitmap image.',
      rememberThese: [
        'Bulk = insulator; Surface/Edge = lossless conductor (e.g., <span class="math-inline">Bi₂Se₃</span>)',
        'Spin–momentum locking protects surface currents from non-magnetic backscattering',
        'Applications: low-heat spintronics and topological quantum computing',
      ],
    },
    {
      number: 75,
      question:
        'Explain topological insulators, graphene and quantum dots with their uses.',
      sourceTag: 'Mid 2 · Unit V · Long Q6(a)',
      marks: 5,
      intuition:
        'These three materials harness quantum confinement, lattice symmetry, and spin–orbit topology to control electrons in ways impossible inside ordinary silicon or copper.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p><strong>Quantum materials</strong> exhibit macroscopic quantum behaviors—confinement, massless Dirac transport, or protected surface currents—providing the physical building blocks for next-generation sensors, photonics, and quantum processors.</p>`,
        },
        {
          label: '(b) The Three Materials & Mechanisms',
          html: `<ol>
            <li><strong>Topological Insulators (e.g., <span class="math-inline">Bi₂Se₃</span>):</strong>
              <ul>
                <li><em>Mechanism:</em> Strong spin–orbit interaction opens an insulating bandgap in the bulk interior while forcing metallic surface states with <strong>spin–momentum locking</strong> (opposite-spin electrons move only in opposite directions).</li>
                <li><em>Property & Uses:</em> Surface currents resist non-magnetic impurity backscattering (almost zero heat loss). Used in ultra-low-power <strong>spintronics</strong> and fault-tolerant <strong>topological qubits</strong> (Majorana zero modes).</li>
              </ul>
            </li>
            <li><strong>Graphene (2D Honeycomb Carbon Sheet):</strong>
              <ul>
                <li><em>Mechanism:</em> A single-atom-thick 2D honeycomb lattice of sp² carbon where electrons obey a linear Dirac dispersion relation <span class="math-inline">E(k) = ℏ v_F |k|</span>, behaving like massless Dirac fermions.</li>
                <li><em>Property & Uses:</em> Extreme electron mobility (<span class="math-inline">~200,000 cm²/Vs</span>), high thermal conductivity, and mechanical strength. Used in <strong>high-speed RF electronics</strong>, flexible <strong>quantum sensors</strong>, and THz photodetectors.</li>
              </ul>
            </li>
            <li><strong>Quantum Dots (e.g., <span class="math-inline">CdSe, InP</span>):</strong>
              <ul>
                <li><em>Mechanism:</em> 3D nanoscale confinement shrinks semiconductor dimensions to nanometers, turning continuous bands into discrete atom-like energy levels whose bandgap scales with radius <span class="math-inline">R</span> (<span class="math-inline">E_g ∝ 1/R²</span>).</li>
                <li><em>Property & Uses:</em> Size-tunable color emission. Used in <strong>QLED displays</strong>, targeted fluorescent <strong>cancer bio-imaging</strong>, <strong>single-photon sources</strong>, and semiconductor spin qubits.</li>
              </ul>
            </li>
          </ol>`,
        },
        {
          label: '(c) Summary Comparison Table',
          html: `<table class="q-table">
            <thead><tr><th>Material</th><th>Quantum Feature</th><th>Primary Applications</th></tr></thead>
            <tbody>
              <tr><td>Topological Insulators</td><td>Insulating bulk + spin-locked surface currents</td><td>Spintronics, topological qubits</td></tr>
              <tr><td>Graphene</td><td>2D Dirac cone (<span class="math-inline">E = ℏv_F|k|</span>), ultra-high mobility</td><td>High-speed RF chips, flexible quantum sensors, THz detectors</td></tr>
              <tr><td>Quantum Dots</td><td>3D confinement (<span class="math-inline">E_g ∝ 1/R²</span>)</td><td>QLED TVs, bio-imaging markers, single-photon sources</td></tr>
            </tbody>
          </table>`,
        },
        {
          label: '(d) Conclusion',
          html: `<p>Topological insulators, graphene, and quantum dots bridge fundamental quantum physics to low-power electronics, ultra-bright displays, biomedical diagnostics, and quantum hardware.</p>`,
        },
      ],
      studySource:
        '3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2), 5 unit qst/5 unit qst 2 full.pptx (slides 7–8) & 3rd unit/5 unit.docx (Section 3).',
      noDiagramNote:
        'Study Guide.pdf page 2 presents these three materials in a structured comparison table (no graphical diagram).',
      rememberThese: [
        '<strong>Topological Insulators:</strong> insulating interior + lossless spin-locked surface',
        '<strong>Graphene:</strong> 2D carbon honeycomb, linear <span class="math-inline">E = ℏv_F|k|</span>, extreme mobility',
        '<strong>Quantum Dots:</strong> 3D confinement, tunable <span class="math-inline">E_g ∝ 1/R²</span> → QLEDs & single-photon sources',
      ],
    },
    {
      number: 76,
      question: 'What is an NV center?',
      sourceTag: 'Mid 2 · Unit V · Short Q5',
      marks: 2,
      intuition:
        'Pluck out two carbon neighbors inside a diamond crystal—fill one hole with a nitrogen atom and leave the other blank—and you trap a tiny quantum electron spin that works as an atomic thermometer and compass at room temperature.',
      sections: [
        {
          html: `<p>A <strong>Nitrogen-Vacancy (NV) center</strong> is an atomic-scale point defect inside a diamond crystal lattice formed when one carbon atom is replaced by a <strong>nitrogen (N) atom</strong> directly adjacent to an empty crystal site (a <strong>vacancy, V</strong>). The negatively charged <span class="math-inline">NV⁻</span> defect acts as an isolated spin-1 quantum system whose spin state can be initialized, manipulated with microwaves, and read out optically at <strong>room temperature</strong> for nanoscale sensing.</p>`,
        },
      ],
      studySource:
        '3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2) & 3rd unit/5 unit.docx (Section 5).',
      noDiagramNote:
        'See Q77 for the NV⁻ energy-level diagram extracted from Study Guide.pdf page 2.',
      rememberThese: [
        'NV = 1 Nitrogen impurity + 1 adjacent empty carbon Vacancy in diamond',
        'Spin-1 ground triplet (<span class="math-inline">m_s = 0, ±1</span>)',
        'Works at <strong>room temperature (300 K)</strong> using 532 nm green laser + 637 nm red fluorescence',
      ],
    },
    {
      number: 77,
      question:
        'What are NV centers in diamond? Explain how they are used for sensing.',
      sourceTag: 'Mid 2 · Unit V · Long Q5(a)',
      marks: 5,
      intuition:
        'A green laser initializes the diamond defect spin, microwaves flip it, and an external magnetic field splits its spin energy levels—causing its red glow to dim cleanly at the shifted microwave frequency.',
      sections: [
        {
          label: '(a) What Are NV Centers in Diamond?',
          html: `<p>A <strong>Nitrogen-Vacancy (NV) center</strong> is a crystal point defect in diamond where a nitrogen atom substitutes a carbon atom right next to a vacant lattice site. Because diamond’s stiff carbon lattice isolates the defect’s trapped electrons (<span class="math-inline">NV⁻</span>, spin-1 triplet ground state <span class="math-inline">m_s = 0, ±1</span>), it maintains long quantum coherence at <strong>room temperature</strong> without cryogenic cooling.</p>`,
        },
        {
          label: '(b) Energy Levels & Sensing Mechanism (ODMR)',
          html: `<ol>
            <li><strong>Step 1 (Optical Initialization):</strong> Shining a <strong>532 nm green laser</strong> excites the electrons into triplet excited state <span class="math-inline">³E</span>; relaxation preferentially populates the bright <span class="math-inline">m_s = 0</span> ground state.</li>
            <li><strong>Step 2 (Zeeman Splitting by External Magnetic Field <span class="math-inline">B</span>):</strong> Without a magnetic field, <span class="math-inline">m_s = ±1</span> sits <span class="math-inline">D ≈ 2.87 GHz</span> above <span class="math-inline">m_s = 0</span>. Applying an external magnetic field <span class="math-inline">B</span> splits <span class="math-inline">m_s = +1</span> and <span class="math-inline">m_s = −1</span> via the <strong>Zeeman effect</strong> by frequency separation:
              <div class="math-block">Δν = 2 γ_e B &nbsp;&nbsp;(where γ_e ≈ 28 GHz/T)</div>
            </li>
            <li><strong>Step 3 (Optically Detected Magnetic Resonance — ODMR):</strong> Sweeping a microwave drive around 2.87 GHz flips spins from <span class="math-inline">m_s = 0</span> into <span class="math-inline">m_s = ±1</span>, which emits dimmer <strong>637 nm red fluorescence</strong>. Measuring the exact microwave frequencies where fluorescence dips directly determines local magnetic field <span class="math-inline">B</span> (and temperature or strain shifts <span class="math-inline">D</span>).</li>
          </ol>`,
          image: {
            file: 'nv_center_energy_diagram.png',
            caption: 'Fig. Energy-level diagram of a diamond NV⁻ center showing 532 nm excitation, 637 nm fluorescence, and Zeeman-shifted m_s = ±1 states',
            source: '3rd unit/Quantum Technologies and Applications Study Guide.pdf · page 2',
            kindLabel: 'PDF diagram crop',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Applications & Advantages',
          html: `<ul>
            <li><strong>Nanoscale Bio-Sensing:</strong> Diamond nanodiamonds are chemically inert and non-toxic, allowing direct insertion inside living cells to measure intracellular temperature and single-molecule magnetic fields.</li>
            <li><strong>Microchip Failure Analysis:</strong> Non-destructive magnetic field mapping of hidden current paths in integrated circuits.</li>
            <li><strong>Key Advantage:</strong> Operates at room temperature (<span class="math-inline">300 K</span>) with nanometer spatial resolution.</li>
          </ul>`,
        },
        {
          label: '(d) Conclusion',
          html: `<p>Diamond NV⁻ centers serve as bio-compatible, room-temperature atomic quantum sensors linking spin physics to nanoscale magnetic and thermal imaging.</p>`,
        },
      ],
      studySource:
        '3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2 diagram & notes) & 3rd unit/5 unit.docx (Section 5).',
      rememberThese: [
        'Structure: Substitutional N atom + adjacent Vacancy in diamond (<span class="math-inline">m_s = 0, ±1</span>)',
        'Green <strong>532 nm</strong> laser pumps spin → Red <strong>637 nm</strong> fluorescence readout',
        'Zero-field splitting ≈ <strong>2.87 GHz</strong>; Zeeman shift <span class="math-inline">Δν = 2γ_e B</span> (<span class="math-inline">γ_e ≈ 28 GHz/T</span>)',
        'Readout method = <strong>ODMR</strong> (Optically Detected Magnetic Resonance) at <strong>room temperature</strong>',
      ],
    },
  ],
};
