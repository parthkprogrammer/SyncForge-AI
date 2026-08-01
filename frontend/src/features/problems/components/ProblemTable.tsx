import { Link } from 'react-router-dom';
import { Eye, ExternalLink } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { ProblemStatusBadge } from './ProblemStatusBadge';
import type { Problem } from '../types/problem.types';

interface ProblemTableProps {
  problems: Problem[];
  onRetrySync: (problemTitle: string) => void;
}

export function ProblemTable({ problems, onRetrySync }: ProblemTableProps) {
  const getDifficultyBadge = (difficulty: Problem['difficulty']) => {
    const variants = {
      Easy: 'success' as const,
      Medium: 'warning' as const,
      Hard: 'error' as const,
    };
    return <Badge variant={variants[difficulty]} size="sm">{difficulty}</Badge>;
  };

  return (
    <div className="overflow-x-auto w-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
            <th className="py-3.5 px-4 font-bold">Problem</th>
            <th className="py-3.5 px-4 font-bold">Platform</th>
            <th className="py-3.5 px-4 font-bold">Difficulty</th>
            <th className="py-3.5 px-4 font-bold">Topics</th>
            <th className="py-3.5 px-4 font-bold">Language</th>
            <th className="py-3.5 px-4 font-bold">Sync Status</th>
            <th className="py-3.5 px-4 font-bold">Solved Date</th>
            <th className="py-3.5 px-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
          {problems.map((prob) => (
            <tr
              key={prob.id}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-850/10 transition-colors"
            >
              {/* Problem Title & ID */}
              <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-250">
                <Link
                  to={`/problems/${prob.id}`}
                  className="hover:text-primary-500 hover:underline block truncate max-w-[200px]"
                >
                  <span className="text-slate-400 font-normal mr-1.5">
                    #{prob.platformProblemId}
                  </span>
                  {prob.title}
                </Link>
              </td>

              {/* Platform */}
              <td className="py-3.5 px-4 text-slate-550 dark:text-slate-400 font-medium">
                {prob.platform}
              </td>

              {/* Difficulty */}
              <td className="py-3.5 px-4">{getDifficultyBadge(prob.difficulty)}</td>

              {/* Topics tags */}
              <td className="py-3.5 px-4">
                <div className="flex flex-wrap gap-1 max-w-[220px]">
                  {prob.topics.map((t) => (
                    <span
                      key={t}
                      className="bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-400 border border-slate-150 dark:border-slate-800 px-2 py-0.5 rounded-lg text-[9px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </td>

              {/* Language */}
              <td className="py-3.5 px-4">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded font-mono text-[10px]">
                  {prob.language}
                </span>
              </td>

              {/* Sync Status badge */}
              <td className="py-3.5 px-4">
                <ProblemStatusBadge
                  status={prob.syncStatus}
                  onRetryClick={(e) => {
                    e.preventDefault();
                    onRetrySync(prob.title);
                  }}
                />
              </td>

              {/* Date */}
              <td className="py-3.5 px-4 text-slate-450 dark:text-slate-500 font-medium">
                {prob.solvedAt}
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/problems/${prob.id}`}
                    title="View details"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-450 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <a
                    href={`https://github.com/parthkprogrammer/${prob.repository}/blob/main/${prob.solutionPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open on GitHub"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-450 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
