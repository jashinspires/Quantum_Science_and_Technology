import React from 'react';
import { Eye, EyeOff, Search, Star, X } from 'lucide-react';
import type { MarksFilter, StudyProgressSummary } from '../utils/studyLogic';
import type { StudyViewMode } from '../utils/examView';

interface StudyToolbarProps {
  viewMode: StudyViewMode;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  marksFilter: MarksFilter;
  onMarksFilterChange: (val: MarksFilter) => void;
  practiceMode: boolean;
  onTogglePracticeMode: () => void;
  onlyPending: boolean;
  onToggleOnlyPending: () => void;
  onlyStarred: boolean;
  onToggleOnlyStarred: () => void;
  summary: StudyProgressSummary;
  visibleCount: number;
  allExpanded: boolean;
  onToggleExpandAll: () => void;
}

export const StudyToolbar: React.FC<StudyToolbarProps> = ({
  viewMode,
  searchQuery,
  onSearchChange,
  marksFilter,
  onMarksFilterChange,
  practiceMode,
  onTogglePracticeMode,
  onlyPending,
  onToggleOnlyPending,
  onlyStarred,
  onToggleOnlyStarred,
  summary,
  visibleCount,
  allExpanded,
  onToggleExpandAll,
}) => {
  const expandLabel =
    viewMode === 'units'
      ? allExpanded
        ? 'Collapse all sections'
        : 'Expand all sections'
      : allExpanded
      ? 'Collapse all stages'
      : 'Expand all stages';

  return (
    <section
      aria-label="Study controls and progress"
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4"
    >
      {/* Progress Bar Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
            {summary.doneCount} of {summary.totalQuestions} questions marked done ({summary.percentDone}%)
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            Showing {visibleCount} matching · {summary.twoMarkCount} two-mark · {summary.fiveMarkCount} five-mark · {summary.starredCount} starred
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleExpandAll}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
          >
            {expandLabel}
          </button>

          <button
            type="button"
            onClick={onTogglePracticeMode}
            aria-pressed={practiceMode}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
              practiceMode
                ? 'bg-sky-700 border-sky-700 text-white hover:bg-sky-800 dark:bg-sky-600 dark:border-sky-600 dark:hover:bg-sky-500'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {practiceMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>Practice mode: {practiceMode ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>

      {/* Slim Progress Track */}
      <div
        className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/70 dark:border-slate-700"
        role="progressbar"
        aria-valuenow={summary.percentDone}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Study completion progress"
      >
        <div
          className="h-full bg-sky-700 dark:bg-sky-500 transition-all duration-200"
          style={{ width: `${summary.percentDone}%` }}
        />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <label htmlFor="study-search" className="sr-only">
            Search questions, formulas, or stages
          </label>
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="study-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search any topic, formula, Q#, or tag (e.g. Bloch, Q14, CNOT, Shor)..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white dark:focus:bg-slate-900 min-h-[44px]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Filter by question marks"
            className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            {(
              [
                { id: 'all', label: 'All marks' },
                { id: '2', label: '2-mark' },
                { id: '5', label: '5-mark' },
              ] as const
            ).map((tab) => {
              const active = marksFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onMarksFilterChange(tab.id)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                    active
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleOnlyStarred}
            aria-pressed={onlyStarred}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[42px] ${
              onlyStarred
                ? 'bg-amber-100 border-amber-300 text-amber-950 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyStarred ? 'fill-amber-500 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
            <span>Starred ({summary.starredCount})</span>
          </button>

          <button
            type="button"
            onClick={onToggleOnlyPending}
            aria-pressed={onlyPending}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[42px] ${
              onlyPending
                ? 'bg-sky-50 border-sky-300 text-sky-900 dark:bg-sky-950/70 dark:border-sky-700 dark:text-sky-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Hide done
          </button>
        </div>
      </div>
    </section>
  );
};
