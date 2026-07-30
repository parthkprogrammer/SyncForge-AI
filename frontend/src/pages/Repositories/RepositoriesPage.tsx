import { Card } from '../../components/ui/Card';

export default function RepositoriesPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Repositories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your synchronization connectors configuration catalogs.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">Connector Repositories</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            No synchronization catalogs linked. Connect to Github or register files to synchronize structural schemas automatically.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
