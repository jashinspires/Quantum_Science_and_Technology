import type { MarkValue, QuestionId, StudyQuestion, StudyStage } from '../types/study';
import { filterStages, parseQuestionIdToken, type MarksFilter } from './studyLogic';
import {
  buildUnitExamGroups,
  UNIT_METADATA,
  UNIT_ORDER,
  type QuestionLocationInfo,
  type UnitCode,
  type UnitExamGroup,
} from './examView';

export type AllRouteScope = 'both' | 'study' | 'units';

export type AppRoute =
  | { page: 'home' }
  | { page: 'study-stages' }
  | { page: 'study-stage'; stageId: number }
  | { page: 'study-question'; stageId: number; questionNumber: QuestionId }
  | { page: 'units-list' }
  | { page: 'unit-marks'; unitCode: UnitCode }
  | { page: 'unit-questions'; unitCode: UnitCode; marks: MarkValue }
  | { page: 'unit-question'; unitCode: UnitCode; marks: MarkValue; questionNumber: QuestionId }
  | { page: 'all'; scope?: AllRouteScope }
  | { page: 'all-question'; questionNumber: QuestionId; scope?: AllRouteScope }
  | { page: 'search'; query: string }
  | { page: 'search-question'; query: string; questionNumber: QuestionId }
  | { page: 'guide' }
  | { page: 'sources' };

export interface BreadcrumbItem {
  label: string;
  hash: string;
  isCurrent: boolean;
}

export interface QuestionListItem {
  question: StudyQuestion;
  stageId: number;
  displayPrefix: string;
  targetHash: string;
  metaLabel: string;
}

export interface QuestionNavigationContext {
  question: StudyQuestion;
  stageId: number;
  displayPrefix: string;
  metaLabel: string;
  backToListHash: string;
  prevQuestion: { questionNumber: QuestionId; hash: string; label: string } | null;
  nextQuestion: { questionNumber: QuestionId; hash: string; label: string } | null;
  listIndex: number;
  listTotal: number;
  buildsOn: QuestionLocationInfo[];
}

function normalizeUnitCode(raw: string | undefined): UnitCode | null {
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();
  if (upper === 'I' || upper === 'II' || upper === 'III' || upper === 'IV' || upper === 'V') {
    return upper;
  }
  return null;
}

export function parseAppRoute(hash: string): AppRoute {
  const raw = String(hash || '').trim();
  if (!raw || raw === '#' || raw === '#/') {
    return { page: 'home' };
  }

  // Legacy single-segment compatibility
  const lower = raw.toLowerCase();
  if (lower === '#study') return { page: 'study-stages' };
  if (lower === '#units') return { page: 'units-list' };
  if (lower === '#questions') return { page: 'all' };

  const withoutHash = raw.startsWith('#') ? raw.slice(1) : raw;
  const [pathPart, queryPart = ''] = withoutHash.split('?');
  const segments = pathPart.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { page: 'home' };
  }

  const head = segments[0].toLowerCase();

  if (head === 'guide') {
    return { page: 'guide' };
  }

  if (head === 'sources') {
    return { page: 'sources' };
  }

  if (head === 'study') {
    if (segments.length === 1) {
      return { page: 'study-stages' };
    }
    const stageMatch = segments[1].match(/^stage-(\d+)$/i);
    const stageId = stageMatch ? Number(stageMatch[1]) : NaN;
    if (!Number.isInteger(stageId) || stageId < 1) {
      return { page: 'study-stages' };
    }
    if (segments.length >= 4 && segments[2].toLowerCase() === 'q') {
      const qNum = parseQuestionIdToken(decodeURIComponent(segments[3]));
      if (qNum !== null) {
        return { page: 'study-question', stageId, questionNumber: qNum };
      }
    }
    return { page: 'study-stage', stageId };
  }

  if (head === 'units') {
    if (segments.length === 1) {
      return { page: 'units-list' };
    }
    const unitCode = normalizeUnitCode(segments[1]);
    if (!unitCode) {
      return { page: 'units-list' };
    }
    if (segments.length === 2) {
      return { page: 'unit-marks', unitCode };
    }
    const marksRaw = segments[2];
    const marks: MarkValue | null = marksRaw === '2' ? 2 : marksRaw === '5' ? 5 : null;
    if (!marks) {
      return { page: 'unit-marks', unitCode };
    }
    if (segments.length >= 5 && segments[3].toLowerCase() === 'q') {
      const qNum = parseQuestionIdToken(decodeURIComponent(segments[4]));
      if (qNum !== null) {
        return { page: 'unit-question', unitCode, marks, questionNumber: qNum };
      }
    }
    return { page: 'unit-questions', unitCode, marks };
  }

  if (head === 'all') {
    const params = new URLSearchParams(queryPart);
    const scopeParam = params.get('scope');
    const scope: AllRouteScope | undefined =
      scopeParam === 'study' || scopeParam === 'units' || scopeParam === 'both'
        ? scopeParam
        : undefined;

    if (segments.length >= 3 && segments[1].toLowerCase() === 'q') {
      const qNum = parseQuestionIdToken(decodeURIComponent(segments[2]));
      if (qNum !== null) {
        return { page: 'all-question', questionNumber: qNum, scope };
      }
    }
    return { page: 'all', scope };
  }

  if (head === 'search') {
    const params = new URLSearchParams(queryPart);
    const query = params.get('q') ?? '';
    if (segments.length >= 3 && segments[1].toLowerCase() === 'q') {
      const qNum = parseQuestionIdToken(decodeURIComponent(segments[2]));
      if (qNum !== null) {
        return { page: 'search-question', query, questionNumber: qNum };
      }
    }
    return { page: 'search', query };
  }

  return { page: 'home' };
}

