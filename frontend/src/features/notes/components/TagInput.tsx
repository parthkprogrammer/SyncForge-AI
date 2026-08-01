import { useState } from 'react';
import { X } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge/Badge';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
}

export function TagInput({ tags, onChange, maxTags = 5 }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    
    // Prevent duplicates and respect maximum limits
    if (!tags.includes(trimmed) && tags.length < maxTags) {
      const updated = [...tags, trimmed];
      onChange(updated);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (indexToRemove: number) => {
    const updated = tags.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-2 text-left select-none">
      <div className="flex flex-wrap gap-1.5 min-h-[28px] items-center p-1.5 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        
        {/* Render tags */}
        {tags.map((tag, idx) => (
          <Badge
            key={`${tag}-${idx}`}
            variant="primary"
            size="sm"
            className="flex items-center gap-1 normal-case font-bold py-0.5 px-2 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-primary-500 hover:text-primary-700 hover:bg-primary-100/50 dark:hover:bg-primary-900/30 rounded-full p-0.5"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </Badge>
        ))}

        {/* Input area */}
        {tags.length < maxTags && (
          <input
            type="text"
            placeholder="Add tag..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none min-w-[70px] py-0.5 px-1"
          />
        )}
      </div>

      <p className="text-[10px] text-slate-400 leading-none">
        Press <kbd className="font-sans font-bold">Enter</kbd> to add tag. Max {maxTags} tags.
      </p>
    </div>
  );
}
