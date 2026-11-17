import React from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import type { QuestionId } from '../types/study';
import type {
  ExamTermGroup,
  QuestionLocationInfo,
  UnitCode,
  UnitExamQuestionItem,
  UnitMarksSection,
} from '../utils/examView';
import { QuestionCard } from './QuestionCard';

interface UnitExamViewProps {
  termGroups: ExamTermGroup[];
  locationMap: Map<QuestionId, QuestionLocationInfo>;
  isSearching: boolean;
  marksFilter: 'all' | '2' | '5';
  expandedSectionIds: ReadonlySet<string>;
  collapsedCardNumbers: ReadonlySet<QuestionId>;
  onToggleSection: (sectionId: string) => void;
  onExpandAllInSection: (sectionId: string, questionNumbers: QuestionId[]) => void;
  onCollapseAllInSection: (sectionId: string, questionNumbers: QuestionId[]) => void;
  onToggleCardCollapse: (questionNumber: QuestionId) => void;
  doneSet: ReadonlySet<QuestionId>;
  onToggleDone: (questionNumber: QuestionId) => void;
  starredSet: ReadonlySet<QuestionId>;
  onToggleStar: (questionNumber: QuestionId) => void;
  practiceMode: boolean;
  revealedSet: ReadonlySet<QuestionId>;
  onToggleReveal: (questionNumber: QuestionId) => void;
  onOpenInStudyOrder: (questionNumber: QuestionId, stageId: number) => void;
  onJumpToExamQuestion: (questionNumber: QuestionId, unitCode: UnitCode, sectionId: string) => void;
  onClearFilters: () => void;
}

export const UnitExamView: React.FC<UnitExamViewProps> = ({
  termGroups,
  locationMap,
  isSearching,
  marksFilter,
  expandedSectionIds,
  collapsedCardNumbers,
  onToggleSection,
  onExpandAllInSection,
  onCollapseAllInSection,
  onToggleCardCollapse,
  doneSet,
  onToggleDone,
  starredSet,
  onToggleStar,
  practiceMode,
  revealedSet,
  onToggleReveal,
  onOpenInStudyOrder,
  onJumpToExamQuestion,
  onClearFilters,
}) => {
  if (termGroups.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
        <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
          No questions match your current filters.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Try clearing the search box or switching back to all marks and all units.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  const buildSearchContext = (qNum: QuestionId): string | undefined => {
    if (!isSearching) return undefined;
    const loc = locationMap.get(qNum);
    if (!loc) return undefined;
    return `In Exam View: ${loc.examTerm} · Unit ${loc.unitCode} · ${loc.sectionTitle} · #${loc.sectionNumberPrefix} (${loc.bankLabel}) · In Study Order: Stage ${loc.stageId} (#${qNum})`;
  };

  const renderExamCard = (item: UnitExamQuestionItem) => {
    const q = item.question;
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
        searchContextLine={buildSearchContext(q.number)}
        isCollapsedInSection={collapsedCardNumbers.has(q.number)}
        onToggleSectionCardCollapse={onToggleCardCollapse}
        examMeta={{
          studyStageId: item.stageId,
          bankLabel: item.parsedTag.bankLabel,
          cardNumberPrefix: item.sectionNumberPrefix,
          buildsOn: item.buildsOn,
          onOpenInStudyOrder,
          onJumpToQuestion: (depNum) => {
            const loc = locationMap.get(depNum);
            if (!loc) return;
            const secId = `unit-${loc.unitCode}-${loc.marks}`;
            onJumpToExamQuestion(depNum, loc.unitCode, secId);
          },
        }}
      />
    );
  };

  const renderSection = (section: UnitMarksSection) => {
    const isExpanded = isSearching || expandedSectionIds.has(section.id);
    const qNums = section.items.map((i) => i.question.number);
    const hasItems = section.items.length > 0;

    return (
      <div
        key={section.id}
        id={section.id}
        className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden"
      >
        <div className="p-3.5 sm:p-4 bg-slate-50/80 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleSection(section.id)}
            aria-expanded={isExpanded}
            className="flex items-center gap-2 text-left min-w-0 flex-1"
          >
            <span className="p-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
              {section.title} ({section.items.length})
            </h4>
          </button>

          {hasItems && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onExpandAllInSection(section.id, qNums)}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={() => onCollapseAllInSection(section.id, qNums)}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Collapse all
              </button>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 space-y-4 bg-slate-50/40 dark:bg-slate-950/30">
            {!hasItems ? (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic py-2 px-1">
                No {section.marks}-mark questions in this unit (0 questions).
              </p>
            ) : (
              <>
                {section.ungroupedItems.map(renderExamCard)}

                {section.longGroups.map((group) => (
                  <div
                    key={group.groupNumber}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 bg-white/70 dark:bg-slate-900/50 space-y-3"
                  >
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 px-1">
                      {group.groupLabel} · Sub-questions (a) and (b)
                    </div>
                    <div className="space-y-3">
                      {group.questions.map(renderExamCard)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {termGroups.map((termGroup) => (
        <section
          key={termGroup.examTerm}
          aria-labelledby={`exam-term-${termGroup.examTerm.replace(/\s+/g, '-')}`}
          className="space-y-5"
        >
          <div className="space-y-2">
            <h2
              id={`exam-term-${termGroup.examTerm.replace(/\s+/g, '-')}`}
              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight"
            >
              {termGroup.title}
            </h2>
            {termGroup.note && (
              <div className="flex items-start gap-2.5 bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700 dark:text-amber-400" />
                <span>{termGroup.note}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {termGroup.units.map((unit) => {
              const showTwoSection = marksFilter !== '5';
              const showFiveSection = marksFilter !== '2';

              return (
                <section
                  key={unit.unitCode}
                  id={`unit-${unit.unitCode}`}
                  aria-labelledby={`unit-heading-${unit.unitCode}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4"
                >
                  {/* Unit Header + Progress Bar */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="text-xs font-semibold text-sky-800 dark:text-sky-300">
                          {unit.examTerm} · {unit.totalQuestions} Questions
                        </div>
                        <h3
                          id={`unit-heading-${unit.unitCode}`}
                          className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50"
                        >
                          {unit.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          {unit.subtitle}
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums shrink-0 pt-0.5">
                        {unit.doneQuestions}/{unit.totalQuestions} done ({unit.percentDone}%)
                      </div>
                    </div>

                    <div
                      className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/70 dark:border-slate-700"
                      role="progressbar"
                      aria-valuenow={unit.percentDone}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${unit.title} progress`}
                    >
                      <div
                        className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-200"
                        style={{ width: `${unit.percentDone}%` }}
                      />
                    </div>
                  </div>

                  {/* Sections 1 & 2 strictly in order: 2-Mark then 5-Mark */}
                  <div className="space-y-4">
                    {showTwoSection && renderSection(unit.twoMarkSection)}
                    {showFiveSection && renderSection(unit.fiveMarkSection)}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
