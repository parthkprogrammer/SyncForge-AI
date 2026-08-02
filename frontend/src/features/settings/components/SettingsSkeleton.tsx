import { Card } from '../../../components/ui/Card/Card';

export function SettingsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto animate-pulse text-left select-none">
      
      {/* Sidebar navigation */}
      <div className="lg:col-span-1 space-y-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-10 w-full bg-slate-150 dark:bg-slate-850 rounded-xl"></div>
        ))}
      </div>

      {/* Main Settings Panel */}
      <div className="lg:col-span-3">
        <Card className="border border-slate-205 dark:border-slate-850 p-5 space-y-6 bg-white dark:bg-slate-900">
          
          <div className="flex justify-between items-center pb-5 border-b border-slate-100 dark:border-slate-850">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-slate-200 dark:bg-slate-850 rounded"></div>
              <div className="h-3.5 w-60 bg-slate-150 dark:bg-slate-850 rounded"></div>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-850 last:border-b-0">
                <div className="space-y-1.5 flex-1 max-w-md">
                  <div className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="h-2.5 w-64 bg-slate-150 dark:bg-slate-850 rounded"></div>
                </div>
                <div className="h-6 w-12 bg-slate-155 dark:bg-slate-850 rounded-full"></div>
              </div>
            ))}
          </div>

        </Card>
      </div>

    </div>
  );
}
