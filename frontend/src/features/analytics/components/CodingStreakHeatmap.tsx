import { Card } from '../../../components/ui/Card';
import type { ActivityData } from '../types/analytics.types';
import { cn } from '../../../utils/cn';

interface CodingStreakHeatmapProps {
  activityData: ActivityData[];
}

export function CodingStreakHeatmap({ activityData }: CodingStreakHeatmapProps) {
  // Extract approximately the last 12 weeks of data (12 weeks * 7 days = 84 days)
  const heatmapData = activityData.slice(-84);

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80';
    if (count === 1) return 'bg-primary-100 dark:bg-primary-950/20 hover:bg-primary-200/40 text-primary-500';
    if (count === 2) return 'bg-primary-300 dark:bg-primary-800/40 hover:bg-primary-400/50';
    if (count === 3) return 'bg-primary-500 hover:bg-primary-600';
    return 'bg-primary-700 hover:bg-primary-800'; // 4+ problems solved
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
      {/* Header */}
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Consistency Heatmap
        </h3>
        <span className="text-xs text-slate-400">Activity volume for the past 12 weeks</span>
      </Card.Header>

      <Card.Content className="flex flex-col gap-6 mt-2">
        <div className="flex items-start gap-3 overflow-x-auto pb-2 scrollbar-thin">
          
          {/* Row Labels (Mon, Wed, Fri aligned with rows) */}
          <div className="grid grid-rows-7 gap-1.5 text-[9px] font-bold text-slate-400 select-none pt-[14px]">
            {weekdays.map((day, idx) => (
              <span key={day} className={cn('h-3.5 flex items-center justify-end pr-1 w-6', (idx === 1 || idx === 3 || idx === 5) ? 'opacity-100' : 'opacity-0')}>
                {day}
              </span>
            ))}
          </div>

          {/* Grid columns */}
          <div className="flex-1">
            {/* 12 columns of 7 rows (grid-flow-col fills columns dynamically) */}
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 auto-cols-max">
              {heatmapData.map((day) => {
                const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                
                return (
                  <div
                    key={day.date}
                    title={`${day.problemsSolved} problems solved on ${formattedDate}`}
                    className={cn(
                      'h-3.5 w-3.5 rounded-md transition-colors cursor-pointer',
                      getIntensityClass(day.problemsSolved)
                    )}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Legend block at bottom */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4 mt-1">
          <span>Less active</span>
          <div className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-md bg-slate-100 dark:bg-slate-800/80" />
            <span className="h-3.5 w-3.5 rounded-md bg-primary-100 dark:bg-primary-950/20" />
            <span className="h-3.5 w-3.5 rounded-md bg-primary-300 dark:bg-primary-800/40" />
            <span className="h-3.5 w-3.5 rounded-md bg-primary-500" />
            <span className="h-3.5 w-3.5 rounded-md bg-primary-700" />
          </div>
          <span>More active</span>
        </div>
      </Card.Content>
    </Card>
  );
}
