interface SyncHistoryFiltersProps {
  availableRepoNames: string[];
  selectedRepo: string;
  onRepoChange: (repo: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onClear: () => void;
}

export function SyncHistoryFilters({
  availableRepoNames,
  selectedRepo,
  onRepoChange,
  selectedStatus,
  onStatusChange,
  onClear,
}: SyncHistoryFiltersProps) {
  const hasActive = selectedRepo !== 'all' || selectedStatus !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl text-left select-none mb-4">
      <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest mr-2">
        Logs Filters
      </span>

      {/* Select Repository */}
      <select
        value={selectedRepo}
        onChange={(e) => onRepoChange(e.target.value)}
        className="bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-650 dark:text-slate-350 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500"
      >
        <option value="all">All Repositories</option>
        {availableRepoNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {/* Select Status */}
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-650 dark:text-slate-350 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500"
      >
        <option value="all">All Statuses</option>
        <option value="success">Success Only</option>
        <option value="failed">Failed Only</option>
        <option value="pending">Pending Only</option>
      </select>

      {hasActive && (
        <button
          onClick={onClear}
          className="text-xs text-slate-450 hover:text-primary-500 font-bold"
        >
          Clear Logs Filters
        </button>
      )}
    </div>
  );
}
