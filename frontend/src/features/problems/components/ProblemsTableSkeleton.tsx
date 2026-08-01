import { Card } from '../../../components/ui/Card';

export function ProblemsTableSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-pulse text-left">
      
      {/* Header Skeleton */}
      <div className="space-y-2 pb-5 border-b border-slate-150 dark:border-slate-800">
        <div className="h-8 w-44 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        <div className="h-4 w-72 rounded-lg bg-slate-150 dark:bg-slate-850"></div>
      </div>

      {/* Stats Counter Bar Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="p-4 border border-slate-200 dark:border-slate-850 space-y-2">
            <div className="h-3 w-16 rounded bg-slate-150 dark:bg-slate-850"></div>
            <div className="h-6 w-12 rounded bg-slate-200 dark:bg-slate-800"></div>
          </Card>
        ))}
      </div>

      {/* Search and Filters Bar Skeletons */}
      <div className="h-12 w-full rounded-2xl bg-slate-200 dark:bg-slate-850"></div>
      <div className="h-28 w-full rounded-2xl bg-slate-150 dark:bg-slate-850/60"></div>

      {/* Table Skeleton */}
      <Card className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-850"
            >
              <div className="h-4 w-48 rounded bg-slate-250 dark:bg-slate-800"></div>
              <div className="h-4 w-16 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-4 w-12 rounded bg-slate-150 dark:bg-slate-850"></div>
              <div className="h-4 w-20 rounded bg-slate-150 dark:bg-slate-850"></div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
