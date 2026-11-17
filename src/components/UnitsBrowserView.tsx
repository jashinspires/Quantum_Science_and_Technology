import React from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import type { MarkValue, QuestionId } from '../types/study';
import { UNIT_METADATA, type UnitCode, type UnitExamGroup } from '../utils/examView';
import { QuestionRow } from './QuestionRow';

interface UnitsListViewProps {
  unitGroups: UnitExamGroup[];
}

export const UnitsListView: React.FC<UnitsListViewProps> = ({ unitGroups }) => {
  const totalQuestions = unitGroups.reduce((acc, u) => acc + u.totalQuestions, 0);
  const doneTotal = unitGroups.reduce((acc, u) => acc + u.doneQuestions, 0);

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Unit-wise
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Select a syllabus unit to open its 2-mark and 5-mark question sets ({totalQuestions} questions total).
          </p>
        </div>
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
          {doneTotal} / {totalQuestions} done
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {unitGroups.map((unit) => {
          const meta = UNIT_METADATA[unit.unitCode];
          return (
            <a
              key={unit.unitCode}
              href={`#/units/${unit.unitCode}`}
              data-testid={`unit-card-${unit.unitCode}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 rounded-xl p-6 flex flex-col justify-between gap-5 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span className="text-sky-700 dark:text-sky-300">
                    Unit {unit.unitCode} · {meta.examTerm}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                    {unit.doneQuestions} / {unit.totalQuestions} done
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300 leading-snug">
                  {meta.syllabusTitle}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {meta.subtitle}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 dark:bg-emerald-500"
                    style={{ width: `${unit.percentDone}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                  <span>
                    {unit.twoMarkSection.totalInUnitForMarks} × 2M · {unit.fiveMarkSection.totalInUnitForMarks} × 5M
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
    </div>
  );
};

interface UnitMarksPickerViewProps {
  unitGroup: UnitExamGroup;
  doneSet: ReadonlySet<QuestionId>;
}

export const UnitMarksPickerView: React.FC<UnitMarksPickerViewProps> = ({
  unitGroup,
  doneSet,
}) => {
  const meta = UNIT_METADATA[unitGroup.unitCode];
  const twoCount = unitGroup.twoMarkSection.items.length;
  const twoDone = unitGroup.twoMarkSection.items.filter((i) =>
    doneSet.has(i.question.number)
  ).length;
  const fiveCount = unitGroup.fiveMarkSection.items.length;
  const fiveDone = unitGroup.fiveMarkSection.items.filter((i) =>
    doneSet.has(i.question.number)
  ).length;

  return (
    <div className="space-y-6 py-2">
      <div>
        <a
          href="#/units"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All units</span>
        </a>
      </div>

      <header className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          Unit {unitGroup.unitCode} · {meta.examTerm}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {meta.syllabusTitle}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">{meta.subtitle}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          {unitGroup.doneQuestions} / {unitGroup.totalQuestions} done ({unitGroup.percentDone}%)
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {twoCount === 0 ? (
          <div
            aria-disabled="true"
            className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-7 opacity-60 cursor-not-allowed space-y-2"
          >
            <h2 className="text-2xl font-bold text-slate-500">2 Marks</h2>
            <p className="text-sm text-slate-500">No 2-mark questions in this unit.</p>
          </div>
        ) : (
          <a
            href={`#/units/${unitGroup.unitCode}/2`}
            data-testid={`unit-pick-2-${unitGroup.unitCode}`}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 rounded-xl p-7 flex flex-col justify-between gap-5 transition-colors"
          >
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                {twoDone} / {twoCount} done
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                2 Marks
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Short exam definitions, formulas, and concise 3–5 sentence answers.
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-sky-700 dark:text-sky-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{twoCount} questions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        )}

        {fiveCount === 0 ? (
          <div
            aria-disabled="true"
            className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-7 opacity-60 cursor-not-allowed space-y-2"
          >
            <h2 className="text-2xl font-bold text-slate-500">5 Marks</h2>
            <p className="text-sm text-slate-500">No 5-mark questions in this unit.</p>
          </div>
        ) : (
          <a
            href={`#/units/${unitGroup.unitCode}/5`}
            data-testid={`unit-pick-5-${unitGroup.unitCode}`}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-600 dark:hover:border-sky-500 rounded-xl p-7 flex flex-col justify-between gap-5 transition-colors"
          >
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                {fiveDone} / {fiveCount} done
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                5 Marks
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Long derivations, step-by-step proofs, circuits, and worked numerical examples.
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-sky-700 dark:text-sky-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{fiveCount} questions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

interface UnitQuestionsListViewProps {
  unitGroup: UnitExamGroup;
  marks: MarkValue;
  doneSet: ReadonlySet<QuestionId>;
  starredSet: ReadonlySet<QuestionId>;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
}

export const UnitQuestionsListView: React.FC<UnitQuestionsListViewProps> = ({
  unitGroup,
  marks,
  doneSet,
  starredSet,
  onToggleDone,
  onToggleStar,
}) => {
  const meta = UNIT_METADATA[unitGroup.unitCode];
  const section = marks === 2 ? unitGroup.twoMarkSection : unitGroup.fiveMarkSection;
  const otherMarks: MarkValue = marks === 2 ? 5 : 2;
  const otherSection = otherMarks === 2 ? unitGroup.twoMarkSection : unitGroup.fiveMarkSection;
  const doneInSection = section.items.filter((i) => doneSet.has(i.question.number)).length;

  const makeQuestionHash = (unitCode: UnitCode, qNumber: QuestionId) =>
    `#/units/${unitCode}/${marks}/q/${encodeURIComponent(String(qNumber))}`;

  return (
    <div className="space-y-5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href={`#/units/${unitGroup.unitCode}`}
          data-testid="back-to-unit-marks"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Unit {unitGroup.unitCode}</span>
        </a>

        {otherSection.items.length > 0 && (
          <a
            href={`#/units/${unitGroup.unitCode}/${otherMarks}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Switch to {otherMarks} Marks ({otherSection.items.length})
          </a>
        )}
      </div>

      <header className="space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          Unit {unitGroup.unitCode} · {meta.examTerm}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {meta.syllabusTitle} — {marks} Marks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 tabular-nums">
          {doneInSection} / {section.items.length} done · Sequentially numbered starting from 1
        </p>
      </header>

      {section.longGroups.length > 0 ? (
        <div className="space-y-5">
          {section.ungroupedItems.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
              {section.ungroupedItems.map((item) => (
                <QuestionRow
                  key={String(item.question.number)}
                  question={item.question}
                  prefix={item.sectionNumberPrefix}
                  metaLabel={`${item.parsedTag.bankLabel} · Study #${item.question.number}`}
                  targetHash={makeQuestionHash(unitGroup.unitCode, item.question.number)}
                  isDone={doneSet.has(item.question.number)}
                  isStarred={starredSet.has(item.question.number)}
                  onToggleDone={onToggleDone}
                  onToggleStar={onToggleStar}
                />
              ))}
            </div>
          )}

          {section.longGroups.map((group) => (
            <section key={group.groupNumber} className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 px-1">
                {group.groupLabel} · Sub-questions (a) and (b)
              </h2>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
                {group.questions.map((item) => (
                  <QuestionRow
                    key={String(item.question.number)}
                    question={item.question}
                    prefix={item.sectionNumberPrefix}
                    metaLabel={`${item.parsedTag.bankLabel} · Study #${item.question.number}`}
                    targetHash={makeQuestionHash(unitGroup.unitCode, item.question.number)}
                    isDone={doneSet.has(item.question.number)}
                    isStarred={starredSet.has(item.question.number)}
                    onToggleDone={onToggleDone}
                    onToggleStar={onToggleStar}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
          {section.items.map((item) => (
            <QuestionRow
              key={String(item.question.number)}
              question={item.question}
              prefix={item.sectionNumberPrefix}
              metaLabel={`${item.parsedTag.bankLabel} · Study #${item.question.number}`}
              targetHash={makeQuestionHash(unitGroup.unitCode, item.question.number)}
              isDone={doneSet.has(item.question.number)}
              isStarred={starredSet.has(item.question.number)}
              onToggleDone={onToggleDone}
              onToggleStar={onToggleStar}
            />
          ))}
        </div>
      )}
    </div>
  );
};
