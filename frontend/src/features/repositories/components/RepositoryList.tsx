import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { RepositoryCard } from './RepositoryCard';
import { EmptyState } from '../../dashboard/components/EmptyState';
import type { Repository } from '../types/repository.types';

interface RepositoryListProps {
  connectedRepos: Repository[];
  onSetDefault: (id: string) => void;
  onConfigure: (repo: Repository) => void;
  onDisconnect: (repo: Repository) => void;
  onSyncNow: (id: string) => void;
}

export function RepositoryList({
  connectedRepos,
  onSetDefault,
  onConfigure,
  onDisconnect,
  onSyncNow,
}: RepositoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'public' | 'private'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'healthy' | 'warning' | 'error'>('all');
  const [autoSyncFilter, setAutoSyncFilter] = useState<'all' | 'enabled' | 'disabled'>('all');

  // Derived search and filters matching repo attributes
  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    
    return connectedRepos.filter((repo) => {
      // Search match
      if (query) {
        const matchesName = repo.name.toLowerCase().includes(query);
        const matchesOwner = repo.owner.toLowerCase().includes(query);
        const matchesDesc = repo.description?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesOwner && !matchesDesc) {
          return false;
        }
      }

      // Visibility filter
      if (visibilityFilter !== 'all' && repo.visibility !== visibilityFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && repo.syncStatus !== statusFilter) {
        return false;
      }

      // AutoSync filter
      if (autoSyncFilter !== 'all') {
        const isAuto = repo.autoSync;
        if (autoSyncFilter === 'enabled' && !isAuto) return false;
        if (autoSyncFilter === 'disabled' && isAuto) return false;
      }

      return true;
    });
  }, [connectedRepos, searchTerm, visibilityFilter, statusFilter, autoSyncFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setVisibilityFilter('all');
    setStatusFilter('all');
    setAutoSyncFilter('all');
  };

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Search & Filters Controls Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search connected repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl bg-slate-50 border border-slate-250 dark:border-slate-850 dark:bg-slate-950 px-4 py-2 pl-10 text-xs text-slate-850 dark:text-white placeholder-slate-400 focus:border-primary-500 focus:outline-none"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-650"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filters dropdowns row */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Visibility */}
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-650 dark:text-slate-350 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public Only</option>
            <option value="private">Private Only</option>
          </select>

          {/* Sync Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-650 dark:text-slate-350 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="healthy">Healthy Only</option>
            <option value="warning">Warning Only</option>
            <option value="error">Error Only</option>
          </select>

          {/* Auto Sync Toggle */}
          <select
            value={autoSyncFilter}
            onChange={(e) => setAutoSyncFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-650 dark:text-slate-350 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary-500"
          >
            <option value="all">All Auto Sync</option>
            <option value="enabled">Auto Sync Enabled</option>
            <option value="disabled">Auto Sync Disabled</option>
          </select>

          {(searchTerm || visibilityFilter !== 'all' || statusFilter !== 'all' || autoSyncFilter !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-slate-450 hover:text-primary-500 font-bold"
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* Grid List representation */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No repositories match the query"
          description="Try relaxing your search terms or filter drop downs."
          ctaText="Clear Filters"
          onCtaClick={handleClearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((repo) => (
            <RepositoryCard
              key={repo.id}
              repo={repo}
              onSetDefault={() => onSetDefault(repo.id)}
              onConfigure={() => onConfigure(repo)}
              onDisconnect={() => onDisconnect(repo)}
              onSyncNow={() => onSyncNow(repo.id)}
            />
          ))}
        </div>
      )}

    </div>
  );
}
