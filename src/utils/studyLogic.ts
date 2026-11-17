import type { MarkValue, QuestionId, StudyQuestion, StudyStage } from '../types/study';

export type MarksFilter = 'all' | '2' | '5';

export interface FilterCriteria {
  searchQuery: string;
  marksFilter: MarksFilter;
  selectedStageId: number | 'all';
  onlyPending?: boolean;
  doneSet?: ReadonlySet<QuestionId>;
  onlyStarred?: boolean;
  starredSet?: ReadonlySet<QuestionId>;
}

export interface FilteredStageResult {
  stage: StudyStage;
  questions: StudyQuestion[];
}

export interface StudyProgressSummary {
  totalQuestions: number;
  doneCount: number;
  starredCount: number;
  percentDone: number;
  twoMarkCount: number;
  fiveMarkCount: number;
}

export function parseQuestionIdToken(raw: unknown): QuestionId | null {
  if (typeof raw === 'number') {
    return Number.isInteger(raw) && raw >= 1 ? raw : null;
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (/^\d+$/.test(trimmed)) {
      const n = Number(trimmed);
      return Number.isInteger(n) && n >= 1 ? n : null;
    }
    if (/^\d+[a-z]+$/i.test(trimmed)) {
      const base = parseInt(trimmed, 10);
      return base >= 1 ? trimmed.toLowerCase() : null;
    }
  }
  return null;
}

function splitQuestionId(id: QuestionId): [number, string] {
  const s = String(id);
  const m = s.match(/^(\d+)([a-z]*)$/i);
  if (!m) return [Number.MAX_SAFE_INTEGER, s];
  return [Number(m[1]), m[2].toLowerCase()];
}

export function compareQuestionIds(a: QuestionId, b: QuestionId): number {
  const [aNum, aSuffix] = splitQuestionId(a);
  const [bNum, bSuffix] = splitQuestionId(b);
  if (aNum !== bNum) return aNum - bNum;
  return aSuffix.localeCompare(bSuffix);
}

/**
 * Strips basic HTML tags and normalizes whitespace so search matches clean math and prose.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesQuestion(
  q: StudyQuestion,
  criteria: FilterCriteria
): boolean {
  if (criteria.marksFilter !== 'all') {
    const targetMark: MarkValue = criteria.marksFilter === '2' ? 2 : 5;
    if (q.marks !== targetMark) {
      return false;
    }
  }

  if (criteria.onlyPending && criteria.doneSet?.has(q.number)) {
    return false;
  }

  if (criteria.onlyStarred && !criteria.starredSet?.has(q.number)) {
    return false;
  }

  const rawQuery = criteria.searchQuery.trim().toLowerCase();
  if (!rawQuery) {
    return true;
  }

  const haystack = [
    String(q.number),
    `q${q.number}`,
    q.question,
    q.sourceTag,
    q.intuition,
    q.studySource ?? '',
    q.rememberThese.join(' '),
    q.sections.map((s) => `${s.label ?? ''} ${stripHtml(s.html)}`).join(' '),
  ]
    .join(' ')
    .toLowerCase();

  const tokens = rawQuery.split(/\s+/).filter(Boolean);
  return tokens.every((tok) => haystack.includes(tok));
}

export function filterStages(
  stages: StudyStage[],
  criteria: FilterCriteria
): FilteredStageResult[] {
  const results: FilteredStageResult[] = [];
  for (const stage of stages) {
    if (
      criteria.selectedStageId !== 'all' &&
      stage.id !== criteria.selectedStageId
    ) {
      continue;
    }
    const matchingQuestions = stage.questions.filter((q) =>
      matchesQuestion(q, criteria)
    );
    if (matchingQuestions.length > 0) {
      results.push({ stage, questions: matchingQuestions });
    }
  }
  return results;
}

export function computeProgressSummary(
  stages: StudyStage[],
  doneNumbers: ReadonlySet<QuestionId>,
  starredNumbers: ReadonlySet<QuestionId> = new Set<QuestionId>()
): StudyProgressSummary {
  let totalQuestions = 0;
  let doneCount = 0;
  let starredCount = 0;
  let twoMarkCount = 0;
  let fiveMarkCount = 0;

  for (const stage of stages) {
    for (const q of stage.questions) {
      totalQuestions += 1;
      if (doneNumbers.has(q.number)) {
        doneCount += 1;
      }
      if (starredNumbers.has(q.number)) {
        starredCount += 1;
      }
      if (q.marks === 2) {
        twoMarkCount += 1;
      } else {
        fiveMarkCount += 1;
      }
    }
  }

  const percentDone =
    totalQuestions === 0 ? 0 : Math.round((doneCount / totalQuestions) * 100);

  return {
    totalQuestions,
    doneCount,
    starredCount,
    percentDone,
    twoMarkCount,
    fiveMarkCount,
  };
}

export function parseDoneStorage(raw: string | null): QuestionId[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid: QuestionId[] = [];
    for (const entry of parsed) {
      const id = parseQuestionIdToken(entry);
      if (id !== null) valid.push(id);
    }
    return Array.from(new Set(valid)).sort(compareQuestionIds);
  } catch {
    return [];
  }
}

export function toggleDoneList(current: QuestionId[], questionNumber: QuestionId): QuestionId[] {
  const set = new Set(current);
  if (set.has(questionNumber)) {
    set.delete(questionNumber);
  } else {
    set.add(questionNumber);
  }
  return Array.from(set).sort(compareQuestionIds);
}
