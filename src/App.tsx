import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, HelpCircle, Menu, Moon, RotateCcw, Sparkles, Sun, X } from 'lucide-react';
import { ALL_STAGES } from './data/stages';
import { QUICK_START_LINES } from './data/guideData';
import type { QuestionId } from './types/study';
import {
  computeProgressSummary,
  filterStages,
  parseDoneStorage,
  parseQuestionIdToken,
  toggleDoneList,
  type MarksFilter,
} from './utils/studyLogic';
import {
  buildUnitExamGroups,
  formatViewHash,
  getQuestionLocationMap,
  parseSidebarStorage,
  parseStarStorage,
  parseThemeStorage,
  parseViewHash,
  parseViewStorage,
  toggleStarList,
  UNIT_ORDER,
  type StudyViewMode,
  type ThemeMode,
  type UnitCode,
} from './utils/examView';
import { StageSidebar, type ActiveView } from './components/StageSidebar';
import { StudyToolbar } from './components/StudyToolbar';
import { StageAccordion } from './components/StageAccordion';
import { UnitExamView } from './components/UnitExamView';
import { StartHereView } from './components/StartHereView';
import { AllQuestionsView } from './components/AllQuestionsView';
import { HelpModal } from './components/HelpModal';
import { ViewSwitcher } from './components/ViewSwitcher';

const DONE_STORAGE_KEY = 'qst_exam_done_v1';
const STAR_STORAGE_KEY = 'qst_exam_starred_v1';
const VIEW_STORAGE_KEY = 'qst_view_mode_v1';
const THEME_STORAGE_KEY = 'qst_theme_v1';
const SIDEBAR_STORAGE_KEY = 'qst_sidebar_open_v1';

const ALL_UNIT_SECTION_IDS = UNIT_ORDER.flatMap((u) => [`unit-${u}-2`, `unit-${u}-5`]);

function getInitialViewMode(): StudyViewMode {
  try {
    const fromHash = parseViewHash(window.location.hash);
    if (fromHash) return fromHash;
    const fromStorage = parseViewStorage(window.localStorage.getItem(VIEW_STORAGE_KEY));
    if (fromStorage) return fromStorage;
  } catch {
    // Ignore window/storage access errors
  }
  return 'study';
}

function getInitialThemeMode(): ThemeMode {
  try {
    const saved = parseThemeStorage(window.localStorage.getItem(THEME_STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // Ignore storage errors
  }
  return 'light';
}

function findCurrentReadingQuestionNumber(): QuestionId | null {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-question-number]'));
  if (cards.length === 0) return null;

  const anchorY = 140;
  let bestCard: HTMLElement | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const el of cards) {
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) continue;
    // Prefer the card currently covering the reading zone or closest below top bar
    if (rect.top <= anchorY && rect.bottom >= anchorY) {
      return parseQuestionIdToken(el.dataset.questionNumber);
    }
    const dist = Math.abs(rect.top - anchorY);
    if (rect.bottom > 60 && dist < bestScore) {
      bestScore = dist;
      bestCard = el;
    }
  }

  if (!bestCard) return null;
  return parseQuestionIdToken(bestCard.dataset.questionNumber);
}

function getInitialActiveView(): ActiveView {
  try {
    if (window.location.hash.trim().toLowerCase() === '#questions') {
      return 'questions';
    }
  } catch {
    // Ignore window errors
  }
  return 'stages';
}

