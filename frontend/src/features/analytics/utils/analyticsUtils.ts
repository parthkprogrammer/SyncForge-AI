import type { ActivityData, AnalyticsSummary, DateRange } from '../types/analytics.types';

// Slices activity data chronologically based on target date ranges
export const filterAnalyticsByDateRange = (
  activityData: ActivityData[],
  range: DateRange
): ActivityData[] => {
  switch (range) {
    case '7d':
      return activityData.slice(-7);
    case '30d':
      return activityData.slice(-30);
    case '90d':
      return activityData.slice(-90);
    case '1y':
      return activityData.slice(-365);
    case 'all':
    default:
      return activityData;
  }
};

// Calculates dynamic analytics values derived directly from raw activity logs
export const calculateSummaryStats = (
  filteredActivity: ActivityData[],
  mostPracticedTopic = 'Arrays'
): AnalyticsSummary => {
  const problemsSolved = filteredActivity.reduce((acc, curr) => acc + curr.problemsSolved, 0);
  const activeDays = filteredActivity.filter((d) => d.problemsSolved > 0).length;
  
  const averagePerDay =
    filteredActivity.length > 0
      ? Number((problemsSolved / filteredActivity.length).toFixed(1))
      : 0;

  // 1. Calculate Current Streak (counting backward from last entry)
  let currentStreak = 0;
  for (let i = filteredActivity.length - 1; i >= 0; i--) {
    if (filteredActivity[i].problemsSolved > 0) {
      currentStreak++;
    } else {
      // If last item is inactive but second-to-last is active, we don't break immediately if it's today/yesterday boundary.
      // But for simplicity, we break on first inactive day.
      break;
    }
  }

  // 2. Calculate Longest Streak
  let longestStreak = 0;
  let runningStreak = 0;
  for (let i = 0; i < filteredActivity.length; i++) {
    if (filteredActivity[i].problemsSolved > 0) {
      runningStreak++;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
    } else {
      runningStreak = 0;
    }
  }

  return {
    problemsSolved,
    currentStreak,
    longestStreak,
    activeDays,
    averagePerDay,
    mostPracticedTopic,
  };
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};