export function formatAppRoute(route: AppRoute): string {
  switch (route.page) {
    case 'home':
      return '#/';
    case 'study-stages':
      return '#/study';
    case 'study-stage':
      return `#/study/stage-${route.stageId}`;
    case 'study-question':
      return `#/study/stage-${route.stageId}/q/${encodeURIComponent(String(route.questionNumber))}`;
    case 'units-list':
      return '#/units';
    case 'unit-marks':
      return `#/units/${route.unitCode}`;
    case 'unit-questions':
      return `#/units/${route.unitCode}/${route.marks}`;
    case 'unit-question':
      return `#/units/${route.unitCode}/${route.marks}/q/${encodeURIComponent(String(route.questionNumber))}`;
    case 'all': {
      if (route.scope && route.scope !== 'both') {
        return `#/all?scope=${route.scope}`;
      }
      return '#/all';
    }
    case 'all-question': {
      const base = `#/all/q/${encodeURIComponent(String(route.questionNumber))}`;
      return route.scope && route.scope !== 'both' ? `${base}?scope=${route.scope}` : base;
    }
    case 'search': {
      const trimmed = route.query.trim();
      return trimmed ? `#/search?q=${encodeURIComponent(trimmed)}` : '#/search';
    }
    case 'search-question': {
      const trimmed = route.query.trim();
      const base = `#/search/q/${encodeURIComponent(String(route.questionNumber))}`;
      return trimmed ? `${base}?q=${encodeURIComponent(trimmed)}` : base;
    }
    case 'guide':
      return '#/guide';
    case 'sources':
      return '#/sources';
  }
}

