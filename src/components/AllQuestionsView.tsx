import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import type { QuestionId, StudyStage } from '../types/study';
import { filterStages, type MarksFilter } from '../utils/studyLogic';
import { buildUnitExamGroups, type UnitCode, type UnitMarksSection } from '../utils/examView';
import {
  formatAppRoute,
  getSearchQuestionItems,
  type AllRouteScope,
} from '../utils/navigation';
import { QuestionRow } from './QuestionRow';

interface AllQuestionsViewProps {
  mode: 'all' | 'search';
  stages: StudyStage[];
  scope: AllRouteScope;
  initialQuery: string;
  doneSet: ReadonlySet<QuestionId>;
  starredSet: ReadonlySet<QuestionId>;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
  onScopeChange: (scope: AllRouteScope) => void;
  onSearchQuerySubmit: (query: string) => void;
}

export const AllQuestionsView: React.FC<AllQuestionsViewProps> = ({
  mode,
  stages,
  scope,
  initialQuery,
  doneSet,
  starredSet,
  onToggleDone,
  onToggleStar,
  onScopeChange,
  onSearchQuerySubmit,
}) => {
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [marksFilter, setMarksFilter] = useState<MarksFilter>('all');
  const [onlyPending, setOnlyPending] = useState(false);
  const [onlyStarred, setOnlyStarred] = useState(false);

  const effectiveQuery = mode === 'search' ? initialQuery : localQuery;

  const totalQuestionCount = useMemo(
    () => stages.reduce((acc, s) => acc + s.questions.length, 0),
    [stages]
  );

  const searchItems = useMemo(
    () =>
      mode === 'search'
        ? getSearchQuestionItems(stages, effectiveQuery, {
            marksFilter,
            onlyPending,
            doneSet,
            onlyStarred,
            starredSet,
          })
        : [],
    [mode, stages, effectiveQuery, marksFilter, onlyPending, doneSet, onlyStarred, starredSet]
  );

  const filteredStages = useMemo(
    () =>
      mode === 'all'
        ? filterStages(stages, {
            searchQuery: effectiveQuery,
            marksFilter,
            selectedStageId: 'all',
            onlyPending,
            doneSet,
            onlyStarred,
            starredSet,
          })
        : [],
    [mode, stages, effectiveQuery, marksFilter, onlyPending, doneSet, onlyStarred, starredSet]
  );

  const filteredTermGroups = useMemo(
    () =>
      mode === 'all'
        ? buildUnitExamGroups(stages, {
            searchQuery: effectiveQuery,
            marksFilter,
            selectedUnitCode: 'all',
            onlyPending,
            doneSet,
            onlyStarred,
            starredSet,
          })
        : [],
    [mode, stages, effectiveQuery, marksFilter, onlyPending, doneSet, onlyStarred, starredSet]
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
    effectiveQuery.trim().length > 0 ||
    marksFilter !== 'all' ||
    onlyPending ||
    onlyStarred;

  const clearFilters = () => {
    setLocalQuery('');
    setMarksFilter('all');
    setOnlyPending(false);
    setOnlyStarred(false);
    if (mode === 'search') {
      onSearchQuerySubmit('');
    }
  };

  const makeAllHash = (qNum: QuestionId) =>
    formatAppRoute({
      page: 'all-question',
      questionNumber: qNum,
      scope: scope === 'both' ? undefined : scope,
    });

  const renderUnitSection = (section: UnitMarksSection, unitCode: UnitCode) => {
    if (section.items.length === 0) return null;

    return (
      <div key={section.id} className="space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 px-1">
          Unit {unitCode} · {section.shortTitle} ({section.items.length})
        </h4>

        {section.longGroups.length > 0 ? (
          <div className="space-y-3">
            {section.ungroupedItems.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
                {section.ungroupedItems.map((item) => (
                  <QuestionRow
                    key={`u-${unitCode}-${item.question.number}`}
                    question={item.question}
                    prefix={item.sectionNumberPrefix}
                    metaLabel={item.parsedTag.bankLabel}
                    targetHash={makeAllHash(item.question.number)}
                    isDone={doneSet.has(item.question.number)}
                    isStarred={starredSet.has(item.question.number)}
                    onToggleDone={onToggleDone}
                    onToggleStar={onToggleStar}
                    showSourceTag
                  />
                ))}
              </div>
            )}

            {section.longGroups.map((group) => (
              <div key={group.groupNumber} className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 px-1">
                  {group.groupLabel} · Sub-questions (a) and (b)
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
                  {group.questions.map((item) => (
                    <QuestionRow
                      key={`u-${unitCode}-${item.question.number}`}
                      question={item.question}
                      prefix={item.sectionNumberPrefix}
                      metaLabel={item.parsedTag.bankLabel}
                      targetHash={makeAllHash(item.question.number)}
                      isDone={doneSet.has(item.question.number)}
                      isStarred={starredSet.has(item.question.number)}
                      onToggleDone={onToggleDone}
                      onToggleStar={onToggleStar}
                      showSourceTag
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
            {section.items.map((item) => (
              <QuestionRow
                key={`u-${unitCode}-${item.question.number}`}
                question={item.question}
                prefix={item.sectionNumberPrefix}
                metaLabel={item.parsedTag.bankLabel}
                targetHash={makeAllHash(item.question.number)}
                isDone={doneSet.has(item.question.number)}
                isStarred={starredSet.has(item.question.number)}
                onToggleDone={onToggleDone}
                onToggleStar={onToggleStar}
                showSourceTag
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="#/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </a>

        {mode === 'all' && (
          <div
            role="group"
            aria-label="Choose question list section"
            className="inline-flex flex-wrap gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            {(
              [
                { key: 'both', label: 'Study Order + Unit-wise' },
                { key: 'study', label: `Study Order (${totalQuestionCount})` },
                { key: 'units', label: `Unit-wise (${totalQuestionCount})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onScopeChange(tab.key)}
                aria-pressed={scope === tab.key}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  scope === tab.key
                    ? 'bg-sky-700 text-white dark:bg-sky-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <header className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {mode === 'search'
            ? effectiveQuery.trim()
              ? `Search: “${effectiveQuery.trim()}” (${searchItems.length})`
              : `Search Questions (${searchItems.length})`
            : `All Questions (${totalQuestionCount})`}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {mode === 'search'
            ? 'Matching questions across prompts, answers, formulas, and tags. Click any row to open its full answer.'
            : `Every question across the bank in exact wording—arranged in Study Order and Unit-wise Exam Order. Click any question to read its answer.`}
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {mode === 'all' && (
            <div className="relative flex-1 min-w-[220px]">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Filter questions by keyword, Q#, or tag..."
                aria-label="Filter all questions"
                className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
          )}

          <div
            role="group"
            aria-label="Filter by marks"
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
            className={`px-3 h-10 rounded-lg text-xs font-semibold border transition-colors ${
              onlyStarred
                ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            ★ Starred ({starredSet.size})
          </button>

          <button
            type="button"
            onClick={() => setOnlyPending((p) => !p)}
            aria-pressed={onlyPending}
            className={`px-3 h-10 rounded-lg text-xs font-semibold border transition-colors ${
              onlyPending
                ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-600 dark:border-sky-600'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            Hide done
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-3 h-10 rounded-lg text-xs font-semibold text-sky-700 dark:text-sky-300 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </header>

      {mode === 'search' ? (
        searchItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No questions matched your search.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800"
            >
              Clear search and filters
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
            {searchItems.map((item) => (
              <QuestionRow
                key={`s-${item.question.number}`}
                question={item.question}
                prefix={item.displayPrefix}
                metaLabel={item.metaLabel}
                targetHash={item.targetHash}
                isDone={doneSet.has(item.question.number)}
                isStarred={starredSet.has(item.question.number)}
                onToggleDone={onToggleDone}
                onToggleStar={onToggleStar}
                showSourceTag
              />
            ))}
          </div>
        )
      ) : (
        <div className="space-y-8">
          {(scope === 'both' || scope === 'study') && (
            <section className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Study Order ({visibleStudyCount})
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {stages.length} stages (Parts A–E)
                </span>
              </div>

              {filteredStages.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No Study Order questions match your filters.
                </p>
              ) : (
                <div className="space-y-6">
                  {filteredStages.map(({ stage, questions }) => (
                    <div key={stage.id} className="space-y-2">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 px-1">
                        Part {stage.part} · Stage {stage.id}. {stage.title}
                      </h3>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
                        {questions.map((q) => (
                          <QuestionRow
                            key={`aq-study-${q.number}`}
                            question={q}
                            prefix={`Q${q.number}`}
                            targetHash={makeAllHash(q.number)}
                            isDone={doneSet.has(q.number)}
                            isStarred={starredSet.has(q.number)}
                            onToggleDone={onToggleDone}
                            onToggleStar={onToggleStar}
                            showSourceTag
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {(scope === 'both' || scope === 'units') && (
            <section className="space-y-6 pt-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Unit-wise ({visibleUnitCount})
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Units I–V · 2 Marks &amp; 5 Marks
                </span>
              </div>

              {filteredTermGroups.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No Unit-wise questions match your filters.
                </p>
              ) : (
                <div className="space-y-6">
                  {filteredTermGroups.map((term) => (
                    <div key={term.examTerm} className="space-y-5">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {term.title}
                      </h3>
                      {term.units.map((unit) => (
                        <div key={unit.unitCode} className="space-y-3">
                          {marksFilter !== '5' && renderUnitSection(unit.twoMarkSection, unit.unitCode)}
                          {marksFilter !== '2' && renderUnitSection(unit.fiveMarkSection, unit.unitCode)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};
