import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  computeProgressSummary,
  filterStages,
  matchesQuestion,
  parseDoneStorage,
  stripHtml,
  toggleDoneList,
} from './studyLogic';
import {
  buildUnitExamGroups,
  formatViewHash,
  getQuestionLocationMap,
  parseSidebarStorage,
  parseSourceTag,
  parseStarStorage,
  parseThemeStorage,
  parseViewHash,
  parseViewStorage,
  QUESTION_BUILDS_ON,
  toggleStarList,
} from './examView';
import type { QuestionId, StudyStage } from '../types/study';
import { ALL_STAGES } from '../data/stages';

const SAMPLE_STAGES: StudyStage[] = [
  {
    id: 1,
    part: 'A',
    partTitle: 'Foundations (Unit I)',
    title: 'Why classical physics wasn’t enough',
    subtitle: 'Light behaves like particles, then matter behaves like waves.',
    questions: [
      {
        number: 1,
        question: 'What is photo voltaic effect? Explain.',
        sourceTag: 'Mid 1 · Unit I · Q1',
        marks: 5,
        intuition: 'Photons knock electrons loose to create voltage.',
        sections: [{ html: '<p>Solar cells convert light into voltage using p-n junctions.</p>' }],
        studySource: '1unit qst/4 Photoelectric effect.docx',
        rememberThese: ['E = hf', 'KEmax = hf - Φ'],
      },
      {
        number: 2,
        question: 'Write the principle of dual nature of light and matter.',
        sourceTag: 'Mid 1 · Unit I · Q7',
        marks: 2,
        intuition: 'Light and matter show both wave and particle traits.',
        sections: [{ html: '<p>Wave-particle duality applies to photons and electrons.</p>' }],
        studySource: '1unit qst/6 dual nature of light and matter.docx',
        rememberThese: ['λ = h / p'],
      },
    ],
  },
  {
    id: 6,
    part: 'B',
    partTitle: 'Qubits, gates and entanglement',
    title: 'No-cloning and teleportation',
    subtitle: 'An unknown state cannot be copied, so it is moved instead.',
    questions: [
      {
        number: 20,
        question: 'What is quantum teleportation?',
        sourceTag: 'Mid 2 · Unit IV · Short Q6',
        marks: 2,
        intuition: 'Moves a quantum state using entanglement and 2 classical bits.',
        sections: [{ html: '<p>Transfers an unknown qubit state from Alice to Bob.</p>' }],
        studySource: '2unit qst/11a quantum teleportaion State transfer.docx',
        rememberThese: ['Bell pair + 2 classical bits'],
      },
    ],
  },
];

test('stripHtml removes tags cleanly without leaving excessive whitespace', () => {
  assert.equal(stripHtml('<p>Hello <b>world</b> &amp; qubits</p>'), 'Hello world & qubits');
});

test('filterStages filters by 2-mark, 5-mark, and starred criteria accurately', () => {
  const twoMarks = filterStages(SAMPLE_STAGES, {
    searchQuery: '',
    marksFilter: '2',
    selectedStageId: 'all',
  });
  assert.equal(twoMarks.length, 2);
  assert.deepEqual(
    twoMarks.flatMap((s) => s.questions.map((q) => q.number)),
    [2, 20]
  );

  const fiveMarks = filterStages(SAMPLE_STAGES, {
    searchQuery: '',
    marksFilter: '5',
    selectedStageId: 'all',
  });
  assert.equal(fiveMarks.length, 1);
  assert.equal(fiveMarks[0].questions[0].number, 1);

  const starredOnly = filterStages(SAMPLE_STAGES, {
    searchQuery: '',
    marksFilter: 'all',
    selectedStageId: 'all',
    onlyStarred: true,
    starredSet: new Set([20]),
  });
  assert.equal(starredOnly.length, 1);
  assert.equal(starredOnly[0].questions[0].number, 20);
});

