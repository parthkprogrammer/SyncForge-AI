import { ShieldCheck, Key, LogOut } from 'lucide-react';
import { Card } from '../../../components/ui/Card/Card';
import { Button } from '../../../components/ui/Button';
import type { GitHubProfile } from '../data/repositoriesMockData';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

interface GitHubConnectionCardProps {
  profile: GitHubProfile;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function GitHubConnectionCard({
  profile,
  onConnect,
  onDisconnect,
}: GitHubConnectionCardProps) {
  const formattedDate = new Date(profile.connectedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between select-none">
        
        {/* Left Side: Avatar & Details */}
        <div className="flex items-center gap-4">
          
          {/* Avatar wrapper */}
          {profile.isConnected ? (
            <img
              src={profile.avatarUrl}
              alt={`${profile.username} avatar`}
              className="h-12 w-12 rounded-2xl border border-slate-200 dark:border-slate-800 object-cover shadow-sm bg-slate-100"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <GithubIcon className="h-6 w-6" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-850 dark:text-white leading-none">
                {profile.isConnected ? profile.username : 'GitHub Account'}
              </h3>
              
              <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                profile.isConnected
                  ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30'
                  : 'text-slate-400 bg-slate-50 border-slate-200 dark:bg-slate-950/20 dark:border-slate-800'
              }`}>
                {profile.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1.5 leading-none">
              {profile.isConnected ? `Linked in ${formattedDate}` : 'Connect your repository to sync solutions'}
            </p>
          </div>

        </div>

        {/* Right Side: Quick Action buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {profile.isConnected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://github.com/${profile.username}`, '_blank')}
                className="border-slate-200 dark:border-slate-800 h-8 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase"
              >
                View Profile
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onDisconnect}
                className="text-error-500 hover:bg-error-50 dark:hover:bg-error-950/10 border-slate-200 dark:border-slate-800 h-8 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Disconnect</span>
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onConnect}
              className="h-8 px-4.5 rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>Connect GitHub</span>
            </Button>
          )}
        </div>

      </div>

      {/* Connection Permission summary footer */}
      {profile.isConnected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-850 text-[10px] text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Authorized Scope: {profile.permissions[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-primary-500 shrink-0" />
            <span>OAuth Tokens: Secured by Spring Boot REST API credentials</span>
          </div>
        </div>
      )}

    </Card>
  );
}
