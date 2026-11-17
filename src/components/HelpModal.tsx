import React, { useEffect } from 'react';
import { BookOpen, FileText, HelpCircle, X } from 'lucide-react';
import { HELP_MODAL_ITEMS } from '../data/guideData';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
  onOpenStartHere: () => void;
  onOpenSources: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  open,
  onClose,
  onOpenStartHere,
  onOpenSources,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div
        className="fixed inset-0 bg-slate-900/50 dark:bg-black/75"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-700 dark:text-sky-400 shrink-0" />
            <h2 id="help-modal-title" className="text-lg font-bold text-slate-900 dark:text-slate-50">
              Quick Help — How This Study Guide Works
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close help"
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          {HELP_MODAL_ITEMS.map((item) => (
            <li
              key={item.title}
              className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3"
            >
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm mb-0.5">
                {item.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenStartHere();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-700 text-white text-xs font-semibold hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Start Here Guide</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSources();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Sources</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
