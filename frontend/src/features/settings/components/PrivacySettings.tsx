import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { SettingsToggle } from './SettingsToggle';
import type { PrivacyPreferences, ProfileVisibility } from '../types/settings.types';

interface PrivacySettingsProps {
  privacy: PrivacyPreferences;
  onUpdate: (key: string, value: any) => void;
}

export function PrivacySettings({ privacy, onUpdate }: PrivacySettingsProps) {
  const updatePref = (key: keyof PrivacyPreferences, value: any) => {
    const updated = {
      ...privacy,
      [key]: value,
    };
    onUpdate('privacy', updated);
  };

  return (
    <SettingsSection
      title="Privacy Settings"
      description="Manage visibility defaults. Real authorization and field masking rules must be enforced by backend Spring APIs."
    >
      <div className="space-y-4">
        
        {/* Profile Visibility */}
        <SettingsRow
          title="Profile Visibility Setting"
          description="Configure if your portfolio page is visible to other accounts."
        >
          <select
            value={privacy.profileVisibility}
            onChange={(e) => updatePref('profileVisibility', e.target.value as ProfileVisibility)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            <option value="public">Public Shareable</option>
            <option value="private">Private Owner Only</option>
          </select>
        </SettingsRow>

        {/* Show Stats */}
        <SettingsRow
          title="Show Coding Statistics"
          description="Display total solved counts and streaks aggregates numbers on public profile previews."
        >
          <SettingsToggle
            checked={privacy.showStats}
            onChange={(val) => updatePref('showStats', val)}
            ariaLabel="Show Coding Statistics"
          />
        </SettingsRow>

        {/* Show Achievements */}
        <SettingsRow
          title="Show Unlocked Achievements Badges"
          description="Display unlocked badges lists on public profile previews."
        >
          <SettingsToggle
            checked={privacy.showAchievements}
            onChange={(val) => updatePref('showAchievements', val)}
            ariaLabel="Show Unlocked Achievements Badges"
          />
        </SettingsRow>

        {/* Show Languages */}
        <SettingsRow
          title="Show Programming Languages distribution"
          description="Display preferred code languages metrics on public profile previews."
        >
          <SettingsToggle
            checked={privacy.showLanguages}
            onChange={(val) => updatePref('showLanguages', val)}
            ariaLabel="Show Programming Languages distribution"
          />
        </SettingsRow>

        {/* Show Activity */}
        <SettingsRow
          title="Show Recent activity timeline logs"
          description="Display recent submissions log histories on public profile previews."
        >
          <SettingsToggle
            checked={privacy.showActivity}
            onChange={(val) => updatePref('showActivity', val)}
            ariaLabel="Show Recent activity timeline logs"
          />
        </SettingsRow>

        {/* Allow Personalized AI */}
        <SettingsRow
          title="Personalized AI Prompt Contexts"
          description="Enables learning insights parsing to customize complexity optimization suggestions."
        >
          <SettingsToggle
            checked={privacy.allowPersonalizedAI}
            onChange={(val) => updatePref('allowPersonalizedAI', val)}
            ariaLabel="Personalized AI Prompt Contexts"
          />
        </SettingsRow>

      </div>
    </SettingsSection>
  );
}
