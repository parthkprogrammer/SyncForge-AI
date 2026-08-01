import type { ComponentType } from 'react';

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: ComponentType<{ className?: string }>;
  description: string;
}

export interface DifficultyStat {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solved: number;
  total: number;
  colorClass: string;
}

export interface WeeklyActivity {
  day: string;
  solved: number;
}

export interface Submission {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  platform: string;
  status: 'Synced' | 'Pending' | 'Failed';
  submittedTime: string;
}

export interface AIInsight {
  id: string;
  title: string;
  content: string;
  type: 'strength' | 'recommendation';
}

export interface SyncStatusData {
  githubConnected: boolean;
  repository: string;
  lastSync: string;
  status: 'Healthy' | 'Warning' | 'Error';
}
