import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex items-start gap-3 rounded-xl border border-error-200 bg-error-50 p-4 text-left dark:border-error-900/30 dark:bg-error-950/20"
      >
        <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 shrink-0 mt-0.5" />
        
        <div className="flex-1">
          <h4 className="text-sm font-bold text-error-800 dark:text-error-300">Connection Error</h4>
          <p className="text-xs text-error-750 dark:text-error-400/80 mt-1 leading-relaxed">{message}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss error"
            className="rounded-lg p-1 text-error-500 hover:bg-error-100 hover:text-error-700 dark:text-error-400 dark:hover:bg-error-900/40"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