test('matchesQuestion performs multi-token search across question, formulas, prose, and sources', () => {
  const q1 = SAMPLE_STAGES[0].questions[0];
  assert.equal(
    matchesQuestion(q1, { searchQuery: 'photons voltage', marksFilter: 'all', selectedStageId: 'all' }),
    true
  );
  assert.equal(
    matchesQuestion(q1, { searchQuery: 'effect.docx', marksFilter: 'all', selectedStageId: 'all' }),
    true
  );
  assert.equal(
    matchesQuestion(q1, { searchQuery: 'teleportation', marksFilter: 'all', selectedStageId: 'all' }),
    false
  );
  assert.equal(
    matchesQuestion(SAMPLE_STAGES[1].questions[0], {
      searchQuery: 'q20 bell',
      marksFilter: 'all',
      selectedStageId: 'all',
    }),
    true
  );
});

test('computeProgressSummary calculates accurate counts and completion percentage', () => {
  const summary = computeProgressSummary(SAMPLE_STAGES, new Set([1, 20]), new Set([2]));
  assert.deepEqual(summary, {
    totalQuestions: 3,
    doneCount: 2,
    starredCount: 1,
    percentDone: 67,
    twoMarkCount: 2,
    fiveMarkCount: 1,
  });
});

test('storage & view hash parsers handle corrupt inputs, alphanumeric IDs, and toggles cleanly', () => {
  assert.deepEqual(parseDoneStorage('not-json'), []);
  assert.deepEqual(parseDoneStorage('[5, "1a", 1, "bad", 5, -2, 3]'), [1, '1a', 3, 5]);
  assert.deepEqual(toggleDoneList([1, 5], '1a'), [1, '1a', 5]);
  assert.deepEqual(toggleDoneList([1, '1a', 5], '1a'), [1, 5]);
  assert.deepEqual(parseStarStorage('[12, "13a", 4, 12]'), [4, 12, '13a']);
  assert.deepEqual(toggleStarList([4], '13a'), [4, '13a']);
  assert.equal(parseViewHash('#units'), 'units');
  assert.equal(parseViewHash('#units/q-39'), 'units');
  assert.equal(parseViewHash('#study'), 'study');
  assert.equal(parseViewHash('#other'), null);
  assert.equal(formatViewHash('units'), '#units');
  assert.equal(formatViewHash('study'), '#study');
  assert.equal(parseViewStorage('units'), 'units');
  assert.equal(parseViewStorage('invalid'), null);
  assert.equal(parseThemeStorage('dark'), 'dark');
  assert.equal(parseThemeStorage('sepia'), null);
});

test('ALL_STAGES preserves exact 19 stages (Parts A-E), all original 1..87 IDs + 20 added Unit I/II 2-mark IDs (107 total), and 53/54 mark split', () => {
  assert.equal(ALL_STAGES.length, 19);
  assert.deepEqual(
    ALL_STAGES.map((s) => s.id),
    Array.from({ length: 19 }, (_, i) => i + 1)
  );
  const allQuestions = ALL_STAGES.flatMap((s) => s.questions);
  assert.equal(allQuestions.length, 107);

  const numericIds = allQuestions
    .map((q) => q.number)
    .filter((id): id is number => typeof id === 'number');
  assert.deepEqual(
    numericIds,
    Array.from({ length: 87 }, (_, i) => i + 1)
  );

  const addedIds = allQuestions
    .map((q) => q.number)
    .filter((id): id is string => typeof id === 'string');
  assert.deepEqual(addedIds, [
    '1a', '1b', '1c', '3a',
    '4a', '5a', '5b',
    '9a', '10a', '10b',
    '12a', '13a', '14a', '15a', '15b',
    '17a', '17b', '18a',
    '19a', '21a',
  ]);

  assert.equal(allQuestions.filter((q) => q.marks === 2).length, 53);
  assert.equal(allQuestions.filter((q) => q.marks === 5).length, 54);
  const parts = ALL_STAGES.map((s) => s.part).join('');
  assert.match(parts, /^A+B+C+D+E+$/);
});

