import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { CheckCircle2, AlertTriangle, XCircle, GitBranch, Clock } from 'lucide-react';
import type { SyncStatusData } from '../types/dashboard.types';

interface SyncStatusProps {
  statusData: SyncStatusData;
}

export function SyncStatus({ statusData }: SyncStatusProps) {
  const getStatusIcon = (status: SyncStatusData['status']) => {
    switch (status) {
      case 'Healthy':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'Warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'Error':
        return <XCircle className="h-5 w-5 text-rose-500" />;
    }
  };

  const getStatusBadge = (status: SyncStatusData['status']) => {
    const variants = {
      Healthy: 'success' as const,
      Warning: 'warning' as const,
      Error: 'error' as const,
    };
    return <Badge variant={variants[status]} size="sm">{status}</Badge>;
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-between">
      
      {/* Header */}
      <Card.Header className="border-none pb-0 mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Sync Integration Status
        </h3>
        {getStatusBadge(statusData.status)}
      </Card.Header>

      {/* Body */}
      <Card.Content className="flex flex-col gap-4">
        
        {/* Repo link */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-950/20">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 ring-4 ring-emerald-500/5 shrink-0">
            <GitBranch className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Connected Repo</span>
            <a
              href={`https://github.com/parthkprogrammer/${statusData.repository}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-750 dark:text-slate-250 truncate hover:text-primary-500 hover:underline block mt-0.5"
            >
              parthkprogrammer/{statusData.repository}
            </a>
          </div>
        </div>

        {/* Sync timeline */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-950/20">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500 ring-4 ring-primary-500/5 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Sync Frequency</span>
            <span className="text-xs font-bold text-slate-750 dark:text-slate-250 block mt-0.5">
              Instant (Webhook-driven)
            </span>
          </div>
        </div>

      </Card.Content>

      {/* Footer status line */}
      <Card.Footer className="border-t border-slate-100 dark:border-slate-850 mt-5 pt-3.5 flex items-center justify-between text-xs text-slate-450 dark:text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          {getStatusIcon(statusData.status)}
          <span>System Healthy</span>
        </span>
        <span>Verified {statusData.lastSync}</span>
      </Card.Footer>

    </Card>
  );
}
