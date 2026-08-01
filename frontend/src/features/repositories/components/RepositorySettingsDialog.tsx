import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2, Info } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { RepositoryStructurePreview } from './RepositoryStructurePreview';
import { mockBranchesList, mockCommitMessageTemplates } from '../data/repositoriesMockData';
import type { Repository, RepositorySettings, FolderStrategy } from '../types/repository.types';

interface RepositorySettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  repository: Repository;
  onSave: (id: string, settings: RepositorySettings) => void;
}

export function RepositorySettingsDialog({
  isOpen,
  onClose,
  repository,
  onSave,
}: RepositorySettingsDialogProps) {
  const currentSettings = repository.settings || {
    defaultBranch: 'main',
    autoSync: true,
    folderStrategy: 'platform' as FolderStrategy,
    commitTemplate: 'feat: solve {problem}',
    includeReadme: true,
    includeMetadata: true,
  };

  const [defaultBranch, setDefaultBranch] = useState(currentSettings.defaultBranch);
  const [autoSync, setAutoSync] = useState(currentSettings.autoSync);
  const [folderStrategy, setFolderStrategy] = useState<FolderStrategy>(currentSettings.folderStrategy);
  const [commitTemplate, setCommitTemplate] = useState(currentSettings.commitTemplate);
  const [includeReadme, setIncludeReadme] = useState(currentSettings.includeReadme);
  const [includeMetadata, setIncludeMetadata] = useState(currentSettings.includeMetadata);
  const [customCommit, setCustomCommit] = useState('');

  const handleSave = () => {
    onSave(repository.id, {
      defaultBranch,
      autoSync,
      folderStrategy,
      commitTemplate: commitTemplate === 'custom' ? customCommit : commitTemplate,
      includeReadme,
      includeMetadata,
    });
    onClose();
  };

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
            className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary-500" />
                <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                  Configure Repository: {repository.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-405 hover:text-slate-650 dark:hover:text-slate-200"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-5">
              
              {/* Row 1: Branch and AutoSync */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Branch Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                    Target Synchronization Branch
                  </label>
                  <select
                    value={defaultBranch}
                    onChange={(e) => setDefaultBranch(e.target.value)}
                    className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary-500"
                  >
                    {mockBranchesList.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Auto Sync Toggle */}
                <div className="flex flex-col justify-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                    Automatic Sync settings
                  </span>
                  
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoSync}
                      onChange={(e) => setAutoSync(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary-500"></div>
                    <span className="text-xs text-slate-650 dark:text-slate-350 font-semibold">
                      Enable Automated Solutions Push
                    </span>
                  </label>
                </div>

              </div>

              {/* Row 2: Folder Strategy dropdown & dynamic directory preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Folder strategy select */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                      Directory Strategy
                    </label>
                    <select
                      value={folderStrategy}
                      onChange={(e) => setFolderStrategy(e.target.value as FolderStrategy)}
                      className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary-500"
                    >
                      <option value="platform">Platform Structured (LeetCode/Two-Sum/...)</option>
                      <option value="difficulty">Difficulty Structured (Easy/Two-Sum/...)</option>
                      <option value="topic">Topic Area Structured (Arrays/Two-Sum/...)</option>
                      <option value="language">Language Structured (Java/Two-Sum/...)</option>
                      <option value="flat">Flat Structured (Two-Sum.java)</option>
                    </select>
                  </div>

                  {/* README Checkbox */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeReadme}
                        onChange={(e) => setIncludeReadme(e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-800 text-primary-500 focus:ring-primary-500/20"
                      />
                      <span>Generate README file for each problem</span>
                    </label>
                    
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeMetadata}
                        onChange={(e) => setIncludeMetadata(e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-800 text-primary-500 focus:ring-primary-500/20"
                      />
                      <span>Include problem metadata header comments</span>
                    </label>
                  </div>
                </div>

                {/* Structure preview box */}
                <RepositoryStructurePreview strategy={folderStrategy} repoName={repository.name} />

              </div>

              {/* Row 3: Commit Message Templates */}
              <div className="flex flex-col gap-2.5 border-t border-slate-100 dark:border-slate-850 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                    Commit Message Template
                  </label>
                  
                  <span className="flex items-center gap-1 text-[9px] text-slate-400">
                    <Info className="h-3 w-3" />
                    <span>Supports placeholders: {`{problem}`}, {`{platform}`}, {`{difficulty}`}, {`{language}`}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <select
                    value={mockCommitMessageTemplates.includes(commitTemplate) ? commitTemplate : 'custom'}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCommitTemplate(val);
                      if (val !== 'custom') {
                        setCustomCommit('');
                      }
                    }}
                    className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary-500"
                  >
                    {mockCommitMessageTemplates.map((template) => (
                      <option key={template} value={template}>
                        {template}
                      </option>
                    ))}
                    <option value="custom">-- Custom Message Template --</option>
                  </select>

                  {/* Custom input */}
                  {commitTemplate === 'custom' && (
                    <input
                      type="text"
                      placeholder="e.g. solve: {problem} on {platform}"
                      value={customCommit}
                      onChange={(e) => setCustomCommit(e.target.value)}
                      className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-850 dark:text-white rounded-xl focus:border-primary-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-3 mt-6 border-t border-slate-100 dark:border-slate-850">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-slate-200 dark:border-slate-800 rounded-xl h-9 px-4 text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                className="rounded-xl h-9 px-4 text-xs font-bold"
              >
                Save Settings
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
