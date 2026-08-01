import { useState } from 'react';
import { Copy, Check, RotateCw, User } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { ChatMessage as ChatMessageType } from '../types/ai.types';
import { cn } from '../../../utils/cn';
import toast from 'react-hot-toast';

import { renderMarkdown } from '../../../utils/markdown';

interface ChatMessageProps {
  message: ChatMessageType;
  onRegenerate: (msgId: string) => void;
  isGenerating: boolean;
}

export function ChatMessage({ message, onRegenerate, isGenerating }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Response copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy response');
      console.error(err);
    }
  };

  return (
    <div
      className={cn(
        'flex gap-4 p-4 border-b border-slate-100 dark:border-slate-850 text-left',
        isAssistant ? 'bg-slate-50/50 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-950'
      )}
    >
      {/* Avatar block */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold shadow-sm select-none',
          isAssistant
            ? 'bg-gradient-to-tr from-primary-600 to-accent-300 text-white'
            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
        )}
      >
        {isAssistant ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>

      {/* Message body */}
      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-350 select-none">
            {isAssistant ? 'SyncForge AI' : 'You'}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-550 font-mono select-none">
            {message.createdAt}
          </span>
        </div>

        {/* Text Area */}
        <div className="space-y-1.5 pr-2">
          {isAssistant ? (
            renderMarkdown(message.content)
          ) : (
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
              {message.content}
            </p>
          )}
        </div>

        {/* Action triggers */}
        {isAssistant && message.status === 'complete' && (
          <div className="flex gap-2 items-center pt-2 select-none border-t border-slate-100/50 dark:border-slate-850/50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-750 dark:hover:text-slate-200 border-none hover:bg-slate-100 dark:hover:bg-slate-850 h-7 px-2.5 rounded-lg flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[10px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-[10px]">Copy Response</span>
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRegenerate(message.id)}
              disabled={isGenerating}
              className="text-slate-400 hover:text-slate-750 dark:hover:text-slate-200 border-none hover:bg-slate-100 dark:hover:bg-slate-850 h-7 px-2.5 rounded-lg flex items-center gap-1.5 disabled:opacity-40"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span className="text-[10px]">Regenerate</span>
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
