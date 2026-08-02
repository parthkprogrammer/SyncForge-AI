import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { Button } from '../../../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface DangerZoneProps {
  onDeleteAccountTrigger: () => void;
  onResetSettingsTrigger: () => void;
}

export function DangerZone({ onDeleteAccountTrigger, onResetSettingsTrigger }: DangerZoneProps) {
  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Reset Defaults */}
      <SettingsSection
        title="Settings Reset"
        description="Reset your workspace preferences."
      >
        <SettingsRow
          title="Reset Preferences to Default Values"
          description="Restores all coding strategies, theme modes, and alerts selectors settings back to their factory DEFAULT_SETTINGS states."
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onResetSettingsTrigger}
            className="border-slate-200 dark:border-slate-800 h-9 px-4.5 rounded-xl text-xs font-bold"
          >
            Reset Defaults
          </Button>
        </SettingsRow>
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection
        title="Danger Zone"
        description="Irreversible actions. Take extra precaution before proceeding."
      >
        <div className="border border-rose-200 dark:border-rose-900/30 bg-rose-500/[0.01] rounded-2xl p-4.5">
          <SettingsRow
            title="Permanently Delete Account"
            description="Deletes profile logs history, sync configurations settings, and notes catalogs permanently. Account deletion will be connected to the Spring Security backend later."
          >
            <Button
              variant="primary"
              size="sm"
              onClick={onDeleteAccountTrigger}
              className="bg-rose-600 hover:bg-rose-700 text-white h-9 px-4.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Delete Account</span>
            </Button>
          </SettingsRow>
        </div>
      </SettingsSection>

    </div>
  );
}
