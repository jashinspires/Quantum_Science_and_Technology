import React, { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, ChevronRight, Eye, ImageOff, Link2, Star } from 'lucide-react';
import type { QuestionId, QuestionImage, StudyQuestion } from '../types/study';
import type { QuestionLocationInfo } from '../utils/examView';

export interface QuestionExamMeta {
  studyStageId: number;
  bankLabel: string;
  cardNumberPrefix: string;
  buildsOn: QuestionLocationInfo[];
  onOpenInStudyOrder: (questionNumber: QuestionId, stageId: number) => void;
  onJumpToQuestion: (questionNumber: QuestionId) => void;
}

interface QuestionCardProps {
  question: StudyQuestion;
  isDone: boolean;
  onToggleDone: (questionNumber: QuestionId) => void;
  isStarred: boolean;
  onToggleStar: (questionNumber: QuestionId) => void;
  practiceMode: boolean;
  isRevealed: boolean;
  onToggleReveal: (questionNumber: QuestionId) => void;
  examMeta?: QuestionExamMeta;
  searchContextLine?: string;
  isCollapsedInSection?: boolean;
  onToggleSectionCardCollapse?: (questionNumber: QuestionId) => void;
}

const DiagramFigure: React.FC<{ img: QuestionImage }> = ({ img }) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="my-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4">
      {!failed ? (
        <div className="bg-white border border-slate-200/80 dark:border-slate-700 rounded-md p-2 flex justify-center overflow-x-auto">
          <img
            src={`./images/${img.file}`}
            alt={img.caption}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="max-w-full max-h-[380px] object-contain"
          />
        </div>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 gap-2 text-xs">
          <ImageOff className="w-5 h-5" />
          <span>Diagram file unavailable ({img.file})</span>
        </div>
      )}
      <figcaption className="mt-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed break-words">
        <span className="font-semibold text-slate-800 dark:text-slate-200">{img.caption}</span>
      </figcaption>
    </figure>
  );
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isDone,
  onToggleDone,
  isStarred,
  onToggleStar,
  practiceMode,
  isRevealed,
  onToggleReveal,
  examMeta,
  searchContextLine,
  isCollapsedInSection = false,
  onToggleSectionCardCollapse,
}) => {
  const showAnswer = !practiceMode || isRevealed;
  const images = question.sections
    .map((sec) => sec.image)
    .filter((img): img is QuestionImage => Boolean(img));

  return (
    <article
      id={`q-${question.number}`}
      data-question-number={question.number}
      className={`scroll-mt-20 border rounded-xl p-4 sm:p-6 transition-colors ${
        isDone
          ? 'border-emerald-300 bg-emerald-50/25 dark:border-emerald-800 dark:bg-emerald-950/25'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      {/* Card Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
          isCollapsedInSection ? '' : 'pb-4 border-b border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            {examMeta ? (
              <>
                <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                  {examMeta.bankLabel}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400">{question.sourceTag}</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                  Question {question.number}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400">{question.sourceTag}</span>
              </>
            )}
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span
              className={`px-2 py-0.5 rounded font-semibold tabular-nums border ${
                question.marks === 5
                  ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}
            >
              {question.marks} marks
            </span>
          </div>

          {/* Exact verbatim question text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
            {examMeta ? examMeta.cardNumberPrefix : question.number}. {question.question}
          </h3>

          {question.questionMathHtml && (
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: question.questionMathHtml }}
            />
          )}

          {question.orderNote && (
            <p className="text-xs italic text-slate-500 dark:text-slate-400 mt-1">
              {question.orderNote}
            </p>
          )}

          {/* Search location context across both views */}
          {searchContextLine && (
            <p className="text-xs text-sky-800 dark:text-sky-300 font-medium pt-0.5">
              {searchContextLine}
            </p>
          )}

          {/* Unit-wise Exam View navigation links */}
          {examMeta && (
            <div className="pt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => examMeta.onOpenInStudyOrder(question.number, examMeta.studyStageId)}
                className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-300 hover:underline text-left"
              >
                <span>
                  Study order: #{question.number} · Stage {examMeta.studyStageId}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {examMeta.buildsOn.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <Link2 className="w-3 h-3 shrink-0" />
                    <span>Builds on:</span>
                  </span>
                  {examMeta.buildsOn.map((dep, idx) => (
                    <React.Fragment key={dep.questionNumber}>
                      <button
                        type="button"
                        onClick={() => examMeta.onJumpToQuestion(dep.questionNumber)}
                        title={`Study order #${dep.questionNumber} · Stage ${dep.stageId}: ${dep.stageTitle} (${dep.bankLabel})`}
                        className="text-sky-700 dark:text-sky-300 hover:underline font-medium tabular-nums"
                      >
                        Unit {dep.unitCode} · {dep.marks === 2 ? '2M' : '5M'} #{dep.sectionNumberPrefix}
                      </button>
                      {idx < examMeta.buildsOn.length - 1 && (
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Action Buttons: Star + Mark done (+ optional Collapse toggle in Unit view) */}
        <div className="shrink-0 flex flex-wrap items-center gap-2 self-start">
          <button
            type="button"
            onClick={() => onToggleStar(question.number)}
            aria-pressed={isStarred}
            aria-label={`Star question ${question.number} for later revision`}
            className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[40px] whitespace-nowrap shrink-0 ${
              isStarred
                ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-amber-900/70'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-500 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
            <span>{isStarred ? 'Starred' : 'Star'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleDone(question.number)}
            aria-pressed={isDone}
            aria-label={`Mark question ${question.number} as done`}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[40px] whitespace-nowrap shrink-0 ${
              isDone
                ? 'bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:border-emerald-600 dark:hover:bg-emerald-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isDone ? 'Done' : 'Mark done'}</span>
          </button>

          {onToggleSectionCardCollapse && (
            <button
              type="button"
              onClick={() => onToggleSectionCardCollapse(question.number)}
              aria-expanded={!isCollapsedInSection}
              aria-label={isCollapsedInSection ? `Expand question ${question.number}` : `Collapse question ${question.number}`}
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 min-h-[40px] whitespace-nowrap shrink-0"
            >
              {isCollapsedInSection ? (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span>Expand</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Hide</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Card Body (for Unit-wise section Collapse all / Expand all) */}
      {!isCollapsedInSection && (
        <>
          {/* Practice Mode Hidden State */}
          {!showAnswer ? (
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Practice mode active — try recalling this answer from memory first.
              </p>
              <button
                type="button"
                onClick={() => onToggleReveal(question.number)}
                aria-expanded={false}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors min-h-[42px] whitespace-nowrap shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span>Show answer</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 space-y-4">
              {practiceMode && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onToggleReveal(question.number)}
                    aria-expanded={true}
                    className="text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline"
                  >
                    Hide answer
                  </button>
                </div>
              )}

              {/* 1. Understand it (Study-only intuition) */}
              <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 sm:p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-sky-800 dark:text-sky-300 mb-1">
                  Understand it
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {question.intuition}
                </p>
              </div>

              {/* 2. Write this in the exam (Clean self-contained textbook answer) */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 sm:p-5 bg-white dark:bg-slate-900 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 pb-2 border-b border-slate-100 dark:border-slate-800">
                  Write this in the exam
                </div>
                <div className="space-y-3 answer-prose text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed">
                  {question.sections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      {section.label && (
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 pt-1">
                          {section.label}
                        </h4>
                      )}
                      <div dangerouslySetInnerHTML={{ __html: section.html }} />
                      {section.image && <DiagramFigure img={section.image} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Remember these */}
              <div className="bg-slate-100/80 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 sm:p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 mb-2">
                  Remember these
                </div>
                <ul className="space-y-1 text-sm text-slate-800 dark:text-slate-200 list-disc pl-5">
                  {question.rememberThese.map((item, idx) => (
                    <li key={idx} className="leading-snug">
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Source (for study, not for the exam) */}
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Source (for study, not for the exam)
                </div>
                <p className="leading-relaxed">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Notes used:</span>{' '}
                  <span className="font-mono-math">{question.studySource}</span>
                  {question.usesTextbookSupplement && (
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800 font-semibold">
                      Includes textbook supplement
                    </span>
                  )}
                </p>
                {images.length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-400">
                    {images.map((img, i) => (
                      <li key={`${img.file}-${i}`}>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{img.caption}</span>{' '}
                        {img.kindLabel ? `(${img.kindLabel}) ` : ''}
                        — <span className="font-mono-math">{img.source}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {question.noDiagramNote && (
                  <p className="leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Diagram note:</span>{' '}
                    {question.noDiagramNote}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
};

