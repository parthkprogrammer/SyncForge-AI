import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { SettingsToggle } from './SettingsToggle';
import { mockCommitMessageTemplates } from '../../repositories/data/repositoriesMockData';

interface SyncPreferencesProps {
  autoSyncDefault: boolean;
  defaultFolderStrategy: 'platform' | 'difficulty' | 'topic' | 'language' | 'flat';
  generateReadmeDefault: boolean;
  includeMetadataDefault: boolean;
  commitMessageTemplate: string;
  onUpdate: (key: string, value: any) => void;
}

export function SyncPreferences({
  autoSyncDefault,
  defaultFolderStrategy,
  generateReadmeDefault,
  includeMetadataDefault,
  commitMessageTemplate,
  onUpdate,
}: SyncPreferencesProps) {
  return (
    <SettingsSection
      title="GitHub Sync Defaults"
      description="Define general options applied automatically when connecting new repositories."
    >
      <div className="space-y-4">
        
        {/* Auto Sync Default */}
        <SettingsRow
          title="Auto Sync by Default"
          description="Turn on immediate automatic repository pushes when solutions are accepted."
        >
          <SettingsToggle
            checked={autoSyncDefault}
            onChange={(val) => onUpdate('autoSyncDefault', val)}
            ariaLabel="Auto Sync by Default"
          />
        </SettingsRow>

        {/* Folder Strategy */}
        <SettingsRow
          title="Default Directory Strategy"
          description="Path folder structure style for organizing synced items."
        >
          <select
            value={defaultFolderStrategy}
            onChange={(e) => onUpdate('defaultFolderStrategy', e.target.value as any)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[120px]"
          >
            <option value="platform">Platform (LeetCode/Two-Sum/...)</option>
            <option value="difficulty">Difficulty (Easy/Two-Sum/...)</option>
            <option value="topic">Topic (Arrays/Two-Sum/...)</option>
            <option value="language">Language (Java/Two-Sum/...)</option>
            <option value="flat">Flat Structure (Two-Sum.java)</option>
          </select>
        </SettingsRow>

        {/* Generate README */}
        <SettingsRow
          title="Generate README Files"
          description="Automatically output a detailed markdown catalog summary file in every folder."
        >
          <SettingsToggle
            checked={generateReadmeDefault}
            onChange={(val) => onUpdate('generateReadmeDefault', val)}
            ariaLabel="Generate README Files"
          />
        </SettingsRow>

        {/* Include Metadata */}
        <SettingsRow
          title="Include Solved Metadata"
          description="Append problem URL stats, memory usages, and date logs inside solution headers."
        >
          <SettingsToggle
            checked={includeMetadataDefault}
            onChange={(val) => onUpdate('includeMetadataDefault', val)}
            ariaLabel="Include Solved Metadata"
          />
        </SettingsRow>

        {/* Commit Message Template */}
        <SettingsRow
          title="Commit Message Format"
          description="Default message format template placeholder."
        >
          <select
            value={commitMessageTemplate}
            onChange={(e) => onUpdate('commitMessageTemplate', e.target.value)}
            className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 min-w-[150px]"
          >
            {mockCommitMessageTemplates.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </SettingsRow>

      </div>
    </SettingsSection>
  );
}
