export type ProfileVisibility = 'public' | 'private';

export interface DeveloperProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  email: string;
  location: string | null;
  website: string | null;
  githubUrl: string;
  joinedAt: string; // ISO date or relative
  primaryLanguage: string;
  currentStreak: number;
  longestStreak: number;
  totalProblems: number;
  totalRepositories: number;
  totalSyncs: number;
  aiExplanations: number;
  profileVisibility: ProfileVisibility;
}

export interface CodingTopic {
  name: string;
  problemsSolved: number;
  masteryPercentage: number; // 0 to 100
}

export interface ProgrammingLanguage {
  language: string;
  problemsSolved: number;
  percentage: number; // 0 to 100
  isPrimary?: boolean;
}

export interface PlatformActivity {
  name: string;
  problemsSolved: number;
  lastActive: string; // Relative time or date string
  isConnected: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string; // Name of Lucide Icon to render dynamically
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  target: number;
}

export interface ProfileActivity {
  id: string;
  type: 'solve' | 'sync' | 'ai' | 'note' | 'streak';
  description: string;
  timestamp: string; // Relative string or ISO string
}

export interface ConnectedAccount {
  provider: string;
  username?: string;
  isConnected: boolean;
  connectedAt?: string;
}

export interface EditProfileFormData {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  primaryLanguage: string;
  profileVisibility: ProfileVisibility;
}
