import { Card } from '../../../components/ui/Card';

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-150 dark:border-slate-800 pb-5">
        <div className="space-y-2 text-left">
          <div className="h-8 w-64 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-4 w-48 rounded-lg bg-slate-150 dark:bg-slate-850"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-36 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-9 w-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>

      {/* 2. Stat Cards Grid Skeleton (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-5 w-12 rounded-full bg-slate-150 dark:bg-slate-850"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-850/60 pt-2"></div>
          </Card>
        ))}
      </div>

      {/* 3. Middle Section: Chart & Side Cards Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Activity Chart Skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-slate-200 dark:border-slate-800 h-[320px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4.5 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3 w-44 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
            
            {/* Mock Chart Bar Pillars */}
            <div className="flex items-end justify-between h-[180px] px-4 pt-4 border-b border-slate-150 dark:border-slate-800">
              <div className="h-[20%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-[45%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-[15%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-[75%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-[35%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-[60%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-[25%] w-8 rounded-t bg-slate-200 dark:bg-slate-800"></div>
            </div>
            
            <div className="flex justify-between px-2">
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-3 w-6 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
          </Card>
        </div>

        {/* Coding Streak Skeleton */}
        <div>
          <Card className="p-6 border border-slate-200 dark:border-slate-800 h-[320px] flex flex-col justify-between">
            <div className="h-4.5 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
            
            <div className="grid grid-cols-2 gap-4 my-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                  <div className="space-y-1.5 mt-1.5">
                    <div className="h-2 w-10 rounded bg-slate-150 dark:bg-slate-850"></div>
                    <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-6 w-full rounded bg-slate-150 dark:bg-slate-850 mt-2"></div>
          </Card>
        </div>

      </div>

      {/* 4. Bottom Section: Submissions & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Submissions Skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="space-y-2">
              <div className="h-4.5 w-36 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-3.5 w-52 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
            
            {/* Table Rows skeleton */}
            <div className="space-y-3 pt-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-850">
                  <div className="h-3.5 w-44 rounded bg-slate-250 dark:bg-slate-800"></div>
                  <div className="h-5 w-14 rounded-full bg-slate-150 dark:bg-slate-850"></div>
                  <div className="h-5 w-12 rounded bg-slate-150 dark:bg-slate-850"></div>
                  <div className="h-3.5 w-20 rounded bg-slate-150 dark:bg-slate-850"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sync Status Skeleton */}
        <div>
          <Card className="p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-4.5 w-36 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-5 w-16 rounded-full bg-slate-150 dark:bg-slate-850"></div>
            </div>
            
            <div className="space-y-3.5 my-4">
              <div className="h-12 w-full rounded-xl bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-12 w-full rounded-xl bg-slate-150 dark:bg-slate-850"></div>
            </div>

            <div className="h-5 w-full rounded bg-slate-150 dark:bg-slate-850"></div>
          </Card>
        </div>

      </div>

    </div>
  );
}
