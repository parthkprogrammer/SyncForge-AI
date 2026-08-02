import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { Button } from '../../../components/ui/Button';
import { Download, Trash2 } from 'lucide-react';
import type { UserSettings } from '../types/settings.types';

interface DataSettingsProps {
  settings: UserSettings;
  onClearLocalDataTrigger: () => void;
}

export function DataSettings({ settings, onClearLocalDataTrigger }: DataSettingsProps) {
  
  const handleExportData = () => {
    // Generate clean mock JSON schema payload to back up preferences safely
    const mockBackupData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      profile: {
        username: 'alexdev',
        displayName: 'Alex Developer',
        primaryLanguage: settings.preferredLanguage,
        visibility: settings.privacy.profileVisibility,
      },
      settings,
      statistics: {
        totalProblemsSolved: 242,
        totalSyncs: 242,
        aiExplanationsGenerated: 85,
      },
    };

    const blob = new Blob([JSON.stringify(mockBackupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `syncforge-settings-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* 1. Export Data section */}
      <SettingsSection
        title="Backup & Export Preferences"
        description="Save your preferences configurations to a JSON file. Excludes secrets, OAuth bindings, or private keys."
      >
        <SettingsRow
          title="Export Workspace Configuration Settings"
          description="Download all default difficulty settings, AI response style configurations, and layout states."
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            className="border-slate-200 dark:border-slate-800 h-9 px-4.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span>Export Backup</span>
          </Button>
        </SettingsRow>
      </SettingsSection>

      {/* 2. Reset Data section */}
      <SettingsSection
        title="Cache Management"
        description="Manage browser cached preference states."
      >
        <SettingsRow
          title="Clear Local Preferences Cache"
          description="Wipes local state variables caches (localStorage) and returns fields toDEFAULT_SETTINGS values. Does not affect backend PostgreSQL tables."
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onClearLocalDataTrigger}
            className="text-error-500 hover:bg-error-50 dark:hover:bg-error-950/10 border-slate-200 dark:border-slate-800 h-9 px-4.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Local Cache</span>
          </Button>
        </SettingsRow>
      </SettingsSection>

    </div>
  );
}
