import { useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface DashboardHeaderProps {
  lastSyncTime: string;
  onRefresh: () => void;
}

export function DashboardHeader({ lastSyncTime, onRefresh }: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5 text-left">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight sm:text-3xl">
          Welcome back, Developer 👋
        </h1>
        <p className="text-sm text-slate-450 dark:text-slate-400 mt-1">
          Here's what's happening with your coding journey.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Sync Status Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-150 px-3.5 py-1.5 text-xs text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 select-none">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
          <span>Last synced: <span className="font-semibold">{lastSyncTime}</span></span>
        </div>

        {/* Refresh Action Trigger */}
        <button
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          aria-label="Refresh dashboard data"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 active:scale-[0.97] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-slate-200"
        >
          <RefreshCw className={cn('h-4.5 w-4.5', isRefreshing && 'animate-spin text-primary-500')} />
        </button>
      </div>
    </div>
  );
}
