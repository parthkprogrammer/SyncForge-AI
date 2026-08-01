import { useState, useEffect, useMemo } from 'react';
import { Trophy, Flame, Star, Award, Brain, Clock, Calendar, CheckSquare, Target } from 'lucide-react';
import { motion } from 'framer-motion';

// Sub-components
import {
  AnalyticsHeader,
  AnalyticsSummaryCard,
  DifficultyDistributionChart,
  ActivityTrendChart,
  TopicMasteryChart,
  LanguageUsageChart,
  PlatformDistributionChart,
  CodingStreakHeatmap,
  PerformanceInsights,
  DifficultyProgress,
  RecentMilestones,
  AnalyticsSkeleton,
} from '../../features/analytics/components';
import { EmptyState } from '../../features/dashboard/components';

// Types & Mock Data & Utils
import type { DateRange, DifficultyData, PerformanceInsight, LanguageUsage, PlatformUsage } from '../../features/analytics/types/analytics.types';
import {
  generateDailyActivity,
  mockTopicMastery,
  mockMilestones,
} from '../../features/analytics/data/analyticsMockData';
import {
  filterAnalyticsByDateRange,
  calculateSummaryStats,
} from '../../features/analytics/utils/analyticsUtils';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // 1. Generate full activity data on mount (cached via useMemo)
  const rawActivity = useMemo(() => generateDailyActivity(), []);

  // 2. Filter raw activity chronologically based on selected range
  const filteredActivity = useMemo(() => {
    return filterAnalyticsByDateRange(rawActivity, dateRange);
  }, [rawActivity, dateRange]);

  // 3. Compute dynamic derived summary statistics
  const summary = useMemo(() => {
    return calculateSummaryStats(filteredActivity);
  }, [filteredActivity]);

  // 4. Compute Difficulty Distribution dynamically based on total solved counts
  const difficulties = useMemo<DifficultyData[]>(() => {
    const totalSolved = summary.problemsSolved;
    const easyVal = Math.round(totalSolved * 0.45);
    const mediumVal = Math.round(totalSolved * 0.41);
    const hardVal = Math.max(0, totalSolved - easyVal - mediumVal);
    return [
      { difficulty: 'Easy', value: easyVal },
      { difficulty: 'Medium', value: mediumVal },
      { difficulty: 'Hard', value: hardVal },
    ];
  }, [summary.problemsSolved]);

  // 5. Compute Language usage counts dynamically
  const languages = useMemo<LanguageUsage[]>(() => {
    const totalSolved = summary.problemsSolved;
    const javaVal = Math.round(totalSolved * 0.48);
    const pythonVal = Math.round(totalSolved * 0.26);
    const cppVal = Math.round(totalSolved * 0.14);
    const tsVal = Math.round(totalSolved * 0.08);
    const goVal = Math.max(0, totalSolved - javaVal - pythonVal - cppVal - tsVal);
    return [
      { language: 'Java', solved: javaVal },
      { language: 'Python', solved: pythonVal },
      { language: 'C++', solved: cppVal },
      { language: 'TypeScript', solved: tsVal },
      { language: 'Go', solved: goVal },
    ];
  }, [summary.problemsSolved]);

  // 6. Compute Platform distribution solved counts dynamically
  const platforms = useMemo<PlatformUsage[]>(() => {
    const totalSolved = summary.problemsSolved;
    const lcVal = Math.round(totalSolved * 0.65);
    const hrVal = Math.round(totalSolved * 0.18);
    const cfVal = Math.round(totalSolved * 0.10);
    const gfgVal = Math.round(totalSolved * 0.05);
    const ccVal = Math.max(0, totalSolved - lcVal - hrVal - cfVal - gfgVal);
    return [
      { platform: 'LeetCode', solved: lcVal },
      { platform: 'HackerRank', solved: hrVal },
      { platform: 'Codeforces', solved: cfVal },
      { platform: 'GeeksforGeeks', solved: gfgVal },
      { platform: 'CodeChef', solved: ccVal },
    ];
  }, [summary.problemsSolved]);

  // 7. Find Day of Week with highest solved intensity dynamically
  const productiveDay = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const sums = [0, 0, 0, 0, 0, 0, 0];
    
    filteredActivity.forEach((act) => {
      const idx = new Date(act.date).getDay();
      sums[idx] += act.problemsSolved;
    });

    let maxIdx = 0;
    for (let i = 1; i < 7; i++) {
      if (sums[i] > sums[maxIdx]) maxIdx = i;
    }
    return days[maxIdx];
  }, [filteredActivity]);

  // 8. Performance Insights list
  const insights = useMemo<PerformanceInsight[]>(() => {
    return [
      {
        id: 'productive-day',
        label: 'Most Productive Day',
        value: productiveDay,
        description: 'Day of the week with your highest historical coding solves counts.',
      },
      {
        id: 'strongest-topic',
        label: 'Strongest Topic',
        value: 'Arrays & Hash Tables',
        description: 'Based on short runtimes and high compilation approval rates.',
      },
      {
        id: 'needs-practice',
        label: 'Needs Practice',
        value: 'Dynamic Programming',
        description: 'DP algorithms currently account for 12% of compilation failures.',
      },
      {
        id: 'preferred-lang',
        label: 'Preferred Language',
        value: 'Java',
        description: 'Used in 48% of total compilation environments.',
      },
      {
        id: 'weekly-avg',
        label: 'Average Solved / Day',
        value: summary.averagePerDay,
        description: 'Activity density index for the selected timeframe.',
      },
    ];
  }, [productiveDay, summary.averagePerDay]);

  const milestones = useMemo(() => mockMilestones(Trophy, Flame, Star, Award, Brain), []);

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  // Empty state handling
  if (summary.problemsSolved === 0) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
        <AnalyticsHeader selectedRange={dateRange} onRangeChange={setDateRange} />
        <EmptyState
          title="No analytics available yet"
          description="Start syncing coding solutions from LeetCode or HackerRank to unlock your progress insights."
          ctaText="Learn How Sync Works"
          onCtaClick={() => alert('Redirecting to sync tutorial...')}
        />
      </div>
    );
  }

  const summaryCardsData = [
    { label: 'Solved Problems', value: summary.problemsSolved, icon: CheckSquare, desc: 'Coding problems solved.' },
    { label: 'Current Streak', value: `${summary.currentStreak} days`, icon: Flame, desc: 'Active consecutive coding days.' },
    { label: 'Longest Streak', value: `${summary.longestStreak} days`, icon: Trophy, desc: 'Personal streak record.' },
    { label: 'Active Days', value: `${summary.activeDays} days`, icon: Calendar, desc: 'Days containing synced activity.' },
    { label: 'Average / Day', value: summary.averagePerDay, icon: Clock, desc: 'Solves rate per calendar day.' },
    { label: 'Preferred Topic', value: summary.mostPracticedTopic, icon: Target, desc: 'Most practiced algorithm topic.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12"
    >
      {/* 1. Header with Range Button Selects */}
      <AnalyticsHeader selectedRange={dateRange} onRangeChange={setDateRange} />

      {/* 2. Summary stats cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCardsData.map((card) => (
          <AnalyticsSummaryCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            description={card.desc}
          />
        ))}
      </div>

      {/* 3. Middle Section: Activity Trend & Difficulty Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Area Chart (2 columns wide) */}
        <div className="lg:col-span-2">
          <ActivityTrendChart data={filteredActivity} />
        </div>

        {/* Difficulty Pie Chart (1 column wide) */}
        <div>
          <DifficultyDistributionChart data={difficulties} />
        </div>

      </div>

      {/* 4. Streak Heatmap row */}
      <div className="w-full">
        <CodingStreakHeatmap activityData={rawActivity} />
      </div>

      {/* 5. Sub Charts Section: Topic Mastery, Languages, and Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Topic Mastery Bar Chart */}
        <div className="lg:col-span-1">
          <TopicMasteryChart data={mockTopicMastery} />
        </div>

        {/* Language Solves Bar Chart */}
        <div>
          <LanguageUsageChart data={languages} />
        </div>

        {/* Platform Solves Donut Chart */}
        <div>
          <PlatformDistributionChart data={platforms} />
        </div>

      </div>

      {/* 6. Insights & Goals Details splits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Performance Insights */}
        <div>
          <PerformanceInsights insights={insights} />
        </div>

        {/* Difficulty Benchmarks */}
        <div>
          <DifficultyProgress
            easySolved={difficulties[0].value}
            easyGoal={150}
            mediumSolved={difficulties[1].value}
            mediumGoal={200}
            hardSolved={difficulties[2].value}
            hardGoal={100}
          />
        </div>

        {/* Milestones log */}
        <div>
          <RecentMilestones milestones={milestones} />
        </div>

      </div>

    </motion.div>
  );
}
