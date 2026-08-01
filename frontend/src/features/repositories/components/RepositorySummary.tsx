import { GitFork, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import type { Repository, SyncHistoryItem } from '../types/repository.types';

interface RepositorySummaryProps {
  connectedRepos: Repository[];
  syncHistory: SyncHistoryItem[];
}

export function RepositorySummary({ connectedRepos, syncHistory }: RepositorySummaryProps) {
  const totalRepos = connectedRepos.length;
  const totalSolutions = connectedRepos.reduce((acc, curr) => acc + curr.totalSyncedSolutions, 0);
  const successCount = syncHistory.filter((h) => h.status === 'success').length;
  const failedCount = syncHistory.filter((h) => h.status === 'failed').length;

  const stats = [
    { label: 'Connected Repositories', value: totalRepos, icon: GitFork, color: 'text-primary-500' },
    { label: 'Synced Solutions', value: totalSolutions, icon: Play, color: 'text-emerald-500' },
    { label: 'Successful Syncs', value: successCount, icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Failed Syncs', value: failedCount, icon: AlertTriangle, color: 'text-rose-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left select-none">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm"
          >
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
              <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
            </div>
            
            <div>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-white block mt-0.5 leading-none">
                {stat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
