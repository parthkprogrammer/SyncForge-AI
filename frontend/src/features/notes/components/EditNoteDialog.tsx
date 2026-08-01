import { motion, AnimatePresence } from 'framer-motion';
import { NoteForm } from './NoteForm';
import { X } from 'lucide-react';
import type { Note, NoteFormData } from '../types/note.types';

interface EditNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
  onUpdate: (id: string, data: NoteFormData) => void;
}

export function EditNoteDialog({ isOpen, onClose, note, onUpdate }: EditNoteDialogProps) {
  const handleSubmit = (data: NoteFormData) => {
    onUpdate(note.id, data);
    onClose();
  };

  const initialValues: Partial<NoteFormData> = {
    title: note.title,
    content: note.content,
    problemId: note.problemId || '',
    revisionStatus: note.revisionStatus,
    tags: note.tags,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-850">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                Edit Revision Note
              </h3>
              <button
                onClick={onClose}
                className="text-slate-450 hover:text-slate-650 dark:hover:text-slate-200"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Note form */}
            <NoteForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onCancel={onClose}
              submitLabel="Save Changes"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
