import React from 'react';
import { BookOpen, FileText, ListOrdered, PanelLeftClose, X } from 'lucide-react';
import type { QuestionId, StudyStage } from '../types/study';
import type { StudyViewMode, UnitCode, UnitExamGroup } from '../utils/examView';

export type ActiveView = 'stages' | 'questions' | 'guide' | 'sources';

interface StageSidebarProps {
  viewMode: StudyViewMode;
  stages: StudyStage[];
  selectedStageId: number | 'all';
  unitGroups: UnitExamGroup[];
  selectedUnitCode: UnitCode | 'all';
  activeView: ActiveView;
  doneSet: ReadonlySet<QuestionId>;
  onSelectStage: (stageId: number | 'all') => void;
  onSelectUnit: (unitCode: UnitCode | 'all') => void;
  onSelectView: (view: ActiveView) => void;
  desktopOpen: boolean;
  onToggleDesktop: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const PART_ORDER: Array<StudyStage['part']> = ['A', 'B', 'C', 'D', 'E'];

export const StageSidebar: React.FC<StageSidebarProps> = ({
  viewMode,
  stages,
  selectedStageId,
  unitGroups,
  selectedUnitCode,
  activeView,
  doneSet,
  onSelectStage,
  onSelectUnit,
  onSelectView,
  desktopOpen,
  onToggleDesktop,
  mobileOpen,
  onCloseMobile,
}) => {
  const handlePickStage = (stageId: number | 'all') => {
    onSelectView('stages');
    onSelectStage(stageId);
    onCloseMobile();
  };

  const handlePickUnit = (unitCode: UnitCode | 'all') => {
    onSelectView('stages');
    onSelectUnit(unitCode);
    onCloseMobile();
  };

  const handlePickView = (view: ActiveView) => {
    onSelectView(view);
    onCloseMobile();
  };

  const totalQuestionCount = stages.reduce((acc, s) => acc + s.questions.length, 0);

  const navContent = (
    <nav aria-label="Study stages, units, and guide navigation" className="space-y-4">
      <div className="space-y-1.5 pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => handlePickView('guide')}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
            activeView === 'guide'
              ? 'bg-sky-700 text-white dark:bg-sky-600'
              : 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800 dark:hover:bg-sky-900/60'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span className="truncate">Start Here</span>
        </button>

        <button
          type="button"
          onClick={() => handlePickView('sources')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
            activeView === 'sources'
              ? 'bg-sky-700 text-white dark:bg-sky-600'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span className="truncate">Sources &amp; Coverage</span>
        </button>

        <button
          type="button"
          onClick={() => handlePickView('questions')}
          data-testid="sidebar-all-questions"
          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-left ${
            activeView === 'questions'
              ? 'bg-sky-700 text-white dark:bg-sky-600'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'
          }`}
        >
          <span className="inline-flex items-center gap-2 min-w-0">
            <ListOrdered className="w-4 h-4 shrink-0" />
            <span className="truncate">All Questions</span>
          </span>
          <span className="tabular-nums text-xs opacity-90 shrink-0">{totalQuestionCount}</span>
        </button>
      </div>

      {viewMode === 'units' ? (
        <>
          <div>
            <button
              type="button"
              onClick={() => handlePickUnit('all')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                activeView === 'stages' && selectedUnitCode === 'all'
                  ? 'bg-sky-700 text-white dark:bg-sky-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="truncate">All 5 Units (Mid 1 &amp; 2)</span>
              <span className="tabular-nums text-xs opacity-90 ml-2 shrink-0">{totalQuestionCount} Qs</span>
            </button>
          </div>

          {(['Mid 1', 'Mid 2'] as const).map((term) => {
            const termUnits = unitGroups.filter((u) => u.examTerm === term);
            if (termUnits.length === 0) return null;

            return (
              <div key={term} className="space-y-1.5">
                <div className="px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-tight">
                  {term}
                </div>
                <ul className="space-y-1">
                  {termUnits.map((unit) => {
                    const isActive =
                      activeView === 'stages' && selectedUnitCode === unit.unitCode;
                    const allDone =
                      unit.totalQuestions > 0 && unit.doneQuestions === unit.totalQuestions;

                    return (
                      <li key={unit.unitCode}>
                        <button
                          type="button"
                          onClick={() => handlePickUnit(unit.unitCode)}
                          className={`w-full flex items-start justify-between gap-2 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-sky-50 text-sky-900 font-semibold border border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800'
                              : 'text-slate-700 hover:bg-slate-100 border border-transparent dark:text-slate-300 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="leading-snug">{unit.title}</span>
                          <span
                            className={`tabular-nums text-xs shrink-0 mt-0.5 font-medium ${
                              allDone
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {unit.doneQuestions}/{unit.totalQuestions}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div>
            <button
              type="button"
              onClick={() => handlePickStage('all')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                activeView === 'stages' && selectedStageId === 'all'
                  ? 'bg-sky-700 text-white dark:bg-sky-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="truncate">All {stages.length} Stages</span>
              <span className="tabular-nums text-xs opacity-90 ml-2 shrink-0">{totalQuestionCount} Qs</span>
            </button>
          </div>

          {PART_ORDER.map((partCode) => {
            const partStages = stages.filter((s) => s.part === partCode);
            if (partStages.length === 0) return null;
            const partTitle = partStages[0].partTitle;

            return (
              <div key={partCode} className="space-y-1.5">
                <div className="px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-tight">
                  Part {partCode} · {partTitle}
                </div>
                <ul className="space-y-1">
                  {partStages.map((stage) => {
                    const total = stage.questions.length;
                    const done = stage.questions.filter((q) => doneSet.has(q.number)).length;
                    const isActive = activeView === 'stages' && selectedStageId === stage.id;
                    const allDone = total > 0 && done === total;

                    return (
                      <li key={stage.id}>
                        <button
                          type="button"
                          onClick={() => handlePickStage(stage.id)}
                          className={`w-full flex items-start justify-between gap-2 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-sky-50 text-sky-900 font-semibold border border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800'
                              : 'text-slate-700 hover:bg-slate-100 border border-transparent dark:text-slate-300 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="leading-snug">
                            <span className="tabular-nums text-slate-500 dark:text-slate-400 mr-1.5">
                              {stage.id}.
                            </span>
                            {stage.title}
                          </span>
                          <span
                            className={`tabular-nums text-xs shrink-0 mt-0.5 font-medium ${
                              allDone
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {done}/{total}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </nav>
  );

  return (
    <>
      {/* Desktop Sticky Collapsible Sidebar */}
      {desktopOpen && (
        <aside className="hidden lg:block w-72 shrink-0" aria-label="Navigation sidebar">
          <div className="sticky top-[72px] max-h-[calc(100vh-5.5rem)] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {viewMode === 'units' ? 'Exam Units' : 'Study Stages'}
              </span>
              <button
                type="button"
                onClick={onToggleDesktop}
                data-testid="collapse-sidebar-desktop"
                aria-label="Hide navigation sidebar"
                title="Hide left sidebar"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
                <span>Hide</span>
              </button>
            </div>
            {navContent}
          </div>
        </aside>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Stages, units, and guide menu"
        >
          <div
            className="fixed inset-0 bg-slate-900/50 dark:bg-black/70"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full overflow-y-auto p-4 shadow-xl border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-base font-bold text-slate-900 dark:text-slate-50">
                Menu &amp; Navigation
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close menu"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
