import { Eye, Shield, Sliders, Bell, LayoutTemplate, Database, Monitor } from 'lucide-react';
import { cn } from '../../../utils/cn';

export type SettingsSectionId = 'appearance' | 'coding' | 'sync' | 'ai' | 'notifications' | 'privacy' | 'data';

interface SettingsNavigationProps {
  activeId: SettingsSectionId;
  onChange: (id: SettingsSectionId) => void;
}

export function SettingsNavigation({ activeId, onChange }: SettingsNavigationProps) {
  const items = [
    { id: 'appearance' as const, label: 'Appearance', icon: Monitor },
    { id: 'coding' as const, label: 'Coding Preferences', icon: Sliders },
    { id: 'sync' as const, label: 'GitHub Sync Defaults', icon: LayoutTemplate },
    { id: 'ai' as const, label: 'AI Preferences', icon: Shield },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy', icon: Eye },
    { id: 'data' as const, label: 'Data & Account', icon: Database },
  ];

  return (
    <nav className="flex flex-row overflow-x-auto pb-2 lg:pb-0 lg:flex-col gap-1 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pr-0 lg:pr-4 shrink-0 scrollbar-none select-none">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap text-left w-fit lg:w-full border border-transparent',
              isActive
                ? 'bg-primary-500/10 text-primary-500 border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-400'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-950/20 dark:hover:text-slate-200'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
