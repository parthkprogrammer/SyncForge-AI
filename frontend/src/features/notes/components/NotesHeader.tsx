import { Plus, BookOpen, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { Note } from '../types/note.types';

interface NotesHeaderProps {
  notes: Note[];
  onCreateTrigger: () => void;
}

export function NotesHeader({ notes, onCreateTrigger }: NotesHeaderProps) {
  const totalNotes = notes.length;
  const favoritesCount = notes.filter((n) => n.isFavorite).length;
  const needRevisionCount = notes.filter((n) => n.revisionStatus !== 'mastered').length;
  const masteredCount = notes.filter((n) => n.revisionStatus === 'mastered').length;

  const stats = [
    { label: 'Total Notes', value: totalNotes, icon: BookOpen, color: 'text-primary-500' },
    { label: 'Favorites', value: favoritesCount, icon: Star, color: 'text-yellow-500 fill-yellow-500/10' },
    { label: 'Need Revision', value: needRevisionCount, icon: AlertCircle, color: 'text-rose-500' },
    { label: 'Mastered', value: masteredCount, icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  return (
    <div className="flex flex-col gap-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-left select-none">
      
      {/* Title & Actions row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight sm:text-3xl">
            Notes & Revision
          </h1>
          <p className="text-sm text-slate-450 dark:text-slate-400 mt-1">
            Organize coding notes, algorithms concepts, compilation mistakes, and revision material.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onCreateTrigger}
          className="h-9 px-4 rounded-xl flex items-center gap-1.5 self-start md:self-auto font-bold"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Create Note</span>
        </Button>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm"
            >
              <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-850 ${stat.color}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  {stat.label}
                </span>
                <span className="text-xl font-black text-slate-800 dark:text-white leading-none block mt-1">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