export function getBreadcrumbs(
  route: AppRoute,
  locationMap?: Map<QuestionId, QuestionLocationInfo>
): BreadcrumbItem[] {
  const home: BreadcrumbItem = {
    label: 'Home',
    hash: '#/',
    isCurrent: route.page === 'home',
  };
  if (route.page === 'home') {
    return [home];
  }

  const items: BreadcrumbItem[] = [{ ...home, isCurrent: false }];

  switch (route.page) {
    case 'study-stages':
      items.push({ label: 'Study Order', hash: '#/study', isCurrent: true });
      break;
    case 'study-stage':
      items.push({ label: 'Study Order', hash: '#/study', isCurrent: false });
      items.push({
        label: `Stage ${route.stageId}`,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    case 'study-question':
      items.push({ label: 'Study Order', hash: '#/study', isCurrent: false });
      items.push({
        label: `Stage ${route.stageId}`,
        hash: `#/study/stage-${route.stageId}`,
        isCurrent: false,
      });
      items.push({
        label: `Q${route.questionNumber}`,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    case 'units-list':
      items.push({ label: 'Unit-wise', hash: '#/units', isCurrent: true });
      break;
    case 'unit-marks':
      items.push({ label: 'Unit-wise', hash: '#/units', isCurrent: false });
      items.push({
        label: `Unit ${route.unitCode}`,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    case 'unit-questions':
      items.push({ label: 'Unit-wise', hash: '#/units', isCurrent: false });
      items.push({
        label: `Unit ${route.unitCode}`,
        hash: `#/units/${route.unitCode}`,
        isCurrent: false,
      });
      items.push({
        label: `${route.marks} Marks`,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    case 'unit-question': {
      items.push({ label: 'Unit-wise', hash: '#/units', isCurrent: false });
      items.push({
        label: `Unit ${route.unitCode}`,
        hash: `#/units/${route.unitCode}`,
        isCurrent: false,
      });
      items.push({
        label: `${route.marks} Marks`,
        hash: `#/units/${route.unitCode}/${route.marks}`,
        isCurrent: false,
      });
      const loc = locationMap?.get(route.questionNumber);
      const qLabel = loc ? `#${loc.sectionNumberPrefix}` : `Q${route.questionNumber}`;
      items.push({
        label: qLabel,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    }
    case 'all':
      items.push({ label: 'All Questions', hash: formatAppRoute(route), isCurrent: true });
      break;
    case 'all-question':
      items.push({
        label: 'All Questions',
        hash: formatAppRoute({ page: 'all', scope: route.scope }),
        isCurrent: false,
      });
      items.push({
        label: `Q${route.questionNumber}`,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    case 'search':
      items.push({ label: 'Search', hash: formatAppRoute(route), isCurrent: true });
      break;
    case 'search-question':
      items.push({
        label: 'Search',
        hash: formatAppRoute({ page: 'search', query: route.query }),
        isCurrent: false,
      });
      items.push({
        label: `Q${route.questionNumber}`,
        hash: formatAppRoute(route),
        isCurrent: true,
      });
      break;
    case 'guide':
      items.push({ label: 'Start Here', hash: '#/guide', isCurrent: true });
      break;
    case 'sources':
      items.push({ label: 'Sources', hash: '#/sources', isCurrent: true });
      break;
  }

  return items;
}

export function getStageListItems(stage: StudyStage): QuestionListItem[] {
  return stage.questions.map((q) => ({
    question: q,
    stageId: stage.id,
    displayPrefix: `Q${q.number}`,
    targetHash: formatAppRoute({
      page: 'study-question',
      stageId: stage.id,
      questionNumber: q.number,
    }),
    metaLabel: `Question ${q.number}`,
  }));
}

export function getUnitSectionListItems(
  unitGroup: UnitExamGroup,
  marks: MarkValue
): QuestionListItem[] {
  const section = marks === 2 ? unitGroup.twoMarkSection : unitGroup.fiveMarkSection;
  return section.items.map((item) => ({
    question: item.question,
    stageId: item.stageId,
    displayPrefix: item.sectionNumberPrefix,
    targetHash: formatAppRoute({
      page: 'unit-question',
      unitCode: unitGroup.unitCode,
      marks,
      questionNumber: item.question.number,
    }),
    metaLabel: item.parsedTag.bankLabel,
  }));
}

export function getAllQuestionsOrderedList(
  stages: StudyStage[],
  scope: AllRouteScope = 'both',
  filters: {
    searchQuery?: string;
    marksFilter?: MarksFilter;
    onlyPending?: boolean;
    doneSet?: ReadonlySet<QuestionId>;
    onlyStarred?: boolean;
    starredSet?: ReadonlySet<QuestionId>;
  } = {}
): QuestionListItem[] {
  const criteria = {
    searchQuery: filters.searchQuery ?? '',
    marksFilter: filters.marksFilter ?? 'all',
    onlyPending: filters.onlyPending,
    doneSet: filters.doneSet,
    onlyStarred: filters.onlyStarred,
    starredSet: filters.starredSet,
  };

  if (scope === 'units') {
    const terms = buildUnitExamGroups(stages, {
      ...criteria,
      selectedUnitCode: 'all',
    });
    const out: QuestionListItem[] = [];
    for (const term of terms) {
      for (const unit of term.units) {
        for (const sec of [unit.twoMarkSection, unit.fiveMarkSection]) {
          for (const item of sec.items) {
            out.push({
              question: item.question,
              stageId: item.stageId,
              displayPrefix: `Unit ${unit.unitCode} · ${sec.marks}M · #${item.sectionNumberPrefix}`,
              targetHash: formatAppRoute({
                page: 'all-question',
                questionNumber: item.question.number,
                scope: 'units',
              }),
              metaLabel: item.parsedTag.bankLabel,
            });
          }
        }
      }
    }
    return out;
  }

  const filteredStages = filterStages(stages, {
    ...criteria,
    selectedStageId: 'all',
  });
  const out: QuestionListItem[] = [];
  for (const entry of filteredStages) {
    for (const q of entry.questions) {
      out.push({
        question: q,
        stageId: entry.stage.id,
        displayPrefix: `Q${q.number}`,
        targetHash: formatAppRoute({
          page: 'all-question',
          questionNumber: q.number,
          scope: scope === 'study' ? 'study' : undefined,
        }),
        metaLabel: `Stage ${entry.stage.id} · Question ${q.number}`,
      });
    }
  }
  return out;
}

export function getSearchQuestionItems(
  stages: StudyStage[],
  query: string,
  filters: {
    marksFilter?: MarksFilter;
    onlyPending?: boolean;
    doneSet?: ReadonlySet<QuestionId>;
    onlyStarred?: boolean;
    starredSet?: ReadonlySet<QuestionId>;
  } = {}
): QuestionListItem[] {
  const filteredStages = filterStages(stages, {
    searchQuery: query,
    marksFilter: filters.marksFilter ?? 'all',
    selectedStageId: 'all',
    onlyPending: filters.onlyPending,
    doneSet: filters.doneSet,
    onlyStarred: filters.onlyStarred,
    starredSet: filters.starredSet,
  });

  const out: QuestionListItem[] = [];
  for (const entry of filteredStages) {
    for (const q of entry.questions) {
      out.push({
        question: q,
        stageId: entry.stage.id,
        displayPrefix: `Q${q.number}`,
        targetHash: formatAppRoute({
          page: 'search-question',
          query,
          questionNumber: q.number,
        }),
        metaLabel: `Stage ${entry.stage.id} · Question ${q.number}`,
      });
    }
  }
  return out;
}

export function resolveQuestionContext(
  stages: StudyStage[],
  route: Extract<
    AppRoute,
    { page: 'study-question' | 'unit-question' | 'all-question' | 'search-question' }
  >,
  locationMap: Map<QuestionId, QuestionLocationInfo>,
  unitGroupsAll: UnitExamGroup[]
): QuestionNavigationContext | null {
  let list: QuestionListItem[] = [];
  let backToListHash = '#/';

  if (route.page === 'study-question') {
    const stage = stages.find((s) => s.id === route.stageId);
    if (!stage) return null;
    list = getStageListItems(stage);
    backToListHash = formatAppRoute({ page: 'study-stage', stageId: route.stageId });
  } else if (route.page === 'unit-question') {
    const unitGroup = unitGroupsAll.find((u) => u.unitCode === route.unitCode);
    if (!unitGroup) return null;
    list = getUnitSectionListItems(unitGroup, route.marks);
    backToListHash = formatAppRoute({
      page: 'unit-questions',
      unitCode: route.unitCode,
      marks: route.marks,
    });
  } else if (route.page === 'all-question') {
    list = getAllQuestionsOrderedList(stages, route.scope ?? 'both');
    backToListHash = formatAppRoute({ page: 'all', scope: route.scope });
  } else {
    list = getSearchQuestionItems(stages, route.query);
    backToListHash = formatAppRoute({ page: 'search', query: route.query });
  }

  let idx = list.findIndex((item) => item.question.number === route.questionNumber);
  if (idx === -1) {
    // Fallback if query filters excluded current question on reload
    const allList = getAllQuestionsOrderedList(stages, 'study');
    const fallbackIdx = allList.findIndex((i) => i.question.number === route.questionNumber);
    if (fallbackIdx === -1) return null;
    list = allList;
    idx = fallbackIdx;
  }

  const current = list[idx];
  const prevItem = idx > 0 ? list[idx - 1] : null;
  const nextItem = idx < list.length - 1 ? list[idx + 1] : null;

  const loc = locationMap.get(current.question.number);
  const unitGroup = loc ? unitGroupsAll.find((u) => u.unitCode === loc.unitCode) : undefined;
  const unitSec = unitGroup
    ? loc?.marks === 2
      ? unitGroup.twoMarkSection
      : unitGroup.fiveMarkSection
    : undefined;
  const examItem = unitSec?.items.find((i) => i.question.number === current.question.number);

  return {
    question: current.question,
    stageId: current.stageId,
    displayPrefix:
      route.page === 'unit-question' && examItem
        ? examItem.sectionNumberPrefix
        : String(current.question.number),
    metaLabel: current.metaLabel,
    backToListHash,
    prevQuestion: prevItem
      ? {
          questionNumber: prevItem.question.number,
          hash: prevItem.targetHash,
          label: prevItem.displayPrefix,
        }
      : null,
    nextQuestion: nextItem
      ? {
          questionNumber: nextItem.question.number,
          hash: nextItem.targetHash,
          label: nextItem.displayPrefix,
        }
      : null,
    listIndex: idx,
    listTotal: list.length,
    buildsOn: examItem?.buildsOn ?? [],
  };
}

export function getUnitDisplayInfo(unitCode: UnitCode) {
  return UNIT_METADATA[unitCode];
}

export function getAllUnitCodes(): UnitCode[] {
  return UNIT_ORDER;
}
