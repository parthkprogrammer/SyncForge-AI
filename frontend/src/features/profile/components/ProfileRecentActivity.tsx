import { Card } from '../../../components/ui/Card/Card';
import { FileCode, Play, ShieldAlert, FileText, Flame, Activity } from 'lucide-react';
import type { ProfileActivity } from '../types/profile.types';

interface ProfileRecentActivityProps {
  activity: ProfileActivity[];
}

export function ProfileRecentActivity({ activity }: ProfileRecentActivityProps) {
  const getIcon = (type: ProfileActivity['type']) => {
    switch (type) {
      case 'solve':
        return <FileCode className="h-4 w-4 text-primary-500" />;
      case 'sync':
        return <Play className="h-4 w-4 text-emerald-500" />;
      case 'ai':
        return <ShieldAlert className="h-4 w-4 text-indigo-500" />;
      case 'note':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'streak':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-slate-450" />;
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Recent Activity Timeline
        </h3>
        <span className="text-[10px] text-slate-400">Chronological history of coding and synchronizations logs</span>
      </Card.Header>

      <Card.Content className="space-y-4 flex-1 select-none">
        {activity.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No recent activity logs.
          </div>
        ) : (
          activity.map((act) => (
            <div key={act.id} className="flex gap-3">
              {/* Left icon wrapper */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850 h-fit shrink-0">
                {getIcon(act.type)}
              </div>

              {/* Right text details */}
              <div className="space-y-1 flex-1">
                <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                  {act.description}
                </p>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block">
                  {act.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </Card.Content>
    </Card>
  );
}
