import { RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { SaveStatus } from '../context/SettingsContext';

interface SettingsHeaderProps {
  saveStatus: SaveStatus;
}

export function SettingsHeader({ saveStatus }: SettingsHeaderProps) {
  const getStatusIndicator = (status: SaveStatus) => {
    switch (status) {
      case 'saving':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary-500 bg-primary-50 dark:bg-primary-950/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none animate-pulse">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span>Saving changes...</span>
          </span>
        );
      case 'error':
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none">
            <AlertTriangle className="h-3 w-3" />
            <span>Save error</span>
          </span>
        );
      case 'saved':
      default:
        return (
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none">
            <CheckCircle2 className="h-3 w-3" />
            <span>All changes saved</span>
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5 text-left select-none">
      <div>
        <h1 className="text-2xl font-black text-slate-850 dark:text-white tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="text-sm text-slate-450 dark:text-slate-405 mt-1">
          Manage your SyncForge AI experience, preferences, and privacy.
        </p>
      </div>

      <div className="self-start sm:self-auto">
        {getStatusIndicator(saveStatus)}
      </div>
    </div>
  );
}
