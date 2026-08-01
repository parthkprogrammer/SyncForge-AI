import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/Button';

interface DeleteNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle: string;
}

export function DeleteNoteDialog({ isOpen, onClose, onConfirm, noteTitle }: DeleteNoteDialogProps) {
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
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50"
          >
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
              Delete Note?
            </h3>
            
            <p className="text-xs text-slate-450 dark:text-slate-400 mt-2.5 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-700 dark:text-slate-250">"{noteTitle}"</span>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-slate-200 dark:border-slate-800 h-8.5 px-4 rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="bg-error-600 hover:bg-error-700 text-white h-8.5 px-4 rounded-xl text-xs font-bold"
              >
                Delete Note
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
