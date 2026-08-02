import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { SettingsToggle } from './SettingsToggle';
import type { NotificationPreferences } from '../types/settings.types';

interface NotificationSettingsProps {
  notifications: NotificationPreferences;
  onUpdate: (key: string, value: any) => void;
}

export function NotificationSettings({ notifications, onUpdate }: NotificationSettingsProps) {
  const updatePref = (key: keyof NotificationPreferences, value: boolean) => {
    const updated = {
      ...notifications,
      [key]: value,
    };
    onUpdate('notifications', updated);
  };

  return (
    <SettingsSection
      title="Notification Preferences"
      description="Select which actions trigger alerts (preferences controls only; does not initialize browser push services)."
    >
      <div className="space-y-4">
        
        {/* Sync Success */}
        <SettingsRow
          title="GitHub Sync Success Alerts"
          description="Send indicators when solutions push commits successfully complete."
        >
          <SettingsToggle
            checked={notifications.syncSuccess}
            onChange={(val) => updatePref('syncSuccess', val)}
            ariaLabel="GitHub Sync Success Alerts"
          />
        </SettingsRow>

        {/* Sync Failure */}
        <SettingsRow
          title="GitHub Sync Failure Alerts"
          description="Send indicators when solutions push commits fail or encounter authorization limits."
        >
          <SettingsToggle
            checked={notifications.syncFailure}
            onChange={(val) => updatePref('syncFailure', val)}
            ariaLabel="GitHub Sync Failure Alerts"
          />
        </SettingsRow>

        {/* AI Response Ready */}
        <SettingsRow
          title="AI Answers Completed Notifications"
          description="Alert when long optimized code reviews prompts finish processing."
        >
          <SettingsToggle
            checked={notifications.aiResponseReady}
            onChange={(val) => updatePref('aiResponseReady', val)}
            ariaLabel="AI Answers Completed Notifications"
          />
        </SettingsRow>

        {/* Revision Reminder */}
        <SettingsRow
          title="Revision Reminders Notes Notifications"
          description="Weekly reminders for notes items marked as 'learning' or 'review'."
        >
          <SettingsToggle
            checked={notifications.revisionReminder}
            onChange={(val) => updatePref('revisionReminder', val)}
            ariaLabel="Revision Reminders Notes Notifications"
          />
        </SettingsRow>

        {/* Achievement Unlocked */}
        <SettingsRow
          title="Achievements Unlock Badges Alerts"
          description="Celebrate and display prompts when unlocking profile trophies."
        >
          <SettingsToggle
            checked={notifications.achievementUnlocked}
            onChange={(val) => updatePref('achievementUnlocked', val)}
            ariaLabel="Achievements Unlock Badges Alerts"
          />
        </SettingsRow>

        {/* Weekly Progress Summary */}
        <SettingsRow
          title="Weekly Summary Analytics Reports"
          description="Send recap emails logs detailing platform activities streak sizes."
        >
          <SettingsToggle
            checked={notifications.weeklyProgress}
            onChange={(val) => updatePref('weeklyProgress', val)}
            ariaLabel="Weekly Summary Analytics Reports"
          />
        </SettingsRow>

        {/* Product Updates */}
        <SettingsRow
          title="Product Updates & Features Releases"
          description="Get notifications of new integration hooks or theme options releases."
        >
          <SettingsToggle
            checked={notifications.productUpdates}
            onChange={(val) => updatePref('productUpdates', val)}
            ariaLabel="Product Updates & Features Releases"
          />
        </SettingsRow>

      </div>
    </SettingsSection>
  );
}
