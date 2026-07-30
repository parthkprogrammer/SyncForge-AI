export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-400 dark:text-slate-500">
        
        {/* Left Side: Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span>&copy; {new Date().getFullYear()} SyncForge AI.</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>All rights reserved.</span>
        </div>

        {/* Center: Technology Stack */}
        <div className="font-medium text-slate-450 dark:text-slate-400">
          Built with <span className="text-primary-500 font-semibold">React</span> + <span className="text-emerald-500 font-semibold">Spring Boot</span>
        </div>

        {/* Right Side: Version & Github Link */}
        <div className="flex items-center gap-4">
          <span className="font-semibold tracking-wider text-[10px] uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            v1.0.0
          </span>
          <a
            href="https://github.com/parthkprogrammer/SyncForge-AI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Project Source Code"
            className="flex items-center gap-1.5 hover:text-slate-650 dark:hover:text-slate-350 transition-colors duration-150"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            GitHub
          </a>
        </div>

      </div>
    </footer>
  );
}
