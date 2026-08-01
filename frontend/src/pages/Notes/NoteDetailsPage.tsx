import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotes } from '../../features/notes/hooks/useNotes';
import { renderMarkdown } from '../../utils/markdown';
import { ArrowLeft, Star, Calendar, Link as LinkIcon, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge/Badge';
import { RevisionStatusBadge } from '../../features/notes/components/RevisionStatusBadge';
import { EditNoteDialog, DeleteNoteDialog } from '../../features/notes/components';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

import type { RevisionStatus } from '../../features/notes/types/note.types';

export default function NoteDetailsPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  
  const {
    notes,
    updateNote,
    deleteNote,
    toggleFavorite,
    updateRevisionStatus,
  } = useNotes();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const note = useMemo(() => {
    return notes.find((n) => n.id === noteId) || null;
  }, [notes, noteId]);

  // Redirect if note is not found
  useEffect(() => {
    if (!note) {
      const timer = setTimeout(() => {
        navigate('/notes');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [note, navigate]);

  if (!note) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center select-none">
        <AlertCircle className="h-10 w-10 text-rose-500 animate-bounce" />
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">Note not found</h3>
        <p className="text-xs text-slate-500">Redirecting to Notes folder...</p>
      </div>
    );
  }

  const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const updatedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleToggleFavorite = () => {
    toggleFavorite(note.id);
  };

  const handleUpdateStatus = (status: RevisionStatus) => {
    updateRevisionStatus(note.id, status);
  };

  const handleDelete = () => {
    deleteNote(note.id);
    navigate('/notes');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12 text-left"
    >
      
      {/* 1. Back button navigation */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4 select-none">
        <Link
          to="/notes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Notes</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleFavorite}
            className="border-slate-200 dark:border-slate-800 h-8 px-2.5 rounded-xl flex items-center gap-1.5"
            title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={cn('h-4 w-4', note.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-slate-400')} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="border-slate-200 dark:border-slate-800 h-8 px-3 rounded-xl flex items-center gap-1.5 font-bold text-xs"
          >
            <Edit className="h-3.5 w-3.5" />
            <span>Edit</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="text-error-500 border-slate-200 hover:bg-error-50 dark:border-slate-800 dark:hover:bg-error-950/10 h-8 px-3 rounded-xl flex items-center gap-1.5 font-bold text-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* 2. Note Header Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-850 dark:text-white leading-tight">
            {note.title}
          </h2>
          
          <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] text-slate-400 font-medium select-none">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Created {createdDate}</span>
            </span>
            {note.createdAt !== note.updatedAt && (
              <span className="hidden sm:inline">
                * Updated {updatedDate}
              </span>
            )}
          </div>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-850 pt-4 select-none">
          <div className="flex items-center gap-3">
            <RevisionStatusBadge status={note.revisionStatus} className="text-[10px] py-0.5 px-2" />
            
            {note.problemTitle && (
              <div className="flex items-center gap-1.5 text-[10px] text-primary-500 font-bold bg-primary-50/50 dark:bg-primary-950/10 px-2 py-0.5 rounded-md">
                <LinkIcon className="h-3 w-3" />
                <span>{note.problemTitle}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {note.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="neutral"
                  size="sm"
                  className="text-[9px] py-0 px-2 font-bold bg-slate-50 dark:bg-slate-850 text-slate-550 dark:text-slate-400 normal-case border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Note Content (Safely Parsed Markdown Elements) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm min-h-[240px] select-text">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {renderMarkdown(note.content)}
        </div>
      </div>

      {/* 4. Revision Workflow Control bar */}
      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 dark:bg-slate-900/60 dark:border-slate-800 select-none">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-3">
          Revision Status Board
        </h3>
        
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUpdateStatus('learning')}
            className={cn(
              'h-8 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase',
              note.revisionStatus === 'learning'
                ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                : 'border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-850'
            )}
          >
            Mark as Learning
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUpdateStatus('review')}
            className={cn(
              'h-8 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase',
              note.revisionStatus === 'review'
                ? 'bg-warning-500 text-white border-warning-500 shadow-sm'
                : 'border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-850'
            )}
          >
            Mark for Review
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUpdateStatus('mastered')}
            className={cn(
              'h-8 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase',
              note.revisionStatus === 'mastered'
                ? 'bg-success-500 text-white border-success-500 shadow-sm'
                : 'border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-850'
            )}
          >
            Mark as Mastered
          </Button>
        </div>
      </div>

      {/* 5. CRUD Dialogs wrappers */}
      {editOpen && (
        <EditNoteDialog
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          note={note}
          onUpdate={updateNote}
        />
      )}

      {deleteOpen && (
        <DeleteNoteDialog
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
          noteTitle={note.title}
        />
      )}

    </motion.div>
  );
}
