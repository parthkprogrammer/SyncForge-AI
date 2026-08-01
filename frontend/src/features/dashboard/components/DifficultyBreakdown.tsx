import { Card } from '../../../components/ui/Card';
import type { DifficultyStat } from '../types/dashboard.types';
import { cn } from '../../../utils/cn';

interface DifficultyBreakdownProps {
  stats: DifficultyStat[];
}

export function DifficultyBreakdown({ stats }: DifficultyBreakdownProps) {
  const grandTotalSolved = stats.reduce((acc, curr) => acc + curr.solved, 0);

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-2">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Difficulty Breakdown
        </h3>
        <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">
          {grandTotalSolved} <span className="text-xs font-medium text-slate-450 uppercase">Solved</span>
        </span>
      </Card.Header>

      <Card.Content className="flex flex-col gap-5 mt-4">
        {stats.map((stat) => {
          const percentage = Math.round((stat.solved / stat.total) * 100);

          return (
            <div key={stat.difficulty} className="flex flex-col gap-1.5">
              {/* Labels Line */}
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-650 dark:text-slate-350">{stat.difficulty}</span>
                <span className="text-slate-450 dark:text-slate-500">
                  <span className="font-bold text-slate-750 dark:text-slate-250">{stat.solved}</span>
                  <span> / </span>
                  <span>{stat.total}</span>
                  <span className="ml-1 text-[10px] text-slate-400">({percentage}%)</span>
                </span>
              </div>
              
              {/* Progress Slider Wrapper */}
              <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', stat.colorClass)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
