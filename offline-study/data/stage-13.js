window.QST_STAGES = window.QST_STAGES || [];
window.QST_STAGES.push({
  "id": 13,
  "part": "D",
  "partTitle": "Quantum communication",
  "title": "Quantum cryptography and QKD",
  "subtitle": "BB84 first, then how an eavesdropper gets caught, then the entanglement-based version (E91).",
  "questions": [
    {
      "number": 47,
      "question": "What is quantum cryptography?",
      "sourceTag": "Mid 2 · Unit IV · Short Q1",
      "marks": 2,
      "intuition": "Instead of relying on hard math puzzles that faster computers might crack tomorrow, quantum cryptography locks secrets behind unbreakable laws of physics like measurement collapse and no-cloning.",
      "sections": [
        {
          "html": "<p><strong>Quantum cryptography</strong> uses fundamental laws of quantum mechanics—such as Heisenberg’s uncertainty principle, measurement collapse, entanglement, and the <strong>no-cloning theorem</strong>—to perform secure cryptographic tasks. Its most prominent application is <strong>Quantum Key Distribution (QKD)</strong>, which lets two parties share a secret cryptographic key where any eavesdropping attempt disturbs the quantum states and reveals the spy.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 1–6, 12–13).",
      "noDiagramNote": "See Q50 for BB84 quantum communication diagrams from 4 unit qst/qkd.pptx.",
      "rememberThese": [
        "Security rests on laws of quantum physics (not assumed math hardness)",
        "Key laws: No-cloning theorem + Measurement disturbance",
        "Main application: QKD (BB84, E91) paired with a One-Time Pad"
      ]
    },
    {
      "number": 48,
      "question": "What is quantum key distribution (QKD)?",
      "sourceTag": "Mid 2 · Unit IV · Short Q2",
      "marks": 2,
      "intuition": "QKD doesn’t send the secret message inside photons—it uses photons to grow a shared, completely random secret key between Alice and Bob that alerts them if anyone listened in.",
      "sections": [
        {
          "html": "<p><strong>Quantum Key Distribution (QKD)</strong> is a secure communication method that uses quantum states (typically single photons sent over optical fiber or free space) plus a public classical channel to establish a shared secret random bitstring key between Alice and Bob. Because an eavesdropper cannot copy unknown qubits (no-cloning) or measure them without disturbing non-orthogonal states, Alice and Bob can detect interception before using the key (for example in a one-time pad).</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 6–13).",
      "noDiagramNote": "Step-by-step BB84 tables from 4 unit qst/qkd.pptx are displayed in Q50.",
      "rememberThese": [
        "Generates a shared secret key (not the encrypted message itself)",
        "Uses two channels: Quantum channel (photons) + Authenticated classical channel (basis sifting)",
        "Protocols: BB84 (prepare-and-measure) and E91 (entanglement-based)"
      ]
    },
    {
      "number": 49,
      "question": "Name the two bases used in the BB84 protocol.",
      "sourceTag": "Mid 2 · Unit IV · Short Q3",
      "marks": 2,
      "intuition": "Alice and Bob need two incompatible \"rulers\" (bases) so that an eavesdropper guessing the wrong ruler gets random garbage and leaves tracks.",
      "sections": [
        {
          "html": "<p>The two mutually unbiased bases used in BB84 are:</p>\n          <ol>\n            <li><strong>Z basis (Computational / Rectilinear “+” basis):</strong> encodes bit <span class=\"math-inline\">0 → |0⟩</span> (horizontal 0°) and bit <span class=\"math-inline\">1 → |1⟩</span> (vertical 90°).</li>\n            <li><strong>X basis (Hadamard / Diagonal “×” basis):</strong> encodes bit <span class=\"math-inline\">0 → |+⟩ = (|0⟩+|1⟩)/√2</span> (45°) and bit <span class=\"math-inline\">1 → |−⟩ = (|0⟩−|1⟩)/√2</span> (135°).</li>\n          </ol>",
          "image": {
            "file": "bb84_bases_table.png",
            "caption": "Fig. BB84 encoding table showing Z basis (|0⟩, |1⟩) and X basis (|+⟩, |−⟩)",
            "source": "4 unit qst/qkd.pptx · slide 7",
            "placement": "inline-bottom"
          }
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slide 7).",
      "rememberThese": [
        "<strong>Z basis (Rectilinear):</strong> <span class=\"math-inline\">|0⟩</span> (0) and <span class=\"math-inline\">|1⟩</span> (1)",
        "<strong>X basis (Diagonal/Hadamard):</strong> <span class=\"math-inline\">|+⟩</span> (0) and <span class=\"math-inline\">|−⟩</span> (1)",
        "Measuring an X-basis state in Z-basis (or vice versa) gives random 50/50 outcome"
      ]
    },
    {
      "number": 50,
      "question": "Explain the BB84 protocol with an example.",
      "sourceTag": "Mid 2 · Unit IV · Long Q1(a)",
      "marks": 5,
      "intuition": "Alice sends each random bit using a randomly chosen Z or X encoding; Bob guesses a Z or X decoder at random; afterward they announce only their basis choices publicly, keep the ~50% that matched, and spot-check a sample to make sure Eve wasn’t listening.",
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Proposed by Charles Bennett and Gilles Brassard in 1984, <strong>BB84</strong> is the first prepare-and-measure QKD protocol. It lets Alice and Bob generate an unconditionally secure shared key by transmitting single qubits encoded randomly in two incompatible bases (<span class=\"math-inline\">Z</span> and <span class=\"math-inline\">X</span>).</p>"
        },
        {
          "label": "(b) Encoding Convention & 4 Protocol Steps",
          "html": "<p>Agreement: in the <strong>Z basis</strong>, <span class=\"math-inline\">|0⟩ = 0</span>, <span class=\"math-inline\">|1⟩ = 1</span>; in the <strong>X basis</strong>, <span class=\"math-inline\">|+⟩ = 0</span>, <span class=\"math-inline\">|−⟩ = 1</span>.</p>\n          <ol>\n            <li><strong>Step 1 (Alice prepares qubits):</strong> Alice generates random bits and chooses a random basis (<span class=\"math-inline\">Z</span> or <span class=\"math-inline\">X</span>) for each bit, sending the resulting photon states (<span class=\"math-inline\">|0⟩, |1⟩, |+⟩, |−⟩</span>) over the quantum channel.</li>\n            <li><strong>Step 2 (Bob measures in random bases):</strong> Without knowing Alice’s basis choices, Bob independently picks <span class=\"math-inline\">Z</span> or <span class=\"math-inline\">X</span> to measure each incoming photon. Whenever Bob’s basis matches Alice’s, he gets Alice’s exact bit with 100% certainty; when it differs, he gets a random 0 or 1.</li>\n            <li><strong>Step 3 (Public Basis Discussion / Sifting):</strong> Over a public classical channel, Alice and Bob announce <em>which basis</em> they used (never the bit values). They discard mismatched positions and keep only the matched-basis bits (the <strong>sifted key</strong>).</li>\n            <li><strong>Step 4 (Verification & One-Time Pad):</strong> They publicly compare a random subset of their sifted key. If bit disagreements exceed tiny channel noise (e.g. ~25% QBER under intercept-resend), Eve is detected and they abort; otherwise they discard the checked subset and use the remaining key for a one-time pad.</li>\n          </ol>",
          "image": {
            "file": "bb84_worked_example.png",
            "caption": "Fig. BB84 transmission table showing Alice’s bits, bases, and states against Bob’s random bases and measurements",
            "source": "4 unit qst/qkd.pptx · slide 9",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Worked Example",
          "html": "<p>Consider the 9-bit transmission sequence shown in the table above:</p>\n          <ul>\n            <li>Alice’s bits: <span class=\"math-inline\">0, 1, 0, 0, 1, 1, 0, 1, 0</span> with bases <span class=\"math-inline\">X, X, Z, Z, Z, X, Z, Z, X</span> → states <span class=\"math-inline\">|+⟩, |−⟩, |0⟩, |0⟩, |1⟩, |−⟩, |0⟩, |1⟩, |+⟩</span>.</li>\n            <li>Bob’s bases: <span class=\"math-inline\">X, Z, X, Z, X, X, Z, X, X</span>.</li>\n            <li><strong>Matched positions (sifted key):</strong> Positions 1 (<span class=\"math-inline\">X=X → 0</span>), 4 (<span class=\"math-inline\">Z=Z → 0</span>), 6 (<span class=\"math-inline\">X=X → 1</span>), 7 (<span class=\"math-inline\">Z=Z → 0</span>), and 9 (<span class=\"math-inline\">X=X → 0</span>), producing the shared sifted key <span class=\"math-inline\">0, 0, 1, 0, 0</span>. Mismatched positions (2, 3, 5, 8) are discarded.</li>\n          </ul>",
          "image": {
            "file": "bb84_sifted_key.png",
            "caption": "Fig. Sifted key after discarding mismatched bases (0, 0, 1, 0, 0)",
            "source": "4 unit qst/qkd.pptx · slide 11",
            "placement": "inline-bottom"
          }
        },
        {
          "label": "(d) Security Guarantee & Conclusion",
          "html": "<p>Because Eve cannot clone unknown states or predict Alice’s basis before measurement, any spying alters states and exposes Eve during Step 4 error checking—making BB84 information-theoretically secure.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 7–13). (Corrected Bob basis transcription & matched indices against slides 9 & 11 table images: Bob’s bases are X, Z, X, Z, X, X, Z, X, X, giving matches 1, 4, 6, 7, 9 → 00100.)",
      "rememberThese": [
        "4 Steps: (1) Alice random bits+bases → (2) Bob random bases → (3) Public basis sifting → (4) Error check",
        "Only bases are announced publicly—never the secret bits",
        "Matched bases (~50%) form the sifted key; mismatched (~50%) are discarded"
      ]
    },
    {
      "number": 51,
      "question": "How can an eavesdropper be detected in QKD?",
      "sourceTag": "Mid 2 · Unit IV · Short Q5",
      "marks": 2,
      "intuition": "Eve cannot copy Alice’s photon or know which basis Alice used, so half the time Eve guesses wrong and scrambles the photon—leaving telltale bit errors when Alice and Bob compare a sample.",
      "sections": [
        {
          "html": "<p>An eavesdropper (Eve) is detected because the <strong>no-cloning theorem</strong> prevents copying unknown qubits, forcing Eve to measure and re-send photons in guessed bases. Guessing wrong (~50% of the time) alters the photon’s state, producing a random 50% error on Bob’s matched-basis measurements—creating an overall <strong>~25% quantum bit error rate (QBER)</strong> when Alice and Bob publicly compare a random subset of their sifted key.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 12–13).",
      "noDiagramNote": "Explained in 4 unit qst/qkd.pptx slides 12–13 using sifted key comparison and the no-cloning theorem.",
      "rememberThese": [
        "No-cloning forces Eve to measure (collapse) before re-sending",
        "Eve guesses wrong basis 50% of the time × Bob gets wrong bit 50% of those = <strong>25% error rate</strong>",
        "Alice & Bob detect Eve by comparing a random subset of sifted bits publicly"
      ]
    },
    {
      "number": 52,
      "question": "Explain eavesdropping in QKD. How does the security of QKD detect an eavesdropper?",
      "sourceTag": "Mid 2 · Unit IV · Long Q5(a)",
      "marks": 5,
      "intuition": "On an ordinary wire, a wiretap reads electricity passively without leaving fingerprints. On a quantum fiber, reading an unknown photon forces it to collapse into your guessed basis—permanently corrupting half of the states when you guessed wrong.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>In QKD, <strong>eavesdropping</strong> is any attempt by an adversary (Eve) to intercept and measure quantum states traveling from Alice to Bob. QKD turns eavesdropping into detectable physical noise via the <strong>no-cloning theorem</strong> and <strong>measurement disturbance</strong>.</p>"
        },
        {
          "label": "(b) Why Eve Cannot Cheat (Step-by-Step Security Analysis)",
          "html": "<ol>\n            <li><strong>Cannot Clone Photons:</strong> By the no-cloning theorem, Eve cannot copy Alice’s incoming qubit, hold one to measure after Alice and Bob announce bases, and forward an untouched duplicate to Bob.</li>\n            <li><strong>Intercept–Resend Attack Mechanics:</strong> To learn a bit, Eve must intercept the photon, pick a measurement basis (<span class=\"math-inline\">Z</span> or <span class=\"math-inline\">X</span>) at random, measure it, and send a fresh photon in that post-measurement state to Bob.</li>\n            <li><strong>Quantum Disturbance (25% QBER Math):</strong> Consider bits where Alice and Bob <em>matched</em> bases (kept in the sifted key):\n              <ul>\n                <li>50% of the time Eve happened to guess Alice’s basis → Bob receives the right state (<strong>0% error</strong>).</li>\n                <li>50% of the time Eve picked the <em>wrong</em> basis (e.g., Alice sent <span class=\"math-inline\">|0⟩</span> in Z-basis, Eve measured in X-basis) → Eve gets <span class=\"math-inline\">|+⟩</span> or <span class=\"math-inline\">|−⟩</span> randomly and sends that to Bob. When Bob measures in Z-basis, he gets wrong bit <span class=\"math-inline\">1</span> half the time (<strong>50% error</strong>).</li>\n                <li><strong>Total Error Rate introduced by Eve:</strong> <span class=\"math-inline\">0.5 × 0 + 0.5 × 0.5 = 0.25</span> = <strong>25% QBER</strong>.</li>\n              </ul>\n            </li>\n            <li><strong>Step 4 — Detection by Subset Comparison:</strong> Alice and Bob sacrifice and publicly compare a random subset of <span class=\"math-inline\">m</span> sifted bits. The probability Eve escapes detection across <span class=\"math-inline\">m</span> checked bits drops exponentially as <span class=\"math-inline\">(3/4)^m</span> (already &lt;0.1% for <span class=\"math-inline\">m=25</span> bits). If errors exceed tiny channel noise, they abort the key.</li>\n          </ol>",
          "image": {
            "file": "bb84_sifted_key.png",
            "caption": "Fig. Sifted key table where Alice and Bob verify zero unexpected disagreements across a random subset",
            "source": "4 unit qst/qkd.pptx · slides 11–12",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(c) Worked Example (Alice sends |0⟩ in Z-basis)",
          "html": "<p>Alice prepares <span class=\"math-inline\">|0⟩</span> (Z-basis). Eve guesses X-basis and measures <span class=\"math-inline\">|+⟩</span>, forwarding <span class=\"math-inline\">|+⟩ = (|0⟩+|1⟩)/√2</span> to Bob. Bob measures in Z-basis (matching Alice) and has a 50% chance of recording <span class=\"math-inline\">1</span> instead of <span class=\"math-inline\">0</span>—flagging interference when checked.</p>"
        },
        {
          "label": "(d) Conclusion",
          "html": "<p>QKD detects eavesdropping automatically because non-orthogonal state measurement plus no-cloning forces any spy to introduce measurable (~25%) bit errors.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 11–13); explicit 25% QBER probability calculation and (3/4)^m bound added from textbook (Nielsen & Chuang).",
      "rememberThese": [
        "No-cloning stops Eve from copying photons silently",
        "Intercept–resend QBER = <span class=\"math-inline\">25%</span> on sifted key",
        "Probability Eve stays hidden across <span class=\"math-inline\">m</span> checked bits = <span class=\"math-inline\">(3/4)^m</span>"
      ]
    },
    {
      "number": 53,
      "question": "What is quantum cryptography? Explain why it is more secure than classical cryptography.",
      "sourceTag": "Mid 2 · Unit IV · Long Q1(b)",
      "marks": 5,
      "intuition": "Classical encryption is like a bank vault built out of tough math puzzles—safe only until someone invents a better lockpick (like Shor’s algorithm). Quantum cryptography guards keys with the laws of physics themselves.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) What is Quantum Cryptography?",
          "html": "<p><strong>Quantum cryptography</strong> is the science of exploiting quantum mechanical phenomena—no-cloning, uncertainty, wave collapse, and entanglement—to distribute cryptographic keys and protect communications with security guaranteed by physics.</p>"
        },
        {
          "label": "(b) Why It Is More Secure Than Classical Cryptography",
          "html": "<table class=\"q-table\">\n            <thead><tr><th>Security Aspect</th><th>Classical Cryptography (RSA, ECC, AES)</th><th>Quantum Cryptography (QKD + OTP)</th></tr></thead>\n            <tbody>\n              <tr><td><strong>Security Basis</strong></td><td>Computational hardness (assumes factoring or discrete logs take too long)</td><td>Fundamental laws of physics (No-cloning + measurement disturbance)</td></tr>\n              <tr><td><strong>Eavesdropping Detection</strong></td><td>Passive tapping of optical fibers/wires is undetectable</td><td>Measuring photons leaves ~25% QBER disturbance, exposing Eve</td></tr>\n              <tr><td><strong>Vulnerability to Shor’s Algorithm</strong></td><td>RSA and ECC will be broken in polynomial time by fault-tolerant quantum computers</td><td>Immune to future computational power; even “Harvest Now, Decrypt Later” fails on QKD keys</td></tr>\n              <tr><td><strong>One-Time Pad Synergy</strong></td><td>Hard to distribute long truly random pads securely</td><td>QKD safely distributes fresh keys for a mathematically unbreakable One-Time Pad</td></tr>\n            </tbody>\n          </table>"
        },
        {
          "label": "(c) One-Time Pad Synergy with QKD",
          "html": "<p>Classical simple replacement ciphers leak frequency patterns, and RSA keys face future Shor factoring attacks. Pairing QKD (BB84) with a one-time pad adds modular key shifts (<span class=\"math-inline\">ciphertext = (message + key) mod 26</span>) using fresh random keys shared exclusively by Alice and Bob.</p>",
          "image": {
            "file": "bb84_bases_table.png",
            "caption": "Fig. BB84 non-orthogonal quantum state encoding preventing undetectable copying",
            "source": "4 unit qst/qkd.pptx · slide 7",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Practical Caveat",
          "html": "<p>While QKD protocols are information-theoretically secure in theory, real-world hardware requires authenticated classical channels and careful engineering against side-channel attacks (such as photon-number splitting) and distance attenuation.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>Quantum cryptography surpasses classical public-key methods by guaranteeing future-proof, physics-based key secrecy and real-time eavesdropper detection.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 1–7); side-channel caveats (authenticated classical channel, photon-number splitting) added from textbook.",
      "rememberThese": [
        "Classical security = assumed <strong>mathematical hardness</strong> (vulnerable to Shor’s algorithm)",
        "Quantum security = <strong>laws of physics</strong> (No-cloning + state collapse)",
        "Passive wiretapping is invisible classically but creates detectable QBER in QKD"
      ]
    },
    {
      "number": 54,
      "question": "What is the E91 protocol?",
      "sourceTag": "Mid 2 · Unit IV · Short Q4",
      "marks": 2,
      "intuition": "Instead of Alice mailing photons to Bob like in BB84, E91 drops entangled photon pairs from the middle to both Alice and Bob—any spy tampering in transit breaks their Bell inequality score.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "html": "<p>The <strong>E91 protocol</strong> (Artur Ekert, 1991) is an <strong>entanglement-based Quantum Key Distribution (QKD)</strong> protocol in which a central source distributes entangled Bell/singlet photon pairs to Alice and Bob. When they measure in matching bases they obtain perfectly correlated secret key bits, and when they measure in mismatched bases they test <strong>Bell’s (CHSH) inequality</strong> (<span class=\"math-inline\">|S| &gt; 2</span>) to detect eavesdropping.</p>"
        }
      ],
      "studySource": "Added from textbook (Nielsen & Chuang / Ekert 1991), building on Bell states in 2unit qst/6 bell and epr paradox.pptx (4 unit qst lacks an E91 file).",
      "noDiagramNote": "Unit IV folder does not contain an E91 diagram; Bell states and Bell’s inequality concepts appear in 2unit qst/6 bell and epr paradox.pptx.",
      "rememberThese": [
        "Proposed by Artur Ekert (1991)",
        "Uses shared entangled pairs + <strong>Bell’s / CHSH inequality</strong> test",
        "No eavesdropper ⇒ <span class=\"math-inline\">|S| = 2√2 ≈ 2.828</span>; Eve present ⇒ <span class=\"math-inline\">|S| ≤ 2</span>"
      ]
    },
    {
      "number": 55,
      "question": "Explain the Ekert protocol (E91) for entanglement-based QKD.",
      "sourceTag": "Mid 2 · Unit IV · Long Q2(a)",
      "marks": 5,
      "intuition": "Imagine two magic entangled coins landing identically whenever you measure them the same way; if an eavesdropper peeks at one coin mid-flight, those spooky quantum correlations drop down to ordinary classical levels, failing Bell’s inequality test.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Core Idea",
          "html": "<p>Introduced by Artur Ekert in 1991, the <strong>E91 protocol</strong> uses pairs of maximally entangled qubits (EPR/Bell pairs, such as the singlet <span class=\"math-inline\">|Ψ⁻⟩ = (|01⟩ − |10⟩)/√2</span>) rather than single prepared qubits. It simultaneously generates a secret key and uses <strong>CHSH Bell inequality violation</strong> to certify channel security—even if the entanglement source is untrusted.</p>"
        },
        {
          "label": "(b) Step-by-Step E91 Protocol",
          "html": "<ol>\n            <li><strong>Step 1 (Entanglement Distribution):</strong> A source (between Alice and Bob, or operated by either) emits entangled photon pairs <span class=\"math-inline\">|Ψ⁻⟩ = (|01⟩ − |10⟩)/√2</span>, sending one particle to Alice and one to Bob.</li>\n            <li><strong>Step 2 (Random Angle / Basis Choices):</strong> Alice randomly measures her photon along one of three coplanar angles: <span class=\"math-inline\">a₁ = 0°, a₂ = 45°, a₃ = 90°</span>. Bob independently picks from three angles: <span class=\"math-inline\">b₁ = 45°, b₂ = 90°, b₃ = 135°</span>.</li>\n            <li><strong>Step 3 (Public Basis Announcement & Sifting):</strong> Alice and Bob publicly announce which measurement angles they used for every pair and split the runs into two groups:\n              <ul>\n                <li><strong>Group A (Matched angles: <span class=\"math-inline\">(a₂, b₁) = 45°</span> or <span class=\"math-inline\">(a₃, b₂) = 90°</span>):</strong> Because the singlet state is perfectly anti-correlated (or correlated for <span class=\"math-inline\">|Φ⁺⟩</span>), Alice and Bob invert one side’s bits to obtain an identical <strong>sifted secret key</strong>.</li>\n                <li><strong>Group B (Mismatched angles: e.g. 0° vs 45°, 45° vs 135°):</strong> Instead of discarding these runs as in BB84, they publish these measurement outcomes to compute the <strong>CHSH Bell parameter <span class=\"math-inline\">S</span></strong>.</li>\n              </ul>\n            </li>\n            <li><strong>Step 4 (Eavesdropper Check via Bell’s Inequality):</strong>\n              <div class=\"math-block\">S = E(a₁, b₁) − E(a₁, b₃) + E(a₃, b₁) + E(a₃, b₃)<br/>Quantum entanglement (Safe channel): |S| = 2√2 ≈ 2.828 &gt; 2<br/>Classical / Local Hidden Variable (Eve intercepted): |S| ≤ 2</div>\n            </li>\n          </ol>"
        },
        {
          "label": "(c) Role of Bell’s Inequality & Non-Local Correlations",
          "html": "<p>Bell’s inequality distinguishes genuine non-local quantum correlations from predetermined local hidden variables. If Eve intercepts and measures photons in flight, she turns entanglement into a classical separable state, collapsing <span class=\"math-inline\">|S|</span> below <span class=\"math-inline\">2</span>.</p>",
          "image": {
            "file": "entangled_photons_pair.png",
            "caption": "Fig. Correlated measurement outcomes of an entangled photon pair",
            "source": "2unit qst/1day.pptx · slide 44",
            "placement": "inline-mid"
          }
        },
        {
          "label": "(d) Advantages & Limitations",
          "html": "<p>Unlike BB84, E91 resists untrusted-source attacks because Alice and Bob never rely on trusting the photon transmitter—Bell violation proves entanglement survived. However, generating high-rate entangled pairs is experimentally harder than sending single weak pulses.</p>"
        },
        {
          "label": "(e) Conclusion",
          "html": "<p>E91 turns mismatched measurement data from waste into a powerful CHSH Bell test, proving entanglement integrity and catching any eavesdropper.</p>"
        }
      ],
      "studySource": "Added from textbook (Nielsen & Chuang / Ekert 1991), paired with entangled pair illustration from 2unit qst/1day.pptx (slide 44) & Bell inequality context from 2unit qst/6 bell and epr paradox.pptx.",
      "rememberThese": [
        "Uses Bell/singlet pairs <span class=\"math-inline\">(|01⟩−|10⟩)/√2</span> instead of prepare-and-measure",
        "Matched angles (<span class=\"math-inline\">45°, 90°</span>) → Sifted secret key",
        "Mismatched angles → Compute CHSH value <span class=\"math-inline\">|S|</span>",
        "<span class=\"math-inline\">|S| ≈ 2.828 (&gt; 2)</span> ⇒ Secure; <span class=\"math-inline\">|S| ≤ 2</span> ⇒ Eavesdropper detected"
      ]
    },
    {
      "number": 56,
      "question": "Compare the BB84 and E91 protocols. Explain how each one detects an eavesdropper.",
      "sourceTag": "Mid 2 · Unit IV · Long Q6(a)",
      "marks": 5,
      "intuition": "BB84 sends single prepared photons directly from Alice to Bob and catches Eve by checking bit errors; E91 splits entangled pairs to both and catches Eve when CHSH Bell correlations drop below 2.",
      "usesTextbookSupplement": true,
      "sections": [
        {
          "label": "(a) Comparison of BB84 and E91 Protocols",
          "html": "<table class=\"q-table\">\n            <thead><tr><th>Feature</th><th>BB84 (Bennett & Brassard, 1984)</th><th>E91 (Ekert, 1991)</th></tr></thead>\n            <tbody>\n              <tr><td><strong>Core Mechanism</strong></td><td>Prepare-and-measure (single non-orthogonal states)</td><td>Entanglement-based (shared EPR / Bell pairs)</td></tr>\n              <tr><td><strong>States Used</strong></td><td>4 states in 2 bases: <span class=\"math-inline\">Z {|0⟩,|1⟩}</span> and <span class=\"math-inline\">X {|+⟩,|−⟩}</span></td><td>Maximally entangled Bell state (e.g. <span class=\"math-inline\">|Ψ⁻⟩</span>)</td></tr>\n              <tr><td><strong>Basis Choices</strong></td><td>Alice: 2 bases (Z, X); Bob: 2 bases (Z, X)</td><td>Alice: 3 angles (<span class=\"math-inline\">0°,45°,90°</span>); Bob: 3 angles (<span class=\"math-inline\">45°,90°,135°</span>)</td></tr>\n              <tr><td><strong>Mismatched Bases</strong></td><td>Completely discarded during sifting (~50%)</td><td>Kept and analyzed for CHSH Bell inequality test</td></tr>\n              <tr><td><strong>Trust in Photon Source</strong></td><td>Alice must trust her transmitter preparation</td><td>Works even with an untrusted third-party source</td></tr>\n              <tr><td><strong>Practical Ease</strong></td><td>Simpler hardware (widely deployed commercially)</td><td>Harder (requires reliable entangled photon sources)</td></tr>\n            </tbody>\n          </table>"
        },
        {
          "label": "(b) How Each Protocol Detects an Eavesdropper",
          "html": "<ol>\n            <li><strong>BB84 Detection (QBER Subset Check):</strong> Eve cannot clone Alice’s photon, so her intercept-resend guesses force wrong-basis collapses. When Alice and Bob publicly compare a random subset of matched-basis sifted bits, Eve creates an expected <strong>~25% error rate (QBER)</strong>, exposing her presence.</li>\n            <li><strong>E91 Detection (CHSH Bell Inequality Test):</strong> Eve measuring entangled photons in flight breaks quantum non-locality into classical correlations. Alice and Bob check their mismatched-angle outcomes via <span class=\"math-inline\">S = E(a₁,b₁) − E(a₁,b₃) + E(a₃,b₁) + E(a₃,b₃)</span>. Without Eve, quantum mechanics gives maximum Bell violation <span class=\"math-inline\">|S| = 2√2 ≈ 2.828 &gt; 2</span>; with Eve, <span class=\"math-inline\">|S| ≤ 2</span>, leading them to abort the key.</li>\n          </ol>"
        },
        {
          "label": "(c) Conclusion",
          "html": "<p>Both protocols achieve physics-guaranteed key distribution, with BB84 relying on bit-error auditing of single states and E91 relying on Bell’s theorem violation across entangled pairs.</p>"
        }
      ],
      "studySource": "4 unit qst/qkd.pptx (slides 7–13 for BB84); E91 protocol & CHSH comparison added from textbook (Nielsen & Chuang / Ekert 1991).",
      "noDiagramNote": "Unit IV notes include tables for BB84 (see Q50) and no separate E91 comparison diagram.",
      "rememberThese": [
        "BB84 = Prepare-and-measure (2 bases each) → detects Eve via <strong>~25% QBER</strong>",
        "E91 = Entanglement-based (3 angles each) → detects Eve via <strong>Bell/CHSH test (|S| ≤ 2)</strong>",
        "BB84 discards mismatched bases; E91 uses them for the Bell test"
      ]
    }
  ]
});
