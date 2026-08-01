import { Card } from '../../../components/ui/Card';

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-pulse text-left">
      
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-4 w-72 rounded-lg bg-slate-150 dark:bg-slate-850"></div>
        </div>
        <div className="h-9 w-64 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
      </div>

      {/* Analytics Summary Cards (6 Columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="p-4 border border-slate-200 dark:border-slate-850 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 w-14 rounded bg-slate-150 dark:bg-slate-850"></div>
                <div className="h-5 w-10 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
              <div className="h-8 w-8 rounded-lg bg-slate-150 dark:bg-slate-850"></div>
            </div>
            <div className="h-2 w-full rounded bg-slate-100 dark:bg-slate-850/60 mt-2"></div>
          </Card>
        ))}
      </div>

      {/* Two Columns Grid: Trend Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Area Chart Skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-slate-200 dark:border-slate-800 h-[320px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4.5 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3 w-48 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
            
            <div className="h-[180px] w-full bg-slate-100 dark:bg-slate-850/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800"></div>
            
            <div className="flex justify-between px-2">
              <div className="h-3 w-8 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-8 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-8 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
          </Card>
        </div>

        {/* Difficulty Pie Chart Skeleton */}
        <div>
          <Card className="p-6 border border-slate-200 dark:border-slate-800 h-[320px] flex flex-col justify-between items-center">
            <div className="space-y-2 w-full">
              <div className="h-4.5 w-36 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3.5 w-48 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
            
            <div className="h-36 w-36 rounded-full border-8 border-slate-200 dark:border-slate-850 bg-transparent flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-slate-150 dark:bg-slate-850"></div>
            </div>
            
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
          </Card>
        </div>

      </div>

      {/* Heatmap Row Skeleton */}
      <Card className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-2">
          <div className="h-4.5 w-36 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-3.5 w-44 rounded bg-slate-150 dark:bg-slate-850"></div>
        </div>
        
        {/* Heatmap Grid Loading */}
        <div className="flex gap-2 py-3 overflow-x-auto">
          {Array.from({ length: 12 }).map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, rowIdx) => (
                <div key={rowIdx} className="h-3.5 w-3.5 rounded bg-slate-150 dark:bg-slate-850"></div>
              ))}
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
