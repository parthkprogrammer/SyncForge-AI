import { Flame, GitCommit, Bot, Code2 } from 'lucide-react';
import type {
  DashboardStat,
  DifficultyStat,
  WeeklyActivity,
  Submission,
  AIInsight,
  SyncStatusData,
} from '../types/dashboard.types';

export const mockStats = (tProblemsIcon: typeof Code2, streakIcon: typeof Flame, syncIcon: typeof GitCommit, aiIcon: typeof Bot): DashboardStat[] => [
  {
    id: 'total-problems',
    label: 'Total Problems',
    value: 248,
    trend: { value: 8.5, isPositive: true },
    icon: tProblemsIcon,
    description: 'Solved problems on LeetCode & HackerRank.',
  },
  {
    id: 'current-streak',
    label: 'Current Streak',
    value: '12 days',
    trend: { value: 20, isPositive: true },
    icon: streakIcon,
    description: 'Active coding days in a row.',
  },
  {
    id: 'github-syncs',
    label: 'GitHub Syncs',
    value: 231,
    trend: { value: 5.2, isPositive: true },
    icon: syncIcon,
    description: 'Solutions successfully synced to repo.',
  },
  {
    id: 'ai-explanations',
    label: 'AI Explanations',
    value: 184,
    trend: { value: 12.1, isPositive: true },
    icon: aiIcon,
    description: 'AI code summaries generated.',
  },
];

export const mockDifficulties: DifficultyStat[] = [
  { difficulty: 'Easy', solved: 112, total: 150, colorClass: 'bg-emerald-500' },
  { difficulty: 'Medium', solved: 103, total: 200, colorClass: 'bg-amber-500' },
  { difficulty: 'Hard', solved: 33, total: 100, colorClass: 'bg-rose-500' },
];

export const mockWeeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', solved: 3 },
  { day: 'Tue', solved: 5 },
  { day: 'Wed', solved: 2 },
  { day: 'Thu', solved: 8 },
  { day: 'Fri', solved: 4 },
  { day: 'Sat', solved: 6 },
  { day: 'Sun', solved: 3 },
];

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-001',
    title: 'Two Sum',
    difficulty: 'Easy',
    language: 'Java',
    platform: 'LeetCode',
    status: 'Synced',
    submittedTime: '2 minutes ago',
  },
  {
    id: 'sub-002',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    language: 'TypeScript',
    platform: 'LeetCode',
    status: 'Synced',
    submittedTime: '15 minutes ago',
  },
  {
    id: 'sub-003',
    title: 'LRU Cache',
    difficulty: 'Hard',
    language: 'C++',
    platform: 'LeetCode',
    status: 'Synced',
    submittedTime: '2 hours ago',
  },
  {
    id: 'sub-004',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    language: 'Python',
    platform: 'HackerRank',
    status: 'Pending',
    submittedTime: '1 day ago',
  },
  {
    id: 'sub-005',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    language: 'Go',
    platform: 'LeetCode',
    status: 'Failed',
    submittedTime: '2 days ago',
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-001',
    title: 'Strongest Category',
    content: 'Arrays and Hash Maps are currently your strongest topics based on successful compilation counts.',
    type: 'strength',
  },
  {
    id: 'insight-002',
    title: 'Learning Opportunity',
    content: 'Consider practicing Dynamic Programming next. Try targeting 2 medium problems this week.',
    type: 'recommendation',
  },
];

export const mockSyncStatus: SyncStatusData = {
  githubConnected: true,
  repository: 'syncforge-solutions',
  lastSync: '2 minutes ago',
  status: 'Healthy',
};
