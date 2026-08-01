import { MessageSquarePlus } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { mockSuggestedPrompts } from '../data/aiMockData';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-col gap-3 text-left w-full select-none">
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
        Suggested Prompts
      </span>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {mockSuggestedPrompts.map((sp) => (
          <button
            key={sp.id}
            onClick={() => onSelectPrompt(sp.prompt)}
            className="text-left focus:outline-none group"
          >
            <Card hoverable className="p-4 flex items-center justify-between gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-150">
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-primary-500 transition-colors">
                  {sp.label}
                </h4>
                <p className="text-[11px] text-slate-450 dark:text-slate-450 truncate mt-0.5">
                  {sp.prompt}
                </p>
              </div>
              <MessageSquarePlus className="h-4.5 w-4.5 text-slate-400 group-hover:text-primary-500 shrink-0 transition-colors" />
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
