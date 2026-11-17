import type { StudyStage } from '../types/study';

export const stage01: StudyStage = {
  id: 1,
  part: 'A',
  partTitle: 'Foundations (Unit I)',
  title: 'Why classical physics wasn’t enough',
  subtitle:
    'Light behaves like particles, then matter behaves like waves. Everything after this grows from that surprise.',
  questions: [
    {
      number: 1,
      question: 'What is photo voltaic effect? Explain.',
      sourceTag: 'Mid 1 · Unit I · Q1',
      marks: 5,
      intuition:
        'Incoming light packets (photons) hand their energy directly to electrons in a material—in photovoltaic cells this separated charge creates a steady voltage, whereas in the closely related photoelectric effect it ejects electrons from a metal surface.',
      usesTextbookSupplement: true,
      sections: [
        {
          label: '(a) Core Idea (Photovoltaic & Photoelectric Connection)',
          html: `<p>The <strong>photovoltaic effect</strong> is the generation of an electric voltage and current in a semiconductor device (such as a solar cell) when it absorbs light photons. It is closely related to the <strong>photoelectric effect</strong>, in which absorbed photons eject electrons from a metal surface rather than keeping them inside an internal junction circuit.</p>`,
        },
        {
          label: '(b) Step-by-Step Mechanism',
          html: `<p>In a photovoltaic p–n junction: (1) Photons with energy <span class="math-inline">E = hf</span> greater than or equal to the semiconductor band gap strike the junction. (2) Each absorbed photon excites an electron from the valence band to the conduction band, creating an electron–hole pair. (3) The built-in electric field across the depletion region separates electrons toward the n-side and holes toward the p-side, establishing a DC voltage across the external terminals.</p>
          <p><strong>Photoelectric Effect Basis:</strong> Classical wave theory wrongly predicted that bright low-frequency light would gradually heat electrons until they escaped. Experimentally, electron emission is <em>instantaneous</em> only above a threshold frequency <span class="math-inline">ν₀ = Φ/h</span>, and maximum kinetic energy depends strictly on frequency rather than light intensity. Einstein (1905) explained this by modeling light as discrete photon packets of energy <span class="math-inline">E = hν</span>.</p>`,
        },
        {
          label: '(c) Equations & Diagram',
          html: `<div class="math-block">Photon energy: E = hν = hf &nbsp;&nbsp;(h = 6.626 × 10⁻³⁴ J·s)<br/>Einstein photoelectric equation: KE_max = hf − Φ<br/>Photovoltaic excitation condition: hf ≥ E_g &nbsp;(band gap energy)</div>`,
          image: {
            file: 'photoelectric_diagram.png',
            caption: 'Fig. Photoelectric emission above threshold work function W and linear plot of kinetic energy K versus frequency ν',
            source: '1unit qst/1unit history.pptx · slide 22 (also in 4 Photoelectric effect.docx)',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Worked Example',
          html: `<p>If ultraviolet light with photon energy <span class="math-inline">hf = 5.0 eV</span> strikes a metal of work function <span class="math-inline">Φ = 2.3 eV</span>, each ejected electron leaves with <span class="math-inline">KE_max = 5.0 − 2.3 = 2.7 eV</span>. If <span class="math-inline">hf &lt; Φ</span>, zero electrons escape regardless of light intensity.</p>`,
        },
        {
          label: '(e) Uses & Significance',
          html: `<p>Photovoltaic cells power solar panels, satellites, and photodetectors; the underlying photon quantization law (<span class="math-inline">E = hν</span>) launched quantum mechanics.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>Both effects prove that light interacts with matter in discrete energy quanta called photons, converting optical energy directly into electrical energy.</p>`,
        },
      ],
      studySource: '1unit qst/4 Photoelectric effect.docx & 1unit qst/1unit history.pptx (slide 22) cover the photoelectric effect and diagram; p–n junction photovoltaic effect details supplemented from standard semiconductor/textbook physics.',
      rememberThese: [
        'Photon energy: <span class="math-inline">E = hν = hf</span>, where <span class="math-inline">h = 6.626 × 10⁻³⁴ J·s</span>',
        'Einstein photoelectric equation: <span class="math-inline">KE_max = hf − Φ</span>',
        'Threshold frequency: <span class="math-inline">ν₀ = Φ / h</span> (no emission below <span class="math-inline">ν₀</span>)',
        'Photovoltaic effect: electron–hole pairs separated by a p–n junction generate voltage',
      ],
    },
    {
      number: '1a',
      question: 'Ultraviolet catastrophe',
      sourceTag: 'Added from attached PDF · Unit I · Q1',
      marks: 2,
      intuition:
        'Classical physics assumed hot glowing objects could pour unlimited energy into tiny ultraviolet wavelengths, which experiment proved completely false.',
      usesTextbookSupplement: true,
      sections: [
        {
          html: `<p>The <strong>ultraviolet catastrophe</strong> is the failure of classical Rayleigh–Jeans radiation theory, which predicted that an ideal blackbody emits infinite energy density at short wavelengths (high frequencies). Experimentally, radiated intensity drops smoothly to zero in the ultraviolet region. Max Planck resolved this in 1900 by quantizing energy exchange into discrete packets <span class="math-inline">E = nhν</span>.</p>`,
        },
      ],
      studySource:
        '1unit qst/3 black body radiation.docx (blackbody quanta) & attached PDF (Unit I · Short Q1); Rayleigh–Jeans classical divergence terminology supplemented from standard quantum physics.',
      noDiagramNote:
        '1unit qst/3 black body radiation.docx explains blackbody radiation and Planck quanta via text without a blackbody curve diagram.',
      rememberThese: [
        'Classical Rayleigh–Jeans law diverges (<span class="math-inline">u(ν) ∝ ν²</span>) at high frequency',
        'Resolved by Planck’s quantization hypothesis: <span class="math-inline">E = nhν</span>',
      ],
    },
    {
      number: '1b',
      question: 'Work function',
      sourceTag: 'Added from attached PDF · Unit I · Q2',
      marks: 2,
      intuition:
        'Electrons inside a metal sit in a binding energy pit; the work function is the minimum toll an incoming photon must pay to lift one electron free.',
      sections: [
        {
          html: `<p>The <strong>work function (<span class="math-inline">φ</span> or <span class="math-inline">Φ</span>)</strong> is the minimum energy required to liberate an electron from the surface of a metal with zero excess kinetic energy. It equals <span class="math-inline">φ = hν₀</span>, where <span class="math-inline">ν₀</span> is the threshold frequency in Einstein’s photoelectric equation <span class="math-inline">hν = φ + KE_max</span>.</p>`,
        },
      ],
      studySource:
        '1unit qst/4 Photoelectric effect.docx, 1unit qst/1unit history.pptx (slide 22), & attached PDF (Unit I · Short Q2).',
      noDiagramNote:
        'Concise 2-mark definition; see Q1 for the photoelectric threshold plot.',
      rememberThese: [
        'Formula: <span class="math-inline">φ = hν₀</span> (<span class="math-inline">h = 6.626 × 10⁻³⁴ J·s</span>)',
        'No photoemission occurs when photon energy <span class="math-inline">hν &lt; φ</span>',
      ],
    },
    {
      number: '1c',
      question: 'Compton wavelength',
      sourceTag: 'Added from attached PDF · Unit I · Q3',
      marks: 2,
      intuition:
        'When an X-ray photon bounces off a stationary electron like a billiard ball, the photon’s wavelength stretches by a fixed universal length scale set by the electron mass.',
      sections: [
        {
          html: `<p>The <strong>Compton wavelength (<span class="math-inline">λ_C</span>)</strong> is the characteristic constant <span class="math-inline">λ_C = h / (m₀c) = 2.43 × 10⁻¹² m</span> appearing in the Compton wavelength shift <span class="math-inline">Δλ = λ′ − λ = λ_C(1 − cos θ)</span> when a photon scatters off a stationary electron of rest mass <span class="math-inline">m₀</span>. It equals the shift observed at a 90° scattering angle.</p>`,
        },
      ],
      studySource: '1unit qst/5 crompton scattering.docx & attached PDF (Unit I · Short Q3).',
      noDiagramNote:
        '1unit qst/5 crompton scattering.docx states the Compton shift formula in text without a separate saved schematic.',
      rememberThese: [
        '<span class="math-inline">λ_C = h / (m₀c) ≈ 2.43 × 10⁻¹² m = 0.0243 Å</span>',
        'Scattering shift: <span class="math-inline">Δλ = (h / m₀c)(1 − cos θ)</span> (max <span class="math-inline">2λ_C</span> at 180°)',
      ],
    },
    {
      number: 2,
      question: 'Write the principle of dual nature of light and matter.',
      sourceTag: 'Mid 1 · Unit I · Q7',
      marks: 2,
      intuition:
        'Nothing in nature is purely a solid marble or purely an endless ripple—depending on how we measure it, light and matter reveal either wave interference or particle impacts.',
      sections: [
        {
          html: `<p>The principle of <strong>wave–particle duality</strong> states that both electromagnetic radiation (light) and material particles (electrons, protons, atoms) exhibit wave-like properties during propagation—such as interference and diffraction—and particle-like properties during energy/momentum exchange—such as the photoelectric effect and Compton scattering. Louis de Broglie (1924) unified both via <span class="math-inline">λ = h / p = h / (mv)</span>.</p>`,
          image: {
            file: 'de_broglie_formula.png',
            caption: 'Fig. de Broglie relation connecting wavelength λ to particle momentum p = mv',
            source: '1unit qst/6 dual nature of light and matter.docx · rId6 (and 3 black body radiation.docx · rId9)',
            placement: 'inline-bottom',
          },
        },
      ],
      studySource: '1unit qst/6 dual nature of light and matter.docx & 1unit qst/3 black body radiation.docx.',
      rememberThese: [
        'Wave behavior: interference, diffraction, polarization',
        'Particle behavior: photoelectric effect, Compton scattering',
        'de Broglie relation: <span class="math-inline">λ = h / p = h / (mv)</span>',
      ],
    },
    {
      number: 3,
      question: 'Write about De Broglie hypothesis of dual nature of light and matter.',
      sourceTag: 'Mid 1 · Unit I · Q2',
      marks: 5,
      intuition:
        'If light waves (photons) can act like particles with momentum, nature’s symmetry suggests moving particles of matter must also carry an associated wavelength.',
      sections: [
        {
          label: '(a) Core Idea',
          html: `<p>In 1924, Louis de Broglie proposed that wave–particle duality is universal: every moving material particle (such as an electron or proton) possesses an associated matter wave whose wavelength is inversely proportional to its momentum.</p>`,
        },
        {
          label: '(b) Step-by-Step Explanation & Derivation',
          html: `<ol>
            <li><strong>Light as waves and particles:</strong> Light propagates as a continuous wave (showing interference, diffraction, and polarization) yet interacts with matter as discrete photons (<span class="math-inline">E = hν</span>, <span class="math-inline">p = h/λ</span>) in the photoelectric effect and Compton scattering.</li>
            <li><strong>Extension to matter:</strong> Equating Einstein’s photon energy relation <span class="math-inline">E = mc²</span> with Planck’s quantum relation <span class="math-inline">E = hν = hc/λ</span> gives momentum <span class="math-inline">p = h/λ</span>.</li>
            <li><strong>Matter wavelength:</strong> Applying this to any particle of mass <span class="math-inline">m</span> moving with speed <span class="math-inline">v</span> yields the de Broglie wavelength <span class="math-inline">λ = h / (mv)</span>.</li>
          </ol>`,
          image: {
            file: 'wave_particle_duality.jpg',
            caption: 'Fig. 1: Wave–particle duality showing wave interference alongside photon and electron interactions',
            source: '1unit qst/6 dual nature of light and matter.docx · rId5',
            placement: 'inline-mid',
          },
        },
        {
          label: '(c) Mathematical Formulas',
          html: `<div class="math-block">de Broglie wavelength: λ = h / p = h / (mv)<br/>For an electron accelerated through potential V (K = eV): λ = h / √(2 m_e e V) ≈ 1.227 / √V nm</div>`,
          image: {
            file: 'de_broglie_electron.png',
            caption: 'Fig. 2: Simplified de Broglie wavelength formula for an electron accelerated through potential V',
            source: '1unit qst/6 dual nature of light and matter.docx · rId7',
            placement: 'inline-mid',
          },
        },
        {
          label: '(d) Worked Example (Double-Slit Electron Experiment)',
          html: `<p>When electrons pass through a double slit, each electron hits the detector screen at one localized spot (particle property), yet over many electrons the hits build up bright and dark interference fringes (wave property). For an electron accelerated through <span class="math-inline">V = 100 V</span>, <span class="math-inline">λ ≈ 1.227 / √100 = 0.1227 nm</span>—comparable to atomic spacings in crystals.</p>`,
        },
        {
          label: '(e) Why Macroscopic Objects Don’t Show Waves & Applications',
          html: `<p>Because <span class="math-inline">h = 6.626 × 10⁻³⁴ J·s</span> is tiny, heavy objects like a baseball have an unobservably small wavelength, whereas light electrons show strong diffraction. This enables <strong>electron microscopes</strong> with atomic-scale resolution and underpins Schrödinger’s wave equation.</p>`,
        },
        {
          label: '(f) Conclusion',
          html: `<p>De Broglie’s hypothesis unified radiation and matter under a single wave–particle framework, forming the foundation of modern wave mechanics.</p>`,
        },
      ],
      studySource: '1unit qst/6 dual nature of light and matter.docx & 1unit qst/3 black body radiation.docx.',
      rememberThese: [
        'Proposed by Louis de Broglie in 1924',
        '<span class="math-inline">λ = h / p = h / (mv)</span>',
        'Electron under voltage <span class="math-inline">V</span>: <span class="math-inline">λ ≈ 1.227 / √V nm</span>',
        'Double-slit experiment confirms both localized hits and interference pattern',
      ],
    },
    {
      number: '3a',
      question: 'de Broglie wavelength',
      sourceTag: 'Added from attached PDF · Unit I · Q4',
      marks: 2,
      intuition:
        'Every moving particle carries a matter-wave rhythm whose wavelength shrinks as the particle’s momentum or accelerating voltage grows.',
      sections: [
        {
          html: `<p>The <strong>de Broglie wavelength</strong> is the matter wavelength associated with any moving particle of momentum <span class="math-inline">p = mv</span>, given by <span class="math-inline">λ = h / p = h / (mv)</span>, where <span class="math-inline">h</span> is Planck’s constant. For an electron accelerated through potential <span class="math-inline">V</span> (kinetic energy <span class="math-inline">eV</span>), <span class="math-inline">λ = h / √(2m_e eV) ≈ 1.226 / √V nm</span> (often rounded as <span class="math-inline">1.227 / √V nm</span>).</p>`,
        },
      ],
      studySource:
        '1unit qst/6 dual nature of light and matter.docx & attached PDF (Unit I · Short Q4).',
      noDiagramNote:
        'Concise 2-mark formula card; see Q2 and Q3 for the de Broglie formula graphics and Davisson–Germer context.',
      rememberThese: [
        'General matter wave: <span class="math-inline">λ = h / p = h / (mv)</span>',
        'Accelerated electron: <span class="math-inline">λ = h / √(2m_e eV) ≈ 1.226 / √V nm</span>',
      ],
    },
  ],
};
