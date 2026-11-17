import type { MarkValue, QuestionId, StudyQuestion, StudyStage } from '../types/study';
import { matchesQuestion, parseDoneStorage, toggleDoneList, type MarksFilter } from './studyLogic';

export type StudyViewMode = 'study' | 'units';
export type UnitCode = 'I' | 'II' | 'III' | 'IV' | 'V';
export type ExamTerm = 'Mid 1' | 'Mid 2';
export type ThemeMode = 'light' | 'dark';

export interface ParsedSourceTag {
  examTerm: ExamTerm;
  unitCode: UnitCode;
  kind: 'mid1' | 'added' | 'short' | 'long';
  bankNumber: number;
  subLetter?: 'a' | 'b';
  bankLabel: string;
  bankDisplayPrefix: string; // e.g. "5", "1", "1(a)", "PDF Q1"
  bankSortKey: number;
}

export interface QuestionLocationInfo {
  questionNumber: QuestionId;
  stageId: number;
  stageTitle: string;
  examTerm: ExamTerm;
  unitCode: UnitCode;
  marks: MarkValue;
  sectionTitle: '2-Mark Questions' | '5-Mark Questions';
  bankLabel: string;
  bankDisplayPrefix: string;
  sectionNumberPrefix: string; // Independent 1, 2, 3... (or 1(a), 1(b)...) within Unit-wise section
  longGroupNumber?: number;
}

export interface UnitLongPairGroup {
  groupNumber: number;
  groupLabel: string;
  questions: UnitExamQuestionItem[];
}

export interface UnitExamQuestionItem {
  question: StudyQuestion;
  stageId: number;
  stageTitle: string;
  parsedTag: ParsedSourceTag;
  sectionNumberPrefix: string;
  buildsOn: QuestionLocationInfo[];
}

export interface UnitMarksSection {
  id: string; // e.g. "unit-I-2"
  marks: MarkValue;
  title: string; // e.g. "Unit I · 2-Mark Questions"
  shortTitle: '2-Mark Questions' | '5-Mark Questions';
  totalInUnitForMarks: number;
  items: UnitExamQuestionItem[];
  longGroups: UnitLongPairGroup[]; // populated when grouping Mid 2 Long pairs
  ungroupedItems: UnitExamQuestionItem[]; // items without a Long group (e.g. Mid 1 or Mid 2 Short)
}

export interface UnitExamGroup {
  unitCode: UnitCode;
  examTerm: ExamTerm;
  title: string;
  subtitle: string;
  totalQuestions: number;
  doneQuestions: number;
  percentDone: number;
  twoMarkSection: UnitMarksSection;
  fiveMarkSection: UnitMarksSection;
}

export interface ExamTermGroup {
  examTerm: ExamTerm;
  title: string;
  note?: string;
  units: UnitExamGroup[];
}

export interface UnitFilterCriteria {
  searchQuery: string;
  marksFilter: MarksFilter;
  selectedUnitCode: UnitCode | 'all';
  onlyPending?: boolean;
  doneSet?: ReadonlySet<QuestionId>;
  onlyStarred?: boolean;
  starredSet?: ReadonlySet<QuestionId>;
}

export const UNIT_METADATA: Record<
  UnitCode,
  { examTerm: ExamTerm; title: string; subtitle: string }
> = {
  I: {
    examTerm: 'Mid 1',
    title: 'Unit I — Foundations of Quantum Mechanics',
    subtitle: 'Blackbody/photoelectric/Compton foundations, de Broglie waves, Hilbert space, operators, Schrödinger equation & step potential.',
  },
  II: {
    examTerm: 'Mid 1',
    title: 'Unit II — Qubits, Dirac Notation & Quantum Gates',
    subtitle: 'Dirac notation, Bloch sphere, superposition, Pauli/T/CNOT gates, tensor products, H+CNOT circuits & no-cloning.',
  },
  III: {
    examTerm: 'Mid 2',
    title: 'Unit III — Quantum Algorithms & Error Correction',
    subtitle: 'Classical vs quantum computing, parallelism, Deutsch–Jozsa, Grover, QFT, Shor’s algorithm, QEC codes & Qiskit.',
  },
  IV: {
    examTerm: 'Mid 2',
    title: 'Unit IV — Quantum Cryptography & Communication',
    subtitle: 'BB84 & E91 QKD, eavesdropping, quantum teleportation, dense coding, entanglement swapping, repeaters & hardware loss.',
  },
  V: {
    examTerm: 'Mid 2',
    title: 'Unit V — Quantum Sensing, Materials, Hardware & Mission',
    subtitle: 'Quantum sensors, atomic clocks, ghost imaging, topological insulators, NV centers, qubit platforms, NISQ & NQM.',
  },
};

