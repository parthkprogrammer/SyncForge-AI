import { Star, FilterX } from 'lucide-react';
import type { NotesFilterState, NoteSortOption, RevisionStatus } from '../types/note.types';
import { cn } from '../../../utils/cn';

interface NotesFiltersProps {
  filters: NotesFilterState;
  onFilterChange: (filters: NotesFilterState) => void;
  sortOption: NoteSortOption;
  onSortChange: (sort: NoteSortOption) => void;
  availableTags: string[];
  availableProblems: { id: string; title: string }[];
  onClearFilters: () => void;
}

export function NotesFilters({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  availableTags,
  availableProblems,
  onClearFilters,
}: NotesFiltersProps) {
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      status: e.target.value as RevisionStatus | 'all',
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      tag: e.target.value,
    });
  };

  const handleProblemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      linkedProblem: e.target.value,
    });
  };

  const handleFavoriteToggle = () => {
    onFilterChange({
      ...filters,
      favoriteOnly: !filters.favoriteOnly,
    });
  };

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.tag !== 'all' ||
    filters.linkedProblem !== 'all' ||
    filters.favoriteOnly;

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 select-none text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        
        {/* 1. Revision Status Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Revision Status
          </label>
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-750 dark:text-slate-250 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="learning">Learning</option>
            <option value="review">Review</option>
            <option value="mastered">Mastered</option>
          </select>
        </div>

        {/* 2. Tag Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Filter by Tag
          </label>
          <select
            value={filters.tag}
            onChange={handleTagChange}
            className="w-full bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-750 dark:text-slate-250 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-primary-500"
          >
            <option value="all">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Linked Problem Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Linked Problem
          </label>
          <select
            value={filters.linkedProblem}
            onChange={handleProblemChange}
            className="w-full bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-750 dark:text-slate-250 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-primary-500"
          >
            <option value="all">All Problems</option>
            {availableProblems.map((prob) => (
              <option key={prob.id} value={prob.id}>
                {prob.title}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Sort selection */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Sort Options
          </label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as NoteSortOption)}
            className="w-full bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-750 dark:text-slate-250 rounded-xl px-2.5 py-2 text-xs outline-none focus:border-primary-500"
          >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>

      </div>

      {/* 5. Lower Actions row (Favorites Toggle & Clear Filters) */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3.5 mt-1">
        <button
          onClick={handleFavoriteToggle}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all',
            filters.favoriteOnly
              ? 'bg-yellow-50 border-yellow-200 text-yellow-600 dark:bg-yellow-950/15 dark:border-yellow-900/30'
              : 'border-slate-200 hover:bg-slate-50 text-slate-500 dark:border-slate-800 dark:hover:bg-slate-850'
          )}
        >
          <Star className={cn('h-3.5 w-3.5', filters.favoriteOnly ? 'fill-yellow-500 text-yellow-500' : 'text-slate-400')} />
          <span>Favorites Only</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:text-primary-500 transition-colors"
          >
            <FilterX className="h-3.5 w-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

    </div>
  );
}
