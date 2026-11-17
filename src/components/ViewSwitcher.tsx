import React from 'react';
import { BookOpenCheck, ClipboardList, ListOrdered, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { StudyViewMode } from '../utils/examView';
import type { ActiveView } from './StageSidebar';

interface ViewSwitcherProps {
  viewMode: StudyViewMode;
  activeView: ActiveView;
  onSelectMode: (mode: StudyViewMode) => void;
  onOpenAllQuestions: () => void;
  desktopSidebarOpen: boolean;
  onToggleDesktopSidebar: () => void;
  totalQuestions: number;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  viewMode,
  activeView,
  onSelectMode,
  onOpenAllQuestions,
  desktopSidebarOpen,
  onToggleDesktopSidebar,
  totalQuestions,
}) => {
  const isStudyActive = viewMode === 'study' && activeView === 'stages';
  const isUnitsActive = viewMode === 'units' && activeView === 'stages';
  const isQuestionsActive = activeView === 'questions';

  return (
    <div className="sticky top-0 z-30 bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onToggleDesktopSidebar}
            data-testid="toggle-sidebar-desktop"
            aria-expanded={desktopSidebarOpen}
            aria-label={desktopSidebarOpen ? 'Hide left sidebar' : 'Show left sidebar'}
            title={desktopSidebarOpen ? 'Hide left sidebar' : 'Show left sidebar'}
            className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors min-h-[40px] whitespace-nowrap shrink-0 ${
              desktopSidebarOpen
                ? 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                : 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/60'
            }`}
          >
            {desktopSidebarOpen ? (
              <>
                <PanelLeftClose className="w-4 h-4 shrink-0" />
                <span>Hide menu</span>
              </>
            ) : (
              <>
                <PanelLeftOpen className="w-4 h-4 shrink-0" />
                <span>Show menu</span>
              </>
            )}
          </button>

          <div
            role="group"
            aria-label="Choose browsing view"
            className="grid grid-cols-2 sm:inline-flex items-stretch gap-1 p-1 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex-1 sm:flex-initial"
          >
            <button
              type="button"
              onClick={() => onSelectMode('study')}
              aria-pressed={isStudyActive}
              data-testid="switch-study-view"
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold transition-colors min-h-[38px] leading-tight text-center ${
                isStudyActive
                  ? 'bg-sky-700 text-white shadow-sm dark:bg-sky-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpenCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 hidden sm:inline" />
              <span>Study Order (learn step by step)</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectMode('units')}
              aria-pressed={isUnitsActive}
              data-testid="switch-units-view"
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold transition-colors min-h-[38px] leading-tight text-center ${
                isUnitsActive
                  ? 'bg-sky-700 text-white shadow-sm dark:bg-sky-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 hidden sm:inline" />
              <span>Unit-wise (exam view)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenAllQuestions}
            aria-pressed={isQuestionsActive}
            data-testid="open-all-questions"
            className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-semibold border transition-colors min-h-[40px] whitespace-nowrap shrink-0 ${
              isQuestionsActive
                ? 'bg-sky-700 border-sky-700 text-white shadow-sm dark:bg-sky-600 dark:border-sky-600'
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>All Questions ({totalQuestions})</span>
          </button>
        </div>

        <span className="hidden lg:inline text-xs text-slate-500 dark:text-slate-400">
          Same {totalQuestions} questions &amp; answers · shared ticks &amp; stars
        </span>
      </div>
    </div>
  );
};