export default function App() {
  const [viewMode, setViewMode] = useState<StudyViewMode>(getInitialViewMode);
  const [theme, setTheme] = useState<ThemeMode>(getInitialThemeMode);
  const [activeView, setActiveView] = useState<ActiveView>(getInitialActiveView);
  const [selectedStageId, setSelectedStageId] = useState<number | 'all'>('all');
  const [selectedUnitCode, setSelectedUnitCode] = useState<UnitCode | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [marksFilter, setMarksFilter] = useState<MarksFilter>('all');
  const [onlyPending, setOnlyPending] = useState(false);
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState<boolean>(() => {
    try {
      return parseSidebarStorage(window.localStorage.getItem(SIDEBAR_STORAGE_KEY));
    } catch {
      return true;
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [quickStartVisible, setQuickStartVisible] = useState(true);

  const [expandedStageIds, setExpandedStageIds] = useState<number[]>([1]);
  const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>(ALL_UNIT_SECTION_IDS);
  const [collapsedExamCards, setCollapsedExamCards] = useState<QuestionId[]>([]);
  const [revealedQuestions, setRevealedQuestions] = useState<QuestionId[]>([]);
  const pendingScrollQRef = useRef<QuestionId | null>(null);

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

  // Persist ticks, stars, viewMode, URL hash, and dark theme class
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
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, viewMode);
      const targetHash = activeView === 'questions' ? '#questions' : formatViewHash(viewMode);
      if (window.location.hash.trim().toLowerCase() !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    } catch {
      // Ignore history/storage errors
    }
  }, [viewMode, activeView]);

  useEffect(() => {
    const onHashChange = () => {
      const rawHash = window.location.hash.trim().toLowerCase();
      if (rawHash === '#questions') {
        setActiveView('questions');
        return;
      }
      const parsed = parseViewHash(window.location.hash);
      if (parsed && parsed !== viewMode) {
        setViewMode(parsed);
        setActiveView('stages');
      } else if (parsed && activeView === 'questions') {
        setActiveView('stages');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [viewMode, activeView]);

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

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(desktopSidebarOpen));
    } catch {
      // Ignore storage errors
    }
  }, [desktopSidebarOpen]);

  const doneSet = useMemo(() => new Set(doneNumbers), [doneNumbers]);
  const starredSet = useMemo(() => new Set(starredNumbers), [starredNumbers]);
  const revealedSet = useMemo(() => new Set(revealedQuestions), [revealedQuestions]);
  const expandedSet = useMemo(() => new Set(expandedStageIds), [expandedStageIds]);
  const expandedSectionSet = useMemo(() => new Set(expandedSectionIds), [expandedSectionIds]);
  const collapsedExamCardSet = useMemo(() => new Set(collapsedExamCards), [collapsedExamCards]);

  const locationMap = useMemo(() => getQuestionLocationMap(ALL_STAGES), []);

  const summary = useMemo(
    () => computeProgressSummary(ALL_STAGES, doneSet, starredSet),
    [doneSet, starredSet]
  );

  const filteredStages = useMemo(
    () =>
      filterStages(ALL_STAGES, {
        searchQuery,
        marksFilter,
        selectedStageId,
        onlyPending,
        doneSet,
        onlyStarred,
        starredSet,
      }),
    [searchQuery, marksFilter, selectedStageId, onlyPending, doneSet, onlyStarred, starredSet]
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

  const filteredTermGroups = useMemo(
    () =>
      buildUnitExamGroups(ALL_STAGES, {
        searchQuery,
        marksFilter,
        selectedUnitCode,
        onlyPending,
        doneSet,
        onlyStarred,
        starredSet,
      }),
    [searchQuery, marksFilter, selectedUnitCode, onlyPending, doneSet, onlyStarred, starredSet]
  );

  const visibleQuestionCount = useMemo(() => {
    if (viewMode === 'units') {
      return filteredTermGroups.reduce(
        (acc, t) =>
          acc +
          t.units.reduce(
            (uAcc, u) =>
              uAcc + u.twoMarkSection.items.length + u.fiveMarkSection.items.length,
            0
          ),
        0
      );
    }
    return filteredStages.reduce((acc, item) => acc + item.questions.length, 0);
  }, [viewMode, filteredStages, filteredTermGroups]);

  const isSearching = searchQuery.trim().length > 0;

  const hasActiveStageFilter =
    isSearching ||
    marksFilter !== 'all' ||
    onlyPending ||
    onlyStarred ||
    selectedStageId !== 'all';

  const allExpanded =
    viewMode === 'units'
      ? expandedSectionIds.length === ALL_UNIT_SECTION_IDS.length
      : expandedStageIds.length === ALL_STAGES.length;

  // Scroll cleanly to target question after view or section expansion finishes painting
  const scrollToQuestionElement = useCallback((questionNumber: QuestionId) => {
    pendingScrollQRef.current = questionNumber;
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const el = document.getElementById(`q-${questionNumber}`);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        pendingScrollQRef.current = null;
      }, 60);
    });
  }, []);

  const ensureQuestionVisibleInView = useCallback(
    (qNum: QuestionId, targetMode: StudyViewMode) => {
      const loc = locationMap.get(qNum);
      if (!loc) return;

      if (targetMode === 'study') {
        if (selectedStageId !== 'all' && selectedStageId !== loc.stageId) {
          setSelectedStageId('all');
        }
        setExpandedStageIds((prev) =>
          prev.includes(loc.stageId) ? prev : [...prev, loc.stageId]
        );
      } else {
        if (selectedUnitCode !== 'all' && selectedUnitCode !== loc.unitCode) {
          setSelectedUnitCode('all');
        }
        const sectionId = `unit-${loc.unitCode}-${loc.marks}`;
        setExpandedSectionIds((prev) =>
          prev.includes(sectionId) ? prev : [...prev, sectionId]
        );
        setCollapsedExamCards((prev) => prev.filter((n) => n !== qNum));
      }
    },
    [locationMap, selectedStageId, selectedUnitCode]
  );

  const handleSwitchViewMode = (targetMode: StudyViewMode) => {
    const currentQ = activeView === 'stages' ? findCurrentReadingQuestionNumber() : null;
    setActiveView('stages');
    setViewMode(targetMode);

    if (currentQ !== null) {
      ensureQuestionVisibleInView(currentQ, targetMode);
      scrollToQuestionElement(currentQ);
    }
  };

  const handleSelectStage = (stageId: number | 'all') => {
    setActiveView('stages');
    setViewMode('study');
    setSelectedStageId(stageId);
    if (stageId !== 'all') {
      setExpandedStageIds((prev) => (prev.includes(stageId) ? prev : [...prev, stageId]));
    }
  };

  const handleSelectUnit = (unitCode: UnitCode | 'all') => {
    setActiveView('stages');
    setViewMode('units');
    setSelectedUnitCode(unitCode);
    if (unitCode !== 'all') {
      const sIds = [`unit-${unitCode}-2`, `unit-${unitCode}-5`];
      setExpandedSectionIds((prev) => Array.from(new Set([...prev, ...sIds])));
    }
  };

  const handleToggleExpandStage = (stageId: number) => {
    setExpandedStageIds((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
    );
  };

  const handleToggleSection = (sectionId: string) => {
    setExpandedSectionIds((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleExpandAllInSection = (sectionId: string, questionNumbers: QuestionId[]) => {
    setExpandedSectionIds((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]));
    const numSet = new Set(questionNumbers);
    setCollapsedExamCards((prev) => prev.filter((n) => !numSet.has(n)));
  };

  const handleCollapseAllInSection = (sectionId: string, questionNumbers: QuestionId[]) => {
    setExpandedSectionIds((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]));
    setCollapsedExamCards((prev) => Array.from(new Set([...prev, ...questionNumbers])));
  };

  const handleToggleCardCollapse = (questionNumber: QuestionId) => {
    setCollapsedExamCards((prev) =>
      prev.includes(questionNumber)
        ? prev.filter((n) => n !== questionNumber)
        : [...prev, questionNumber]
    );
  };

  const handleToggleExpandAll = () => {
    if (viewMode === 'units') {
      if (expandedSectionIds.length === ALL_UNIT_SECTION_IDS.length) {
        setExpandedSectionIds([]);
      } else {
        setExpandedSectionIds(ALL_UNIT_SECTION_IDS);
        setCollapsedExamCards([]);
      }
      return;
    }

    if (expandedStageIds.length === ALL_STAGES.length) {
      setExpandedStageIds([1]);
    } else {
      setExpandedStageIds(ALL_STAGES.map((s) => s.id));
    }
  };

  const handleToggleDone = (questionNumber: QuestionId) => {
    setDoneNumbers((prev) => toggleDoneList(prev, questionNumber));
  };

  const handleToggleStar = (questionNumber: QuestionId) => {
    setStarredNumbers((prev) => toggleStarList(prev, questionNumber));
  };

  const handleTogglePracticeMode = () => {
    setPracticeMode((prev) => !prev);
    setRevealedQuestions([]);
  };

  const handleToggleReveal = (questionNumber: QuestionId) => {
    setRevealedQuestions((prev) =>
      prev.includes(questionNumber)
        ? prev.filter((n) => n !== questionNumber)
        : [...prev, questionNumber]
    );
  };

  const handleResetProgress = () => {
    setDoneNumbers([]);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setMarksFilter('all');
    setOnlyPending(false);
    setOnlyStarred(false);
    setSelectedStageId('all');
    setSelectedUnitCode('all');
  };

  const handleJumpToPart = (stageId: number) => {
    setActiveView('stages');
    setViewMode('study');
    setSelectedStageId('all');
    setExpandedStageIds((prev) => (prev.includes(stageId) ? prev : [...prev, stageId]));
    window.setTimeout(() => {
      document.getElementById(`stage-${stageId}`)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleJumpToExamTerm = (unitCode: UnitCode) => {
    setActiveView('stages');
    setViewMode('units');
    setSelectedUnitCode('all');
    setExpandedSectionIds((prev) =>
      Array.from(new Set([...prev, `unit-${unitCode}-2`, `unit-${unitCode}-5`]))
    );
    window.setTimeout(() => {
      document.getElementById(`unit-${unitCode}`)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenInStudyOrder = (questionNumber: QuestionId, stageId: number) => {
    setActiveView('stages');
    setViewMode('study');
    if (selectedStageId !== 'all' && selectedStageId !== stageId) {
      setSelectedStageId('all');
    }
    setExpandedStageIds((prev) => (prev.includes(stageId) ? prev : [...prev, stageId]));
    scrollToQuestionElement(questionNumber);
  };

  const handleJumpToExamQuestion = (
    questionNumber: QuestionId,
    unitCode: UnitCode,
    sectionId: string
  ) => {
    setActiveView('stages');
    setViewMode('units');
    if (selectedUnitCode !== 'all' && selectedUnitCode !== unitCode) {
      setSelectedUnitCode('all');
    }
    setExpandedSectionIds((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]));
    setCollapsedExamCards((prev) => prev.filter((n) => n !== questionNumber));
    scrollToQuestionElement(questionNumber);
  };

  const handleGoToStagesFromGuide = (stageId: number | 'all' = 'all') => {
    setActiveView('stages');
    if (stageId !== 'all') {
      setViewMode('study');
      setSelectedStageId(stageId);
      setExpandedStageIds((prev) => (prev.includes(stageId) ? prev : [...prev, stageId]));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Three-Zone Top Header Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1320px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <a
            href={formatViewHash(viewMode)}
            onClick={(e) => {
              e.preventDefault();
              setActiveView('stages');
              setSelectedStageId('all');
              setSelectedUnitCode('all');
            }}
            className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 truncate min-w-0"
          >
            Quantum Science &amp; Technology
          </a>

          {viewMode === 'units' ? (
            <nav
              aria-label="Exam units quick navigation"
              className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 shrink-0"
            >
              {(
                [
                  { label: 'Unit I', unit: 'I' },
                  { label: 'Unit II', unit: 'II' },
                  { label: 'Unit III', unit: 'III' },
                  { label: 'Unit IV', unit: 'IV' },
                  { label: 'Unit V', unit: 'V' },
                ] as const
              ).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleJumpToExamTerm(item.unit)}
                  className="hover:text-slate-900 dark:hover:text-white hover:underline transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            <nav
              aria-label="Study parts quick navigation"
              className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 shrink-0"
            >
              {[
                { label: 'Part A', stageId: 1 },
                { label: 'Part B', stageId: 4 },
                { label: 'Part C', stageId: 7 },
                { label: 'Part D', stageId: 13 },
                { label: 'Part E', stageId: 15 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleJumpToPart(item.stageId)}
                  className="hover:text-slate-900 dark:hover:text-white hover:underline transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-pressed={theme === 'dark'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[38px] min-w-[38px] whitespace-nowrap shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 shrink-0" />
              )}
              <span className="hidden lg:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              aria-label="Open help guide"
              title="Quick Help"
              className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-2 text-xs font-bold rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors min-h-[38px] min-w-[38px] whitespace-nowrap shrink-0"
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Help</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden inline-flex items-center gap-1 px-2.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 min-h-[38px] whitespace-nowrap shrink-0"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>

            <button
              type="button"
              onClick={handleResetProgress}
              aria-label="Reset progress"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[38px] whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset progress</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Top View Switch visible at the top of every page */}
      <ViewSwitcher
        viewMode={viewMode}
        activeView={activeView}
        onSelectMode={handleSwitchViewMode}
        onOpenAllQuestions={() => {
          setActiveView('questions');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        desktopSidebarOpen={desktopSidebarOpen}
        onToggleDesktopSidebar={() => setDesktopSidebarOpen((prev) => !prev)}
        totalQuestions={summary.totalQuestions}
      />

      {/* Main Content Layout */}
      <div
        id="top"
        className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 flex items-start gap-6"
      >
        <StageSidebar
          viewMode={viewMode}
          stages={ALL_STAGES}
          selectedStageId={selectedStageId}
          unitGroups={unitGroupsAll}
          selectedUnitCode={selectedUnitCode}
          activeView={activeView}
          doneSet={doneSet}
          onSelectStage={handleSelectStage}
          onSelectUnit={handleSelectUnit}
          onSelectView={setActiveView}
          desktopOpen={desktopSidebarOpen}
          onToggleDesktop={() => setDesktopSidebarOpen((prev) => !prev)}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main
          className={`flex-1 min-w-0 space-y-5 ${
            desktopSidebarOpen ? 'max-w-[860px]' : 'max-w-[960px] mx-auto'
          }`}
        >
          {activeView === 'questions' ? (
            <AllQuestionsView
              stages={ALL_STAGES}
              doneSet={doneSet}
              starredSet={starredSet}
              onToggleDone={handleToggleDone}
              onToggleStar={handleToggleStar}
              onOpenInStudyOrder={handleOpenInStudyOrder}
              onOpenInUnitExam={handleJumpToExamQuestion}
              onBackToAnswers={() => {
                setActiveView('stages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : activeView !== 'stages' ? (
            <StartHereView
              mode={activeView === 'sources' ? 'sources' : 'guide'}
              onGoToStages={handleGoToStagesFromGuide}
              onSwitchMode={(m) => setActiveView(m)}
            />
          ) : (
            <>
              {/* 5-Line Quick Start Banner (First thing visible on open) */}
              {quickStartVisible && (
                <section
                  aria-label="Quick start guide"
                  className="bg-sky-50/80 dark:bg-sky-950/35 border border-sky-200 dark:border-sky-800 rounded-xl p-4 sm:p-5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-sky-950 dark:text-sky-100">
                      <Sparkles className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0" />
                      <span>Quick Start (Read Before You Begin)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuickStartVisible(false)}
                      aria-label="Dismiss quick start"
                      className="p-1 rounded text-slate-500 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 hover:text-slate-900 dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc pl-5">
                    {QUICK_START_LINES.map((line, i) => (
                      <li key={i} className="leading-snug">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveView('guide')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Full Start Here Guide (Plans &amp; Formulas)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView('sources')}
                      className="px-3 py-1.5 rounded-lg border border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-900 text-sky-900 dark:text-sky-200 text-xs font-semibold hover:bg-sky-100/70 dark:hover:bg-slate-800 transition-colors"
                    >
                      Sources &amp; Uncovered Topics
                    </button>
                  </div>
                </section>
              )}

              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight text-balance">
                  All Mid 1 and Mid 2 Exam Questions with Answers
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  {viewMode === 'units'
                    ? 'Unit-wise Exam View organized by Mid 1 (Units I–II) and Mid 2 (Units III–V) into 2-mark and 5-mark sections, numbered sequentially from 1 within each section.'
                    : `Study Order View covering all ${summary.totalQuestions} exam-ready answers across ${ALL_STAGES.length} progressive stages (Parts A–E), with intuition, clean answer sheets, key formulas, and transparent study sources.`}
                </p>
              </div>

              <StudyToolbar
                viewMode={viewMode}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                marksFilter={marksFilter}
                onMarksFilterChange={setMarksFilter}
                practiceMode={practiceMode}
                onTogglePracticeMode={handleTogglePracticeMode}
                onlyPending={onlyPending}
                onToggleOnlyPending={() => setOnlyPending((p) => !p)}
                onlyStarred={onlyStarred}
                onToggleOnlyStarred={() => setOnlyStarred((s) => !s)}
                summary={summary}
                visibleCount={visibleQuestionCount}
                allExpanded={allExpanded}
                onToggleExpandAll={handleToggleExpandAll}
              />

              {viewMode === 'units' ? (
                <UnitExamView
                  termGroups={filteredTermGroups}
                  locationMap={locationMap}
                  isSearching={isSearching}
                  marksFilter={marksFilter}
                  expandedSectionIds={expandedSectionSet}
                  collapsedCardNumbers={collapsedExamCardSet}
                  onToggleSection={handleToggleSection}
                  onExpandAllInSection={handleExpandAllInSection}
                  onCollapseAllInSection={handleCollapseAllInSection}
                  onToggleCardCollapse={handleToggleCardCollapse}
                  doneSet={doneSet}
                  onToggleDone={handleToggleDone}
                  starredSet={starredSet}
                  onToggleStar={handleToggleStar}
                  practiceMode={practiceMode}
                  revealedSet={revealedSet}
                  onToggleReveal={handleToggleReveal}
                  onOpenInStudyOrder={handleOpenInStudyOrder}
                  onJumpToExamQuestion={handleJumpToExamQuestion}
                  onClearFilters={handleClearAllFilters}
                />
              ) : (
                <div className="space-y-4">
                  {filteredStages.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        No questions match your current filters.
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Try clearing the search box or switching back to all marks and all stages.
                      </p>
                      <button
                        type="button"
                        onClick={handleClearAllFilters}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  ) : (
                    filteredStages.map(({ stage, questions }) => (
                      <StageAccordion
                        key={stage.id}
                        stage={stage}
                        questions={questions}
                        isExpanded={hasActiveStageFilter || expandedSet.has(stage.id)}
                        onToggleExpand={handleToggleExpandStage}
                        doneSet={doneSet}
                        onToggleDone={handleToggleDone}
                        starredSet={starredSet}
                        onToggleStar={handleToggleStar}
                        practiceMode={practiceMode}
                        revealedSet={revealedSet}
                        onToggleReveal={handleToggleReveal}
                        isSearching={isSearching}
                        locationMap={locationMap}
                      />
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <HelpModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        onOpenStartHere={() => setActiveView('guide')}
        onOpenSources={() => setActiveView('sources')}
      />
    </div>
  );
}
