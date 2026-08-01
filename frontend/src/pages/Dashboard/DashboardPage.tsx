import { useState, useEffect } from 'react';
import { Flame, GitCommit, Bot, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Layout & Components imports
import {
  DashboardHeader,
  StatCard,
  DifficultyBreakdown,
  CodingStreakCard,
  WeeklyActivityChart,
  RecentSubmissions,
  QuickActions,
  AIInsightCard,
  SyncStatus,
  DashboardSkeleton,
  EmptyState,
} from '../../features/dashboard/components';

// Mock Data imports
import {
  mockStats,
  mockDifficulties,
  mockWeeklyActivity,
  mockSubmissions,
  mockAIInsights,
  mockSyncStatus,
} from '../../features/dashboard/data/dashboardMockData';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Simulate initial page load latency to display the skeleton loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleToggleEmptyState = () => {
    setIsEmpty((prev) => !prev);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-4">
        {/* Developer controls to toggle state */}
        <div className="flex justify-end max-w-6xl mx-auto w-full px-4">
          <button
            onClick={handleToggleEmptyState}
            className="text-xs font-bold text-primary-500 hover:underline hover:text-primary-600 focus:outline-none"
          >
            Show Full Dashboard View
          </button>
        </div>
        <EmptyState onCtaClick={handleToggleEmptyState} />
      </div>
    );
  }

  // Load stats with correct Icon components
  const stats = mockStats(Code2, Flame, GitCommit, Bot);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12"
    >
      {/* 1. Header with Simulator triggers */}
      <DashboardHeader
        lastSyncTime={mockSyncStatus.lastSync}
        onRefresh={handleRefresh}
      />
      
      {/* Developer state switcher */}
      <div className="flex justify-end px-1">
        <button
          onClick={handleToggleEmptyState}
          className="text-[10px] font-bold text-slate-400 hover:text-primary-500 uppercase tracking-wider focus:outline-none"
        >
          Toggle Empty State View
        </button>
      </div>

      {/* 2. Stats Cards Grid (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* 3. Middle Section: Chart & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts Activity graph (2 columns wide) */}
        <div className="lg:col-span-2">
          <WeeklyActivityChart data={mockWeeklyActivity} />
        </div>

        {/* Coding Streak panel (1 column wide) */}
        <div>
          <CodingStreakCard
            currentStreak={mockSyncStatus.status === 'Healthy' ? '12 days' : '0 days'}
            longestStreak="24 days"
            solvedToday={3}
            solvedThisWeek={31}
          />
        </div>

      </div>

      {/* 4. Bottom Section: Submissions & Side Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Submissions list (2 columns wide) */}
        <div className="lg:col-span-2">
          <RecentSubmissions submissions={mockSubmissions} />
        </div>

        {/* Action Widgets stack (1 column wide) */}
        <div className="flex flex-col gap-6">
          <DifficultyBreakdown stats={mockDifficulties} />
          
          <SyncStatus statusData={mockSyncStatus} />
          
          <AIInsightCard insights={mockAIInsights} />
          
          <QuickActions />
        </div>

      </div>

    </motion.div>
  );
}
