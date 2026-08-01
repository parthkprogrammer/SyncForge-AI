import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, GitFork, Lock, Globe } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge/Badge';
import type { Repository } from '../types/repository.types';

interface ConnectRepositoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  unconnectedRepos: Repository[];
  onConnect: (repoId: string) => void;
}

export function ConnectRepositoryDialog({
  isOpen,
  onClose,
  unconnectedRepos,
  onConnect,
}: ConnectRepositoryDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Derived filters available repositories by name query
  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return unconnectedRepos;
    return unconnectedRepos.filter((r) => r.name.toLowerCase().includes(query));
  }, [unconnectedRepos, searchTerm]);

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
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-850 select-none">
              <div className="flex items-center gap-2">
                <GitFork className="h-5 w-5 text-primary-500" />
                <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                  Connect GitHub Repository
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-450 hover:text-slate-650 dark:hover:text-slate-200"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Search Input bar */}
            <div className="relative mb-4 select-none">
              <input
                type="text"
                placeholder="Search your GitHub repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 px-4 py-2.5 pl-11 text-xs text-slate-850 dark:text-white placeholder-slate-400 focus:border-primary-500 focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
            </div>

            {/* Repositories Scroll list */}
            <div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-1 scrollbar-thin">
              {filtered.length === 0 ? (
                <div className="text-center text-xs text-slate-450 py-12 px-4 select-none">
                  No repositories found to connect.
                </div>
              ) : (
                filtered.map((repo) => (
                  <div
                    key={repo.id}
                    className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950/20 transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-800 dark:text-white truncate">
                          {repo.name}
                        </span>
                        
                        <Badge
                          variant={repo.visibility === 'public' ? 'success' : 'neutral'}
                          size="sm"
                          className="flex items-center gap-1 normal-case text-[9px] py-0 px-1.5 font-bold"
                        >
                          {repo.visibility === 'public' ? (
                            <Globe className="h-2.5 w-2.5" />
                          ) : (
                            <Lock className="h-2.5 w-2.5" />
                          )}
                          <span>{repo.visibility}</span>
                        </Badge>
                      </div>
                      
                      {repo.description && (
                        <p className="text-[11px] text-slate-450 dark:text-slate-550 truncate mt-1">
                          {repo.description}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onConnect(repo.id);
                        onClose();
                      }}
                      className="border-slate-200 dark:border-slate-800 h-8 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase select-none shrink-0"
                    >
                      Connect
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end pt-3 mt-4 border-t border-slate-100 dark:border-slate-850 select-none">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-slate-200 dark:border-slate-800 rounded-xl h-8.5 px-4 text-xs font-bold"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
