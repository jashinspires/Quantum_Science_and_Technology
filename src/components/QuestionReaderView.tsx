import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  ImageOff,
  Link2,
  Star,
  ZoomIn,
} from 'lucide-react';
import type { QuestionId, QuestionImage } from '../types/study';
import type { QuestionNavigationContext } from '../utils/navigation';

interface QuestionReaderViewProps {
  context: QuestionNavigationContext;
  isDone: boolean;
  isStarred: boolean;
  practiceMode: boolean;
  isRevealed: boolean;
  onToggleDone: (questionNumber: QuestionId) => void;
  onToggleStar: (questionNumber: QuestionId) => void;
  onToggleReveal: (questionNumber: QuestionId) => void;
  onOpenLightbox: (image: QuestionImage) => void;
}

const FigureThumbCard: React.FC<{
  image: QuestionImage;
  onOpenLightbox: (image: QuestionImage) => void;
}> = ({ image, onOpenLightbox }) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="space-y-2" data-testid="answer-figure">
      {!failed ? (
        <button
          type="button"
          onClick={() => onOpenLightbox(image)}
          aria-label={`Enlarge diagram: ${image.caption}`}
          className="group block w-full bg-white border border-slate-200 dark:border-slate-700 hover:border-sky-600 dark:hover:border-sky-400 rounded-lg p-2.5 text-center cursor-zoom-in transition-colors"
        >
          <img
            src={`./images/${image.file}`}
            alt={image.caption}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="figure-img-capped mx-auto"
          />
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sky-700 dark:text-sky-700 group-hover:underline">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to view full size</span>
          </span>
        </button>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 gap-2 text-xs">
          <ImageOff className="w-5 h-5" />
          <span>Diagram file unavailable ({image.file})</span>
        </div>
      )}
      <figcaption className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed break-words">
        <span className="font-semibold text-slate-800 dark:text-slate-200">{image.caption}</span>
      </figcaption>
    </figure>
  );
};

