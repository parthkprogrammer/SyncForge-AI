import type { ReactNode } from 'react';

interface SettingsRowProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsRow({ title, description, children }: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 dark:border-slate-850 pt-4 first:border-t-0 first:pt-0">
      
      {/* Left Details */}
      <div className="text-left select-none max-w-xl">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          {title}
        </span>
        {description && (
          <p className="text-[11px] text-slate-450 dark:text-slate-405 leading-relaxed mt-0.5 font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Right control element */}
      <div className="shrink-0 flex items-center self-start sm:self-auto">
        {children}
      </div>

    </div>
  );
}
