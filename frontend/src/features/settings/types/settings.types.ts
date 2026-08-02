export type ThemeMode = 'light' | 'dark' | 'system';
export type CodeFontSize = 'small' | 'medium' | 'large';
export type DefaultDifficulty = 'all' | 'easy' | 'medium' | 'hard';
export type AIResponseStyle = 'concise' | 'balanced' | 'detailed';
export type AIExplanationLevel = 'beginner' | 'intermediate' | 'advanced';
export type ProfileVisibility = 'public' | 'private';

export interface NotificationPreferences {
  syncSuccess: boolean;
  syncFailure: boolean;
  aiResponseReady: boolean;
  revisionReminder: boolean;
  achievementUnlocked: boolean;
  weeklyProgress: boolean;
  productUpdates: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: ProfileVisibility;
  showStats: boolean;
  showAchievements: boolean;
  showLanguages: boolean;
  showActivity: boolean;
  allowPersonalizedAI: boolean;
}

export interface UserSettings {
  theme: ThemeMode;
  codeFontSize: CodeFontSize;
  compactMode: boolean;
  reducedMotion: boolean;
  preferredLanguage: string;
  defaultDifficultyFilter: DefaultDifficulty;
  showLineNumbers: boolean;
  wordWrap: boolean;
  autoSyncDefault: boolean;
  defaultFolderStrategy: 'platform' | 'difficulty' | 'topic' | 'language' | 'flat';
  generateReadmeDefault: boolean;
  includeMetadataDefault: boolean;
  commitMessageTemplate: string;
  defaultAIMode: string;
  aiResponseStyle: AIResponseStyle;
  aiExplanationLevel: AIExplanationLevel;
  includeCodeExamples: boolean;
  includeComplexityAnalysis: boolean;
  usePersonalContext: boolean;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}
