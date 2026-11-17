import React from 'react';
import { ChevronRight, Eye, EyeOff, HelpCircle, Home, Search, X } from 'lucide-react';
import type { BreadcrumbItem } from '../utils/navigation';

interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (val: string) => void;
  practiceMode: boolean;
  onTogglePracticeMode: () => void;
  onOpenHelp: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  breadcrumbs,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  practiceMode,
  onTogglePracticeMode,
  onOpenHelp,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchValue);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="page-shell py-2 md:py-0 md:h-14 flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-4">
        {/* Left: Home button + Clickable Breadcrumb path */}
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
          <a
            href="#/"
            data-testid="topbar-home"
            aria-label="Home"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <Home className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0" />
            <span className="hidden sm:inline">Home</span>
          </a>

          {breadcrumbs.length > 1 && (
            <nav
              aria-label="Breadcrumb"
              data-testid="topbar-breadcrumbs"
              className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 min-w-0 overflow-x-auto whitespace-nowrap"
            >
              {breadcrumbs.slice(1).map((crumb) => (
                <React.Fragment key={`${crumb.hash}-${crumb.label}`}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />
                  {crumb.isCurrent ? (
                    <span
                      aria-current="page"
                      className="font-semibold text-slate-900 dark:text-slate-50 truncate max-w-[140px] sm:max-w-[240px]"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.hash}
                      className="hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors truncate max-w-[130px] sm:max-w-[200px]"
                    >
                      {crumb.label}
                    </a>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>

        {/* Right: Search box + Practice mode toggle + ? Help button */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          <form onSubmit={handleSubmit} className="relative flex-1 md:w-64 lg:w-80">
            <label htmlFor="topbar-search" className="sr-only">
              Search all questions
            </label>
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="topbar-search"
              data-testid="topbar-search"
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search questions..."
              className="w-full h-9 pl-9 pr-8 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white dark:focus:bg-slate-900"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          <button
            type="button"
            onClick={onTogglePracticeMode}
            aria-pressed={practiceMode}
            data-testid="topbar-practice-toggle"
            className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
              practiceMode
                ? 'bg-sky-700 border-sky-700 text-white hover:bg-sky-800 dark:bg-sky-600 dark:border-sky-600 dark:hover:bg-sky-500'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {practiceMode ? <EyeOff className="w-4 h-4 shrink-0" /> : <Eye className="w-4 h-4 shrink-0" />}
            <span>Practice{practiceMode ? ': On' : ''}</span>
          </button>

          <button
            type="button"
            onClick={onOpenHelp}
            aria-label="Help"
            title="Help"
            data-testid="topbar-help"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors shrink-0"
          >
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Help</span>
          </button>
        </div>
      </div>
    </header>
  );
};
