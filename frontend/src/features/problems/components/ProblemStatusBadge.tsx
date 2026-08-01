import { Badge } from '../../../components/ui/Badge';
import { RefreshCw } from 'lucide-react';
import type { ProblemSyncStatus } from '../types/problem.types';

interface ProblemStatusBadgeProps {
  status: ProblemSyncStatus;
  onRetryClick?: (e: React.MouseEvent) => void;
}

export function ProblemStatusBadge({ status, onRetryClick }: ProblemStatusBadgeProps) {
  const getStatusBadge = (s: ProblemSyncStatus) => {
    switch (s) {
      case 'Synced':
        return <Badge variant="success" size="sm">Synced</Badge>;
      case 'Pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'Failed':
        return <Badge variant="error" size="sm">Failed</Badge>;
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      {getStatusBadge(status)}
      
      {status === 'Failed' && onRetryClick && (
        <button
          onClick={onRetryClick}
          title="Retry Synchronization"
          className="inline-flex items-center justify-center p-1 rounded-lg border border-error-200 bg-error-50 text-error-600 hover:bg-error-100 hover:text-error-700 dark:border-error-950/20 dark:bg-error-950/10 dark:text-error-400 dark:hover:bg-error-950/25 active:scale-95 transition-all"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
