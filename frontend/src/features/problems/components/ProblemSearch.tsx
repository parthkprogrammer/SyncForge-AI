import { Search, X } from 'lucide-react';
import { Input } from '../../../components/ui/Input';

interface ProblemSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProblemSearch({ value, onChange }: ProblemSearchProps) {
  return (
    <div className="relative w-full text-left">
      <Input
        placeholder="Search by problem title, topic, or programming language..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-11 pr-10 py-3 w-full"
      />
      
      {/* Search Lens Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />

      {/* Clear Search Trigger */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search query"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
