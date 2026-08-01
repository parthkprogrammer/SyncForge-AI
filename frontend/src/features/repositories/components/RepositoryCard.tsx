import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Button } from '../../../components/ui/Button';
import { RepositorySyncStatusBadge } from './RepositorySyncStatusBadge';
import { Globe, Lock, GitBranch, Play, Settings2, Trash2, CheckCircle } from 'lucide-react';
import type { Repository } from '../types/repository.types';
import { cn } from '../../../utils/cn';

interface RepositoryCardProps {
  repo: Repository;
  onSetDefault: () => void;
  onConfigure: () => void;
  onDisconnect: () => void;
  onSyncNow: () => void;
}

export function RepositoryCard({
  repo,
  onSetDefault,
  onConfigure,
  onDisconnect,
  onSyncNow,
}: RepositoryCardProps) {
  const formattedDate = repo.lastSyncedAt
    ? new Date(repo.lastSyncedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Never';

  const isSyncing = repo.syncStatus === 'syncing';

  return (
    <Card hoverable className={cn(
      'flex flex-col h-full justify-between bg-white dark:bg-slate-900 border text-left p-5 shadow-sm transition-all',
      repo.isDefault ? 'border-primary-500 ring-2 ring-primary-500/10' : 'border-slate-200 dark:border-slate-800'
    )}>
      
      {/* 1. Header: Repo Name & Visibility & Default Indicator */}
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-880 dark:text-white truncate">
                {repo.name}
              </span>
              
              <Badge
                variant={repo.visibility === 'public' ? 'success' : 'neutral'}
                size="sm"
                className="flex items-center gap-1 normal-case text-[9px] py-0 px-1.5 font-bold"
              >
                {repo.visibility === 'public' ? (
                  <Globe className="h-2.5 w-2.5" />
                ) : (
                  <Lock className="h-2.5 w-2.5" />
                )}
                <span>{repo.visibility}</span>
              </Badge>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-1 select-none">
              Owner: <span className="font-semibold text-slate-550 dark:text-slate-400">{repo.owner}</span>
            </p>
          </div>

          {repo.isDefault && (
            <Badge
              variant="primary"
              size="sm"
              className="text-[9px] font-bold py-0.5 px-2 tracking-normal shrink-0"
            >
              Default Repo
            </Badge>
          )}
        </div>

        {repo.description && (
          <p className="text-xs text-slate-450 dark:text-slate-450 line-clamp-2 pt-2 leading-relaxed select-text">
            {repo.description}
          </p>
        )}
      </div>

      {/* 2. Repository Configuration parameters summary */}
      {repo.settings && (
        <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl p-3.5 mt-4 space-y-2 text-[10px] text-slate-500 font-semibold select-none">
          <div className="flex items-center justify-between">
            <span className="text-slate-450">Branch:</span>
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-350">
              <GitBranch className="h-3 w-3" />
              <span>{repo.settings.defaultBranch}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-450">Folder Strategy:</span>
            <span className="text-slate-700 dark:text-slate-350 uppercase">
              {repo.settings.folderStrategy}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-450">Auto Sync:</span>
            <span className={cn(
              repo.settings.autoSync ? 'text-emerald-500' : 'text-slate-400'
            )}>
              {repo.settings.autoSync ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Sync Status and totals solutions synced metrics */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-850 pt-4 mt-4 select-none">
        
        <div>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block">
            Sync Status
          </span>
          <div className="mt-1">
            <RepositorySyncStatusBadge status={repo.syncStatus} />
          </div>
        </div>

        <div>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block">
            Synced Solutions
          </span>
          <span className="text-sm font-black text-slate-750 dark:text-slate-200 block mt-1 leading-none">
            {repo.totalSyncedSolutions}
          </span>
        </div>

      </div>

      {/* Last Synced Text */}
      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 flex justify-between select-none">
        <span>Last synced:</span>
        <span className="font-semibold text-slate-550 dark:text-slate-400">{formattedDate}</span>
      </div>

      {/* 4. Action buttons groups */}
      <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-850 select-none">
        
        <Button
          variant="primary"
          size="sm"
          onClick={onSyncNow}
          disabled={isSyncing}
          className="flex-1 rounded-xl h-8 px-2 text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1"
        >
          <Play className="h-3 w-3 fill-white" />
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onConfigure}
          disabled={isSyncing}
          className="rounded-xl h-8 w-8 p-0 flex items-center justify-center border-slate-200 dark:border-slate-800 shrink-0 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          title="Configure Repository Settings"
        >
          <Settings2 className="h-4 w-4" />
        </Button>

        {!repo.isDefault && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSetDefault}
            disabled={isSyncing}
            className="rounded-xl h-8 w-8 p-0 flex items-center justify-center border-slate-200 dark:border-slate-800 shrink-0 text-slate-500 hover:text-primary-500"
            title="Set as Default Repository"
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onDisconnect}
          disabled={isSyncing}
          className="rounded-xl h-8 w-8 p-0 flex items-center justify-center border-slate-200 hover:border-error-200 hover:bg-error-50 dark:border-slate-800 dark:hover:bg-error-950/10 shrink-0 text-slate-400 hover:text-error-500"
          title="Disconnect Repository"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </div>

    </Card>
  );
}
