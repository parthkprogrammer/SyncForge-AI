import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

interface DifficultyProgressProps {
  easySolved: number;
  easyGoal: number;
  mediumSolved: number;
  mediumGoal: number;
  hardSolved: number;
  hardGoal: number;
}

export function DifficultyProgress({
  easySolved,
  easyGoal,
  mediumSolved,
  mediumGoal,
  hardSolved,
  hardGoal,
}: DifficultyProgressProps) {
  const categories = [
    { name: 'Easy Goals', solved: easySolved, goal: easyGoal, color: 'bg-emerald-500', barBg: 'bg-slate-100 dark:bg-slate-800' },
    { name: 'Medium Goals', solved: mediumSolved, goal: mediumGoal, color: 'bg-amber-500', barBg: 'bg-slate-100 dark:bg-slate-800' },
    { name: 'Hard Goals', solved: hardSolved, goal: hardGoal, color: 'bg-rose-500', barBg: 'bg-slate-100 dark:bg-slate-800' },
  ];

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-between">
      <Card.Header className="border-none pb-0 mb-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Target Progress Goals
        </h3>
        <span className="text-xs text-slate-400">Personal solved benchmarks, not platform problem limits</span>
      </Card.Header>

      <Card.Content className="flex flex-col gap-5 mt-2">
        {categories.map((cat) => {
          const pct = Math.min(Math.round((cat.solved / cat.goal) * 100), 100);
          return (
            <div key={cat.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-650 dark:text-slate-350">{cat.name}</span>
                <span className="text-slate-450 dark:text-slate-500">
                  <span className="font-bold text-slate-750 dark:text-slate-200">{cat.solved}</span>
                  <span> / </span>
                  <span>{cat.goal}</span>
                  <span className="ml-1 text-[10px] text-slate-400">({pct}%)</span>
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full dark:bg-slate-850 overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', cat.color)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