test('all exam answers are clean self-contained prose with zero study/file/conversational leaks', () => {
  const forbiddenFileOrStudyRe =
    /\.(pdf|pptx?|docx|html|png|jpe?g)\b|\b(pdf|ppt|pptx|docx|slides?|your notes|class notes|unit\s+[ivx\d]+\s+notes|added from textbook|textbook|rId\d+|wait—)\b/i;
  const forbiddenConversationalRe =
    /\b(you|your|you're|you've|let's|we'll|we\s+can|we\s+get|we\s+know|we\s+find|we\s+apply|we\s+compute|our|remember\s+that|note\s+that)\b/i;

  for (const stage of ALL_STAGES) {
    for (const q of stage.questions) {
      assert.ok(q.studySource.trim().length > 5, `Q${q.number} missing studySource`);

      for (const sec of q.sections) {
        const plainLabel = sec.label ?? '';
        const plainHtml = stripHtml(sec.html);
        const plainCaption = sec.image?.caption ?? '';

        for (const [field, text] of [
          ['section.label', plainLabel],
          ['section.html', plainHtml],
          ['image.caption', plainCaption],
        ] as const) {
          assert.doesNotMatch(
            text,
            forbiddenFileOrStudyRe,
            `Q${q.number} ${field} leaked study/file reference: "${text.slice(0, 140)}"`
          );
          assert.doesNotMatch(
            text,
            forbiddenConversationalRe,
            `Q${q.number} ${field} has conversational phrasing: "${text.slice(0, 140)}"`
          );
        }

        if (sec.image) {
          assert.match(
            sec.image.caption,
            /^Fig\.\s+/,
            `Q${q.number} image caption must be exam-style starting with "Fig. "`
          );
        }
      }
    }
  }
});

test('Q37 QFT exponent order and Q50 BB84 Bob bases match mathematical derivation and diagram', () => {
  const allQuestions = ALL_STAGES.flatMap((s) => s.questions);
  const q37 = allQuestions.find((q) => q.number === 37)!;
  const q37Text = stripHtml(q37.sections.map((s) => s.html).join(' '));
  assert.ok(q37Text.includes('0.j₂)|1⟩) ⊗ (|0⟩ + e^(2πi · 0.j₁j₂)|1⟩)'));

  const q50 = allQuestions.find((q) => q.number === 50)!;
  const q50Text = stripHtml(q50.sections.map((s) => s.html).join(' '));
  assert.ok(q50Text.includes('X, Z, X, Z, X, X, Z, X, X'));
  assert.ok(q50Text.includes('0, 0, 1, 0, 0'));
});

test('every question has complete independent content and valid image assets in both React and offline folders', () => {
  const pubDir = path.resolve(process.cwd(), 'public/images');
  const offDir = path.resolve(process.cwd(), 'offline-study/images');
  const used = new Set<string>();

  for (const stage of ALL_STAGES) {
    for (const q of stage.questions) {
      assert.ok(q.question.trim().length > 0, `Q${q.number} missing question text`);
      assert.ok(q.sourceTag.trim().length > 0, `Q${q.number} missing sourceTag`);
      assert.ok(q.marks === 2 || q.marks === 5, `Q${q.number} invalid marks`);
      assert.ok(q.intuition.trim().length > 10, `Q${q.number} missing intuition`);
      assert.ok(q.sections.length >= 1, `Q${q.number} missing answer sections`);
      assert.ok(q.rememberThese.length >= 2, `Q${q.number} needs Remember these points`);

      const joinedHtml = q.sections.map((s) => s.html).join(' ');
      assert.doesNotMatch(
        joinedHtml,
        /same as above|as answered above|refer to q\d+ for the answer/i,
        `Q${q.number} must be answered independently`
      );

      let hasImage = false;
      for (const sec of q.sections) {
        if (sec.image) {
          hasImage = true;
          used.add(sec.image.file);
          assert.ok(
            fs.existsSync(path.join(pubDir, sec.image.file)),
            `Missing public/images/${sec.image.file} for Q${q.number}`
          );
          assert.ok(
            fs.existsSync(path.join(offDir, sec.image.file)),
            `Missing offline-study/images/${sec.image.file} for Q${q.number}`
          );
        }
      }
      assert.ok(
        hasImage || Boolean(q.noDiagramNote),
        `Q${q.number} must either include a diagram image or explicit noDiagramNote`
      );
    }
  }

  const q25 = ALL_STAGES.flatMap((s) => s.questions).find((q) => q.number === 25)!;
  const q26 = ALL_STAGES.flatMap((s) => s.questions).find((q) => q.number === 26)!;
  assert.ok(stripHtml(q25.sections.map((s) => s.html).join(' ')).length > 400);
  assert.ok(stripHtml(q26.sections.map((s) => s.html).join(' ')).length > 400);
  assert.notEqual(q25.sections[0].html, q26.sections[0].html);
  assert.ok(used.size > 30, 'Expected verified image assets across stages');
});

