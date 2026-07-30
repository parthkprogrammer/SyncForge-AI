import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function LoginPage() {
  return (
    <div className="min-h-[80svh] flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-left shadow-lg border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900">
        <Card.Header className="flex flex-col items-center gap-2 border-none pb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-accent-300 text-white shadow-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-6 w-6"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-2">
            Welcome to SyncForge AI
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
            Enter your credentials below to access your data synchronization workspace.
          </p>
        </Card.Header>

        <Card.Content className="flex flex-col gap-4 mt-4">
          <Input label="Email Address" placeholder="name@example.com" type="email" />
          <Input label="Password" placeholder="••••••••" type="password" />
        </Card.Content>

        <Card.Footer className="flex flex-col gap-3 mt-6 border-none pt-0">
          <Button variant="primary" className="w-full">
            Sign In
          </Button>
          <div className="text-center text-xs text-slate-450 dark:text-slate-500">
            Don't have an account? <span className="text-primary-500 font-semibold cursor-pointer hover:underline">Request Access</span>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
