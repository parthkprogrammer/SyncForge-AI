import { Card } from '../../components/ui/Card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          An overview of your data synchronization pipelines, AI execution metrics, and integration status.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">Sync Pipeline Activity</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            No synchronization pipelines have been registered yet. Your active data pipelines, logs, and connector widgets will appear in this workspace.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
