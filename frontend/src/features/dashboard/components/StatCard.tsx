import { Card } from '../../../components/ui/Card';
import type { DashboardStat } from '../types/dashboard.types';
import { cn } from '../../../utils/cn';

interface StatCardProps {
  stat: DashboardStat;
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <Card hoverable className="p-6 text-left flex flex-col justify-between h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div>
        {/* Card Header: Icon & Trend */}
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/10 text-primary-500 ring-4 ring-primary-500/5">
            <Icon className="h-5 w-5" />
          </div>

          {stat.trend && (
            <span
              className={cn(
                'inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full select-none leading-none tracking-wide uppercase border',
                stat.trend.isPositive
                  ? 'bg-success-50 text-success-600 border-success-200 dark:bg-success-900/10 dark:text-success-400 dark:border-success-800/30'
                  : 'bg-error-50 text-error-600 border-error-200 dark:bg-error-900/10 dark:text-error-400 dark:border-error-800/30'
              )}
            >
              {stat.trend.isPositive ? '+' : '-'}{stat.trend.value}%
            </span>
          )}
        </div>

        {/* Card Body: Label & Value */}
        <div className="mt-4">
          <span className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
            {stat.label}
          </span>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1.5 leading-none">
            {stat.value}
          </h3>
        </div>
      </div>

      {/* Card Footer: Supporting Description */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
        {stat.description}
      </p>
    </Card>
  );
}
