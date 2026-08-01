import { Badge } from '../../../components/ui/Badge/Badge';
import type { RevisionStatus } from '../types/note.types';

interface RevisionStatusBadgeProps {
  status: RevisionStatus;
  className?: string;
}

export function RevisionStatusBadge({ status, className }: RevisionStatusBadgeProps) {
  const getBadgeConfig = (s: RevisionStatus) => {
    switch (s) {
      case 'mastered':
        return { label: 'Mastered', variant: 'success' as const };
      case 'review':
        return { label: 'Review', variant: 'warning' as const };
      case 'learning':
        return { label: 'Learning', variant: 'primary' as const };
      case 'new':
      default:
        return { label: 'New', variant: 'neutral' as const };
    }
  };

  const config = getBadgeConfig(status);

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  );
}
