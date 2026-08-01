export type RepositoryVisibility = 'public' | 'private';
export type RepositorySyncStatus = 'healthy' | 'syncing' | 'warning' | 'error';
export type FolderStrategy = 'platform' | 'difficulty' | 'topic' | 'language' | 'flat';
export type SyncHistoryStatus = 'success' | 'failed' | 'pending';

export interface RepositorySettings {
  defaultBranch: string;
  autoSync: boolean;
  folderStrategy: FolderStrategy;
  commitTemplate: string;
  includeReadme: boolean;
  includeMetadata: boolean;
}

export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string | null;
  url: string;
  visibility: RepositoryVisibility;
  defaultBranch: string;
  language: string | null;
  isDefault: boolean;
  autoSync: boolean;
  connectedAt: string | null;
  lastSyncedAt: string | null;
  syncStatus: RepositorySyncStatus;
  totalSyncedSolutions: number;
  settings?: RepositorySettings;
}

export interface SyncHistoryItem {
  id: string;
  problemTitle: string;
  repositoryName: string;
  branchName: string;
  commitHash: string;
  status: SyncHistoryStatus;
  errorMessage?: string;
  timestamp: string; // ISO date string or relative string
}

export interface CreateRepositoryFormData {
  name: string;
  description: string;
  visibility: RepositoryVisibility;
  initializeReadme: boolean;
}
