import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import toast from 'react-hot-toast';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy code');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col border border-slate-200 dark:border-slate-800 bg-slate-900 rounded-xl overflow-hidden text-left my-3 shadow-md">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950/80 border-b border-slate-850/60 select-none">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
          {language || 'code'}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="text-slate-300 border-slate-800 hover:bg-slate-850 active:scale-95 flex items-center gap-1.5 h-7 px-2.5 rounded-lg"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </Button>
      </div>

      <pre className="p-4 overflow-x-auto text-[11px] font-mono text-slate-200 leading-relaxed max-h-[380px] bg-slate-950/20 select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
