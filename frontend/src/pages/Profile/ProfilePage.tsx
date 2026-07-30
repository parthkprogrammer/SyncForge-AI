import { Card } from '../../components/ui/Card';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 text-left max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your personal details, credentials tokens, and UI session layouts.
        </p>
      </div>

      <Card hoverable className="p-8">
        <Card.Header>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-250">User Profile Information</h3>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
            Profile loading. Details like name, email, connected API credentials, and sync alerts tokens will appear here.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
