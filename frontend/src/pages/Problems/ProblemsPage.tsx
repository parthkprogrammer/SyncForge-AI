import { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowUpDown } from 'lucide-react';

// Sub-components
import {
  ProblemSearch,
  ProblemFilters,
  ProblemTable,
  ProblemCard,
  ProblemPagination,
  ProblemsTableSkeleton,
} from '../../features/problems/components';
import { EmptyState } from '../../features/dashboard/components';

// Mock Data & Types
import { mockProblems } from '../../features/problems/data/problemsMockData';

export default function ProblemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Loading simulator
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // 1. Gather States from URL Query Parameters
  const searchQuery = searchParams.get('q') || '';
  const platform = searchParams.get('platform') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const language = searchParams.get('language') || '';
  const topic = searchParams.get('topic') || '';
  const syncStatus = searchParams.get('syncStatus') || '';
  
  const sortBy = searchParams.get('sortBy') || 'solvedAt';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
  
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;

  // 2. URL State Setters
  const updateParams = useCallback((newParams: Partial<Record<string, string | number>>) => {
    setSearchParams((prev) => {
      const current = new URLSearchParams(prev);
      
      Object.entries(newParams).forEach(([key, val]) => {
        if (val === undefined || val === null || val === '') {
          current.delete(key);
        } else {
          current.set(key, String(val));
        }
      });

      // Reset pagination to page 1 if any filter or query changes
      const isFilterChange = Object.keys(newParams).some(
        (key) => ['q', 'platform', 'difficulty', 'language', 'topic', 'syncStatus'].includes(key)
      );
      if (isFilterChange && !('page' in newParams)) {
        current.set('page', '1');
      }

      return current;
    });
  }, [setSearchParams]);

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    !!searchQuery || !!platform || !!difficulty || !!language || !!topic || !!syncStatus;

  // 3. Derive Stat Counters
  const counters = useMemo(() => {
    const stats = { total: 0, easy: 0, medium: 0, hard: 0 };
    mockProblems.forEach((p) => {
      stats.total++;
      if (p.difficulty === 'Easy') stats.easy++;
      else if (p.difficulty === 'Medium') stats.medium++;
      else if (p.difficulty === 'Hard') stats.hard++;
    });
    return stats;
  }, []);

  // 4. Filtering and Sorting Pipeline
  const filteredAndSortedProblems = useMemo(() => {
    // A. Filter Stage
    let result = mockProblems.filter((prob) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(query);
        const matchesTopic = prob.topics.some((t) => t.toLowerCase().includes(query));
        const matchesLang = prob.language.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTopic && !matchesLang) return false;
      }
      if (platform && prob.platform !== platform) return false;
      if (difficulty && prob.difficulty !== difficulty) return false;
      if (language && prob.language !== language) return false;
      if (syncStatus && prob.syncStatus !== syncStatus) return false;
      if (topic && !prob.topics.includes(topic)) return false;
      return true;
    });

    // B. Sort Stage (Creates shallow copy before sorting to avoid mutating source arrays)
    result = [...result].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'difficulty') {
        const weights = { Easy: 1, Medium: 2, Hard: 3 };
        comparison = weights[a.difficulty] - weights[b.difficulty];
      } else if (sortBy === 'platform') {
        comparison = a.platform.localeCompare(b.platform);
      } else {
        // Default to solvedAt date comparison
        comparison = a.solvedAt.localeCompare(b.solvedAt);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, platform, difficulty, language, syncStatus, topic, sortBy, sortOrder]);

  // 5. Pagination calculation
  const totalItems = filteredAndSortedProblems.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const paginatedProblems = useMemo(() => {
    const startIdx = (page - 1) * pageSize;
    return filteredAndSortedProblems.slice(startIdx, startIdx + pageSize);
  }, [filteredAndSortedProblems, page, pageSize]);

  // Adjust page index bounds if page is out of range
  useEffect(() => {
    if (page > 1 && page > totalPages && totalPages > 0) {
      updateParams({ page: totalPages });
    }
  }, [totalPages, page, updateParams]);

  const handleRetrySync = (problemTitle: string) => {
    alert(`Sync API will be connected later. Triggered retry sync for "${problemTitle}".`);
  };

  const handleSortChange = (newSortBy: string) => {
    const isSameField = sortBy === newSortBy;
    const newOrder = isSameField && sortOrder === 'desc' ? 'asc' : 'desc';
    updateParams({ sortBy: newSortBy, sortOrder: newOrder });
  };

  if (isLoading) {
    return <ProblemsTableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
      
      {/* A. Title Header */}
      <div className="text-left">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight sm:text-3xl">
          Problems
        </h1>
        <p className="text-sm text-slate-450 dark:text-slate-400 mt-1">
          Browse, search, and review your synced coding solutions.
        </p>
      </div>

      {/* B. Stat Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Syncs', val: counters.total, color: 'text-primary-500' },
          { label: 'Easy Solved', val: counters.easy, color: 'text-emerald-500' },
          { label: 'Medium Solved', val: counters.medium, color: 'text-amber-500' },
          { label: 'Hard Solved', val: counters.hard, color: 'text-rose-500' },
        ].map((c) => (
          <Card key={c.label} className="p-4 text-left border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">
              {c.label}
            </span>
            <span className={`text-2xl font-black block mt-1.5 ${c.color}`}>{c.val}</span>
          </Card>
        ))}
      </div>

      {/* C. Search input controlled component */}
      <ProblemSearch
        value={searchQuery}
        onChange={(val) => updateParams({ q: val })}
      />

      {/* D. Select Filters panel */}
      <ProblemFilters
        platform={platform}
        setPlatform={(val) => updateParams({ platform: val })}
        difficulty={difficulty}
        setDifficulty={(val) => updateParams({ difficulty: val })}
        language={language}
        setLanguage={(val) => updateParams({ language: val })}
        syncStatus={syncStatus}
        setSyncStatus={(val) => updateParams({ syncStatus: val })}
        topic={topic}
        setTopic={(val) => updateParams({ topic: val })}
        onClearAll={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* E. Problems List Grid Header (Sorting Buttons on mobile/desktop) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-semibold mt-2">
        <span className="text-left font-bold text-slate-650 dark:text-slate-350">
          Showing {totalItems} {totalItems === 1 ? 'solution' : 'solutions'}
        </span>
        
        {/* Sorting selection buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-slate-400">Sort by:</span>
          {[
            { id: 'title', label: 'Title' },
            { id: 'difficulty', label: 'Difficulty' },
            { id: 'platform', label: 'Platform' },
            { id: 'solvedAt', label: 'Date' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => handleSortChange(s.id)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 active:scale-95 ${
                sortBy === s.id
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-800 dark:border-slate-800'
                  : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-850'
              }`}
            >
              <span>{s.label}</span>
              {sortBy === s.id && (
                <ArrowUpDown className={`h-3 w-3 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* F. Table (Desktop) / Cards Grid (Mobile) Render section */}
      {paginatedProblems.length === 0 ? (
        <EmptyState
          title="No problems found"
          description="Try changing your search keywords or adjust the select filters to discover solutions."
          ctaText="Reset All Filters"
          onCtaClick={handleClearFilters}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <ProblemTable
              problems={paginatedProblems}
              onRetrySync={handleRetrySync}
            />
          </div>

          {/* Mobile Stacked Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedProblems.map((prob) => (
              <ProblemCard
                key={prob.id}
                problem={prob}
                onRetrySync={handleRetrySync}
              />
            ))}
          </div>

          {/* G. Pagination Control bar */}
          <ProblemPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => updateParams({ page: p })}
            pageSize={pageSize}
            onPageSizeChange={(s) => updateParams({ pageSize: s })}
          />
        </>
      )}

    </div>
  );
}
