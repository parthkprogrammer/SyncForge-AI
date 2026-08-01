import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { CloudLightning } from 'lucide-react';

interface EmptyStateProps {
  onCtaClick?: () => void;
}

export function EmptyState({ onCtaClick }: EmptyStateProps) {
  return (
    <div className="w-full max-w-xl mx-auto py-12 px-6">
      <Card className="p-8 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
        
        {/* Illustration Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-450 dark:bg-slate-950 dark:text-slate-650 mb-5 ring-4 ring-slate-100 dark:ring-slate-850/50">
          <CloudLightning className="h-8 w-8 animate-bounce" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
          No coding activity yet
        </h3>
        
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-2.5 max-w-sm leading-relaxed">
          Once you complete and synchronize your first solutions from LeetCode or HackerRank, your activity dashboard will populate automatically.
        </p>

        <Button
          variant="primary"
          className="mt-6"
          onClick={onCtaClick}
        >
          Learn How Sync Works
        </Button>

      </Card>
    </div>
  );
}
