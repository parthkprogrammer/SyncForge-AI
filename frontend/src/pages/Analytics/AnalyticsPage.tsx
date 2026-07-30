import { Card } from '../../components/ui/Card';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Detailed metrics on database synchronization volume, execution speeds, and pipeline latencies.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">Sync Metrics & Volume</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            No pipeline analytics recorded. Data throughput charts and performance graphs will render here.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
