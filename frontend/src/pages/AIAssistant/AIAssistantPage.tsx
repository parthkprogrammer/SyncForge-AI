import { Card } from '../../components/ui/Card';

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          AI Assistant
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Interact with SyncForge's LLM to generate connectors, write transformations, or ask database schemas queries.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">AI Orchestration Panel</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            AI chat prompt initialization is in progress. The interactive conversational model will enable writing schema transformations on-the-fly.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
