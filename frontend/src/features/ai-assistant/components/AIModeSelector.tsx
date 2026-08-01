import type { AIMode } from '../types/ai.types';
import { cn } from '../../../utils/cn';

interface AIModeSelectorProps {
  selectedMode: AIMode;
  onModeChange: (mode: AIMode) => void;
  disabled?: boolean;
}

export function AIModeSelector({
  selectedMode,
  onModeChange,
  disabled = false,
}: AIModeSelectorProps) {
  const modes: { id: AIMode; label: string; desc: string }[] = [
    { id: 'general', label: 'General', desc: 'Ask broad coding topics' },
    { id: 'explain', label: 'Explain', desc: 'Analyze code structures' },
    { id: 'optimize', label: 'Optimize', desc: 'Reduce runtime memory' },
    { id: 'debug', label: 'Debug', desc: 'Trace compiler errors' },
    { id: 'interview', label: 'Interview', desc: 'Mock interview drills' },
  ];

  return (
    <div className="flex flex-col gap-2 text-left select-none">
      <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest px-1">
        Assistant Mode
      </span>
      
      <div className="flex flex-wrap gap-2">
        {modes.map((mode) => {
          const isActive = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              disabled={disabled}
              title={mode.desc}
              className={cn(
                'rounded-xl border px-3 py-1.5 text-xs font-bold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none',
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-800 dark:border-slate-800 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850'
              )}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
