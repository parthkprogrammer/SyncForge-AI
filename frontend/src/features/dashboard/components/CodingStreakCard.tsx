import { Card } from '../../../components/ui/Card';
import { Flame, Trophy, CheckCircle, Calendar } from 'lucide-react';

interface CodingStreakCardProps {
  currentStreak: string | number;
  longestStreak: string | number;
  solvedToday: number;
  solvedThisWeek: number;
}

export function CodingStreakCard({
  currentStreak,
  longestStreak,
  solvedToday,
  solvedThisWeek,
}: CodingStreakCardProps) {
  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-between">
      <Card.Header className="border-none pb-0 mb-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Coding Streak
        </h3>
      </Card.Header>

      <Card.Content className="grid grid-cols-2 gap-4">
        {/* Left top: Current Streak */}
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400 shrink-0">
            <Flame className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Current</span>
            <span className="text-lg font-black text-slate-800 dark:text-white leading-tight">{currentStreak}</span>
          </div>
        </div>

        {/* Right top: Longest Streak */}
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-950/20 dark:text-yellow-400 shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Longest</span>
            <span className="text-lg font-black text-slate-800 dark:text-white leading-tight">{longestStreak}</span>
          </div>
        </div>

        {/* Left bottom: Solved Today */}
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 shrink-0">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Today</span>
            <span className="text-lg font-black text-slate-800 dark:text-white leading-tight">{solvedToday} Problems</span>
          </div>
        </div>

        {/* Right bottom: Solved This Week */}
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400 shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">This Week</span>
            <span className="text-lg font-black text-slate-800 dark:text-white leading-tight">{solvedThisWeek} Problems</span>
          </div>
        </div>
      </Card.Content>
      
      {/* Bottom flame row visual */}
      <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-3.5 flex items-center justify-between text-xs text-slate-450 dark:text-slate-500">
        <span>Active Streak Meter:</span>
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, idx) => (
            <span
              key={idx}
              className={`h-2.5 w-2.5 rounded-full ${
                idx < 5 ? 'bg-orange-500 shadow-sm shadow-orange-500/20' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
