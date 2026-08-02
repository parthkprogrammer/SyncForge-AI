import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Cloud, CloudOff } from 'lucide-react';
import type { PlatformActivity as PlatformActivityType } from '../types/profile.types';

interface PlatformActivityProps {
  platforms: PlatformActivityType[];
}

export function PlatformActivity({ platforms }: PlatformActivityProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Coding Platform Stats
        </h3>
        <span className="text-[10px] text-slate-400">Activity and synchronization statuses for linked platforms</span>
      </Card.Header>

      <Card.Content className="space-y-3.5 flex-1 select-none">
        {platforms.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No platforms linked.
          </div>
        ) : (
          platforms.map((plat) => (
            <div
              key={plat.name}
              className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-850 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${
                  plat.isConnected
                    ? 'bg-emerald-50 dark:bg-emerald-950/10 text-emerald-500'
                    : 'bg-slate-50 dark:bg-slate-850 text-slate-400'
                }`}>
                  {plat.isConnected ? <Cloud className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />}
                </div>
                
                <div>
                  <span className="text-xs font-extrabold text-slate-850 dark:text-white leading-none block">
                    {plat.name}
                  </span>
                  {plat.isConnected ? (
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">
                      Active {plat.lastActive}
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">
                      Not linked
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {plat.isConnected && (
                  <Badge variant="success" size="sm" className="text-[8px] font-bold py-0.5 px-1.5 leading-none">
                    {plat.problemsSolved} solved
                  </Badge>
                )}
                
                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                  plat.isConnected ? 'text-emerald-500' : 'text-slate-400'
                }`}>
                  {plat.isConnected ? 'Connected' : 'Offline'}
                </span>
              </div>

            </div>
          ))
        )}
      </Card.Content>
    </Card>
  );
}
