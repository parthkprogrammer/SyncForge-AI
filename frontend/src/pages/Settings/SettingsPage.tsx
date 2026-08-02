import { useState, useEffect } from 'react';
import { useSettings } from '../../features/settings/hooks/useSettings';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// UI Components
import {
  SettingsHeader,
  SettingsNavigation,
  AppearanceSettings,
  CodingPreferences,
  SyncPreferences,
  AISettings,
  NotificationSettings,
  PrivacySettings,
  DataSettings,
  DangerZone,
  ResetSettingsDialog,
  DeleteAccountDialog,
  SettingsSkeleton,
} from '../../features/settings/components';

import type { SettingsSectionId } from '../../features/settings/components/SettingsNavigation';

export default function SettingsPage() {
  const {
    settings,
    saveStatus,
    updateSetting,
    resetAllSettings,
    clearAllLocalData,
  } = useSettings();

  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('appearance');

  // Dialog overlays triggers
  const [resetOpen, setResetOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  // Loading skeleton transition simulation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = (key: string, value: any) => {
    updateSetting(key as any, value);
  };

  const handleClearCache = () => {
    clearAllLocalData();
    setClearOpen(false);
  };

  const handleDeleteAccount = () => {
    toast.success('Account deletion will be connected to the backend later.');
    setDeleteOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
        <SettingsHeader saveStatus={saveStatus} />
        <SettingsSkeleton />
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'coding':
        return (
          <CodingPreferences
            preferredLanguage={settings.preferredLanguage}
            defaultDifficultyFilter={settings.defaultDifficultyFilter}
            showLineNumbers={settings.showLineNumbers}
            wordWrap={settings.wordWrap}
            onUpdate={handleUpdate}
          />
        );
      case 'sync':
        return (
          <SyncPreferences
            autoSyncDefault={settings.autoSyncDefault}
            defaultFolderStrategy={settings.defaultFolderStrategy}
            generateReadmeDefault={settings.generateReadmeDefault}
            includeMetadataDefault={settings.includeMetadataDefault}
            commitMessageTemplate={settings.commitMessageTemplate}
            onUpdate={handleUpdate}
          />
        );
      case 'ai':
        return (
          <AISettings
            defaultAIMode={settings.defaultAIMode}
            aiResponseStyle={settings.aiResponseStyle}
            aiExplanationLevel={settings.aiExplanationLevel}
            includeCodeExamples={settings.includeCodeExamples}
            includeComplexityAnalysis={settings.includeComplexityAnalysis}
            usePersonalContext={settings.usePersonalContext}
            onUpdate={handleUpdate}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            notifications={settings.notifications}
            onUpdate={handleUpdate}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            privacy={settings.privacy}
            onUpdate={handleUpdate}
          />
        );
      case 'data':
        return (
          <div className="space-y-6">
            <DataSettings
              settings={settings}
              onClearLocalDataTrigger={() => setClearOpen(true)}
            />
            <DangerZone
              onDeleteAccountTrigger={() => setDeleteOpen(true)}
              onResetSettingsTrigger={() => setResetOpen(true)}
            />
          </div>
        );
      case 'appearance':
      default:
        return (
          <AppearanceSettings
            theme={settings.theme}
            codeFontSize={settings.codeFontSize}
            compactMode={settings.compactMode}
            reducedMotion={settings.reducedMotion}
            onUpdate={handleUpdate}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12 text-left"
    >
      
      {/* 1. Page Header with Auto Save feedback badge */}
      <SettingsHeader saveStatus={saveStatus} />

      {/* 2. Settings Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Panel */}
        <div className="lg:col-span-1">
          <SettingsNavigation activeId={activeSection} onChange={setActiveSection} />
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 3. CRUD Modals Overlays */}
      <ResetSettingsDialog
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={resetAllSettings}
      />

      <DeleteAccountDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
      />

      {/* Clear Cache Confirmation Dialog */}
      {clearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setClearOpen(false)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="h-5 w-5 text-rose-500" />
              <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                Clear Local Preferences Cache?
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed mb-6">
              Are you sure? This will delete all mock notes, mock connected repositories logs, profile settings, and customized presets saved in this browser.
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-850">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClearOpen(false)}
                className="border-slate-200 dark:border-slate-800 h-8.5 px-4 rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleClearCache}
                className="bg-rose-600 hover:bg-rose-700 text-white h-8.5 px-4 rounded-xl text-xs font-bold"
              >
                Clear Data
              </Button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}
