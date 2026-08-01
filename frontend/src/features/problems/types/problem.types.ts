export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemPlatform = 'LeetCode' | 'Codeforces' | 'HackerRank' | 'CodeChef' | 'GeeksforGeeks';
export type ProblemSyncStatus = 'Synced' | 'Pending' | 'Failed';

export interface Problem {
  id: string;
  platformProblemId: string;
  title: string;
  slug: string;
  platform: ProblemPlatform;
  difficulty: ProblemDifficulty;
  topics: string[];
  language: string;
  status: string; // e.g. "Accepted"
  syncStatus: ProblemSyncStatus;
  solvedAt: string; // ISO date string (YYYY-MM-DD)
  runtime: string; // e.g. "45 ms"
  memory: string; // e.g. "42.1 MB"
  repository: string;
  solutionPath: string;
  solutionCode?: string; // Optional code contents
  aiExplanation?: string;
  personalNotes?: string;
}

export interface ProblemFiltersState {
  search: string;
  platform: string;
  difficulty: string;
  language: string;
  topic: string;
  syncStatus: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
}