export const UNIT_ORDER: UnitCode[] = ['I', 'II', 'III', 'IV', 'V'];

export const MID1_MARKS_NOTE =
  'Each 2-Mark and 5-Mark section is numbered sequentially starting at 1 (independent of Study Order). Original Mid 1 questions (without printed marks in the Mid 1 PDF) appear first, followed by the Unit I & Unit II 2-mark questions added from the attached answer booklet.';

/**
 * Pedagogical dependency graph strictly referencing earlier questions in the study order (max 3 per question).
 */
export const QUESTION_BUILDS_ON: Record<string, QuestionId[]> = {
  '1': [],
  '1a': [],
  '1b': [1],
  '1c': [1],
  '2': [1],
  '3': [1, 2],
  '3a': [2, 3],
  '4': [],
  '4a': [4],
  '5': [4],
  '5a': [4, 5],
  '5b': [5, '5a'],
  '6': [4, 5],
  '7': [6],
  '8': [4, 6],
  '9': [3, 8],
  '9a': [8, 9],
  '10': [4, 6, 9],
  '10a': [6, 8],
  '10b': [8, '10a'],
  '11': [9],
  '12': [4, 5],
  '12a': [4, 12],
  '13': [12],
  '13a': [12, 13],
  '14': [5, 12],
  '14a': [12, 14],
  '15': [12, 14],
  '15a': [14, 15],
  '15b': [10, 15],
  '16': [5, 12],
  '17': [14, 16],
  '17a': [14, 17],
  '17b': [16, 17],
  '18': [15, 16, 17],
  '18a': [16, 18],
  '19': [12, 17],
  '19a': [19],
  '20': [18, 19],
  '21': [18, 19, 20],
  '21a': [19, 20, 21],
  '22': [18, 19, 21],
  '23': [],
  '24': [15, 23],
  '25': [12, 15, 18],
  '26': [12, 15, 18],
  '27': [15, 16],
  '28': [3, 15],
  '29': [15, 27, 28],
  '30': [27],
  '31': [30],
  '32': [29, 30, 31],
  '33': [29, 31, 32],
  '34': [27, 30],
  '35': [29, 30, 34],
  '36': [15, 28],
  '37': [16, 17, 36],
  '38': [24, 36],
  '39': [29, 36, 37],
  '40': [38, 39],
  '41': [12, 15],
  '42': [14, 41],
  '43': [19, 41, 42],
  '44': [17, 42, 43],
  '45': [43, 44],
  '46': [18, 45],
  '47': [19],
  '48': [19, 47],
  '49': [14, 15, 48],
  '50': [19, 48, 49],
  '51': [19, 49, 50],
  '52': [19, 50, 51],
  '53': [40, 47, 52],
  '54': [18, 48],
  '55': [18, 48, 54],
  '56': [50, 52, 55],
  '57': [18],
  '58': [14, 18, 57],
  '59': [18, 22, 58],
  '60': [18],
  '61': [18, 22, 60],
  '62': [60, 61],
  '63': [22, 60, 62],
  '64': [1, 48, 63],
  '65': [41, 63, 64],
  '66': [15],
  '67': [66],
  '68': [28, 66, 67],
  '69': [66],
  '70': [15, 66, 69],
  '71': [18],
  '72': [18, 71],
  '73': [9, 11],
  '74': [],
  '75': [73, 74],
  '76': [66],
  '77': [66, 68, 76],
  '78': [12],
  '79': [12, 41, 78],
  '80': [18, 64, 78],
  '81': [79, 80],
  '82': [24, 39],
  '83': [41, 43],
  '84': [41, 43, 83],
  '85': [79, 82, 84],
  '86': [],
  '87': [40, 53, 86],
};

