import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { RevisionStatusBadge } from './RevisionStatusBadge';
import { Star, Link as LinkIcon, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Note } from '../types/note.types';
import { cn } from '../../../utils/cn';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export function NoteCard({ note, onEdit, onDelete, onToggleFavorite }: NoteCardProps) {
  // Truncate markdown formatting details for card previews
  const cleanPreview = (content: string) => {
    const clean = content
      .replace(/###\s+/g, '')
      .replace(/```[\s\S]*?```/g, '[Code Block]')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1');
      
    return clean.length > 140 ? `${clean.slice(0, 140)}...` : clean;
  };

  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card hoverable className="flex flex-col h-full justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left p-5 shadow-sm">
      
      {/* Top Header Row */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <Link
            to={`/notes/${note.id}`}
            className="text-sm font-extrabold text-slate-800 dark:text-white hover:text-primary-500 transition-colors leading-tight line-clamp-1 flex-1 pr-1"
          >
            {note.title}
          </Link>
          
          <button
            onClick={onToggleFavorite}
            title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="shrink-0 text-slate-350 hover:text-yellow-500 transition-colors"
          >
            <Star
              className={cn(
                'h-4 w-4 transition-transform active:scale-125',
                note.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-slate-350'
              )}
            />
          </button>
        </div>

        {/* Problem Link association */}
        {note.problemTitle ? (
          <div className="flex items-center gap-1.5 text-[10px] text-primary-500 font-bold bg-primary-50/50 dark:bg-primary-950/10 px-2 py-0.5 rounded-md self-start w-fit">
            <LinkIcon className="h-3 w-3" />
            <span className="truncate max-w-[150px]">{note.problemTitle}</span>
          </div>
        ) : (
          <div className="h-4.5" /> // empty height placeholder
        )}
      </div>

      {/* Preview Content */}
      <p className="text-xs text-slate-450 dark:text-slate-450 mt-4 flex-1 line-clamp-3 leading-relaxed whitespace-pre-line select-text">
        {cleanPreview(note.content)}
      </p>

      {/* Tags row */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-4">
          {note.tags.map((tag) => (
            <Badge
              key={tag}
              variant="neutral"
              size="sm"
              className="text-[9px] py-0 px-1.5 font-bold tracking-normal bg-slate-50 dark:bg-slate-850 text-slate-550 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 normal-case"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer Details */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-3.5 mt-4 text-[10px] text-slate-400 select-none">
        
        {/* Status and dates */}
        <div className="flex items-center gap-2">
          <RevisionStatusBadge status={note.revisionStatus} />
          <span>Updated {formattedDate}</span>
        </div>

        {/* CRUD edit buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            title="Edit note"
            className="p-1 hover:text-primary-500 rounded hover:bg-slate-50 dark:hover:bg-slate-850"
          >
            <Edit className="h-3.5 w-3.5" />
          </button>
          
          <button
            onClick={onDelete}
            title="Delete note"
            className="p-1 hover:text-error-500 rounded hover:bg-slate-50 dark:hover:bg-slate-850"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          
          <Link
            to={`/notes/${note.id}`}
            title="View full note details"
            className="p-1 hover:text-slate-800 dark:hover:text-slate-200 rounded hover:bg-slate-50 dark:hover:bg-slate-850"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>

    </Card>
  );
}
