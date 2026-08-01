import { ShieldCheck, HelpCircle } from 'lucide-react';

export function AIContextIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-150 px-3.5 py-2 text-[11px] text-slate-500 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-400 select-none text-left">
      <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
      
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-slate-700 dark:text-slate-350 block leading-tight">
          Personal Coding Context Enabled
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">
          Context: Synced Solutions, Analytics Logs
        </span>
      </div>

      {/* Hover Info Tooltip */}
      <div className="relative group shrink-0">
        <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 cursor-help transition-colors" />
        <span className="absolute right-0 bottom-6 z-50 scale-0 w-48 rounded-lg bg-slate-950 p-2 text-[10px] font-medium leading-relaxed text-white shadow-xl transition-all duration-150 origin-bottom-right group-hover:scale-100 dark:bg-slate-800 border border-slate-850">
          SyncForge AI will use your synced coding data to provide personalized answers matching your algorithm history.
        </span>
      </div>
    </div>
  );
}
