import { Card } from '../../components/ui/Card';

export default function ProblemsPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Problems
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Explore and resolve coding challenges or synchronization logic schemas.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">Coding Challenges</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            The collection of logic challenges and connector mappings is loading. In this section, you'll solve configuration mappings to align database structures.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
