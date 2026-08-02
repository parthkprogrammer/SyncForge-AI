import { useState, useCallback, useEffect } from 'react';
import type { Repository, RepositorySettings, SyncHistoryItem, CreateRepositoryFormData } from '../types/repository.types';
import {
  initialMockRepositories,
  mockUnconnectedRepositories,
  initialMockSyncHistory,
  mockGitHubProfile,
} from '../data/repositoriesMockData';
import type { GitHubProfile } from '../data/repositoriesMockData';
import { simulateManualSync, simulateSyncRetry } from '../services/mockRepositoryService';
import toast from 'react-hot-toast';

export function useRepositories() {
  const [profile, setProfile] = useState<GitHubProfile>(mockGitHubProfile);
  
  const [connectedRepos, setConnectedRepos] = useState<Repository[]>(() => {
    const stored = localStorage.getItem('sf_connected_repos');
    return stored ? JSON.parse(stored) : initialMockRepositories();
  });

  const [unconnectedRepos, setUnconnectedRepos] = useState<Repository[]>(() => {
    const stored = localStorage.getItem('sf_unconnected_repos');
    return stored ? JSON.parse(stored) : mockUnconnectedRepositories();
  });

  const [syncHistory, setSyncHistory] = useState<SyncHistoryItem[]>(() => {
    const stored = localStorage.getItem('sf_sync_history');
    return stored ? JSON.parse(stored) : initialMockSyncHistory();
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sf_connected_repos', JSON.stringify(connectedRepos));
  }, [connectedRepos]);

  useEffect(() => {
    localStorage.setItem('sf_unconnected_repos', JSON.stringify(unconnectedRepos));
  }, [unconnectedRepos]);

  useEffect(() => {
    localStorage.setItem('sf_sync_history', JSON.stringify(syncHistory));
  }, [syncHistory]);

  const disconnectProfile = useCallback(() => {
    setProfile((prev) => ({ ...prev, isConnected: false }));
    setConnectedRepos([]);
    toast.success('GitHub disconnected');
  }, []);

  const connectProfile = useCallback(() => {
    setProfile((prev) => ({ ...prev, isConnected: true }));
    setConnectedRepos(initialMockRepositories());
    setUnconnectedRepos(mockUnconnectedRepositories());
    toast.success('GitHub connected successfully!');
  }, []);

  const connectRepository = useCallback((repoId: string) => {
    const target = unconnectedRepos.find((r) => r.id === repoId);
    if (!target) return;

    const connected: Repository = {
      ...target,
      connectedAt: new Date().toISOString(),
      lastSyncedAt: null,
      syncStatus: 'healthy',
      settings: {
        defaultBranch: target.defaultBranch || 'main',
        autoSync: true,
        folderStrategy: 'platform',
        commitTemplate: 'feat: solve {problem}',
        includeReadme: true,
        includeMetadata: true,
      },
    };

    setUnconnectedRepos((prev) => prev.filter((r) => r.id !== repoId));
    setConnectedRepos((prev) => [...prev, connected]);
    toast.success(`Connected to ${target.name}!`);
  }, [unconnectedRepos]);

  const createRepository = useCallback((data: CreateRepositoryFormData) => {
    const newRepo: Repository = {
      id: `repo-${Date.now()}`,
      name: data.name.trim().toLowerCase().replace(/\s+/g, '-'),
      owner: profile.username,
      description: data.description.trim() || null,
      url: `https://github.com/${profile.username}/${data.name.trim().toLowerCase().replace(/\s+/g, '-')}`,
      visibility: data.visibility,
      defaultBranch: 'main',
      language: 'TypeScript',
      isDefault: false,
      autoSync: true,
      connectedAt: new Date().toISOString(),
      lastSyncedAt: null,
      syncStatus: 'healthy',
      totalSyncedSolutions: 0,
      settings: {
        defaultBranch: 'main',
        autoSync: true,
        folderStrategy: 'platform',
        commitTemplate: 'feat: solve {problem}',
        includeReadme: data.initializeReadme,
        includeMetadata: true,
      },
    };

    setConnectedRepos((prev) => [...prev, newRepo]);
    toast.success('Repository created locally for preview');
    return newRepo;
  }, [profile.username]);

  const disconnectRepository = useCallback((id: string) => {
    const target = connectedRepos.find((r) => r.id === id);
    if (!target) return;

    const disconnected: Repository = {
      ...target,
      isDefault: false,
      connectedAt: null,
      lastSyncedAt: null,
      syncStatus: 'healthy',
      settings: undefined,
    };

    setConnectedRepos((prev) => prev.filter((r) => r.id !== id));
    setUnconnectedRepos((prev) => [disconnected, ...prev]);
    toast.success('Repository disconnected');
  }, [connectedRepos]);

  const setDefaultRepository = useCallback((id: string) => {
    setConnectedRepos((prev) =>
      prev.map((r) => ({
        ...r,
        isDefault: r.id === id,
      }))
    );
    toast.success('Default repository updated');
  }, []);

  const updateRepositorySettings = useCallback((id: string, settings: RepositorySettings) => {
    setConnectedRepos((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            defaultBranch: settings.defaultBranch,
            autoSync: settings.autoSync,
            settings,
          };
        }
        return r;
      })
    );
    toast.success('Settings updated successfully!');
  }, []);

  const triggerManualSync = useCallback(async (id: string) => {
    const repo = connectedRepos.find((r) => r.id === id);
    if (!repo) return;

    // 1. Transition state to 'syncing'
    setConnectedRepos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, syncStatus: 'syncing' } : r))
    );

    try {
      await simulateManualSync();

      // 2. Add history record
      const mockProblems = ['Two Sum', 'Valid Parentheses', 'Binary Search', 'Merge Sorted Lists'];
      const randomProblem = mockProblems[Math.floor(Math.random() * mockProblems.length)];
      const randomHash = Math.random().toString(16).substring(2, 9);
      
      const newHistoryItem: SyncHistoryItem = {
        id: `sync-${Date.now()}`,
        problemTitle: randomProblem,
        repositoryName: repo.name,
        branchName: repo.defaultBranch,
        commitHash: randomHash,
        status: 'success',
        timestamp: new Date().toISOString(),
      };

      setSyncHistory((prev) => [newHistoryItem, ...prev]);
      
      // 3. Final status 'healthy'
      setConnectedRepos((prev) =>
        prev.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              syncStatus: 'healthy',
              lastSyncedAt: new Date().toISOString(),
              totalSyncedSolutions: r.totalSyncedSolutions + 1,
            };
          }
          return r;
        })
      );
      toast.success('Sync completed successfully!');
    } catch {
      setConnectedRepos((prev) =>
        prev.map((r) => (r.id === id ? { ...r, syncStatus: 'error' } : r))
      );
      toast.error('Sync failed');
    }
  }, [connectedRepos]);

  const retryFailedSync = useCallback(async (historyItemId: string) => {
    const item = syncHistory.find((h) => h.id === historyItemId);
    if (!item) return;

    // Set item status to pending
    setSyncHistory((prev) =>
      prev.map((h) => (h.id === historyItemId ? { ...h, status: 'pending' } : h))
    );

    try {
      await simulateSyncRetry();

      // Update sync item status to success
      setSyncHistory((prev) =>
        prev.map((h) =>
          h.id === historyItemId ? { ...h, status: 'success', timestamp: new Date().toISOString() } : h
        )
      );

      // Restore target repository syncStatus back to healthy if it was in error
      setConnectedRepos((prev) =>
        prev.map((r) => {
          if (r.name === item.repositoryName && r.syncStatus === 'error') {
            return { ...r, syncStatus: 'healthy', lastSyncedAt: new Date().toISOString() };
          }
          return r;
        })
      );
      toast.success('Sync retry simulated successfully!');
    } catch {
      setSyncHistory((prev) =>
        prev.map((h) => (h.id === historyItemId ? { ...h, status: 'failed' } : h))
      );
      toast.error('Retry failed');
    }
  }, [syncHistory]);

  return {
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
  };
}
