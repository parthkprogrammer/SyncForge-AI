import { Card } from '../../../components/ui/Card/Card';

export function ProfileSkeleton() {
  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto animate-pulse text-left select-none">
      
      {/* 1. Header Skeleton */}
      <Card className="border border-slate-200 dark:border-slate-850 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5 flex-1">
          <div className="h-20 w-20 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-3 w-72 rounded bg-slate-150 dark:bg-slate-855"></div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-855"></div>
          </div>
        </div>
        <div className="h-9 w-28 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
      </Card>

      {/* 2. Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="p-4 border border-slate-200 dark:border-slate-850 flex flex-col justify-between h-[100px]">
            <div className="h-7 w-7 rounded bg-slate-150 dark:bg-slate-850"></div>
            <div className="space-y-2 mt-4">
              <div className="h-2.5 w-16 bg-slate-150 dark:bg-slate-850 rounded"></div>
              <div className="h-4.5 w-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Main content body sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column splits: Topics & Languages */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-5 border border-slate-200 dark:border-slate-850 h-[300px]">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="h-3.5 w-24 bg-slate-150 dark:bg-slate-850 rounded"></div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-850 rounded"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column: Achievements & Activities */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 border border-slate-200 dark:border-slate-850 h-[400px]">
            <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-20 bg-slate-100 dark:bg-slate-850 rounded-2xl"></div>
              ))}
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
