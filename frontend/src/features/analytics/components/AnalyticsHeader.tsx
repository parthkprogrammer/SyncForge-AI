import type { DateRange } from '../types/analytics.types';

interface AnalyticsHeaderProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function AnalyticsHeader({ selectedRange, onRangeChange }: AnalyticsHeaderProps) {
  const ranges: { id: DateRange; label: string }[] = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 dark:border-slate-800 pb-5 text-left">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight sm:text-3xl">
          Analytics
        </h1>
        <p className="text-sm text-slate-450 dark:text-slate-400 mt-1">
          Understand your coding progress, strengths, consistency, and learning patterns.
        </p>
      </div>

      {/* Date Range Selector Button Group */}
      <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900 select-none self-start md:self-auto">
        {ranges.map((range) => {
          const isActive = selectedRange === range.id;
          return (
            <button
              key={range.id}
              onClick={() => onRangeChange(range.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {range.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
