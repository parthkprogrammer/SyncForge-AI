import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FeatureList } from '../components/auth/FeatureList';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      
      {/* 1. Left Marketing Section (Visible on desktop only) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-slate-950 p-12 lg:flex xl:p-16 border-r border-slate-900 overflow-hidden">
        
        {/* Subtle background ambient gradients */}
        <div className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-primary-900/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full bg-accent-500/5 blur-3xl" />
        
        {/* Top Header Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-300 shadow-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-5.5 w-5.5 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            SyncForge <span className="text-primary-500">AI</span>
          </span>
        </div>

        {/* Center Features Showcase */}
        <div className="relative my-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
              Automatically sync your coding journey with GitHub using AI.
            </h2>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              SyncForge bridges code snapshots, developer logs, and database structures directly to Github repositories using semantic code intelligence.
            </p>
          </motion.div>

          <div className="mt-12">
            <FeatureList />
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="relative text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SyncForge AI. FAANG-grade developer automation tools.
        </div>

      </div>

      {/* 2. Right Form Section (Visible on all viewports) */}
      <div className="flex w-full flex-col justify-center items-center p-6 lg:w-1/2 bg-slate-50 dark:bg-slate-950">
        
        {/* Mobile Header Logo (Visible on mobile/tablet only) */}
        <div className="flex items-center gap-2.5 mb-8 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-300 shadow-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-5.5 w-5.5 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-slate-800 dark:text-white">
            SyncForge <span className="text-primary-500">AI</span>
          </span>
        </div>

        {children}
        
      </div>

    </div>
  );
}
