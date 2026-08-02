import type { ReactNode } from 'react';
import { Card } from '../../../components/ui/Card/Card';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm text-left flex flex-col gap-4">
      <Card.Header className="border-none pb-0 mb-2 select-none">
        <h3 className="text-sm font-extrabold text-slate-850 dark:text-white uppercase tracking-wider">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </Card.Header>

      <Card.Content className="space-y-4">
        {children}
      </Card.Content>
    </Card>
  );
}
