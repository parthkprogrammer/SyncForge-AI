import { GitFork, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface RepositoriesHeaderProps {
  onConnectTrigger: () => void;
  onCreateTrigger: () => void;
  isConnected: boolean;
}

export function RepositoriesHeader({
  onConnectTrigger,
  onCreateTrigger,
  isConnected,
}: RepositoriesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-5 text-left select-none">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight sm:text-3xl">
          Repositories
        </h1>
        <p className="text-sm text-slate-450 dark:text-slate-400 mt-1">
          Manage where SyncForge AI stores and organizes your coding solutions.
        </p>
      </div>

      {/* Connection Actions */}
      {isConnected && (
        <div className="flex items-center gap-2 self-start sm:self-auto select-none">
          <Button
            variant="outline"
            size="sm"
            onClick={onConnectTrigger}
            className="border-slate-200 dark:border-slate-800 h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <GitFork className="h-4 w-4" />
            <span>Connect Repository</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onCreateTrigger}
            className="h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Create Repository</span>
          </Button>
        </div>
      )}

    </div>
  );
}
