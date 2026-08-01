import { AlertTriangle, RotateCw, Copy, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MessageErrorStateProps {
  promptText: string;
  onRetry: () => void;
}

export function MessageErrorState({ promptText, onRetry }: MessageErrorStateProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy prompt');
      console.error(err);
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-850 bg-error-50/20 dark:bg-error-950/10 text-left select-none">
      {/* Icon round wrapper */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-error-100 text-error-600 dark:bg-error-950/30 dark:text-error-400 font-bold shadow-sm">
        <AlertTriangle className="h-4.5 w-4.5" />
      </div>

      <div className="flex-1 space-y-3 min-w-0">
        <div>
          <h4 className="text-xs font-bold text-error-800 dark:text-error-400">
            Unable to generate a response
          </h4>
          <p className="text-[11px] text-error-750 dark:text-error-450 mt-1 leading-relaxed">
            The mock connection request failed to compile. This error simulation models how client-side errors render when a network failure occurs on REST API lines.
          </p>
        </div>

        {/* Control actions */}
        <div className="flex gap-2 items-center pt-1.5 border-t border-error-100/30 dark:border-error-950/30">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="text-error-650 hover:bg-error-100/40 border-error-200 dark:border-error-950/30 dark:hover:bg-error-950/20 h-7 px-2.5 rounded-lg flex items-center gap-1.5"
          >
            <RotateCw className="h-3 w-3" />
            <span className="text-[10px]">Try Again</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-none hover:bg-slate-100 dark:hover:bg-slate-850 h-7 px-2.5 rounded-lg flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px]">Copied Prompt</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="text-[10px]">Copy Prompt</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
