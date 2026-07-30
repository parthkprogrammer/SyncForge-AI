import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Divider } from '../ui/Divider';
import { GitHubLoginButton } from './GitHubLoginButton';
import { ErrorAlert } from './ErrorAlert';

interface AuthCardProps {
  isLoading: boolean;
  error: string | null;
  onLoginClick: () => void;
  onClearError?: () => void;
}

export function AuthCard({ isLoading, error, onLoginClick, onClearError }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
      className="w-full max-w-md"
    >
      <Card className="p-8 text-left shadow-xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900">
        
        {/* Header Branding */}
        <Card.Header className="flex flex-col items-center gap-2.5 border-none pb-2">
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
          <h1 className="text-2xl font-black text-slate-800 dark:text-white mt-2">
            Welcome to SyncForge AI
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed max-w-xs">
            Start automating your GitHub synchronization journey using predictive AI intelligence.
          </p>
        </Card.Header>

        {/* Content Section */}
        <Card.Content className="flex flex-col gap-5 mt-4">
          
          {/* Error Alert Display */}
          {error && <ErrorAlert message={error} onClose={onClearError} />}

          {/* Core Sign-in Trigger */}
          <GitHubLoginButton
            isLoading={isLoading}
            disabled={isLoading}
            onClick={onLoginClick}
          />
          
          <Divider label="security info" />

          {/* Privacy Notice */}
          <div className="text-[11px] text-slate-450 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-150 dark:border-slate-800 leading-relaxed text-center">
            We only request access to public repositories and core user profiles to synchronize code snippets. We never store passwords or read confidential assets.
          </div>

        </Card.Content>

        {/* Footer Meta */}
        <Card.Footer className="flex flex-col gap-4 mt-6 border-none pt-0">
          <div className="flex justify-center gap-4 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-primary-500 transition-colors">Help Center</a>
          </div>
        </Card.Footer>

      </Card>
    </motion.div>
  );
}
