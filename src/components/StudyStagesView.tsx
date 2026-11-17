import React from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import type { QuestionId, StudyStage } from '../types/study';
import { QuestionRow } from './QuestionRow';

interface StudyStagesViewProps {
  stages: StudyStage[];
  doneSet: ReadonlySet<QuestionId>;
}

const PART_ORDER: Array<'A' | 'B' | 'C' | 'D' | 'E'> = ['A', 'B', 'C', 'D', 'E'];

export const StudyStagesView: React.FC<StudyStagesViewProps> = ({ stages, doneSet }) => {
  const totalQuestions = stages.reduce((acc, s) => acc + s.questions.length, 0);
  const doneTotal = stages.reduce(
    (acc, s) => acc + s.questions.filter((q) => doneSet.has(q.number)).length,
    0
  );

  return (
    <div className="space-y-8 py-2">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Study Order
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {stages.length} progressive stages arranged under Parts A–E ({totalQuestions} questions total). Pick any stage to open its question list.
          </p>
        </div>
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
          {doneTotal} / {totalQuestions} done
        </div>
      </div>

      <div className="space-y-8">
        {PART_ORDER.map((part) => {
          const partStages = stages.filter((s) => s.part === part);
          if (partStages.length === 0) return null;
          const partTitle = partStages[0].partTitle;

          return (
            <section key={part} aria-labelledby={`part-heading-${part}`} className="space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h2
                  id={`part-heading-${part}`}
                  className="text-lg font-bold text-slate-900 dark:text-slate-100"
                >
                  Part {part} · {partTitle}
                </h2>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {partStages.length} {partStages.length === 1 ? 'stage' : 'stages'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partStages.map((stage) => {
                  const stageDone = stage.questions.filter((q) => doneSet.has(q.number)).length;
                  const stageTotal = stage.questions.length;
                  const pct = stageTotal ? Math.round((stageDone / stageTotal) * 100) : 0;

                  return (
                    <a
                      key={stage.id}
                      href={`#/study/stage-${stage.id}`}
                      data-testid={`stage-card-${stage.id}`}
                      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300">
                          <span>Stage {stage.id}</span>
                          <span className="tabular-nums text-slate-600 dark:text-slate-400">
                            {stageDone} / {stageTotal} done
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300 leading-snug">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {stage.subtitle}
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 dark:bg-emerald-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span>
                            {stageTotal} {stageTotal === 1 ? 'question' : 'questions'}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-300">
                            Open <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

interface StageQuestionsViewProps {
  stage: StudyStage;
  allStages: StudyStage[];
  doneSet: ReadonlySet<QuestionId>;
  starredSet: ReadonlySet<QuestionId>;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
}

export const StageQuestionsView: React.FC<StageQuestionsViewProps> = ({
  stage,
  allStages,
  doneSet,
  starredSet,
  onToggleDone,
  onToggleStar,
}) => {
  const stageIdx = allStages.findIndex((s) => s.id === stage.id);
  const prevStage = stageIdx > 0 ? allStages[stageIdx - 1] : null;
  const nextStage = stageIdx >= 0 && stageIdx < allStages.length - 1 ? allStages[stageIdx + 1] : null;

  const doneCount = stage.questions.filter((q) => doneSet.has(q.number)).length;
  const twoMarkCount = stage.questions.filter((q) => q.marks === 2).length;
  const fiveMarkCount = stage.questions.filter((q) => q.marks === 5).length;

  return (
    <div className="space-y-5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="#/study"
          data-testid="back-to-stages"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All stages</span>
        </a>

        <div className="flex items-center gap-3 text-xs font-semibold">
          {prevStage && (
            <a
              href={`#/study/stage-${prevStage.id}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Stage {prevStage.id}</span>
            </a>
          )}
          {nextStage && (
            <a
              href={`#/study/stage-${nextStage.id}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span>Stage {nextStage.id}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <header className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          Part {stage.part} · {stage.partTitle} · Stage {stage.id}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {stage.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">{stage.subtitle}</p>
        <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums pt-1">
          {doneCount} / {stage.questions.length} done · {twoMarkCount} two-mark · {fiveMarkCount} five-mark
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
        {stage.questions.map((q) => (
          <QuestionRow
            key={String(q.number)}
            question={q}
            prefix={`Q${q.number}`}
            metaLabel={q.sourceTag}
            targetHash={`#/study/stage-${stage.id}/q/${encodeURIComponent(String(q.number))}`}
            isDone={doneSet.has(q.number)}
            isStarred={starredSet.has(q.number)}
            onToggleDone={onToggleDone}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>
    </div>
  );
};
