import { Card } from '../../components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Configure synchronization intervals, visual themes, AI Assistant parameters, and database endpoints safety.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">Global Sync Configurations</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            Settings elements loading. Adjust connector timeouts, light/dark mode selection, and workspace alerts tags.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
