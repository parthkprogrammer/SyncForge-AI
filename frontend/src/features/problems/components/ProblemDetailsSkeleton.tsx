import { Card } from '../../../components/ui/Card';

export function ProblemDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto animate-pulse text-left">
      
      {/* Back button skeleton */}
      <div className="h-4 w-20 rounded bg-slate-150 dark:bg-slate-850"></div>

      {/* Header Info Block */}
      <div className="space-y-3 pb-5 border-b border-slate-150 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-64 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-5 w-16 rounded-full bg-slate-150 dark:bg-slate-850"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-24 rounded bg-slate-150 dark:bg-slate-850"></div>
          <div className="h-5 w-16 rounded bg-slate-150 dark:bg-slate-850"></div>
        </div>
      </div>

      {/* Layout Split: Left details metadata card, Right solution tabs loading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Metadata list */}
        <div className="lg:col-span-1">
          <Card className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 pb-2"></div>
            
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-1.5 py-1">
                <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-850/60"></div>
                <div className="h-4 w-36 rounded bg-slate-150 dark:bg-slate-850"></div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right Side: Code tabs mock outline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab labels row */}
          <div className="flex gap-4 border-b border-slate-150 dark:border-slate-800 pb-2">
            <div className="h-6 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-6 w-28 rounded bg-slate-150 dark:bg-slate-850"></div>
            <div className="h-6 w-24 rounded bg-slate-150 dark:bg-slate-850"></div>
          </div>
          
          {/* Code block box */}
          <Card className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-900 h-[360px] flex flex-col justify-between">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="h-3.5 w-12 rounded bg-slate-800"></div>
              <div className="h-7 w-20 rounded bg-slate-850"></div>
            </div>
            
            <div className="space-y-2 mt-4 flex-1">
              <div className="h-3.5 w-[90%] rounded bg-slate-850"></div>
              <div className="h-3.5 w-[75%] rounded bg-slate-850"></div>
              <div className="h-3.5 w-[85%] rounded bg-slate-850"></div>
              <div className="h-3.5 w-[60%] rounded bg-slate-850"></div>
              <div className="h-3.5 w-[40%] rounded bg-slate-850"></div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
