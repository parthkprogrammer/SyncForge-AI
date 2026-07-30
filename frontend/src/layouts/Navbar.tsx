import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Brand Logo & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            aria-label="Open mobile menu"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            {/* Mock Vector Logo */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-accent-300 shadow-md shadow-primary-500/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-slate-800 dark:text-white">
              SyncForge <span className="text-primary-500">AI</span>
            </span>
          </div>
        </div>

        {/* Center: Search Bar Placeholder */}
        <div className="hidden md:flex max-w-sm w-full relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-450 pointer-events-none" />
          <input
            type="text"
            placeholder="Search connections, metrics..."
            aria-label="Search"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-200 dark:focus:bg-slate-900"
          />
        </div>

        {/* Right Side: Global controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Theme Switcher Placeholder */}
          <button
            aria-label="Toggle visual theme"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-150"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </button>

          {/* Notifications Alert */}
          <button
            aria-label="View notifications"
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-150"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/parthkprogrammer/SyncForge-AI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub Repository"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-150"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>

          {/* User Profile Avatar */}
          <div className="h-px w-4 bg-slate-200 dark:bg-slate-800 self-stretch my-2.5"></div>
          <button
            aria-label="User profile settings"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-100 text-primary-700 text-xs font-bold ring-2 ring-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-900/30 dark:text-primary-400"
          >
            PK
          </button>
        </div>
        
      </div>
    </header>
  );
}
