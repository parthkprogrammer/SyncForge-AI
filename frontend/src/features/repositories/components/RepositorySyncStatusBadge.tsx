import { Badge } from '../../../components/ui/Badge/Badge';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import type { RepositorySyncStatus } from '../types/repository.types';

interface RepositorySyncStatusBadgeProps {
  status: RepositorySyncStatus;
}

export function RepositorySyncStatusBadge({ status }: RepositorySyncStatusBadgeProps) {
  const getConfig = (s: RepositorySyncStatus) => {
    switch (s) {
      case 'healthy':
        return { label: 'Healthy', variant: 'success' as const, showSpinner: false };
      case 'syncing':
        return { label: 'Syncing', variant: 'primary' as const, showSpinner: true };
      case 'warning':
        return { label: 'Warning', variant: 'warning' as const, showSpinner: false };
      case 'error':
      default:
        return { label: 'Error', variant: 'error' as const, showSpinner: false };
    }
  };

  const config = getConfig(status);

  return (
    <Badge variant={config.variant} size="sm" className="flex items-center gap-1">
      {config.showSpinner && <Spinner size="sm" className="h-2.5 w-2.5 border-2 text-current" />}
      <span>{config.label}</span>
    </Badge>
  );
}