test('Unit-wise Exam View contains all 107 questions once with exact unit counts (21,20,22,22,22) and bank order', () => {
  const termGroups = buildUnitExamGroups(ALL_STAGES);
  assert.equal(termGroups.length, 2);
  assert.equal(termGroups[0].examTerm, 'Mid 1');
  assert.equal(termGroups[1].examTerm, 'Mid 2');

  const allUnits = termGroups.flatMap((t) => t.units);
  assert.deepEqual(
    allUnits.map((u) => [u.unitCode, u.totalQuestions]),
    [
      ['I', 21],
      ['II', 20],
      ['III', 22],
      ['IV', 22],
      ['V', 22],
    ]
  );

  const seenNumbers = new Set<QuestionId>();
  let totalTwoMarks = 0;
  let totalFiveMarks = 0;

  for (const unit of allUnits) {
    totalTwoMarks += unit.twoMarkSection.items.length;
    totalFiveMarks += unit.fiveMarkSection.items.length;

    const twoOrder = unit.twoMarkSection.items.map((i) => i.parsedTag.bankSortKey);
    const fiveOrder = unit.fiveMarkSection.items.map((i) => i.parsedTag.bankSortKey);
    assert.deepEqual(twoOrder, twoOrder.slice().sort((a, b) => a - b));
    assert.deepEqual(fiveOrder, fiveOrder.slice().sort((a, b) => a - b));

    if (unit.examTerm === 'Mid 2') {
      assert.equal(unit.fiveMarkSection.longGroups.length, 6);
      for (const lg of unit.fiveMarkSection.longGroups) {
        assert.equal(lg.questions.length, 2);
        assert.equal(lg.questions[0].parsedTag.subLetter, 'a');
        assert.equal(lg.questions[1].parsedTag.subLetter, 'b');
      }
    }

    for (const item of [...unit.twoMarkSection.items, ...unit.fiveMarkSection.items]) {
      assert.ok(!seenNumbers.has(item.question.number), `Duplicate Q${item.question.number}`);
      seenNumbers.add(item.question.number);
    }
  }

  assert.equal(seenNumbers.size, 107);
  assert.equal(totalTwoMarks, 53);
  assert.equal(totalFiveMarks, 54);
});

test('changing a question marks field in data dynamically moves it between 2-mark and 5-mark sections', () => {
  const cloned = ALL_STAGES.map((s) => ({
    ...s,
    questions: s.questions.map((q) => ({ ...q })),
  }));
  const q1 = cloned[0].questions.find((q) => q.number === 1)!;
  assert.equal(q1.marks, 5);
  q1.marks = 2;

  const groups = buildUnitExamGroups(cloned);
  const unitI = groups[0].units[0];
  assert.equal(unitI.twoMarkSection.items.some((i) => i.question.number === 1), true);
  assert.equal(unitI.fiveMarkSection.items.some((i) => i.question.number === 1), false);
});

test('QUESTION_BUILDS_ON entries are strictly earlier questions (max 3) and location map covers all 107 questions', () => {
  const locMap = getQuestionLocationMap(ALL_STAGES);
  const allQuestions = ALL_STAGES.flatMap((s) => s.questions);
  assert.equal(locMap.size, 107);

  const orderIndex = new Map<QuestionId, number>();
  allQuestions.forEach((q, idx) => orderIndex.set(q.number, idx));

  for (const q of allQuestions) {
    const key = String(q.number);
    const deps = QUESTION_BUILDS_ON[key];
    assert.ok(Array.isArray(deps), `Missing QUESTION_BUILDS_ON array for Q${q.number}`);
    assert.ok(deps.length <= 3, `Q${q.number} has more than 3 Builds-on dependencies`);
    const qPos = orderIndex.get(q.number)!;
    for (const d of deps) {
      assert.ok(locMap.has(d), `Invalid dependency Q${d}`);
      const dPos = orderIndex.get(d)!;
      assert.ok(dPos < qPos, `Q${q.number} dependency Q${d} must be strictly earlier in study order`);
    }
    const parsed = parseSourceTag(q.sourceTag);
    assert.equal(parsed.bankLabel, locMap.get(q.number)!.bankLabel);
    assert.equal(parsed.bankDisplayPrefix, locMap.get(q.number)!.bankDisplayPrefix);
  }
});

