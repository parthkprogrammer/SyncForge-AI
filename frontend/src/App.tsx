import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// A simple placeholder page component that displays the currently active sidebar navigation item
function PlaceholderPage() {
  const context = useOutletContext<{ activeNavItem: string }>() || { activeNavItem: 'dashboard' };
  const { activeNavItem } = context;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 bg-white dark:bg-slate-900 shadow-sm">
      {/* Mock Vector Illustration */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-950/10 text-primary-500 mb-4 ring-4 ring-primary-500/5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 animate-pulse"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M21 12H3M12 3v18" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold capitalize text-slate-800 dark:text-white tracking-tight">
        {activeNavItem.replace('-', ' ')} View
      </h2>
      <p className="text-xs text-slate-400 mt-2 text-center max-w-sm leading-relaxed">
        This is a temporary placeholder screen. The modular React Router layout and application shell are successfully configured and responsive.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PlaceholderPage />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
