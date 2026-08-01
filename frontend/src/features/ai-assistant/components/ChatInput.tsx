import { useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onStop,
  isGenerating,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const maxLength = 2000;

  // Auto-resize textarea height to fit long inputs
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent newline insertion
      if (value.trim() && !isGenerating && !disabled) {
        onSend();
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-2 border border-slate-200 bg-white p-3.5 rounded-2xl dark:border-slate-800 dark:bg-slate-900 shadow-lg text-left select-none">
      <div className="flex items-end gap-3">
        {/* Textarea Controlled Input */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask a question about algorithms, optimize your code, or review revision notes..."
          className="flex-1 resize-none bg-transparent py-1 text-xs text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none max-h-[180px] min-h-[24px] overflow-y-auto leading-relaxed border-none"
        />

        {/* Action Button: Stop or Send */}
        {isGenerating ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onStop}
            className="text-error-500 hover:bg-error-50 dark:hover:bg-error-950/10 border-slate-200 dark:border-slate-800 rounded-xl h-8 w-8 p-0 flex items-center justify-center shrink-0"
            title="Stop generating"
          >
            <Square className="h-4 w-4 fill-error-500 text-error-500" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="rounded-xl h-8 w-8 p-0 flex items-center justify-center shrink-0"
            title="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Footer Info: Character Counts */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 border-t border-slate-50 dark:border-slate-850 pt-2 font-medium">
        <span>Use Shift + Enter for a new line</span>
        <span>
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
}
