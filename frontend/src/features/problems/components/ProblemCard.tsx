import { Link } from 'react-router-dom';
import { Eye, ExternalLink } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { ProblemStatusBadge } from './ProblemStatusBadge';
import type { Problem } from '../types/problem.types';

interface ProblemCardProps {
  problem: Problem;
  onRetrySync: (problemTitle: string) => void;
}

export function ProblemCard({ problem, onRetrySync }: ProblemCardProps) {
  const getDifficultyBadge = (difficulty: Problem['difficulty']) => {
    const variants = {
      Easy: 'success' as const,
      Medium: 'warning' as const,
      Hard: 'error' as const,
    };
    return <Badge variant={variants[difficulty]} size="sm">{difficulty}</Badge>;
  };

  return (
    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col gap-3 bg-white dark:bg-slate-900 text-left shadow-sm">
      {/* Header: Platform problem ID & Title */}
      <div className="flex items-start justify-between gap-3">
        <Link
          to={`/problems/${problem.id}`}
          className="font-bold text-slate-800 dark:text-white hover:text-primary-500 hover:underline text-sm leading-snug"
        >
          <span className="text-slate-400 font-normal mr-1">#{problem.platformProblemId}</span>
          {problem.title}
        </Link>
        <ProblemStatusBadge
          status={problem.syncStatus}
          onRetryClick={(e) => {
            e.preventDefault();
            onRetrySync(problem.title);
          }}
        />
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {getDifficultyBadge(problem.difficulty)}
        <span className="text-slate-200 dark:text-slate-850">|</span>
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded font-mono text-[10px]">
          {problem.language}
        </span>
        <span className="text-slate-200 dark:text-slate-850">|</span>
        <span className="font-semibold text-slate-600 dark:text-slate-400">{problem.platform}</span>
      </div>

      {/* Topic tag collection */}
      <div className="flex flex-wrap gap-1 mt-1">
        {problem.topics.map((t) => (
          <span
            key={t}
            className="bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-400 border border-slate-150 dark:border-slate-800 px-2 py-0.5 rounded-lg text-[9px] font-semibold"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer metadata & buttons */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-2.5 mt-1 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Solved: {problem.solvedAt}</span>
        
        <div className="flex items-center gap-2">
          <Link
            to={`/problems/${problem.id}`}
            className="inline-flex h-8 px-3 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-850 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 font-bold"
          >
            <Eye className="h-4 w-4" />
            <span>Details</span>
          </Link>
          <a
            href={`https://github.com/parthkprogrammer/${problem.repository}/blob/main/${problem.solutionPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-850 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
