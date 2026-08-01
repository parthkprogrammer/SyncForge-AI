import { XCircle } from 'lucide-react';

interface ProblemFiltersProps {
  platform: string;
  setPlatform: (val: string) => void;
  difficulty: string;
  setDifficulty: (val: string) => void;
  language: string;
  setLanguage: (val: string) => void;
  syncStatus: string;
  setSyncStatus: (val: string) => void;
  topic: string;
  setTopic: (val: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function ProblemFilters({
  platform,
  setPlatform,
  difficulty,
  setDifficulty,
  language,
  setLanguage,
  syncStatus,
  setSyncStatus,
  topic,
  setTopic,
  onClearAll,
  hasActiveFilters,
}: ProblemFiltersProps) {
  const platforms = ['LeetCode', 'Codeforces', 'HackerRank', 'CodeChef', 'GeeksforGeeks'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const languages = ['Java', 'TypeScript', 'C++', 'Python', 'Go', 'Rust'];
  const syncStatuses = ['Synced', 'Pending', 'Failed'];
  const topics = [
    'Arrays',
    'Hash Table',
    'Dynamic Programming',
    'Two Pointers',
    'String',
    'Linked List',
    'Design',
    'Implementation',
  ];

  return (
    <div className="flex flex-col gap-4 text-left border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-5 rounded-2xl">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
          Filter Solutions
        </h4>
        
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-xs font-bold text-error-600 hover:text-error-700 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-2">
        {/* 1. Platform Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-platform" className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wide">
            Platform
          </label>
          <select
            id="filter-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">All Platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* 2. Difficulty Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-difficulty" className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wide">
            Difficulty
          </label>
          <select
            id="filter-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">All Difficulties</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* 3. Language Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-language" className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wide">
            Language
          </label>
          <select
            id="filter-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">All Languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* 4. Topic Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-topic" className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wide">
            Topic
          </label>
          <select
            id="filter-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* 5. Sync Status Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-status" className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wide">
            Sync Status
          </label>
          <select
            id="filter-status"
            value={syncStatus}
            onChange={(e) => setSyncStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">All Statuses</option>
            {syncStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
