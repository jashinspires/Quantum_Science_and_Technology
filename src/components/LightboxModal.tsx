import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { QuestionImage } from '../types/study';

interface LightboxModalProps {
  image: QuestionImage | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      data-testid="figure-lightbox"
    >
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <p
            id="lightbox-caption"
            className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate"
          >
            {image.caption}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enlarged diagram"
            data-testid="lightbox-close"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shrink-0"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200 shadow-xs">
            <img
              src={`./images/${image.file}`}
              alt={image.caption}
              className="max-w-full max-h-[76vh] w-auto h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
