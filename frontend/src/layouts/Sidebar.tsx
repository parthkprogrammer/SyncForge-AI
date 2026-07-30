import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Code2,
  BarChart3,
  Bot,
  FileText,
  GitBranch,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  isDanger?: boolean;
}

export function Sidebar({ isCollapsed, onCollapseToggle, activeItem, onItemClick }: SidebarProps) {
  const menuItems: NavItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'problems', name: 'Problems', icon: Code2 },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Bot },
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'repositories', name: 'Repositories', icon: GitBranch },
  ];

  const bottomItems: NavItem[] = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'logout', name: 'Logout', icon: LogOut, isDanger: true },
  ];

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = activeItem === item.id;

      return (
        <li key={item.id}>
          <button
            onClick={() => onItemClick(item.id)}
            className={cn(
              'group relative flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
              isActive
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400'
                : cn(
                    'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-200',
                    item.isDanger && 'hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-950/10 dark:hover:text-error-400'
                  )
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary-500' : 'text-slate-450 group-hover:text-slate-600 dark:group-hover:text-slate-350')} />
            
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                {item.name}
              </motion.span>
            )}

            {/* Hover Tooltip when collapsed */}
            {isCollapsed && (
              <span className="absolute left-16 z-50 scale-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-all duration-150 origin-left group-hover:scale-100 dark:bg-slate-800">
                {item.name}
              </span>
            )}
          </button>
        </li>
      );
    });
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? '76px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative hidden lg:flex h-[calc(100vh-64px)] flex-col justify-between border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shrink-0"
    >
      {/* Top Navigation Items */}
      <div className="overflow-y-auto px-3.5 py-4">
        <ul className="flex flex-col gap-1.5">
          {renderNavItems(menuItems)}
        </ul>
      </div>

      {/* Bottom Profile/Settings/Logout */}
      <div className="border-t border-slate-100 px-3.5 py-4 dark:border-slate-800">
        <ul className="flex flex-col gap-1.5">
          {renderNavItems(bottomItems)}
        </ul>
      </div>

      {/* Sidebar Collapse Toggle Button */}
      <button
        onClick={onCollapseToggle}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3.5 top-5 z-40 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:flex"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </motion.aside>
  );
}
