import type {
  DeveloperProfile,
  CodingTopic,
  ProgrammingLanguage,
  PlatformActivity,
  Achievement,
  ProfileActivity,
  ConnectedAccount,
} from '../types/profile.types';

export const initialProfile = (): DeveloperProfile => ({
  id: 'dev-001',
  username: 'alexdev',
  displayName: 'Alex Developer',
  bio: 'Software developer passionate about algorithms, backend engineering, and building useful products.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop', // A clean modern profile avatar picture
  email: 'alex.developer@example.com',
  location: 'San Francisco, CA',
  website: 'https://alexdev.example.com',
  githubUrl: 'https://github.com/alexdev',
  joinedAt: '2026-01-10T12:00:00Z',
  primaryLanguage: 'TypeScript',
  currentStreak: 12,
  longestStreak: 45,
  totalProblems: 242,
  totalRepositories: 4,
  totalSyncs: 242,
  aiExplanations: 85,
  profileVisibility: 'public',
});

export const initialCodingTopics = (): CodingTopic[] => [
  { name: 'Arrays', problemsSolved: 65, masteryPercentage: 92 },
  { name: 'Strings', problemsSolved: 48, masteryPercentage: 85 },
  { name: 'Hashing', problemsSolved: 35, masteryPercentage: 80 },
  { name: 'Trees', problemsSolved: 30, masteryPercentage: 75 },
  { name: 'Linked Lists', problemsSolved: 25, masteryPercentage: 70 },
  { name: 'Binary Search', problemsSolved: 20, masteryPercentage: 68 },
  { name: 'Dynamic Programming', problemsSolved: 12, masteryPercentage: 45 },
  { name: 'Graphs', problemsSolved: 8, masteryPercentage: 35 },
];

export const initialLanguages = (): ProgrammingLanguage[] => [
  { language: 'TypeScript', problemsSolved: 120, percentage: 50, isPrimary: true },
  { language: 'JavaScript', problemsSolved: 60, percentage: 25 },
  { language: 'Java', problemsSolved: 36, percentage: 15 },
  { language: 'Python', problemsSolved: 26, percentage: 10 },
];

export const initialPlatforms = (): PlatformActivity[] => [
  { name: 'LeetCode', problemsSolved: 180, lastActive: '2 hours ago', isConnected: true },
  { name: 'Codeforces', problemsSolved: 32, lastActive: '1 day ago', isConnected: true },
  { name: 'HackerRank', problemsSolved: 25, lastActive: '1 week ago', isConnected: false },
  { name: 'CodeChef', problemsSolved: 5, lastActive: '2 weeks ago', isConnected: false },
];

export const initialAchievements = (): Achievement[] => [
  {
    id: 'ach-001',
    title: 'First Sync',
    description: 'Successfully synchronized your first coding solution to GitHub.',
    iconName: 'Sparkles',
    unlocked: true,
    unlockedAt: '2026-01-12T14:30:00Z',
    progress: 1,
    target: 1,
  },
  {
    id: 'ach-002',
    title: '50 Problems',
    description: 'Solve and sync 50 coding problems overall.',
    iconName: 'Flame',
    unlocked: true,
    unlockedAt: '2026-03-24T18:15:00Z',
    progress: 50,
    target: 50,
  },
  {
    id: 'ach-003',
    title: '100 Problems',
    description: 'Solve and sync 100 coding problems overall.',
    iconName: 'Trophy',
    unlocked: true,
    unlockedAt: '2026-06-15T09:00:00Z',
    progress: 100,
    target: 100,
  },
  {
    id: 'ach-004',
    title: '7 Day Streak',
    description: 'Maintain an active synchronization streak for 7 consecutive days.',
    iconName: 'CalendarCheck',
    unlocked: true,
    unlockedAt: '2026-02-18T10:45:00Z',
    progress: 7,
    target: 7,
  },
  {
    id: 'ach-005',
    title: '30 Day Streak',
    description: 'Maintain an active synchronization streak for 30 consecutive days.',
    iconName: 'FlameKindling',
    unlocked: true,
    unlockedAt: '2026-07-20T21:00:00Z',
    progress: 30,
    target: 30,
  },
  {
    id: 'ach-006',
    title: 'First Hard Problem',
    description: 'Sync a solution marked with Hard difficulty.',
    iconName: 'ShieldAlert',
    unlocked: true,
    unlockedAt: '2026-04-05T15:20:00Z',
    progress: 1,
    target: 1,
  },
  {
    id: 'ach-007',
    title: 'Java Explorer',
    description: 'Solve and sync 50 problems using Java.',
    iconName: 'Coffee',
    unlocked: false,
    unlockedAt: null,
    progress: 36,
    target: 50,
  },
  {
    id: 'ach-008',
    title: 'Dynamic Programming Beginner',
    description: 'Solve and sync 20 problems tagged under Dynamic Programming.',
    iconName: 'Compass',
    unlocked: false,
    unlockedAt: null,
    progress: 12,
    target: 20,
  },
];

export const initialRecentActivity = (): ProfileActivity[] => [
  {
    id: 'act-001',
    type: 'solve',
    description: 'Solved "Two Sum" on LeetCode',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-002',
    type: 'sync',
    description: 'Synced "Binary Search" to Github repository syncforge-solutions',
    timestamp: '3 hours ago',
  },
  {
    id: 'act-003',
    type: 'ai',
    description: 'Generated AI explanation and complexity breakdown for "Valid Parentheses"',
    timestamp: '1 day ago',
  },
  {
    id: 'act-004',
    type: 'note',
    description: 'Created revision note for problem "LRU Cache" under Trees tag',
    timestamp: '2 days ago',
  },
  {
    id: 'act-005',
    type: 'streak',
    description: 'Reached a new 12-day coding activity streak!',
    timestamp: '3 days ago',
  },
];

export const initialConnectedAccounts = (): ConnectedAccount[] => [
  { provider: 'GitHub', username: 'alexdev', isConnected: true, connectedAt: '2026-01-10T12:00:00Z' },
  { provider: 'LeetCode', username: 'alexdev', isConnected: true, connectedAt: '2026-01-11T15:00:00Z' },
  { provider: 'Codeforces', username: 'alexdev', isConnected: true, connectedAt: '2026-01-12T09:00:00Z' },
  { provider: 'HackerRank', isConnected: false },
  { provider: 'CodeChef', isConnected: false },
];
