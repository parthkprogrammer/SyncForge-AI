import { Card } from '../../../components/ui/Card/Card';

export function RepositoriesSkeleton() {
  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto animate-pulse text-left select-none">
      
      {/* 1. Connection Card Skeleton */}
      <Card className="border border-slate-200 dark:border-slate-850 p-5 space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
            <div className="space-y-2">
              <div className="h-4.5 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3 w-48 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
          </div>
          <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </Card>

      {/* 2. Summary stats cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="p-4 border border-slate-200 dark:border-slate-850 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-150 dark:bg-slate-850"></div>
            <div className="space-y-1.5 flex-1">
              <div className="h-2.5 w-16 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-5 w-10 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Filter controls bar skeleton */}
      <div className="h-14 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"></div>

      {/* 4. Repository Cards loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Card key={idx} className="p-5 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 h-[260px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between gap-4">
                <div className="h-4.5 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-4.5 w-12 bg-slate-150 dark:bg-slate-850 rounded-full"></div>
              </div>
              <div className="h-3 w-20 bg-slate-150 dark:bg-slate-850 rounded"></div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-850/60 rounded"></div>
              <div className="h-2.5 w-2/3 bg-slate-100 dark:bg-slate-850/60 rounded"></div>
            </div>

            <div className="h-10 w-full bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850/60"></div>

            <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-850 pt-4 mt-4">
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