export function parseSourceTag(sourceTag: string): ParsedSourceTag {
  const addedMatch = sourceTag.match(
    /^Added from attached PDF\s*·\s*Unit ([IVX]+)\s*·\s*Q(\d+)$/
  );
  if (addedMatch) {
    const unitCode = addedMatch[1] as UnitCode;
    const bankNumber = Number(addedMatch[2]);
    return {
      examTerm: unitCode === 'I' || unitCode === 'II' ? 'Mid 1' : 'Mid 2',
      unitCode,
      kind: 'added',
      bankNumber,
      bankLabel: `PDF Short Q${bankNumber}`,
      bankDisplayPrefix: String(bankNumber),
      bankSortKey: 500 + bankNumber * 10,
    };
  }

  const match = sourceTag.match(/^(Mid [12])\s*·\s*Unit ([IVX]+)\s*·\s*(.+)$/);
  if (!match) {
    throw new Error(`Invalid sourceTag format: "${sourceTag}"`);
  }
  const examTerm = match[1] as ExamTerm;
  const unitCode = match[2] as UnitCode;
  const tail = match[3].trim();

  if (examTerm === 'Mid 1') {
    const qMatch = tail.match(/^Q(\d+)$/);
    const bankNumber = qMatch ? Number(qMatch[1]) : 999;
    return {
      examTerm,
      unitCode,
      kind: 'mid1',
      bankNumber,
      bankLabel: tail,
      bankDisplayPrefix: String(bankNumber),
      bankSortKey: bankNumber * 10,
    };
  }

  const shortMatch = tail.match(/^Short Q(\d+)$/);
  if (shortMatch) {
    const bankNumber = Number(shortMatch[1]);
    return {
      examTerm,
      unitCode,
      kind: 'short',
      bankNumber,
      bankLabel: tail,
      bankDisplayPrefix: String(bankNumber),
      bankSortKey: bankNumber * 10,
    };
  }

  const longMatch = tail.match(/^Long Q(\d+)\(([ab])\)$/);
  if (longMatch) {
    const bankNumber = Number(longMatch[1]);
    const subLetter = longMatch[2] as 'a' | 'b';
    return {
      examTerm,
      unitCode,
      kind: 'long',
      bankNumber,
      subLetter,
      bankLabel: tail,
      bankDisplayPrefix: `${bankNumber}(${subLetter})`,
      bankSortKey: 1000 + bankNumber * 10 + (subLetter === 'a' ? 1 : 2),
    };
  }

  throw new Error(`Unrecognized Mid 2 tail in sourceTag: "${sourceTag}"`);
}

function computeSectionPrefixMap(
  stages: StudyStage[]
): Map<QuestionId, string> {
  const buckets = new Map<string, Array<{ qNum: QuestionId; parsed: ParsedSourceTag }>>();
  for (const stage of stages) {
    for (const q of stage.questions) {
      const parsed = parseSourceTag(q.sourceTag);
      const key = `${parsed.unitCode}-${q.marks}`;
      const list = buckets.get(key) ?? [];
      list.push({ qNum: q.number, parsed });
      buckets.set(key, list);
    }
  }

  const prefixMap = new Map<QuestionId, string>();
  for (const list of buckets.values()) {
    list.sort((a, b) => a.parsed.bankSortKey - b.parsed.bankSortKey);
    const hasLong = list.some((item) => item.parsed.kind === 'long');
    if (hasLong) {
      const groupNums = Array.from(
        new Set(list.filter((i) => i.parsed.kind === 'long').map((i) => i.parsed.bankNumber))
      ).sort((a, b) => a - b);
      const groupSeq = new Map<number, number>();
      groupNums.forEach((g, idx) => groupSeq.set(g, idx + 1));

      let nonLongIdx = 0;
      for (const item of list) {
        if (item.parsed.kind === 'long') {
          const seq = groupSeq.get(item.parsed.bankNumber) ?? item.parsed.bankNumber;
          prefixMap.set(item.qNum, `${seq}(${item.parsed.subLetter})`);
        } else {
          nonLongIdx += 1;
          prefixMap.set(item.qNum, String(nonLongIdx));
        }
      }
    } else {
      list.forEach((item, idx) => {
        prefixMap.set(item.qNum, String(idx + 1));
      });
    }
  }
  return prefixMap;
}

