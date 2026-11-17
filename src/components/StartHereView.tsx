import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, FileText, Layers, ShieldAlert } from 'lucide-react';
import { GUIDE_SECTIONS, VIEW_SWITCH_GUIDE } from '../data/guideData';
import { ALL_STAGES } from '../data/stages';

interface StartHereViewProps {
  mode: 'guide' | 'sources';
  onGoToStages: (stageId?: number | 'all') => void;
  onSwitchMode: (mode: 'guide' | 'sources') => void;
}

export const StartHereView: React.FC<StartHereViewProps> = ({
  mode,
  onGoToStages,
  onSwitchMode,
}) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const allQuestions = ALL_STAGES.flatMap((s) => s.questions);
  const totalQuestions = allQuestions.length;
  const supplementCount = allQuestions.filter((q) => q.usesTextbookSupplement).length;
  const noDiagramCount = allQuestions.filter(
    (q) => !q.sections.some((sec) => Boolean(sec.image))
  ).length;

  const isSourcesOnly = mode === 'sources';
  const activePlan = GUIDE_SECTIONS.part2HowToStudy.studyPlans[selectedPlanIndex];

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onGoToStages('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {totalQuestions} Questions</span>
          </button>

          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => onSwitchMode('guide')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                mode === 'guide'
                  ? 'bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start Here Guide</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('sources')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                mode === 'sources'
                  ? 'bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sources &amp; Coverage</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            {isSourcesOnly
              ? 'Sources, Note Coverage & Diagram Map'
              : 'Start Here — Complete Study Guide'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {isSourcesOnly
              ? `Exact mapping from your 5 unit folders, the ${supplementCount} textbook supplements, note differences, and uncovered syllabus topics.`
              : 'Everything you need to know about how this site works, how to study for tomorrow’s QST exam, time plans, sources, and exam-writing rules.'}
          </p>
        </div>

        {!isSourcesOnly && (
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {[
              { id: 'part-views', label: 'Two Views Guide' },
              { id: 'part-1', label: '1. What this site is' },
              { id: 'part-2', label: '2. How to study' },
              { id: 'part-3', label: '3. App controls' },
              { id: 'part-4', label: '4. Sources' },
              { id: 'part-5', label: '5. Not covered' },
              { id: 'part-6', label: '6. Writing answers' },
            ].map((anchor) => (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 text-slate-700 dark:text-slate-300 hover:text-sky-800 dark:hover:text-sky-300 font-medium border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {!isSourcesOnly && (
        <>
          {/* New Short Section: Study Order vs Unit-wise Exam View */}
          <section
            id="part-views"
            className="bg-sky-50/70 dark:bg-sky-950/35 border border-sky-200 dark:border-sky-800 rounded-xl p-5 sm:p-6 space-y-3"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              {VIEW_SWITCH_GUIDE.heading}
            </h2>
            <ul className="space-y-1.5 text-sm text-slate-800 dark:text-slate-200 list-disc pl-5">
              {VIEW_SWITCH_GUIDE.lines.map((line, idx) => (
                <li key={idx} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </section>

          {/* Part 1 */}
          <section
            id="part-1"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-3"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              {GUIDE_SECTIONS.part1WhatThisIs.heading}
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
              {GUIDE_SECTIONS.part1WhatThisIs.bullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </section>

          {/* Part 2 */}
          <section
            id="part-2"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              {GUIDE_SECTIONS.part2HowToStudy.heading}
            </h2>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                5-Step Routine Per Question
              </h3>
              <ol className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
                {GUIDE_SECTIONS.part2HowToStudy.routineSteps.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 text-sm text-slate-700 dark:text-slate-300">
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                  2-Mark vs. 5-Mark Practice
                </div>
                <p className="leading-relaxed">{GUIDE_SECTIONS.part2HowToStudy.shortVsLong}</p>
              </div>
              <div className="bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-lg p-3.5 text-sm text-slate-800 dark:text-slate-200">
                <div className="font-bold text-sky-900 dark:text-sky-200 mb-1">
                  Twin Questions Shortcut
                </div>
                <p className="leading-relaxed">{GUIDE_SECTIONS.part2HowToStudy.twinQuestionsNote}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                What to Memorize by Heart (Understand WHY First)
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2.5">
                <strong>Core Principle:</strong>{' '}
                {GUIDE_SECTIONS.part2HowToStudy.memorizeMustKnow.understandWhyRule}
              </p>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-1">
                  Key Formulas &amp; Numbers
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  {GUIDE_SECTIONS.part2HowToStudy.memorizeMustKnow.formulas.map((f, i) => (
                    <li key={i} className="font-mono-math text-[13px] leading-relaxed">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-1">
                  Circuits &amp; Diagrams to Sketch on Paper
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  {GUIDE_SECTIONS.part2HowToStudy.memorizeMustKnow.circuitsAndDiagrams.map((c, i) => (
                    <li key={i} className="leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Time Plans */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
                  <Clock className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                  <span>Realistic Study Time Plans (Including Hardest Stages, Breaks &amp; Sleep)</span>
                </div>
                <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                  {['12-Hour Plan', '10-Hour Plan', '5-Hour Crash'].map((label, idx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedPlanIndex(idx)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                        selectedPlanIndex === idx
                          ? 'bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-300 shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-2">
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {activePlan.name}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{activePlan.summary}</p>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5 pt-1">
                  {activePlan.blocks.map((block, i) => (
                    <li key={i} className="leading-relaxed">
                      {block}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Part 3 */}
          <section
            id="part-3"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-3"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              {GUIDE_SECTIONS.part3HowToUseApp.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GUIDE_SECTIONS.part3HowToUseApp.features.map((feat) => (
                <div
                  key={feat.name}
                  className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 text-sm"
                >
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {feat.name}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Part 4 — Sources (shown in both Start Here and dedicated Sources view) */}
      <section
        id="part-4"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          {GUIDE_SECTIONS.part4Sources.heading}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {GUIDE_SECTIONS.part4Sources.overview}
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-3.5 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
          <strong>Textbook Supplements:</strong> {GUIDE_SECTIONS.part4Sources.textbookQuestionNumbers}
        </div>

        <div className="overflow-x-auto">
          <table className="q-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Qs</th>
                <th>Class Note Files Used</th>
                <th>Notes &amp; Supplements</th>
              </tr>
            </thead>
            <tbody>
              {GUIDE_SECTIONS.part4Sources.stageSources.map((row) => (
                <tr key={row.stageId}>
                  <td className="font-semibold whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onGoToStages(row.stageId)}
                      className="text-sky-700 dark:text-sky-300 hover:underline text-left"
                    >
                      Stage {row.stageId}: {row.title}
                    </button>
                  </td>
                  <td className="whitespace-nowrap font-mono-math text-xs">{row.questionRange}</td>
                  <td className="text-xs">{row.primaryFiles}</td>
                  <td className="text-xs text-slate-600 dark:text-slate-400">
                    {row.supplementalNotes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2.5 pt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Verified Differences Across Class Note Files
          </h3>
          <div className="space-y-2">
            {GUIDE_SECTIONS.part4Sources.disagreements.map((d) => (
              <div
                key={d.topic}
                className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs sm:text-sm"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100">{d.topic}</div>
                <p className="text-slate-700 dark:text-slate-300 mt-1">{d.difference}</p>
                <p className="text-sky-900 dark:text-sky-200 mt-1">
                  <strong>Handled here:</strong> {d.howHandled}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Why {noDiagramCount} Questions Have No Diagram Image (Diagram Availability Audit)
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {GUIDE_SECTIONS.part4Sources.missingDiagramsSummary}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GUIDE_SECTIONS.part4Sources.missingDiagramGroups.map((g) => (
              <div
                key={g.category}
                className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {g.category}
                </div>
                <div className="font-mono-math text-sky-900 dark:text-sky-300 mb-1">
                  {g.questions}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{g.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 5 — Uncovered Syllabus Topics (shown in both views for transparency) */}
      <section
        id="part-5"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-3"
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            {GUIDE_SECTIONS.part5Uncovered.heading}
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {GUIDE_SECTIONS.part5Uncovered.intro}
        </p>
        <div className="space-y-3">
          {GUIDE_SECTIONS.part5Uncovered.units.map((u) => (
            <div
              key={u.unit}
              className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5"
            >
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1.5">
                {u.unit}
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                {u.topicsNotInQuestions.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {!isSourcesOnly && (
        /* Part 6 — Writing Answers in the Exam */
        <section
          id="part-6"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-3"
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            {GUIDE_SECTIONS.part6ExamWriting.heading}
          </h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
            {GUIDE_SECTIONS.part6ExamWriting.tips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onGoToStages(1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-700 text-white text-xs sm:text-sm font-semibold hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Start Studying Stage 1 Now</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
