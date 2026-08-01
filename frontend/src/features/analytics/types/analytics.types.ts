import type { ComponentType } from 'react';

export type DateRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface AnalyticsSummary {
  problemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  averagePerDay: number;
  mostPracticedTopic: string;
}

export interface DifficultyData {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  value: number;
}

export interface ActivityData {
  date: string; // ISO format (YYYY-MM-DD)
  problemsSolved: number;
}

export interface TopicMastery {
  topic: string;
  solved: number;
  attempted: number;
  masteryPercentage: number;
}

export interface LanguageUsage {
  language: string;
  solved: number;
}

export interface PlatformUsage {
  platform: string;
  solved: number;
}

export interface StreakDay {
  date: string;
  count: number; // intensity (e.g. 0, 1, 2, 3, 4+)
}

export interface PerformanceInsight {
  id: string;
  label: string;
  value: string | number;
  description: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}
