import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { QuestionId, StudyQuestion, StudyStage } from '../types/study';
import type { QuestionLocationInfo } from '../utils/examView';
import { QuestionCard } from './QuestionCard';

interface StageAccordionProps {
  stage: StudyStage;
  questions: StudyQuestion[];
  isExpanded: boolean;
  onToggleExpand: (stageId: number) => void;
  doneSet: ReadonlySet<QuestionId>;
  onToggleDone: (questionNumber: QuestionId) => void;
  starredSet: ReadonlySet<QuestionId>;
  onToggleStar: (questionNumber: QuestionId) => void;
  practiceMode: boolean;
  revealedSet: ReadonlySet<QuestionId>;
  onToggleReveal: (questionNumber: QuestionId) => void;
  isSearching?: boolean;
  locationMap?: Map<QuestionId, QuestionLocationInfo>;
}

export const StageAccordion: React.FC<StageAccordionProps> = ({
  stage,
  questions,
  isExpanded,
  onToggleExpand,
  doneSet,
  onToggleDone,
  starredSet,
  onToggleStar,
  practiceMode,
  revealedSet,
  onToggleReveal,
  isSearching = false,
  locationMap,
}) => {
  const doneInStage = questions.filter((q) => doneSet.has(q.number)).length;
  const qRange =
    questions.length > 0
      ? questions.length === 1
        ? `Q${questions[0].number}`
        : `Q${questions[0].number}–Q${questions[questions.length - 1].number}`
      : '';

  return (
    <section
      id={`stage-${stage.id}`}
      aria-labelledby={`stage-heading-${stage.id}`}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => onToggleExpand(stage.id)}
        aria-expanded={isExpanded}
        className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
      >
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-sky-800 dark:text-sky-300">
              Part {stage.part} · {stage.partTitle}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-medium">{qRange}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {doneInStage}/{questions.length} done
            </span>
          </div>
          <h2
            id={`stage-heading-${stage.id}`}
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 leading-snug"
          >
            Stage {stage.id}. {stage.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {stage.subtitle}
          </p>
        </div>

        <span
          className="mt-1 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0"
          aria-hidden="true"
        >
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-3 sm:p-5 space-y-4">
          {questions.map((q) => {
            const loc = isSearching && locationMap ? locationMap.get(q.number) : undefined;
            const searchContextLine = loc
              ? `In Study Order: Stage ${loc.stageId} (#${q.number}) · In Exam View: ${loc.examTerm} · Unit ${loc.unitCode} · ${loc.sectionTitle} · #${loc.sectionNumberPrefix} (${loc.bankLabel})`
              : undefined;

            return (
              <QuestionCard
                key={q.number}
                question={q}
                isDone={doneSet.has(q.number)}
                onToggleDone={onToggleDone}
                isStarred={starredSet.has(q.number)}
                onToggleStar={onToggleStar}
                practiceMode={practiceMode}
                isRevealed={revealedSet.has(q.number)}
                onToggleReveal={onToggleReveal}
                searchContextLine={searchContextLine}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
