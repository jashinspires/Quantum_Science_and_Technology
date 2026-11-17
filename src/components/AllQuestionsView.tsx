import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ListOrdered, Search, Star } from 'lucide-react';
import type { QuestionId, StudyQuestion, StudyStage } from '../types/study';
import { filterStages, type MarksFilter } from '../utils/studyLogic';
import {
  buildUnitExamGroups,
  type UnitCode,
  type UnitExamQuestionItem,
  type UnitMarksSection,
} from '../utils/examView';

type AllQuestionsScope = 'both' | 'study' | 'units';

interface AllQuestionsViewProps {
  stages: StudyStage[];
  doneSet: ReadonlySet<QuestionId>;
  starredSet: ReadonlySet<QuestionId>;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
  onOpenInStudyOrder: (questionNumber: QuestionId, stageId: number) => void;
  onOpenInUnitExam: (
    questionNumber: QuestionId,
    unitCode: UnitCode,
    sectionId: string
  ) => void;
  onBackToAnswers: () => void;
}

interface QuestionOnlyCardProps {
  idAttr: string;
  question: StudyQuestion;
  prefixLabel: string;
  metaLead: string;
  isDone: boolean;
  isStarred: boolean;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
  onOpenAnswer: () => void;
}

const QuestionOnlyCard: React.FC<QuestionOnlyCardProps> = ({
  idAttr,
  question,
  prefixLabel,
  metaLead,
  isDone,
  isStarred,
  onToggleDone,
  onToggleStar,
  onOpenAnswer,
}) => {
  return (
    <article
      id={idAttr}
      className={`border rounded-xl p-4 sm:p-5 transition-colors ${
        isDone
          ? 'border-emerald-300 bg-emerald-50/25 dark:border-emerald-800 dark:bg-emerald-950/25'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {metaLead}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
              ·
            </span>
            <span className="text-slate-500 dark:text-slate-400">{question.sourceTag}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
              ·
            </span>
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

          {/* Exact verbatim question text — identical to QuestionCard */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
            {prefixLabel}. {question.question}
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
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-2 self-start">
          <button
            type="button"
            onClick={() => onToggleStar(question.number)}
            aria-pressed={isStarred}
            aria-label={`Star question ${question.number} for later revision`}
            className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[38px] whitespace-nowrap shrink-0 ${
              isStarred
                ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-amber-900/70'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                isStarred ? 'fill-amber-500 text-amber-600 dark:fill-amber-400 dark:text-amber-400' : ''
              }`}
            />
            <span>{isStarred ? 'Starred' : 'Star'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleDone(question.number)}
            aria-pressed={isDone}
            aria-label={`Mark question ${question.number} as done`}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[38px] whitespace-nowrap shrink-0 ${
              isDone
                ? 'bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:border-emerald-600 dark:hover:bg-emerald-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isDone ? 'Done' : 'Mark done'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAnswer}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold border border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-200 dark:hover:bg-sky-900/60 transition-colors min-h-[38px] whitespace-nowrap shrink-0"
          >
            <span>View answer</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </article>
  );
};

export const AllQuestionsView: React.FC<AllQuestionsViewProps> = ({
  stages,
  doneSet,
  starredSet,
  onToggleDone,
  onToggleStar,
  onOpenInStudyOrder,
  onOpenInUnitExam,
  onBackToAnswers,
}) => {
  const [scope, setScope] = useState<AllQuestionsScope>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [marksFilter, setMarksFilter] = useState<MarksFilter>('all');
  const [onlyPending, setOnlyPending] = useState(false);
  const [onlyStarred, setOnlyStarred] = useState(false);

  const totalQuestionCount = useMemo(
    () => stages.reduce((acc, s) => acc + s.questions.length, 0),
    [stages]
  );

  const filteredStages = useMemo(
    () =>
      filterStages(stages, {
        searchQuery,
        marksFilter,
        selectedStageId: 'all',
        onlyPending,
        doneSet,
        onlyStarred,
        starredSet,
      }),
    [stages, searchQuery, marksFilter, onlyPending, doneSet, onlyStarred, starredSet]
  );

  const filteredTermGroups = useMemo(
    () =>
      buildUnitExamGroups(stages, {
        searchQuery,
        marksFilter,
        selectedUnitCode: 'all',
        onlyPending,
        doneSet,
        onlyStarred,
        starredSet,
      }),
    [stages, searchQuery, marksFilter, onlyPending, doneSet, onlyStarred, starredSet]
  );

  const visibleStudyCount = useMemo(
    () => filteredStages.reduce((acc, s) => acc + s.questions.length, 0),
    [filteredStages]
  );

  const visibleUnitCount = useMemo(
    () =>
      filteredTermGroups.reduce(
        (acc, t) =>
          acc +
          t.units.reduce(
            (ua, u) => ua + u.twoMarkSection.items.length + u.fiveMarkSection.items.length,
            0
          ),
        0
      ),
    [filteredTermGroups]
  );

  const hasFilters =
    searchQuery.trim().length > 0 || marksFilter !== 'all' || onlyPending || onlyStarred;

  const clearFilters = () => {
    setSearchQuery('');
    setMarksFilter('all');
    setOnlyPending(false);
    setOnlyStarred(false);
  };

  const renderUnitQuestionItem = (item: UnitExamQuestionItem, sectionId: string, unitCode: UnitCode) => {
    const q = item.question;
    return (
      <QuestionOnlyCard
        key={`unit-${unitCode}-${q.number}`}
        idAttr={`aq-unit-${q.number}`}
        question={q}
        prefixLabel={item.sectionNumberPrefix}
        metaLead={item.parsedTag.bankLabel}
        isDone={doneSet.has(q.number)}
        isStarred={starredSet.has(q.number)}
        onToggleDone={onToggleDone}
        onToggleStar={onToggleStar}
        onOpenAnswer={() => onOpenInUnitExam(q.number, unitCode, sectionId)}
      />
    );
  };

  const renderUnitSection = (section: UnitMarksSection, unitCode: UnitCode) => {
    if (section.items.length === 0) {
      return (
        <div
          key={section.id}
          className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/70 dark:bg-slate-950/30"
        >
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            {section.title} (0)
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic mt-1">
            No matching {section.marks}-mark questions in this unit.
          </p>
        </div>
      );
    }

    return (
      <div
        key={section.id}
        className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/70 dark:bg-slate-950/30 p-3 sm:p-4 space-y-3"
      >
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 px-1">
          {section.title} ({section.items.length})
        </h4>

        {section.ungroupedItems.map((item) => renderUnitQuestionItem(item, section.id, unitCode))}

        {section.longGroups.map((group) => (
          <div
            key={group.groupNumber}
            className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 bg-white/70 dark:bg-slate-900/50 space-y-3"
          >
            <div className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 px-1">
              {group.groupLabel} · Sub-questions (a) and (b)
            </div>
            <div className="space-y-3">
              {group.questions.map((item) => renderUnitQuestionItem(item, section.id, unitCode))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToAnswers}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Questions with Answers</span>
          </button>

          <div
            role="group"
            aria-label="Choose question list section"
            className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <button
              type="button"
              onClick={() => setScope('both')}
              aria-pressed={scope === 'both'}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                scope === 'both'
                  ? 'bg-sky-700 text-white dark:bg-sky-600'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Study Order + Unit-wise
            </button>
            <button
              type="button"
              onClick={() => setScope('study')}
              aria-pressed={scope === 'study'}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                scope === 'study'
                  ? 'bg-sky-700 text-white dark:bg-sky-600'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Study Order ({totalQuestionCount})
            </button>
            <button
              type="button"
              onClick={() => setScope('units')}
              aria-pressed={scope === 'units'}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                scope === 'units'
                  ? 'bg-sky-700 text-white dark:bg-sky-600'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Unit-wise ({totalQuestionCount})
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-sky-800 dark:text-sky-300">
            <ListOrdered className="w-4 h-4" />
            <span>Complete Question Bank ({totalQuestionCount} Questions)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            All Questions (Study Order &amp; Unit-wise)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Every question from the course bank in exact wording and layout—arranged both in Study Order and Unit-wise Exam Order without answers, so you can scan or test yourself across all {totalQuestionCount} questions.
          </p>
        </div>

        {scope === 'both' && (
          <div className="flex flex-wrap gap-2">
            <a
              href="#all-questions-study-section"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/60"
            >
              1. Study Order Questions ({visibleStudyCount})
            </a>
            <a
              href="#all-questions-unit-section"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/60"
            >
              2. Unit-wise Questions ({visibleUnitCount})
            </a>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter all questions by keyword, Q#, or tag..."
              aria-label="Filter all questions"
              className="w-full min-h-[40px] pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div
            role="group"
            aria-label="Filter all questions by marks"
            className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-1 gap-1"
          >
            {(['all', '2', '5'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarksFilter(m)}
                aria-pressed={marksFilter === m}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  marksFilter === m
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {m === 'all' ? 'All marks' : `${m}-mark`}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOnlyStarred((s) => !s)}
            aria-pressed={onlyStarred}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[38px] ${
              onlyStarred
                ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            ★ Starred ({starredSet.size})
          </button>

          <button
            type="button"
            onClick={() => setOnlyPending((p) => !p)}
            aria-pressed={onlyPending}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[38px] ${
              onlyPending
                ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-600 dark:border-sky-600'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            Hide done
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </section>

      {/* Section 1: Study Order Questions (Every question across all 19 stages) */}
      {(scope === 'both' || scope === 'study') && (
        <section
          id="all-questions-study-section"
          aria-labelledby="all-questions-study-heading"
          className="space-y-4 scroll-mt-20"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h2
                id="all-questions-study-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight"
              >
                Study Order Questions ({visibleStudyCount})
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                All 19 learning stages (Parts A–E) expanded in sequence.
              </p>
            </div>
            {scope === 'both' && (
              <a
                href="#all-questions-unit-section"
                className="text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline"
              >
                Jump to Unit-wise Questions ↓
              </a>
            )}
          </div>

          {filteredStages.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center text-sm text-slate-600 dark:text-slate-400">
              No Study Order questions match your filters.
            </div>
          ) : (
            <div className="space-y-5">
              {filteredStages.map(({ stage, questions }) => {
                const doneInStage = questions.filter((q) => doneSet.has(q.number)).length;
                const qRange =
                  questions.length === 1
                    ? `Q${questions[0].number}`
                    : `Q${questions[0].number}–Q${questions[questions.length - 1].number}`;

                return (
                  <div
                    key={stage.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-3"
                  >
                    <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
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
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 mt-0.5">
                        Stage {stage.id}. {stage.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {questions.map((q) => (
                        <QuestionOnlyCard
                          key={`study-${q.number}`}
                          idAttr={`aq-study-${q.number}`}
                          question={q}
                          prefixLabel={String(q.number)}
                          metaLead={`Question ${q.number}`}
                          isDone={doneSet.has(q.number)}
                          isStarred={starredSet.has(q.number)}
                          onToggleDone={onToggleDone}
                          onToggleStar={onToggleStar}
                          onOpenAnswer={() => onOpenInStudyOrder(q.number, stage.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Section 2: Unit-wise Questions (Every question across Mid 1 & Mid 2, Units I–V) */}
      {(scope === 'both' || scope === 'units') && (
        <section
          id="all-questions-unit-section"
          aria-labelledby="all-questions-unit-heading"
          className="space-y-4 scroll-mt-20 pt-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h2
                id="all-questions-unit-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight"
              >
                Unit-wise Questions ({visibleUnitCount})
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Mid 1 (Units I–II) and Mid 2 (Units III–V), separated into 2-Mark and 5-Mark sections with sequential numbering from 1.
              </p>
            </div>
            {scope === 'both' && (
              <a
                href="#all-questions-study-section"
                className="text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline"
              >
                Back to Study Order Questions ↑
              </a>
            )}
          </div>

          {filteredTermGroups.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center text-sm text-slate-600 dark:text-slate-400">
              No Unit-wise questions match your filters.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTermGroups.map((termGroup) => (
                <div key={termGroup.examTerm} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 px-1">
                    {termGroup.title}
                  </h3>
                  <div className="space-y-5">
                    {termGroup.units.map((unit) => (
                      <div
                        key={unit.unitCode}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-semibold text-sky-800 dark:text-sky-300">
                              {unit.examTerm} · {unit.totalQuestions} Questions
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50">
                              {unit.title}
                            </h4>
                          </div>
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                            {unit.doneQuestions}/{unit.totalQuestions} done
                          </span>
                        </div>

                        {marksFilter !== '5' && renderUnitSection(unit.twoMarkSection, unit.unitCode)}
                        {marksFilter !== '2' && renderUnitSection(unit.fiveMarkSection, unit.unitCode)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
