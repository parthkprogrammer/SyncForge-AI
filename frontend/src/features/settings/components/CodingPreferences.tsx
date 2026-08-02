import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { SettingsToggle } from './SettingsToggle';
import type { DefaultDifficulty } from '../types/settings.types';

interface CodingPreferencesProps {
  preferredLanguage: string;
  defaultDifficultyFilter: DefaultDifficulty;
  showLineNumbers: boolean;
  wordWrap: boolean;
  onUpdate: (key: string, value: any) => void;
}

export function CodingPreferences({
  preferredLanguage,
  defaultDifficultyFilter,
  showLineNumbers,
  wordWrap,
  onUpdate,
}: CodingPreferencesProps) {
  const languages = ['TypeScript', 'JavaScript', 'Java', 'Python', 'C++'];

  return (
    <SettingsSection
      title="Coding Preferences"
      description="Manage preferred language bindings and solutions explorer layout defaults."
    >
      <div className="space-y-4">
        
        {/* Preferred Language */}
        <SettingsRow
          title="Preferred Coding Language"
          description="Default selected language syntax template for solving new exercises."
        >
          <select
            value={preferredLanguage}
            onChange={(e) => onUpdate('preferredLanguage', e.target.value)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </SettingsRow>

        {/* Default Difficulty Filter */}
        <SettingsRow
          title="Default Difficulty Category"
          description="Filter solutions listing displays to show this choice initially."
        >
          <select
            value={defaultDifficultyFilter}
            onChange={(e) => onUpdate('defaultDifficultyFilter', e.target.value as DefaultDifficulty)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy Only</option>
            <option value="medium">Medium Only</option>
            <option value="hard">Hard Only</option>
          </select>
        </SettingsRow>

        {/* Show Line Numbers */}
        <SettingsRow
          title="Display Line Numbers"
          description="Render line markers indicators inside text block displays and complexity templates."
        >
          <SettingsToggle
            checked={showLineNumbers}
            onChange={(val) => onUpdate('showLineNumbers', val)}
            ariaLabel="Display Line Numbers"
          />
        </SettingsRow>

        {/* Word Wrap */}
        <SettingsRow
          title="Enable Word Wrap"
          description="Fold long coding lines to fit the container size, preventing side scrolls."
        >
          <SettingsToggle
            checked={wordWrap}
            onChange={(val) => onUpdate('wordWrap', val)}
            ariaLabel="Enable Word Wrap"
          />
        </SettingsRow>

      </div>
    </SettingsSection>
  );
}
