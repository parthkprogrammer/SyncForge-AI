import { Card } from '../../components/ui/Card';

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Notes
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Store reference logs, credential outlines, schema mappings, or pipeline ideas in visual notepad blocks.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">My Reference Notes</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            No notes recorded. You can add credential checklists, target schema outlines, and mapping reminders in this section.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