export function getQuestionLocationMap(
  stages: StudyStage[]
): Map<QuestionId, QuestionLocationInfo> {
  const sectionPrefixMap = computeSectionPrefixMap(stages);
  const map = new Map<QuestionId, QuestionLocationInfo>();
  for (const stage of stages) {
    for (const q of stage.questions) {
      const parsed = parseSourceTag(q.sourceTag);
      map.set(q.number, {
        questionNumber: q.number,
        stageId: stage.id,
        stageTitle: stage.title,
        examTerm: parsed.examTerm,
        unitCode: parsed.unitCode,
        marks: q.marks,
        sectionTitle: q.marks === 2 ? '2-Mark Questions' : '5-Mark Questions',
        bankLabel: parsed.bankLabel,
        bankDisplayPrefix: parsed.bankDisplayPrefix,
        sectionNumberPrefix: sectionPrefixMap.get(q.number) ?? parsed.bankDisplayPrefix,
        longGroupNumber: parsed.kind === 'long' ? parsed.bankNumber : undefined,
      });
    }
  }
  return map;
}

function buildUnitSection(
  unitCode: UnitCode,
  marks: MarkValue,
  allItemsForSection: UnitExamQuestionItem[],
  filteredItemsForSection: UnitExamQuestionItem[]
): UnitMarksSection {
  const shortTitle = marks === 2 ? '2-Mark Questions' : '5-Mark Questions';
  const sortedFiltered = filteredItemsForSection
    .slice()
    .sort((a, b) => a.parsedTag.bankSortKey - b.parsedTag.bankSortKey);

  const longGroupsMap = new Map<number, UnitExamQuestionItem[]>();
  const ungroupedItems: UnitExamQuestionItem[] = [];

  for (const item of sortedFiltered) {
    if (item.parsedTag.kind === 'long') {
      const groupNum = item.parsedTag.bankNumber;
      const arr = longGroupsMap.get(groupNum) ?? [];
      arr.push(item);
      longGroupsMap.set(groupNum, arr);
    } else {
      ungroupedItems.push(item);
    }
  }

  const longGroups: UnitLongPairGroup[] = Array.from(longGroupsMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([groupNumber, questions], idx) => ({
      groupNumber,
      groupLabel: `Long Q${idx + 1}`,
      questions,
    }));

  return {
    id: `unit-${unitCode}-${marks}`,
    marks,
    title: `Unit ${unitCode} · ${shortTitle}`,
    shortTitle,
    totalInUnitForMarks: allItemsForSection.length,
    items: sortedFiltered,
    longGroups,
    ungroupedItems,
  };
}

