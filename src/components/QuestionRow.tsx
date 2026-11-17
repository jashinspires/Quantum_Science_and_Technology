import React from 'react';
import { Check, ChevronRight, Star } from 'lucide-react';
import type { QuestionId, StudyQuestion } from '../types/study';

interface QuestionRowProps {
  question: StudyQuestion;
  prefix: string;
  metaLabel?: string;
  targetHash: string;
  isDone: boolean;
  isStarred: boolean;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
  showSourceTag?: boolean;
}

export const QuestionRow: React.FC<QuestionRowProps> = ({
  question,
  prefix,
  metaLabel,
  targetHash,
  isDone,
  isStarred,
  onToggleDone,
  onToggleStar,
  showSourceTag = false,
}) => {
  const handleActionClick = (e: React.MouseEvent, fn: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-4 transition-colors ${
        isDone
          ? 'bg-emerald-50/35 hover:bg-emerald-50/60 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/35'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
      }`}
      data-testid={`question-row-${question.number}`}
    >
      <a
        href={targetHash}
        className="flex-1 min-w-0 flex items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded"
      >
        <span className="shrink-0 mt-0.5 inline-flex items-center justify-center min-w-[2.5rem] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm tabular-nums">
          {prefix}
        </span>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="text-base font-medium text-slate-900 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 leading-snug">
            {question.question}
          </div>

          {question.questionMathHtml && (
            <div
              className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: question.questionMathHtml }}
            />
          )}

          {(metaLabel || showSourceTag) && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
              {metaLabel && <span className="tabular-nums">{metaLabel}</span>}
              {metaLabel && showSourceTag && <span aria-hidden="true">·</span>}
              {showSourceTag && <span>{question.sourceTag}</span>}
            </div>
          )}
        </div>
      </a>

      <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
        <span
          className={`px-2 py-0.5 rounded text-xs font-semibold tabular-nums border ${
            question.marks === 5
              ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800'
              : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          {question.marks}M
        </span>

        <button
          type="button"
          onClick={(e) => handleActionClick(e, () => onToggleStar(question.number))}
          aria-pressed={isStarred}
          aria-label={`Star question ${question.number}`}
          title={isStarred ? 'Remove star' : 'Star for revision'}
          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${
            isStarred
              ? 'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200'
              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Star
            className={`w-4 h-4 ${
              isStarred ? 'fill-amber-500 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''
            }`}
          />
        </button>

        <button
          type="button"
          onClick={(e) => handleActionClick(e, () => onToggleDone(question.number))}
          aria-pressed={isDone}
          aria-label={`Mark question ${question.number} as done`}
          title={isDone ? 'Marked done' : 'Mark done'}
          className={`inline-flex items-center gap-1 h-9 px-2.5 rounded-lg text-xs font-semibold border transition-colors ${
            isDone
              ? 'bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:border-emerald-600'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isDone ? 'Done' : 'Done'}</span>
        </button>

        <a
          href={targetHash}
          aria-label={`Open answer for question ${question.number}`}
          className="inline-flex items-center justify-center w-8 h-9 rounded-lg text-slate-400 hover:text-sky-700 dark:hover:text-sky-300"
        >
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
