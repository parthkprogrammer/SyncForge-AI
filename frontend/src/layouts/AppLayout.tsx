import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileDrawer } from './MobileDrawer';
import { Footer } from './Footer';

export function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      
      {/* 1. Header Navigation Bar */}
      <Navbar onMenuClick={() => setIsMobileDrawerOpen(true)} />

      {/* 2. Main Page Grid */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Desktop Sidebar Panel */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeItem={activeNavItem}
          onItemClick={setActiveNavItem}
        />

        {/* Mobile Slide-out Navigation Drawer */}
        <MobileDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          activeItem={activeNavItem}
          onItemClick={setActiveNavItem}
        />

        {/* 3. Main Working Layout Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          
          {/* Scrollable Content Body */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950">
            {/* React Router Dynamic Outlets */}
            <Outlet context={{ activeNavItem }} />
          </main>

          {/* Footer Metadata */}
          <Footer />

        </div>

      </div>

    </div>
  );
}
