import { Trophy, Flame, Star, Award, Brain } from 'lucide-react';
import type {
  DifficultyData,
  TopicMastery,
  LanguageUsage,
  PlatformUsage,
  Milestone,
  ActivityData,
} from '../types/analytics.types';

// Programmatically generate 1 year (365 days) of daily coding activity
export const generateDailyActivity = (): ActivityData[] => {
  const data: ActivityData[] = [];
  const today = new Date();
  
  // Set deterministic baseline dates (e.g. from 365 days ago to today)
  for (let i = 365; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Deterministic seeding based on loops index to prevent randomization on re-renders
    const dayOfWeek = d.getDay();
    let solved = 0;
    
    if (i % 29 === 0) {
      solved = 0; // occasional long breaks
    } else if (dayOfWeek === 6 || dayOfWeek === 0) { // weekend spikes
      solved = (i % 4) + 1; // 1 to 4
    } else if (i % 3 === 0) {
      solved = i % 3; // 0 to 2
    } else if (i % 5 === 0) {
      solved = (i % 2) + 1; // 1 to 2
    }
    
    data.push({ date: dateStr, problemsSolved: solved });
  }
  return data;
};

export const mockDifficulties: DifficultyData[] = [
  { difficulty: 'Easy', value: 112 },
  { difficulty: 'Medium', value: 103 },
  { difficulty: 'Hard', value: 33 },
];

export const mockTopicMastery: TopicMastery[] = [
  { topic: 'Arrays', solved: 80, attempted: 85, masteryPercentage: 94 },
  { topic: 'Strings', solved: 45, attempted: 50, masteryPercentage: 90 },
  { topic: 'Hashing', solved: 40, attempted: 48, masteryPercentage: 83 },
  { topic: 'Linked List', solved: 25, attempted: 32, masteryPercentage: 78 },
  { topic: 'Trees', solved: 20, attempted: 28, masteryPercentage: 71 },
  { topic: 'Binary Search', solved: 11, attempted: 22, masteryPercentage: 50 },
  { topic: 'Graphs', solved: 15, attempted: 24, masteryPercentage: 62 },
  { topic: 'Dynamic Programming', solved: 12, attempted: 30, masteryPercentage: 40 },
];

export const mockLanguageUsage: LanguageUsage[] = [
  { language: 'Java', solved: 120 },
  { language: 'Python', solved: 64 },
  { language: 'C++', solved: 34 },
  { language: 'TypeScript', solved: 20 },
  { language: 'Go', solved: 10 },
];

export const mockPlatformUsage: PlatformUsage[] = [
  { platform: 'LeetCode', solved: 160 },
  { platform: 'HackerRank', solved: 45 },
  { platform: 'Codeforces', solved: 25 },
  { platform: 'GeeksforGeeks', solved: 12 },
  { platform: 'CodeChef', solved: 6 },
];

export const mockMilestones = (
  trophy: typeof Trophy,
  flame: typeof Flame,
  star: typeof Star,
  award: typeof Award,
  brain: typeof Brain
): Milestone[] => [
  {
    id: 'mil-001',
    title: '100th Problem Solved',
    date: '2026-07-15',
    description: 'Crossed the major triple-digit threshold solving coding challenges.',
    icon: trophy,
  },
  {
    id: 'mil-002',
    title: '30 Day Streak Achieved',
    date: '2026-07-28',
    description: 'Maintained consecutive coding habits daily for a full calendar month.',
    icon: flame,
  },
  {
    id: 'mil-003',
    title: 'First Hard Problem Accepted',
    date: '2026-07-30',
    description: 'Successfully compiled and resolved an advanced complexity logic design.',
    icon: star,
  },
  {
    id: 'mil-004',
    title: '50 Medium Problems Solved',
    date: '2026-07-18',
    description: 'Strengthened system architectures knowledge solving 50 medium challenges.',
    icon: award,
  },
  {
    id: 'mil-005',
    title: '10 DP Problems Solved',
    date: '2026-08-01',
    description: 'Acquired dynamic coding patterns solving sub-problem matrices.',
    icon: brain,
  },
];
