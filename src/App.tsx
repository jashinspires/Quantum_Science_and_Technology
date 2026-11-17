import { useCallback, useEffect, useMemo, useState } from 'react';
import { ALL_STAGES } from './data/stages';
import type { QuestionId, QuestionImage } from './types/study';
import {
  computeProgressSummary,
  parseDoneStorage,
  toggleDoneList,
} from './utils/studyLogic';
import {
  buildUnitExamGroups,
  getQuestionLocationMap,
  parseStarStorage,
  parseThemeStorage,
  toggleStarList,
  UNIT_ORDER,
  type ThemeMode,
} from './utils/examView';
import {
  formatAppRoute,
  getBreadcrumbs,
  parseAppRoute,
  resolveQuestionContext,
  type AllRouteScope,
  type AppRoute,
} from './utils/navigation';
import { TopBar } from './components/TopBar';
import { HomeView } from './components/HomeView';
import { StageQuestionsView, StudyStagesView } from './components/StudyStagesView';
import {
  UnitMarksPickerView,
  UnitQuestionsListView,
  UnitsListView,
} from './components/UnitsBrowserView';
import { QuestionReaderView } from './components/QuestionReaderView';
import { AllQuestionsView } from './components/AllQuestionsView';
import { StartHereView } from './components/StartHereView';
import { HelpModal } from './components/HelpModal';
import { LightboxModal } from './components/LightboxModal';

const DONE_STORAGE_KEY = 'qst_exam_done_v1';
const STAR_STORAGE_KEY = 'qst_exam_starred_v1';
const THEME_STORAGE_KEY = 'qst_theme_v1';

