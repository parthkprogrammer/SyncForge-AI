import { Card } from '../../../components/ui/Card';
import type { Milestone } from '../types/analytics.types';

interface RecentMilestonesProps {
  milestones: Milestone[];
}

export function RecentMilestones({ milestones }: RecentMilestonesProps) {
  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-between">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Recent Milestones
        </h3>
        <span className="text-xs text-slate-400">Accomplishments achieved during your coding journey</span>
      </Card.Header>

      <Card.Content className="flex flex-col gap-4 mt-2">
        {milestones.map((mil) => {
          const Icon = mil.icon;
          return (
            <div
              key={mil.id}
              className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-950/20"
            >
              {/* Icon round wrapper */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/10 text-primary-500 ring-4 ring-primary-500/5">
                <Icon className="h-4.5 w-4.5" />
              </div>
              
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-xs font-bold text-slate-750 dark:text-slate-250">
                    {mil.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {mil.date}
                  </span>
                </div>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1 leading-relaxed">
                  {mil.description}
                </p>
              </div>
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
