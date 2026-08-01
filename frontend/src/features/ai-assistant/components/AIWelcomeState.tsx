import { SuggestedPrompts } from './SuggestedPrompts';

interface AIWelcomeStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export function AIWelcomeState({ onSelectPrompt }: AIWelcomeStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 max-w-2xl mx-auto gap-8 text-center flex-1">
      {/* Visual Logo Block */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-primary-600 to-accent-300 text-white shadow-xl ring-8 ring-primary-500/5 animate-pulse">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mt-3 tracking-tight">
          How can I help with your coding journey?
        </h3>
        
        <p className="text-xs text-slate-450 dark:text-slate-450 max-w-md leading-relaxed">
          Ask about algorithms complexity, request Java/Python solution optimizations, generate revision notes, or audit your synchronized repositories.
        </p>
      </div>

      <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
    </div>
  );
}
