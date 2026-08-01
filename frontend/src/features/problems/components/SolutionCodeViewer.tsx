import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface SolutionCodeViewerProps {
  code: string;
  language: string;
}

export function SolutionCodeViewer({ code, language }: SolutionCodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="flex flex-col border border-slate-200 dark:border-slate-800 bg-slate-900 rounded-2xl overflow-hidden text-left shadow-lg">
      {/* Code Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-850/60 select-none">
        {/* Language label */}
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
          {language}
        </span>
        
        {/* Copy trigger button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="text-slate-300 border-slate-800 hover:bg-slate-850 active:scale-95 focus:ring-slate-800 flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[11px]">Copy Code</span>
            </>
          )}
        </Button>
      </div>

      {/* Code View Block */}
      <pre className="p-5 overflow-auto text-xs font-mono text-slate-200 leading-relaxed max-h-[500px] bg-slate-950/20 select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
