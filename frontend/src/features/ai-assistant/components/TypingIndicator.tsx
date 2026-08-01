import { motion } from 'framer-motion';

export function TypingIndicator() {
  const dotVariants = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10 text-left select-none">
      {/* Avatar wrapper */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-300 text-white font-bold shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Thinking Dots block */}
      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-350">
            SyncForge AI
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-550 font-mono">
            thinking...
          </span>
        </div>

        <div className="flex items-center gap-1.5 py-1">
          <span className="text-xs text-slate-500 mr-1">Analyzing coding workspace context</span>
          <div className="flex gap-1 items-center pt-1.5">
            {[0, 1, 2].map((idx) => (
              <motion.span
                key={idx}
                variants={dotVariants}
                animate="animate"
                transition={{ delay: idx * 0.15 }}
                className="h-2 w-2 rounded-full bg-primary-500"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
