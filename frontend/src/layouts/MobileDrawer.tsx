import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  Code2,
  BarChart3,
  Bot,
  FileText,
  GitBranch,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { ROUTE_PATHS } from '../routes/routePaths';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  isDanger?: boolean;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const menuItems: NavItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: ROUTE_PATHS.DASHBOARD },
    { id: 'problems', name: 'Problems', icon: Code2, path: ROUTE_PATHS.PROBLEMS },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, path: ROUTE_PATHS.ANALYTICS },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Bot, path: ROUTE_PATHS.AI_ASSISTANT },
    { id: 'notes', name: 'Notes', icon: FileText, path: ROUTE_PATHS.NOTES },
    { id: 'repositories', name: 'Repositories', icon: GitBranch, path: ROUTE_PATHS.REPOSITORIES },
    { id: 'profile', name: 'Profile', icon: User, path: ROUTE_PATHS.PROFILE },
    { id: 'settings', name: 'Settings', icon: Settings, path: ROUTE_PATHS.SETTINGS },
    { id: 'logout', name: 'Logout', icon: LogOut, path: ROUTE_PATHS.LOGIN, isDanger: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          
          {/* 1. Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* 2. Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white px-6 py-5 shadow-2xl dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800"
          >
            {/* Header with Brand Logo & Close Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-300 shadow-md">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4.5 w-4.5 text-white"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-white">
                  SyncForge <span className="text-primary-500">AI</span>
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close mobile menu"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Nav Menu */}
            <nav className="mt-8 overflow-y-auto pr-1">
              <ul className="flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.id}>
                      <NavLink
                        to={item.path}
                        end={item.path === ROUTE_PATHS.DASHBOARD}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            'flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
                            isActive
                              ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400 font-bold'
                              : cn(
                                  'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-200',
                                  item.isDanger && 'hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-950/10 dark:hover:text-error-400'
                                )
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary-500' : 'text-slate-450')} />
                            <span>{item.name}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
}
