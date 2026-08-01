import { Card } from '../../../components/ui/Card/Card';

export function NotesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse text-left">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={idx} className="p-5 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex flex-col justify-between h-[220px]">
          
          {/* Top Info */}
          <div className="space-y-3.5">
            <div className="flex justify-between items-start gap-4">
              <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
            
            <div className="h-3.5 w-24 rounded bg-slate-150 dark:bg-slate-850"></div>
          </div>

          {/* Description line splits */}
          <div className="space-y-2 mt-4 flex-1">
            <div className="h-2.5 w-full rounded bg-slate-150 dark:bg-slate-850/60"></div>
            <div className="h-2.5 w-full rounded bg-slate-150 dark:bg-slate-850/60"></div>
            <div className="h-2.5 w-2/3 rounded bg-slate-150 dark:bg-slate-850/60"></div>
          </div>

          {/* Tags wrappers */}
          <div className="flex gap-1.5 mt-4">
            <div className="h-4 w-10 rounded-full bg-slate-150 dark:bg-slate-850"></div>
            <div className="h-4 w-12 rounded-full bg-slate-150 dark:bg-slate-850"></div>
          </div>

          {/* Footer bar loading */}
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-850/60 pt-3.5 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-4.5 w-14 rounded-full bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3 w-16 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>

        </Card>
      ))}
    </div>
  );
}