export function buildUnitExamGroups(
  stages: StudyStage[],
  criteria: UnitFilterCriteria = {
    searchQuery: '',
    marksFilter: 'all',
    selectedUnitCode: 'all',
  }
): ExamTermGroup[] {
  const locMap = getQuestionLocationMap(stages);
  const byUnit = new Map<UnitCode, UnitExamQuestionItem[]>();
  for (const u of UNIT_ORDER) {
    byUnit.set(u, []);
  }

  for (const stage of stages) {
    for (const q of stage.questions) {
      const parsedTag = parseSourceTag(q.sourceTag);
      const loc = locMap.get(q.number);
      const depIds = QUESTION_BUILDS_ON[String(q.number)] ?? [];
      const buildsOn = depIds
        .map((id) => locMap.get(id))
        .filter((info): info is QuestionLocationInfo => Boolean(info));

      byUnit.get(parsedTag.unitCode)!.push({
        question: q,
        stageId: stage.id,
        stageTitle: stage.title,
        parsedTag,
        sectionNumberPrefix: loc?.sectionNumberPrefix ?? parsedTag.bankDisplayPrefix,
        buildsOn,
      });
    }
  }

  const doneSet = criteria.doneSet ?? new Set<QuestionId>();

  const buildUnitGroup = (unitCode: UnitCode): UnitExamGroup | null => {
    if (
      criteria.selectedUnitCode !== 'all' &&
      criteria.selectedUnitCode !== unitCode
    ) {
      return null;
    }

    const allInUnit = byUnit.get(unitCode) ?? [];
    const totalQuestions = allInUnit.length;
    const doneQuestions = allInUnit.filter((item) =>
      doneSet.has(item.question.number)
    ).length;
    const percentDone =
      totalQuestions === 0
        ? 0
        : Math.round((doneQuestions / totalQuestions) * 100);

    const matchingInUnit = allInUnit.filter((item) =>
      matchesQuestion(item.question, {
        searchQuery: criteria.searchQuery,
        marksFilter: criteria.marksFilter,
        selectedStageId: 'all',
        onlyPending: criteria.onlyPending,
        doneSet: criteria.doneSet,
        onlyStarred: criteria.onlyStarred,
        starredSet: criteria.starredSet,
      })
    );

    const hasActiveSearchOrFilter =
      criteria.searchQuery.trim().length > 0 ||
      criteria.marksFilter !== 'all' ||
      Boolean(criteria.onlyPending) ||
      Boolean(criteria.onlyStarred);

    if (hasActiveSearchOrFilter && matchingInUnit.length === 0) {
      return null;
    }

    const allTwo = allInUnit.filter((i) => i.question.marks === 2);
    const allFive = allInUnit.filter((i) => i.question.marks === 5);
    const matchTwo = matchingInUnit.filter((i) => i.question.marks === 2);
    const matchFive = matchingInUnit.filter((i) => i.question.marks === 5);

    const meta = UNIT_METADATA[unitCode];

    return {
      unitCode,
      examTerm: meta.examTerm,
      title: meta.title,
      subtitle: meta.subtitle,
      totalQuestions,
      doneQuestions,
      percentDone,
      twoMarkSection: buildUnitSection(unitCode, 2, allTwo, matchTwo),
      fiveMarkSection: buildUnitSection(unitCode, 5, allFive, matchFive),
    };
  };

  const mid1Units = (['I', 'II'] as UnitCode[])
    .map(buildUnitGroup)
    .filter((g): g is UnitExamGroup => Boolean(g));
  const mid2Units = (['III', 'IV', 'V'] as UnitCode[])
    .map(buildUnitGroup)
    .filter((g): g is UnitExamGroup => Boolean(g));

  const termGroups: ExamTermGroup[] = [];
  if (mid1Units.length > 0) {
    termGroups.push({
      examTerm: 'Mid 1',
      title: 'Mid 1 (Units I & II)',
      note: MID1_MARKS_NOTE,
      units: mid1Units,
    });
  }
  if (mid2Units.length > 0) {
    termGroups.push({
      examTerm: 'Mid 2',
      title: 'Mid 2 (Units III, IV & V)',
      units: mid2Units,
    });
  }

  return termGroups;
}

export function parseViewHash(hash: string): StudyViewMode | null {
  const clean = hash.trim().toLowerCase();
  if (clean === '#units' || clean.startsWith('#units/')) return 'units';
  if (clean === '#study' || clean.startsWith('#study/')) return 'study';
  return null;
}

export function formatViewHash(mode: StudyViewMode): string {
  return mode === 'units' ? '#units' : '#study';
}

export function parseViewStorage(raw: string | null): StudyViewMode | null {
  if (raw === 'study' || raw === 'units') return raw;
  return null;
}

export function parseThemeStorage(raw: string | null): ThemeMode | null {
  if (raw === 'light' || raw === 'dark') return raw;
  return null;
}

export function parseStarStorage(raw: string | null): QuestionId[] {
  return parseDoneStorage(raw);
}

export function toggleStarList(current: QuestionId[], questionNumber: QuestionId): QuestionId[] {
  return toggleDoneList(current, questionNumber);
}

export function parseSidebarStorage(raw: string | null): boolean {
  if (raw === 'false') return false;
  return true;
}
