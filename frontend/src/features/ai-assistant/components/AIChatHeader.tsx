import { Plus, Trash2, Menu } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface AIChatHeaderProps {
  onNewChat: () => void;
  onClearConversation: () => void;
  onToggleSidebar: () => void;
}

export function AIChatHeader({
  onNewChat,
  onClearConversation,
  onToggleSidebar,
}: AIChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900 select-none">
      
      {/* Brand Title & Mobile Menu Toggle */}
      <div className="flex items-center gap-3 text-left">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle chat history list"
          className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 lg:hidden dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-300 text-white shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <div>
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight flex items-center gap-2">
            <span>SyncForge AI Assistant</span>
            {/* Status dot */}
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/30 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Ready</span>
            </span>
          </h2>
          <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-none mt-0.5">
            Your AI-powered coding companion
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onClearConversation}
          className="text-error-500 hover:text-error-600 border-slate-200 hover:bg-error-50 dark:border-slate-800 dark:hover:bg-error-950/10 h-8 px-2.5 rounded-xl flex items-center gap-1.5"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">Clear Chat</span>
        </Button>
        
        <Button
          variant="primary"
          size="sm"
          onClick={onNewChat}
          className="h-8 px-2.5 rounded-xl flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">New Chat</span>
        </Button>
      </div>

    </div>
  );
}