test('Unit-wise Exam View uses independent sequential section numbering (1, 2, 3...) per section and parses sidebar storage', () => {
  assert.equal(parseSidebarStorage(null), true);
  assert.equal(parseSidebarStorage('true'), true);
  assert.equal(parseSidebarStorage('false'), false);
  assert.equal(parseSidebarStorage('invalid'), true);

  const termGroups = buildUnitExamGroups(ALL_STAGES);
  const [unitI, unitII] = termGroups[0].units;
  const [unitIII, unitIV, unitV] = termGroups[1].units;

  assert.deepEqual(
    unitI.twoMarkSection.items.map((i) => i.sectionNumberPrefix),
    Array.from({ length: 13 }, (_, i) => String(i + 1))
  );
  assert.deepEqual(
    unitI.fiveMarkSection.items.map((i) => i.sectionNumberPrefix),
    Array.from({ length: 8 }, (_, i) => String(i + 1))
  );

  assert.deepEqual(
    unitII.twoMarkSection.items.map((i) => i.sectionNumberPrefix),
    Array.from({ length: 10 }, (_, i) => String(i + 1))
  );
  assert.deepEqual(
    unitII.fiveMarkSection.items.map((i) => i.sectionNumberPrefix),
    Array.from({ length: 10 }, (_, i) => String(i + 1))
  );

  for (const mid2Unit of [unitIII, unitIV, unitV]) {
    assert.deepEqual(
      mid2Unit.twoMarkSection.items.map((i) => i.sectionNumberPrefix),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    );
    assert.deepEqual(
      mid2Unit.fiveMarkSection.items.map((i) => i.sectionNumberPrefix),
      ['1(a)', '1(b)', '2(a)', '2(b)', '3(a)', '3(b)', '4(a)', '4(b)', '5(a)', '5(b)', '6(a)', '6(b)']
    );
  }
});

test('Study Order and Unit-wise Exam View expose all 107 identical questions with unchanged wording and metadata', () => {
  const studyQuestions = ALL_STAGES.flatMap((s) => s.questions);
  const unitItems = buildUnitExamGroups(ALL_STAGES)
    .flatMap((t) => t.units)
    .flatMap((u) => [...u.twoMarkSection.items, ...u.fiveMarkSection.items]);

  assert.equal(studyQuestions.length, 107);
  assert.equal(unitItems.length, 107);

  const unitByNum = new Map(unitItems.map((item) => [item.question.number, item.question]));
  for (const sq of studyQuestions) {
    const uq = unitByNum.get(sq.number);
    assert.ok(uq, `Missing Q${sq.number} in unit-wise items`);
    assert.equal(uq.question, sq.question);
    assert.equal(uq.questionMathHtml, sq.questionMathHtml);
    assert.equal(uq.orderNote, sq.orderNote);
    assert.equal(uq.sourceTag, sq.sourceTag);
    assert.equal(uq.marks, sq.marks);
  }
});

import {
  formatAppRoute,
  getBreadcrumbs,
  parseAppRoute,
  resolveQuestionContext,
} from './navigation';
import { UNIT_METADATA } from './examView';

test('hash route parser and formatter support full page-by-page hierarchy and legacy hashes', () => {
  assert.deepEqual(parseAppRoute(''), { page: 'home' });
  assert.deepEqual(parseAppRoute('#/'), { page: 'home' });
  assert.deepEqual(parseAppRoute('#study'), { page: 'study-stages' });
  assert.deepEqual(parseAppRoute('#units'), { page: 'units-list' });
  assert.deepEqual(parseAppRoute('#questions'), { page: 'all' });

  const r1 = parseAppRoute('#/study/stage-3/q/10a');
  assert.deepEqual(r1, { page: 'study-question', stageId: 3, questionNumber: '10a' });
  assert.equal(formatAppRoute(r1), '#/study/stage-3/q/10a');

  const r2 = parseAppRoute('#/units/III/5/q/35');
  assert.deepEqual(r2, { page: 'unit-question', unitCode: 'III', marks: 5, questionNumber: 35 });
  assert.equal(formatAppRoute(r2), '#/units/III/5/q/35');

  const r3 = parseAppRoute('#/search?q=bloch%20sphere');
  assert.deepEqual(r3, { page: 'search', query: 'bloch sphere' });
  assert.equal(formatAppRoute(r3), '#/search?q=bloch%20sphere');
});

