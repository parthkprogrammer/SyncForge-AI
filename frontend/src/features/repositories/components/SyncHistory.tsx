import { useState, useMemo } from 'react';
import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Button } from '../../../components/ui/Button';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import { SyncHistoryFilters } from './SyncHistoryFilters';
import { RefreshCw, CheckCircle2, AlertCircle, FileCode, ExternalLink } from 'lucide-react';
import type { SyncHistoryItem } from '../types/repository.types';
import { cn } from '../../../utils/cn';

interface SyncHistoryProps {
  history: SyncHistoryItem[];
  onRetry: (id: string) => void;
}

export function SyncHistory({ history, onRetry }: SyncHistoryProps) {
  const [selectedRepo, setSelectedRepo] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Dynamic filter lists available repo names
  const availableRepoNames = useMemo(() => {
    return Array.from(new Set(history.map((h) => h.repositoryName))).sort();
  }, [history]);

  // Derived filter matching search criteria
  const filteredLogs = useMemo(() => {
    return history.filter((log) => {
      if (selectedRepo !== 'all' && log.repositoryName !== selectedRepo) return false;
      if (selectedStatus !== 'all' && log.status !== selectedStatus) return false;
      return true;
    });
  }, [history, selectedRepo, selectedStatus]);

  const handleClear = () => {
    setSelectedRepo('all');
    setSelectedStatus('all');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="success" size="sm" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Success</span>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="primary" size="sm" className="flex items-center gap-1 normal-case">
            <Spinner size="sm" className="h-2.5 w-2.5 border-2 text-current" />
            <span>Syncing</span>
          </Badge>
        );
      case 'failed':
      default:
        return (
          <Badge variant="error" size="sm" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Failed</span>
          </Badge>
        );
    }
  };

  const formatTime = (timeStr: string) => {
    // If it's already a relative phrase (e.g. 2 minutes ago), return it.
    if (!timeStr.includes('T')) return timeStr;
    
    const date = new Date(timeStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 text-left shadow-sm flex flex-col">
      <Card.Header className="border-none pb-0 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
            Synchronization Logs
          </h3>
          <span className="text-xs text-slate-400">Push status logs for connected repository branches</span>
        </div>
      </Card.Header>

      <Card.Content className="flex-1 w-full min-h-0 flex flex-col gap-4">
        {/* Filters */}
        <SyncHistoryFilters
          availableRepoNames={availableRepoNames}
          selectedRepo={selectedRepo}
          onRepoChange={setSelectedRepo}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onClear={handleClear}
        />

        {/* Sync logs items */}
        <div className="overflow-x-auto select-none border border-slate-100 dark:border-slate-850 rounded-xl">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-150 dark:bg-slate-950/40 dark:border-slate-850 font-bold text-[9px] uppercase tracking-wider text-slate-450 dark:text-slate-550 select-none">
                <th className="px-4 py-3.5 text-left">Problem / Solution</th>
                <th className="px-4 py-3.5 text-left">Repository</th>
                <th className="px-4 py-3.5 text-left">Branch</th>
                <th className="px-4 py-3.5 text-left">Commit Hash</th>
                <th className="px-4 py-3.5 text-left">Sync Status</th>
                <th className="px-4 py-3.5 text-left">Timestamp</th>
                <th className="px-4 py-3.5 text-right pr-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs font-semibold text-slate-650 dark:text-slate-350">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-slate-400 py-12">
                    No synchronization events found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((item) => {
                  const isFailed = item.status === 'failed';
                  
                  return (
                    <tr
                      key={item.id}
                      className={cn(
                        'hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors',
                        isFailed && 'bg-error-50/5 dark:bg-error-950/5'
                      )}
                    >
                      {/* Problem Title */}
                      <td className="px-4 py-4 font-bold text-slate-800 dark:text-white">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>{item.problemTitle}</span>
                        </div>
                      </td>

                      {/* Repo Name */}
                      <td className="px-4 py-4 truncate font-mono text-[11px] text-slate-550">
                        {item.repositoryName}
                      </td>

                      {/* Branch Name */}
                      <td className="px-4 py-4 font-mono text-[11px] text-slate-550">
                        {item.branchName}
                      </td>

                      {/* Commit Hash */}
                      <td className="px-4 py-4 font-mono text-[11px]">
                        {item.commitHash ? (
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-750">
                            {item.commitHash}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-sans">-</span>
                        )}
                      </td>

                      {/* Status Badge & Error */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div>{getStatusBadge(item.status)}</div>
                          {item.errorMessage && (
                            <span className="text-[10px] text-error-600 dark:text-error-400 max-w-[200px] truncate block font-sans" title={item.errorMessage}>
                              {item.errorMessage}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Timestamp */}
                      <td className="px-4 py-4 text-slate-450 dark:text-slate-500 font-mono text-[10px]">
                        {formatTime(item.timestamp)}
                      </td>

                      {/* Actions (Retry if failed) */}
                      <td className="px-4 py-4 text-right pr-5">
                        {isFailed ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRetry(item.id)}
                            className="text-error-600 hover:bg-error-50 dark:hover:bg-error-950/20 border-error-200 dark:border-error-950/30 h-7 px-2.5 rounded-lg text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1"
                          >
                            <RefreshCw className="h-3 w-3 animate-spin-reverse" />
                            <span>Retry</span>
                          </Button>
                        ) : item.status === 'success' ? (
                          <button
                            onClick={() => window.open(`https://github.com/${item.repositoryName}/commit/${item.commitHash}`, '_blank')}
                            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded"
                            title="Open commit in GitHub"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <span className="text-slate-400 font-sans">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card.Content>
    </Card>
  );
}
