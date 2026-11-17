window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 15,
  "part": "E",
  "partTitle": "Quantum technologies and applications",
  "title": "Quantum sensing and metrology",
  "subtitle": "Using quantum coherence and interference to measure fields, gravity and time.",
  "questions": [
    {
      "number": 66,
      "question": "What is a quantum sensor?",
      "sourceTag": "Mid 2 · Unit V · Short Q1",
      "marks": 2,
      "intuition": "Because quantum states like superposition and spin energy levels react sharply to tiny changes in their surroundings, a quantum sensor uses atoms, photons, or defects as ultra-sensitive probes beyond classical limits.",
      "sections": [
        {
          "html": "<p>A <strong>quantum sensor</strong> is a high-precision measurement device that exploits quantum phenomena—such as <strong>superposition</strong>, <strong>entanglement</strong>, <strong>quantum interference</strong>, and discrete atomic energy levels—to measure physical quantities like magnetic fields, gravity, acceleration, or time far more accurately than classical sensors. Examples include atomic magnetometers, cold-atom gravimeters, atomic clocks, and diamond NV centers.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 1), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 1) & 5 unit qst/5 unit qst 2 full.pptx.",
      "noDiagramNote": "Unit V notes (5 unit.docx and Study Guide.pdf) illustrate sensors using text schematics; only NV center has a figure (see Q77).",
      "rememberThese": [
        "Uses superposition, entanglement, or discrete atomic transitions to measure physical fields",
        "Reaches sensitivity near the Standard Quantum Limit / Heisenberg limit",
        "Examples: Magnetometers, Gravimeters, Atomic Clocks, Diamond NV centers"
      ]
    },
    {
      "number": 67,
      "question": "What is gravimetry?",
      "sourceTag": "Mid 2 · Unit V · Short Q2",
      "marks": 2,
      "intuition": "Heavy rock or empty underground tunnels change Earth’s local pull of gravity slightly; quantum gravimetry drops laser-cooled atoms and uses their matter waves like an ultra-fine ruler to measure that tiny tug.",
      "sections": [
        {
          "html": "<p><strong>Gravimetry</strong> is the precise measurement of local gravitational acceleration (<span class=\"math-inline\">g</span>) and subtle spatial variations in Earth’s gravitational field. In <strong>quantum gravimetry</strong>, laser-cooled clouds of atoms are dropped in vacuum and split via atom interferometry into two height paths whose quantum phase difference reveals micro-Gal gravity shifts caused by underground tunnels, magma chambers, groundwater, or mineral/oil deposits.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 1), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 1) & 5 unit qst/5 unit qst 2 full.pptx.",
      "noDiagramNote": "Unit V notes describe quantum gravimetry via cold-atom interferometry text without a separate image.",
      "rememberThese": [
        "Measures tiny variations in local gravity <span class=\"math-inline\">g</span>",
        "Quantum gravimeters use <strong>cold-atom interferometry</strong> (de Broglie matter waves)",
        "Uses: detecting underground voids, oil/minerals, volcanic activity, GPS-free navigation"
      ]
    },
    {
      "number": 68,
      "question": "What are quantum sensors? Explain magnetometry and gravimetry with their applications.",
      "sourceTag": "Mid 2 · Unit V · Long Q4(a)",
      "marks": 5,
      "intuition": "If an ordinary compass needs strong iron magnets to wiggle, a quantum magnetometer listens to single electron/atomic spins shifting energy under picotesla fields, while a quantum gravimeter weighs underground rock using falling atomic matter waves.",
      "sections": [
        {
          "label": "(a) Core Idea: Quantum Sensors",
          "html": "<p><strong>Quantum sensors</strong> exploit the extreme sensitivity of quantum systems—coherent superposition, entanglement, quantum interference, and quantized energy transitions—to detect physical quantities (magnetic fields, gravity, rotation, time) at precision levels unreachable classically.</p>"
        },
        {
          "label": "(b) Quantum Magnetometry Explained",
          "html": "<ol>\n            <li><strong>Principle:</strong> Measures ultra-weak magnetic fields (<span class=\"math-inline\">B</span>) via Zeeman energy splitting of atomic spins (such as rubidium vapor OPTMs, superconducting SQUIDs, or diamond NV centers). Under external field <span class=\"math-inline\">B</span>, spin sub-levels shift in energy by <span class=\"math-inline\">ΔE ∝ γ_e B</span>, measured via Larmor precession or Optically Detected Magnetic Resonance (ODMR).</li>\n            <li><strong>Applications:</strong>\n              <ul>\n                <li><strong>Medical Brain Imaging (MEG):</strong> Non-invasive magnetoencephalography mapping faint femtotesla magnetic fields produced by firing neurons.</li>\n                <li><strong>Defense & Geophysics:</strong> Submarine hull detection underwater and mineral exploration.</li>\n              </ul>\n            </li>\n          </ol>"
        },
        {
          "label": "(c) Quantum Gravimetry Explained",
          "html": "<ol>\n            <li><strong>Principle (Cold-Atom Interferometry):</strong> Laser beams cool Rubidium atoms near microkelvin temperatures inside a vacuum drop chamber and apply a π/2 – π – π/2 Raman laser pulse sequence. Each atom splits into two quantum matter-wave trajectories experiencing slightly different gravitational potentials, creating an interference phase shift <span class=\"math-inline\">Δφ = k_eff · g · T²</span> that measures local <span class=\"math-inline\">g</span> precisely.</li>\n            <li><strong>Applications:</strong>\n              <ul>\n                <li><strong>Subterranean & Civil Mapping:</strong> Locating underground cavities, sinkholes, pipes, oil reservoirs, and groundwater aquifers without digging.</li>\n                <li><strong>Volcano Monitoring & GPS-Free Navigation:</strong> Tracking magma movement and providing drift-free inertial navigation for deep-sea submarines where GPS signals cannot penetrate.</li>\n              </ul>\n            </li>\n          </ol>"
        },
        {
          "label": "(d) Advantages & Limitations",
          "html": "<p>Quantum sensors avoid calibration drift because atomic constants never age, though vibration isolation and vacuum/laser hardware add engineering complexity in field environments.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Quantum magnetometers and gravimeters turn atomic spin shifts and matter-wave interference into high-resolution tools for healthcare, Earth surveying, and autonomous navigation.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 1), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 1) & 5 unit qst/5 unit qst 2 full.pptx.",
      "noDiagramNote": "Unit V Study Guide / 5 unit.docx describe magnetometry and gravimetry in text schematics without standalone images.",
      "rememberThese": [
        "<strong>Magnetometry:</strong> Zeeman spin splitting (<span class=\"math-inline\">Δν ∝ B</span>) → MEG brain scans, submarine detection",
        "<strong>Gravimetry:</strong> Cold-atom interferometry (<span class=\"math-inline\">Δφ = k_eff g T²</span>) → underground cavities, oil/minerals, GPS-free nav",
        "Zero long-term sensor drift because all atoms of an element are identical"
      ]
    },
    {
      "number": 69,
      "question": "What is an atomic clock?",
      "sourceTag": "Mid 2 · Unit V · Short Q3",
      "marks": 2,
      "intuition": "Whereas a wristwatch ticks using a vibrating quartz crystal that wears or warms up, an atomic clock locks onto the universal, unchangeable quantum frequency of electrons jumping between two atomic energy levels.",
      "sections": [
        {
          "html": "<p>An <strong>atomic clock</strong> is an ultra-precise timekeeping device that uses the fixed, immutable microwave or optical resonance frequency of electrons transitioning between two discrete energy states of isolated atoms (such as <strong>Caesium-133</strong> at ~9.19 GHz or optical <strong>Strontium</strong>) as its pendulum. Optical atomic clocks achieve fractional stability better than <span class=\"math-inline\">10⁻¹⁸</span> (losing less than 1 second in 30 billion years), powering GPS, telecom networks, and financial trading.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 2) & 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 1).",
      "noDiagramNote": "Unit V notes describe atomic clocks in text; see Q70 for full working steps and infrastructure uses.",
      "rememberThese": [
        "Pendulum = quantized electron transition frequency between two atomic energy levels",
        "SI second defined by Caesium-133 microwave transition (9,192,631,770 Hz)",
        "Next-gen Strontium optical clocks lose &lt; 1 second in ~30 billion years"
      ]
    },
    {
      "number": 70,
      "question": "What are atomic clocks? Explain how they work and where they are used.",
      "sourceTag": "Mid 2 · Unit V · Long Q4(b)",
      "marks": 5,
      "intuition": "An oscillator shines waves onto isolated atoms and tweaks its own dial until maximum atoms jump energy levels—locking the clock onto nature’s exact unvarying atomic frequency.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p><strong>Atomic clocks</strong> are quantum metrology standards that measure time using the exact quantum frequency <span class=\"math-inline\">ν = ΔE / h</span> emitted or absorbed when atoms transition between two specific hyperfine or optical energy states—free from mechanical wear or thermal drift.</p>"
        },
        {
          "label": "(b) How Atomic Clocks Work Step by Step",
          "html": "<ol>\n            <li><strong>Step 1 (Atomic Preparation):</strong> Cold or vaporized atoms (such as Caesium-133 for microwave clocks, or Strontium/Ytterbium held in an optical lattice for optical clocks) are isolated inside a vacuum chamber.</li>\n            <li><strong>Step 2 (Interrogation / Excitation):</strong> A tunable microwave oscillator or ultra-stable laser applies two separated Ramsey pulses at frequency <span class=\"math-inline\">ν</span> matching the atomic energy gap <span class=\"math-inline\">ΔE = hν</span>.</li>\n            <li><strong>Step 3 (Fluorescence Readout & Feedback Lock):</strong> A detector measures how many atoms jumped to the excited state. A feedback servo loop continuously adjusts the oscillator to stay locked strictly on the peak resonance frequency—driving a counter where exactly <span class=\"math-inline\">9,192,631,770</span> Cs-133 oscillations define 1 SI second.</li>\n          </ol>\n          <div class=\"math-block\">Quantum transition frequency: ν = (E₂ − E₁) / h<br/>Cs-133 (Microwave, ~9.19 GHz) → Drift ~1 ns/day<br/>Sr-87 (Optical laser, ~429 THz) → Drift &lt; 1 second in 30 billion years</div>"
        },
        {
          "label": "(c) Where Atomic Clocks Are Used",
          "html": "<ul>\n            <li><strong>Global Navigation Satellite Systems (GPS / NavIC / Galileo):</strong> Since light travels ~30 cm per nanosecond, nanosecond-accurate satellite atomic clocks enable meter-to-millimeter positioning on Earth.</li>\n            <li><strong>High-Speed Telecommunications (5G/6G) & Power Grids:</strong> Synchronizes data packet timing across optical fiber backbones and electrical grid phase monitoring.</li>\n            <li><strong>Financial Trading & Fundamental Physics:</strong> Timestamps high-frequency financial transactions and tests Einstein’s gravitational time dilation and dark-matter searches.</li>\n          </ul>"
        },
        {
          "label": "(d) Advantages & Conclusion",
          "html": "<p>Because every Caesium or Strontium atom in the universe has identical energy spacing, atomic clocks never drift like quartz crystals and serve as the timing backbone of modern GPS, internet infrastructure, and precision science.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 2), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 1) & 5 unit qst/5 unit qst 2 full.pptx.",
      "noDiagramNote": "Unit V study materials (5 unit.docx, Study Guide.pdf) cover atomic clock physics via equations and text only.",
      "rememberThese": [
        "Working loop: Isolate atoms → Ramsey microwave/laser pulses → Detect transition → Servo locks oscillator frequency",
        "Formula: <span class=\"math-inline\">ΔE = hν</span> (higher optical frequency = much finer time ticks)",
        "Uses: GPS/Galileo navigation, 5G telecom synchronization, high-frequency finance, relativity tests"
      ]
    }
  ]
});