test('breadcrumbs and sequential Previous/Next context work across Study Order and Unit-wise lists', () => {
  const locMap = getQuestionLocationMap(ALL_STAGES);
  const unitGroups = buildUnitExamGroups(ALL_STAGES).flatMap((t) => t.units);

  const studyRoute = parseAppRoute('#/study/stage-1/q/1a');
  assert.equal(studyRoute.page, 'study-question');
  if (studyRoute.page === 'study-question') {
    const crumbs = getBreadcrumbs(studyRoute, locMap).map((c) => c.label);
    assert.deepEqual(crumbs, ['Home', 'Study Order', 'Stage 1', 'Q1a']);
    const ctx = resolveQuestionContext(ALL_STAGES, studyRoute, locMap, unitGroups)!;
    assert.equal(ctx.backToListHash, '#/study/stage-1');
    assert.equal(ctx.prevQuestion?.questionNumber, 1);
    assert.equal(ctx.nextQuestion?.questionNumber, '1b');
  }

  const unitRoute = parseAppRoute('#/units/III/5/q/35');
  assert.equal(unitRoute.page, 'unit-question');
  if (unitRoute.page === 'unit-question') {
    const crumbs = getBreadcrumbs(unitRoute, locMap).map((c) => c.label);
    assert.equal(crumbs[0], 'Home');
    assert.equal(crumbs[1], 'Unit-wise');
    assert.equal(crumbs[2], 'Unit III');
    assert.equal(crumbs[3], '5 Marks');
    const ctx = resolveQuestionContext(ALL_STAGES, unitRoute, locMap, unitGroups)!;
    assert.equal(ctx.backToListHash, '#/units/III/5');
    assert.ok(ctx.listTotal === 12);
    assert.ok(ctx.prevQuestion || ctx.nextQuestion);
  }
});

test('UNIT_METADATA matches verbatim syllabus titles and 12-18 word unit descriptions', () => {
  assert.deepEqual(
    {
      I: UNIT_METADATA.I.syllabusTitle,
      II: UNIT_METADATA.II.syllabusTitle,
      III: UNIT_METADATA.III.syllabusTitle,
      IV: UNIT_METADATA.IV.syllabusTitle,
      V: UNIT_METADATA.V.syllabusTitle,
    },
    {
      I: 'Fundamentals of Quantum Mechanics',
      II: 'Quantum Information Theory',
      III: 'Quantum Computing',
      IV: 'Quantum Communication',
      V: 'Quantum Technologies and Applications',
    }
  );

  for (const unitCode of ['I', 'II', 'III', 'IV', 'V'] as const) {
    const wc = UNIT_METADATA[unitCode].subtitle.trim().split(/\s+/).length;
    assert.ok(
      wc >= 12 && wc <= 18,
      `Unit ${unitCode} description should be 12-18 words, got ${wc}`
    );
  }
});

test('Stage question totals equal Unit-wise question totals and match total across data', () => {
  const stageTotal = ALL_STAGES.reduce((acc, s) => acc + s.questions.length, 0);
  const unitGroups = buildUnitExamGroups(ALL_STAGES).flatMap((t) => t.units);
  const unitTotal = unitGroups.reduce(
    (acc, u) => acc + u.twoMarkSection.items.length + u.fiveMarkSection.items.length,
    0
  );
  assert.equal(stageTotal, unitTotal);
  assert.ok(stageTotal > 0);
});

test('no old removed UI labels or sidebar copy remain in src or offline-study', () => {
  const forbiddenRe =
    /Write this in the exam|Remember these|Source \(for study|Four Clear Card Sections|Show menu|Hide menu/;

  const walk = (dir: string, acc: string[] = []): string[] => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'images' && entry.name !== 'node_modules' && entry.name !== 'dist') {
          walk(full, acc);
        }
      } else if (/\.(ts|tsx|js|html|css)$/i.test(entry.name) && entry.name !== 'studyLogic.test.ts') {
        acc.push(full);
      }
    }
    return acc;
  };

  const files = [
    ...walk(path.resolve(process.cwd(), 'src')),
    ...walk(path.resolve(process.cwd(), 'offline-study')),
  ];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(content, forbiddenRe, `Found forbidden removed label in ${file}`);
  }
});


