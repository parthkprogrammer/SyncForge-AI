import { useState, useEffect } from 'react';
import { useRepositories } from '../../features/repositories/hooks/useRepositories';
import { motion } from 'framer-motion';

// Sub-components
import {
  RepositoriesHeader,
  GitHubConnectionCard,
  RepositorySummary,
  RepositoryList,
  SyncHistory,
  ConnectRepositoryDialog,
  CreateRepositoryDialog,
  DisconnectRepositoryDialog,
  RepositorySettingsDialog,
  RepositoriesSkeleton,
} from '../../features/repositories/components';

// Types
import type { Repository, RepositorySettings, CreateRepositoryFormData } from '../../features/repositories/types/repository.types';

export default function RepositoriesPage() {
  const {
    profile,
    connectedRepos,
    unconnectedRepos,
    syncHistory,
    connectProfile,
    disconnectProfile,
    connectRepository,
    createRepository,
    disconnectRepository,
    setDefaultRepository,
    updateRepositorySettings,
    triggerManualSync,
    retryFailedSync,
  } = useRepositories();

  const [isLoading, setIsLoading] = useState(true);

  // Dialog overlays triggers
  const [connectOpen, setConnectOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [settingsRepo, setSettingsRepo] = useState<Repository | null>(null);
  const [disconnectRepo, setDisconnectRepo] = useState<Repository | null>(null);

  // Trigger loading skeleton on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const handleConnectRepo = (id: string) => {
    connectRepository(id);
  };

  const handleCreateRepo = (data: CreateRepositoryFormData) => {
    createRepository(data);
  };

  const handleDisconnectRepo = () => {
    if (disconnectRepo) {
      disconnectRepository(disconnectRepo.id);
      setDisconnectRepo(null);
    }
  };

  const handleSaveSettings = (id: string, settings: RepositorySettings) => {
    updateRepositorySettings(id, settings);
  };

  const handleSyncNow = (id: string) => {
    triggerManualSync(id);
  };

  const handleRetrySync = (id: string) => {
    retryFailedSync(id);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
        <RepositoriesHeader
          isConnected={profile.isConnected}
          onConnectTrigger={() => setConnectOpen(true)}
          onCreateTrigger={() => setCreateOpen(true)}
        />
        <RepositoriesSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12 text-left"
    >
      
      {/* 1. Page Header with CTA links */}
      <RepositoriesHeader
        isConnected={profile.isConnected}
        onConnectTrigger={() => setConnectOpen(true)}
        onCreateTrigger={() => setCreateOpen(true)}
      />

      {/* 2. GitHub Account Connection Card status */}
      <GitHubConnectionCard
        profile={profile}
        onConnect={connectProfile}
        onDisconnect={disconnectProfile}
      />

      {/* 3. Sync stats cards and repos list (Only visible when connected) */}
      {profile.isConnected && (
        <>
          {/* Summary counters */}
          <RepositorySummary
            connectedRepos={connectedRepos}
            syncHistory={syncHistory}
          />

          {/* Connected Repos search / filter lists */}
          {connectedRepos.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center select-none">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                No repositories connected.
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                Connect a GitHub repository or create a new local catalog instance to set up solution synchronization folders.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setConnectOpen(true)}
                  className="rounded-xl bg-slate-900 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  Connect Repository
                </button>
              </div>
            </div>
          ) : (
            <RepositoryList
              connectedRepos={connectedRepos}
              onSetDefault={setDefaultRepository}
              onConfigure={setSettingsRepo}
              onDisconnect={setDisconnectRepo}
              onSyncNow={handleSyncNow}
            />
          )}

          {/* Sync History Logs */}
          <SyncHistory
            history={syncHistory}
            onRetry={handleRetrySync}
          />
        </>
      )}

      {/* 4. CRUD Modals Dialogs */}
      <ConnectRepositoryDialog
        isOpen={connectOpen}
        onClose={() => setConnectOpen(false)}
        unconnectedRepos={unconnectedRepos}
        onConnect={handleConnectRepo}
      />

      <CreateRepositoryDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateRepo}
      />

      {disconnectRepo && (
        <DisconnectRepositoryDialog
          isOpen={!!disconnectRepo}
          onClose={() => setDisconnectRepo(null)}
          onConfirm={handleDisconnectRepo}
          repoName={disconnectRepo.name}
        />
      )}

      {settingsRepo && (
        <RepositorySettingsDialog
          isOpen={!!settingsRepo}
          onClose={() => setSettingsRepo(null)}
          repository={settingsRepo}
          onSave={handleSaveSettings}
        />
      )}

    </motion.div>
  );
}
