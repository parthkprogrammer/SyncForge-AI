import { Search, X } from 'lucide-react';

interface NotesSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesSearch({ value, onChange }: NotesSearchProps) {
  return (
    <div className="relative text-left select-none w-full">
      <input
        type="text"
        placeholder="Search notes by title, content, problem link, or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 px-4 py-2.5 pl-11 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300"
          title="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