const ReaderNavStrip: React.FC<{
  context: QuestionNavigationContext;
  position: 'top' | 'bottom';
}> = ({ context, position }) => (
  <div
    className={`flex flex-wrap items-center justify-between gap-2 ${
      position === 'bottom' ? 'pt-5 border-t border-slate-200 dark:border-slate-800' : ''
    }`}
    data-testid={`reader-nav-${position}`}
  >
    <a
      href={context.backToListHash}
      data-testid={`reader-back-${position}`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to list</span>
    </a>

    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums mr-1">
        {context.listIndex + 1} / {context.listTotal}
      </span>

      {context.prevQuestion ? (
        <a
          href={context.prevQuestion.hash}
          data-testid={`reader-prev-${position}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-600 cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </span>
      )}

      {context.nextQuestion ? (
        <a
          href={context.nextQuestion.hash}
          data-testid={`reader-next-${position}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-600 cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
    </div>
  </div>
);

export const QuestionReaderView: React.FC<QuestionReaderViewProps> = ({
  context,
  isDone,
  isStarred,
  practiceMode,
  isRevealed,
  onToggleDone,
  onToggleStar,
  onToggleReveal,
  onOpenLightbox,
}) => {
  const { question } = context;
  const showAnswer = !practiceMode || isRevealed;

  const images = question.sections
    .map((sec) => sec.image)
    .filter((img): img is QuestionImage => Boolean(img));

  return (
    <article
      className="space-y-6 py-2"
      data-testid="question-reader"
      data-question-number={question.number}
    >
      <ReaderNavStrip context={context} position="top" />

      {/* Question Header (flat, readable, fast above-the-fold entry) */}
      <header className="border-b border-slate-200 dark:border-slate-800 pb-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
              {context.metaLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{question.sourceTag}</span>
            <span aria-hidden="true">·</span>
            <span
              className={`px-2 py-0.5 rounded font-semibold tabular-nums border text-xs ${
                question.marks === 5
                  ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}
            >
              {question.marks} marks
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleStar(question.number)}
              aria-pressed={isStarred}
              data-testid="reader-star-btn"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors ${
                isStarred
                  ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
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
              data-testid="reader-done-btn"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors ${
                isDone
                  ? 'bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:border-emerald-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isDone ? 'Done' : 'Mark done'}</span>
            </button>
          </div>
        </div>

        {/* Verbatim question heading */}
        <h1
          data-testid="reader-question-heading"
          className="text-2xl sm:text-[1.75rem] font-bold text-slate-900 dark:text-slate-50 leading-snug tracking-tight"
        >
          {context.displayPrefix}. {question.question}
        </h1>

        {question.questionMathHtml && (
          <div
            className="pt-1 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: question.questionMathHtml }}
          />
        )}

        {question.orderNote && (
          <p className="text-xs sm:text-sm italic text-slate-500 dark:text-slate-400">
            {question.orderNote}
          </p>
        )}
      </header>

      {/* Practice Mode Recall Guard */}
      {!showAnswer ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base text-slate-600 dark:text-slate-300">
            Practice mode active — try recalling this answer from memory first.
          </p>
          <button
            type="button"
            onClick={() => onToggleReveal(question.number)}
            aria-expanded={false}
            data-testid="reader-show-answer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-700 text-white text-sm font-semibold hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span>Show answer</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {practiceMode && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onToggleReveal(question.number)}
                aria-expanded={true}
                className="text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline"
              >
                Hide answer
              </button>
            </div>
          )}

          {/* 1. Understand it */}
          <section
            aria-labelledby="section-understand-heading"
            className="bg-sky-50/75 dark:bg-sky-950/30 border-l-4 border-sky-600 dark:border-sky-400 rounded-r-lg px-4 py-3"
          >
            <h2
              id="section-understand-heading"
              className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 mb-1"
            >
              Understand it
            </h2>
            <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed">
              {question.intuition}
            </p>
          </section>

          {/* 2. Answer (with Figures beside text at >= 1100px) */}
          <section aria-labelledby="section-answer-heading" data-testid="reader-answer-section">
            <h2
              id="section-answer-heading"
              className="text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pb-2 mb-4 border-b border-slate-200 dark:border-slate-800"
            >
              Answer
            </h2>

            <div className={`answer-split-layout ${images.length > 0 ? 'has-figures' : ''}`}>
              <div
                className="answer-prose text-slate-900 dark:text-slate-100 space-y-4"
                data-testid="reader-answer-prose"
              >
                {question.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    {sec.label && (
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 pt-1">
                        {sec.label}
                      </h3>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: sec.html }} />
                  </div>
                ))}
              </div>

              {images.length > 0 && (
                <aside
                  aria-label="Diagrams"
                  className="answer-figures-col space-y-5"
                  data-testid="reader-figures-col"
                >
                  {images.map((img, i) => (
                    <FigureThumbCard
                      key={`${img.file}-${i}`}
                      image={img}
                      onOpenLightbox={onOpenLightbox}
                    />
                  ))}
                </aside>
              )}
            </div>
          </section>

          {/* 3. Remember (directly below Answer) */}
          <section
            aria-labelledby="section-remember-heading"
            className="bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4"
          >
            <h2
              id="section-remember-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2"
            >
              Remember
            </h2>
            <ul className="space-y-1.5 text-base text-slate-800 dark:text-slate-200 list-disc pl-5">
              {question.rememberThese.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* Study order & Builds on cross-links */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm pt-1 text-slate-600 dark:text-slate-400">
        <a
          href={`#/study/stage-${context.stageId}/q/${encodeURIComponent(String(question.number))}`}
          data-testid="reader-study-order-link"
          className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-300 hover:underline"
        >
          <span>
            Study order: #{question.number} · Stage {context.stageId}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </a>

        {context.buildsOn.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <Link2 className="w-3.5 h-3.5 shrink-0" />
              <span>Builds on:</span>
            </span>
            {context.buildsOn.map((dep, idx) => (
              <React.Fragment key={String(dep.questionNumber)}>
                <a
                  href={`#/units/${dep.unitCode}/${dep.marks}/q/${encodeURIComponent(String(dep.questionNumber))}`}
                  title={`Study order #${dep.questionNumber} · Stage ${dep.stageId}: ${dep.stageTitle}`}
                  className="text-sky-700 dark:text-sky-300 hover:underline font-medium tabular-nums"
                >
                  Unit {dep.unitCode} · {dep.marks === 2 ? '2M' : '5M'} #{dep.sectionNumberPrefix}
                </a>
                {idx < context.buildsOn.length - 1 && (
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <ReaderNavStrip context={context} position="bottom" />
    </article>
  );
};
