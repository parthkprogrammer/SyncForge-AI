import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import type { Submission } from '../types/dashboard.types';

interface RecentSubmissionsProps {
  submissions: Submission[];
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  const getDifficultyBadge = (difficulty: Submission['difficulty']) => {
    const variants = {
      Easy: 'success' as const,
      Medium: 'warning' as const,
      Hard: 'error' as const,
    };
    return <Badge variant={variants[difficulty]} size="sm">{difficulty}</Badge>;
  };

  const getStatusBadge = (status: Submission['status']) => {
    const variants = {
      Synced: 'success' as const,
      Pending: 'warning' as const,
      Failed: 'error' as const,
    };
    return <Badge variant={variants[status]} size="sm">{status}</Badge>;
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Recent Submissions
        </h3>
        <span className="text-xs text-slate-400">Sync history of your completed problems</span>
      </Card.Header>

      <Card.Content className="flex-1 w-full overflow-hidden">
        {/* 1. Desktop Layout: Clean Data Table */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-250 truncate max-w-[200px]">
                    {sub.title}
                  </td>
                  <td className="py-3 px-4">{getDifficultyBadge(sub.difficulty)}</td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded font-mono text-[10px]">
                      {sub.language}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{sub.platform}</td>
                  <td className="py-3 px-4">{getStatusBadge(sub.status)}</td>
                  <td className="py-3 px-4 text-right text-slate-450 dark:text-slate-500">{sub.submittedTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. Mobile Layout: Stacked Grid Cards */}
        <div className="flex flex-col gap-3 md:hidden mt-2">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-4 border border-slate-100 dark:border-slate-850 rounded-xl flex flex-col gap-2 bg-slate-50/30 dark:bg-slate-900/30"
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-slate-750 dark:text-slate-200 text-sm leading-snug">
                  {sub.title}
                </span>
                {getStatusBadge(sub.status)}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                {getDifficultyBadge(sub.difficulty)}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  {sub.language}
                </span>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <span>{sub.platform}</span>
              </div>
              <div className="text-[10px] text-slate-400 text-right mt-1">
                {sub.submittedTime}
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
