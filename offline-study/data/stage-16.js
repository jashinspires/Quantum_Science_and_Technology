window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 16,
  "part": "E",
  "partTitle": "Quantum technologies and applications",
  "title": "Quantum imaging and lithography",
  "subtitle": "Using quantum light to image and to pattern.",
  "questions": [
    {
      "number": 71,
      "question": "What is ghost imaging?",
      "sourceTag": "Mid 2 · Unit V · Short Q4",
      "marks": 2,
      "intuition": "Imagine shining entangled twin photons down two separate paths—the photon hitting the object only hits a blank bucket detector with no camera pixels, yet correlating it with its twin on a separate camera reveals the object’s picture!",
      "sections": [
        {
          "html": "<p><strong>Ghost imaging</strong> is a quantum imaging technique that reconstructs an object’s image using spatially correlated (entangled) photon pairs (<span class=\"math-inline\">SPDC</span>): the <em>object photon</em> hits the target and is collected by a single-pixel “bucket” detector (no spatial resolution), while its entangled twin hits a spatially resolving camera that never interacted with the object. Correlating coincidences forms a high-contrast image under ultra-low light.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 4), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2) & 5 unit qst/5 unit qst 2 full.pptx.",
      "noDiagramNote": "Unit V study materials explain ghost imaging via text without an embedded image.",
      "rememberThese": [
        "Uses entangled photon pairs (object beam + reference camera beam)",
        "Neither detector alone can form the image—correlations reveal it",
        "Key benefit: ultra-low light intensity protects delicate biological cells"
      ]
    },
    {
      "number": 72,
      "question": "Explain quantum imaging and quantum lithography with applications.",
      "sourceTag": "Mid 2 · Unit V · Long Q3(b)",
      "marks": 5,
      "intuition": "Classical lenses blur features smaller than half a light wavelength (the diffraction limit); quantum lithography packs N entangled photons together so they act like a single super-wave with N times shorter wavelength, carving ultra-tiny chip circuits.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p><strong>Quantum imaging</strong> and <strong>quantum lithography</strong> exploit non-classical states of light—entangled photon pairs, squeezed light, and multi-photon NOON states—to see through noise or etch chip patterns smaller than the classical Rayleigh diffraction limit (<span class=\"math-inline\">λ / 2</span>).</p>"
        },
        {
          "label": "Part 1: Quantum Imaging (Ghost Imaging & Low-Light Sensing)",
          "html": "<ol>\n            <li><strong>Mechanism:</strong> A nonlinear crystal (<span class=\"math-inline\">SPDC</span>) splits a pump photon into correlated Signal and Idler photon pairs. One photon passes through the object to a simple single-pixel bucket detector; the other hits an array camera. Coincidence counting rejects stray background light and beats classical shot noise.</li>\n            <li><strong>Applications:</strong>\n              <ul>\n                <li><strong>Biological Microscopy:</strong> Imaging light-sensitive living cells under ultra-low photon doses without phototoxicity.</li>\n                <li><strong>Quantum LiDAR & Obscured Vision:</strong> Seeing through fog, smoke, or turbid water where classical light scatters heavily.</li>\n              </ul>\n            </li>\n          </ol>"
        },
        {
          "label": "Part 2: Quantum Lithography (Sub-Diffraction Chip Patterning)",
          "html": "<ol>\n            <li><strong>Mechanism (NOON States):</strong> Sending an <span class=\"math-inline\">N</span>-photon entangled <strong>NOON state</strong> <span class=\"math-inline\">|ψ⟩ = (|N,0⟩ + |0,N⟩)/√2</span> through an interferometer gives the photons an effective shorter de Broglie wavelength:\n              <div class=\"math-block\">λ_eff = λ / N  ⇒  Minimum fringe spacing = λ / (2N)</div>\n              Because all <span class=\"math-inline\">N</span> photons arrive and absorb simultaneously on the photoresist, feature sizes shrink by factor <span class=\"math-inline\">1/N</span> beyond classical optics.</li>\n            <li><strong>Applications:</strong> Etching ultra-dense sub-wavelength nanoscale semiconductor circuits on silicon wafers for next-generation microprocessors.</li>\n          </ol>"
        },
        {
          "label": "(d) Advantages & Engineering Challenge",
          "html": "<p>Provides sub-diffraction feature resolution and sub-shot-noise contrast, though generating high-flux <span class=\"math-inline\">N</span>-photon NOON states and N-photon-sensitive photoresists remains experimentally challenging.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Quantum imaging enables stealthy low-dose vision in biology and defense, while quantum lithography pushes semiconductor patterning past classical wavelength limits.</p>"
        }
      ],
      "studySource": "3rd unit/5 unit.docx (Section 4), 3rd unit/Quantum Technologies and Applications Study Guide.pdf (page 2) & 5 unit qst/5 unit qst 2 full.pptx.",
      "noDiagramNote": "Unit V 5 unit.docx and Study Guide.pdf describe SPDC ghost imaging and NOON-state lithography using ASCII flow diagrams rather than bitmap images.",
      "rememberThese": [
        "<strong>Quantum imaging:</strong> entangled photons + coincidence detection (low-light bio & quantum radar)",
        "<strong>Quantum lithography:</strong> <span class=\"math-inline\">N</span>-photon NOON state gives <span class=\"math-inline\">λ_eff = λ/N</span> (beats Rayleigh limit)",
        "Fringe resolution improves to <span class=\"math-inline\">λ / (2N)</span>"
      ]
    }
  ]
});
