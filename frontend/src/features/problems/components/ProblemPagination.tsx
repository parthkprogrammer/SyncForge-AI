import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ProblemPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function ProblemPagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: ProblemPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6 text-xs text-slate-500 font-medium">
      
      {/* 1. Page Size Selector */}
      <div className="flex items-center gap-2 justify-center sm:justify-start">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <span>of {totalPages} pages</span>
      </div>

      {/* 2. Page Navigation Buttons */}
      <div className="flex items-center justify-center gap-1.5">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'h-8 w-8 rounded-xl font-bold transition-all duration-150',
              currentPage === p
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/10'
                : 'border border-slate-200 bg-white text-slate-650 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
            )}
          >
            {p}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Go to next page"
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
