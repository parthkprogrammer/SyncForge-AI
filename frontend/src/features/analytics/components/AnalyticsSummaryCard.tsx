import { Card } from '../../../components/ui/Card';
import type { ComponentType } from 'react';

interface AnalyticsSummaryCardProps {
  label: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  description: string;
}

export function AnalyticsSummaryCard({
  label,
  value,
  icon: Icon,
  description,
}: AnalyticsSummaryCardProps) {
  return (
    <Card hoverable className="p-5 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        {/* Text Block */}
        <div>
          <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">
            {label}
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1.5 leading-none">
            {value}
          </span>
        </div>

        {/* Icon Block */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/10 text-primary-500 ring-4 ring-primary-500/5">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>

      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
