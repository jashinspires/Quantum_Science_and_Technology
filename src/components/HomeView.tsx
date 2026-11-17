import React, { useState } from 'react';
import { ArrowRight, BookOpen, BookOpenCheck, ClipboardList, FileText, Moon, RotateCcw, Search, Sun } from 'lucide-react';
import type { StudyProgressSummary } from '../utils/studyLogic';
import type { ThemeMode } from '../utils/examView';

interface HomeViewProps {
  summary: StudyProgressSummary;
  stageCount: number;
  unitCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onResetProgress: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  summary,
  stageCount,
  unitCount,
  theme,
  onToggleTheme,
  onResetProgress,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="space-y-8 py-4 sm:py-8">
      {/* Site Title + Dynamic Overall Progress */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Quantum Science &amp; Technology
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Complete exam study companion covering all {summary.totalQuestions} questions across{' '}
            {stageCount} stages and {unitCount} syllabus units.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-base">
            <span className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums" data-testid="home-progress-text">
              Overall progress: {summary.doneCount} / {summary.totalQuestions} done ({summary.percentDone}%)
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400 tabular-nums">
              {summary.twoMarkCount} two-mark · {summary.fiveMarkCount} five-mark · {summary.starredCount} starred
            </span>
          </div>
          <div
            className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={summary.percentDone}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall study progress"
          >
            <div
              className="h-full bg-sky-700 dark:bg-sky-500 transition-all duration-200"
              style={{ width: `${summary.percentDone}%` }}
            />
          </div>
        </div>
      </section>

      {/* Two Large Choice Cards */}
      <section aria-label="Choose how to browse" className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <a
          href="#/study"
          data-testid="home-card-study"
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-colors"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
              Study Order
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Learn step by step. Each topic prepares you for the next.
            </p>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold text-sky-700 dark:text-sky-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>
              {stageCount} stages (Parts A–E) · {summary.totalQuestions} questions
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </a>

        <a
          href="#/units"
          data-testid="home-card-units"
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-colors"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
              Unit-wise
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Exam view. Pick a unit, then 2-mark or 5-mark questions.
            </p>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold text-sky-700 dark:text-sky-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>
              Units I–V (Mid 1 &amp; Mid 2) · {summary.totalQuestions} questions
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </a>
      </section>

      {/* Secondary Links Row */}
      <section className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-sm">
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="#/all"
            data-testid="home-link-all"
            className="inline-flex items-center gap-1.5 font-semibold text-sky-700 dark:text-sky-300 hover:underline"
          >
            <Search className="w-4 h-4" />
            <span>Search all questions</span>
          </a>

          <a
            href="#/guide"
            data-testid="home-link-guide"
            className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start Here guide</span>
          </a>

          <a
            href="#/sources"
            data-testid="home-link-sources"
            className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline"
          >
            <FileText className="w-4 h-4" />
            <span>Sources</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
          </button>

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset progress</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Clear all ticks?</span>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmingReset(false);
                }}
                className="font-semibold text-red-700 dark:text-red-400 hover:underline"
              >
                Yes, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="text-slate-600 dark:text-slate-400 hover:underline"
              >
                Cancel
              </button>
            </span>
          )}
        </div>
      </section>
    </div>
  );
};