function getInitialThemeMode(): ThemeMode {
  try {
    const saved = parseThemeStorage(window.localStorage.getItem(THEME_STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // Ignore storage errors
  }
  return 'light';
}

function readRouteFromWindow(): AppRoute {
  try {
    return parseAppRoute(window.location.hash);
  } catch {
    return { page: 'home' };
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(readRouteFromWindow);
  const [theme, setTheme] = useState<ThemeMode>(getInitialThemeMode);
  const [searchInput, setSearchInput] = useState<string>(() => {
    const initial = readRouteFromWindow();
    return initial.page === 'search' || initial.page === 'search-question'
      ? initial.query
      : '';
  });
  const [practiceMode, setPracticeMode] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<QuestionId[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<QuestionImage | null>(null);

  const [doneNumbers, setDoneNumbers] = useState<QuestionId[]>(() => {
    try {
      return parseDoneStorage(window.localStorage.getItem(DONE_STORAGE_KEY));
    } catch {
      return [];
    }
  });

  const [starredNumbers, setStarredNumbers] = useState<QuestionId[]>(() => {
    try {
      return parseStarStorage(window.localStorage.getItem(STAR_STORAGE_KEY));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(doneNumbers));
    } catch {
      // Ignore storage quota errors
    }
  }, [doneNumbers]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STAR_STORAGE_KEY, JSON.stringify(starredNumbers));
    } catch {
      // Ignore storage quota errors
    }
  }, [starredNumbers]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  // Listen to browser hashchange (Back/Forward buttons + anchor links)
  useEffect(() => {
    const handleHashChange = () => {
      const next = readRouteFromWindow();
      setRoute(next);
      if (next.page === 'search' || next.page === 'search-question') {
        setSearchInput(next.query);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure canonical #/ hash when page loads without a hash
  useEffect(() => {
    try {
      if (!window.location.hash) {
        window.history.replaceState(null, '', '#/');
      }
    } catch {
      // Ignore history errors
    }
  }, []);

  const navigateTo = useCallback((nextRoute: AppRoute, replace = false) => {
    const targetHash = formatAppRoute(nextRoute);
    try {
      if (replace) {
        window.history.replaceState(null, '', targetHash);
      } else if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    } catch {
      window.location.hash = targetHash;
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const doneSet = useMemo(() => new Set(doneNumbers), [doneNumbers]);
  const starredSet = useMemo(() => new Set(starredNumbers), [starredNumbers]);
  const revealedSet = useMemo(() => new Set(revealedQuestions), [revealedQuestions]);

  const locationMap = useMemo(() => getQuestionLocationMap(ALL_STAGES), []);

  const summary = useMemo(
    () => computeProgressSummary(ALL_STAGES, doneSet, starredSet),
    [doneSet, starredSet]
  );

  const unitGroupsAll = useMemo(
    () =>
      buildUnitExamGroups(ALL_STAGES, {
        searchQuery: '',
        marksFilter: 'all',
        selectedUnitCode: 'all',
        doneSet,
      }).flatMap((t) => t.units),
    [doneSet]
  );

  const breadcrumbs = useMemo(
    () => getBreadcrumbs(route, locationMap),
    [route, locationMap]
  );

  const handleToggleDone = useCallback((questionNumber: QuestionId) => {
    setDoneNumbers((prev) => toggleDoneList(prev, questionNumber));
  }, []);

  const handleToggleStar = useCallback((questionNumber: QuestionId) => {
    setStarredNumbers((prev) => toggleStarList(prev, questionNumber));
  }, []);

  const handleTogglePracticeMode = useCallback(() => {
    setPracticeMode((prev) => !prev);
    setRevealedQuestions([]);
  }, []);

  const handleToggleReveal = useCallback((questionNumber: QuestionId) => {
    setRevealedQuestions((prev) =>
      prev.includes(questionNumber)
        ? prev.filter((n) => n !== questionNumber)
        : [...prev, questionNumber]
    );
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (route.page === 'search') {
      navigateTo({ page: 'search', query: val }, true);
    }
  };

  const handleSearchSubmit = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) {
      navigateTo({ page: 'all' });
      return;
    }
    navigateTo({ page: 'search', query: trimmed });
  };

  const handleScopeChange = (scope: AllRouteScope) => {
    navigateTo({ page: 'all', scope });
  };

  const renderPage = () => {
    if (route.page === 'home') {
      return (
        <HomeView
          summary={summary}
          stageCount={ALL_STAGES.length}
          unitCount={UNIT_ORDER.length}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          onResetProgress={() => setDoneNumbers([])}
        />
      );
    }

    if (route.page === 'study-stages') {
      return <StudyStagesView stages={ALL_STAGES} doneSet={doneSet} />;
    }

    if (route.page === 'study-stage') {
      const stage = ALL_STAGES.find((s) => s.id === route.stageId) ?? ALL_STAGES[0];
      return (
        <StageQuestionsView
          stage={stage}
          allStages={ALL_STAGES}
          doneSet={doneSet}
          starredSet={starredSet}
          onToggleDone={handleToggleDone}
          onToggleStar={handleToggleStar}
        />
      );
    }

    if (route.page === 'units-list') {
      return <UnitsListView unitGroups={unitGroupsAll} />;
    }

    if (route.page === 'unit-marks') {
      const unitGroup =
        unitGroupsAll.find((u) => u.unitCode === route.unitCode) ?? unitGroupsAll[0];
      return <UnitMarksPickerView unitGroup={unitGroup} doneSet={doneSet} />;
    }

    if (route.page === 'unit-questions') {
      const unitGroup =
        unitGroupsAll.find((u) => u.unitCode === route.unitCode) ?? unitGroupsAll[0];
      return (
        <UnitQuestionsListView
          unitGroup={unitGroup}
          marks={route.marks}
          doneSet={doneSet}
          starredSet={starredSet}
          onToggleDone={handleToggleDone}
          onToggleStar={handleToggleStar}
        />
      );
    }

    if (
      route.page === 'study-question' ||
      route.page === 'unit-question' ||
      route.page === 'all-question' ||
      route.page === 'search-question'
    ) {
      const ctx = resolveQuestionContext(ALL_STAGES, route, locationMap, unitGroupsAll);
      if (!ctx) {
        return <HomeView
          summary={summary}
          stageCount={ALL_STAGES.length}
          unitCount={UNIT_ORDER.length}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          onResetProgress={() => setDoneNumbers([])}
        />;
      }
      return (
        <QuestionReaderView
          context={ctx}
          isDone={doneSet.has(ctx.question.number)}
          isStarred={starredSet.has(ctx.question.number)}
          practiceMode={practiceMode}
          isRevealed={revealedSet.has(ctx.question.number)}
          onToggleDone={handleToggleDone}
          onToggleStar={handleToggleStar}
          onToggleReveal={handleToggleReveal}
          onOpenLightbox={setLightboxImage}
        />
      );
    }

    if (route.page === 'all') {
      return (
        <AllQuestionsView
          mode="all"
          stages={ALL_STAGES}
          scope={route.scope ?? 'both'}
          initialQuery=""
          doneSet={doneSet}
          starredSet={starredSet}
          onToggleDone={handleToggleDone}
          onToggleStar={handleToggleStar}
          onScopeChange={handleScopeChange}
          onSearchQuerySubmit={handleSearchSubmit}
        />
      );
    }

    if (route.page === 'search') {
      return (
        <AllQuestionsView
          mode="search"
          stages={ALL_STAGES}
          scope="both"
          initialQuery={route.query}
          doneSet={doneSet}
          starredSet={starredSet}
          onToggleDone={handleToggleDone}
          onToggleStar={handleToggleStar}
          onScopeChange={handleScopeChange}
          onSearchQuerySubmit={handleSearchSubmit}
        />
      );
    }

    if (route.page === 'guide' || route.page === 'sources') {
      return <StartHereView mode={route.page} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <TopBar
        breadcrumbs={breadcrumbs}
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        practiceMode={practiceMode}
        onTogglePracticeMode={handleTogglePracticeMode}
        onOpenHelp={() => setHelpOpen(true)}
      />

      <main className="page-shell py-5 sm:py-6 pb-14">{renderPage()}</main>

      <HelpModal
        open={helpOpen}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        onClose={() => setHelpOpen(false)}
      />

      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
