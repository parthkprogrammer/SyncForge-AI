import { SettingsSection } from './SettingsSection';
import { SettingsRow } from './SettingsRow';
import { SettingsToggle } from './SettingsToggle';
import { Sun, Moon, Monitor } from 'lucide-react';
import type { ThemeMode, CodeFontSize } from '../types/settings.types';
import { cn } from '../../../utils/cn';

interface AppearanceSettingsProps {
  theme: ThemeMode;
  codeFontSize: CodeFontSize;
  compactMode: boolean;
  reducedMotion: boolean;
  onUpdate: (key: string, value: any) => void;
}

export function AppearanceSettings({
  theme,
  codeFontSize,
  compactMode,
  reducedMotion,
  onUpdate,
}: AppearanceSettingsProps) {
  const themesList = [
    { mode: 'light' as const, label: 'Light Mode', icon: Sun, desc: 'Clean bright screen' },
    { mode: 'dark' as const, label: 'Dark Mode', icon: Moon, desc: 'Sleek dark layout' },
    { mode: 'system' as const, label: 'System Defaults', icon: Monitor, desc: 'Match OS theme' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Visual Theme Selector Cards */}
      <SettingsSection
        title="Visual Theme"
        description="Select the application visual theme parameters (affecting pages, borders, and sidebar colors)."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 select-none">
          {themesList.map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.mode;
            
            return (
              <button
                key={t.mode}
                onClick={() => onUpdate('theme', t.mode)}
                className={cn(
                  'flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all gap-3 bg-white dark:bg-slate-900 shadow-sm text-center',
                  isSelected
                    ? 'border-primary-500 ring-2 ring-primary-500/10 text-primary-500'
                    : 'border-slate-205 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/20 text-slate-450 hover:text-slate-750'
                )}
              >
                <div className={cn(
                  'p-2.5 rounded-xl border shrink-0',
                  isSelected
                    ? 'bg-primary-500/10 border-primary-500/20 text-primary-500'
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-850 dark:border-slate-800 text-slate-400'
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs font-black block leading-none">
                    {t.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {t.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </SettingsSection>

      {/* Font & Motion Controls */}
      <SettingsSection title="Display Preferences">
        <div className="space-y-4">
          
          {/* Font Sizes */}
          <SettingsRow
            title="Code Font Size"
            description="Adjust text height dimensions for complexity models, note editors, and solution codes."
          >
            <select
              value={codeFontSize}
              onChange={(e) => onUpdate('codeFontSize', e.target.value as CodeFontSize)}
              className="bg-slate-50 border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-primary-500 select-none min-w-[120px]"
            >
              <option value="small">Small (12px)</option>
              <option value="medium">Medium (14px)</option>
              <option value="large">Large (16px)</option>
            </select>
          </SettingsRow>

          {/* Compact Mode */}
          <SettingsRow
            title="Compact Layout Mode"
            description="Tighten lists cell padding sizes and margins grids heights to show more metrics."
          >
            <SettingsToggle
              checked={compactMode}
              onChange={(val) => onUpdate('compactMode', val)}
              ariaLabel="Compact Layout Mode"
            />
          </SettingsRow>

          {/* Reduced Motion */}
          <SettingsRow
            title="Reduced Motion Transitions"
            description="Deactivate transition animations overlays on slides/renders to save rendering resources."
          >
            <SettingsToggle
              checked={reducedMotion}
              onChange={(val) => onUpdate('reducedMotion', val)}
              ariaLabel="Reduced Motion Transitions"
            />
          </SettingsRow>

        </div>
      </SettingsSection>

    </div>
  );
}
