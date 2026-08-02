import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Sparkles, Flame, Trophy, CalendarCheck, ShieldAlert, Coffee, Compass, CheckCircle2 } from 'lucide-react';
import type { Achievement } from '../types/profile.types';
import { cn } from '../../../utils/cn';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const getIcon = (name: string, className?: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
      case 'FlameKindling':
        return <Flame className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'CalendarCheck':
        return <CalendarCheck className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Coffee':
        return <Coffee className={className} />;
      case 'Compass':
      default:
        return <Compass className={className} />;
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
            Achievements & Badges
          </h3>
          <span className="text-[10px] text-slate-400">Track unlocked credentials and in-progress goals</span>
        </div>
        
        <Badge variant="primary" size="sm" className="text-[10px] font-bold py-0.5 px-2">
          {achievements.filter((a) => a.unlocked).length} Unlocked
        </Badge>
      </Card.Header>

      <Card.Content className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 select-none">
        {achievements.length === 0 ? (
          <div className="col-span-2 text-center py-6 text-xs text-slate-400">
            No achievements configured.
          </div>
        ) : (
          achievements.map((ach) => {
            const isCompleted = ach.unlocked;
            const progressPercentage = Math.min(100, Math.round((ach.progress / ach.target) * 100));

            return (
              <div
                key={ach.id}
                className={cn(
                  'flex items-start gap-3.5 p-3.5 border rounded-2xl transition-all',
                  isCompleted
                    ? 'border-emerald-200 dark:border-emerald-950/20 bg-emerald-500/[0.02]'
                    : 'border-slate-100 dark:border-slate-850 bg-slate-50/[0.1] opacity-75'
                )}
              >
                {/* Icon wrapper */}
                <div className={cn(
                  'p-2.5 rounded-xl border shrink-0',
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-200 dark:border-emerald-900/30 text-emerald-500'
                    : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400'
                )}>
                  {getIcon(ach.iconName, 'h-5 w-5')}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn(
                      'text-xs font-extrabold truncate block',
                      isCompleted ? 'text-slate-850 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                    )}>
                      {ach.title}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    )}
                  </div>

                  <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-relaxed font-semibold">
                    {ach.description}
                  </p>

                  {/* Progress info */}
                  <div className="space-y-1 pt-1.5">
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 dark:text-slate-550">
                      <span>Progress</span>
                      <span>
                        {ach.progress} / {ach.target}
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-850 rounded-full h-1 overflow-hidden">
                      <div
                        className={cn(
                          'h-1 rounded-full transition-all duration-300',
                          isCompleted ? 'bg-emerald-500' : 'bg-primary-400'
                        )}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </Card.Content>
    </Card>
  );
}
