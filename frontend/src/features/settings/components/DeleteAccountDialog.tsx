import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteAccountDialog({ isOpen, onClose, onConfirm }: DeleteAccountDialogProps) {
  const [inputText, setInputText] = useState('');
  
  const isUnlocked = inputText.trim() === 'DELETE';

  const handleConfirm = () => {
    if (isUnlocked) {
      onConfirm();
      setInputText('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
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
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-left z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
                <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                  Permanently Delete Account?
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-450 hover:text-slate-650 dark:hover:text-slate-200"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Warning! Deleting your account is irreversible. All synced solution folder defaults, AI conversation histories, and portfolios stats will be removed.
            </p>

            <div className="space-y-3.5 text-left">
              <label className="text-[10px] font-bold text-slate-455 dark:text-slate-550 uppercase tracking-wide">
                Type <span className="text-rose-500 font-black">DELETE</span> to confirm account termination
              </label>
              
              <input
                type="text"
                placeholder="DELETE"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-250 dark:border-slate-800 dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-850 dark:text-white rounded-xl focus:border-rose-500 focus:outline-none placeholder-slate-400 font-bold tracking-wide"
                autoFocus
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-slate-100 dark:border-slate-850">
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
                onClick={handleConfirm}
                disabled={!isUnlocked}
                className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white h-8.5 px-4 rounded-xl text-xs font-bold"
              >
                Delete Account
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
