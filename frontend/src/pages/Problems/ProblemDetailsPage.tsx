import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, ShieldCheck, Cpu, HardDrive } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// Sub-components
import {
  SolutionCodeViewer,
  ProblemDetailsTabs,
  ProblemStatusBadge,
  ProblemDetailsSkeleton,
} from '../../features/problems/components';

// Mock Data
import { mockProblems } from '../../features/problems/data/problemsMockData';
import { ROUTE_PATHS } from '../../routes/routePaths';

export default function ProblemDetailsPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'solution' | 'ai-explanation' | 'notes'>('solution');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const problem = mockProblems.find((p) => p.id === problemId);

  const handleRetrySync = () => {
    alert(`Sync API will be connected later. Retrying synchronization for "${problem?.title}".`);
  };

  if (isLoading) {
    return <ProblemDetailsSkeleton />;
  }

  // Error boundary fallback
  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-md mx-auto py-12">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Unable to load problems
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 leading-relaxed">
          The requested coding solution could not be recovered from local repository cache files.
        </p>
        <div className="flex gap-3 mt-6 w-full justify-center">
          <Button variant="outline" className="w-1/2" onClick={() => navigate(ROUTE_PATHS.PROBLEMS)}>
            Go back
          </Button>
          <Button variant="primary" className="w-1/2" onClick={() => setIsLoading(true)}>
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12 text-left">
      
      {/* 1. Back button header */}
      <div>
        <Link
          to={ROUTE_PATHS.PROBLEMS}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-450 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 select-none uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Problems</span>
        </Link>
      </div>

      {/* 2. Page title details header */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight sm:text-3xl">
            <span className="text-slate-400 font-normal mr-2">#{problem.platformProblemId}</span>
            {problem.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs text-slate-500 font-medium">
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded font-semibold">
              {problem.platform}
            </span>
            <span>&bull;</span>
            <span className="font-semibold text-slate-600 dark:text-slate-400">
              {problem.language}
            </span>
            <span>&bull;</span>
            <span>Solved {problem.solvedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ProblemStatusBadge
            status={problem.syncStatus}
            onRetryClick={handleRetrySync}
          />
        </div>
      </div>

      {/* 3. Grid Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Metadata Info Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-5">
            <h3 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-850 pb-2">
              Performance & Target Metrics
            </h3>

            {/* Topics */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                Topics
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {problem.topics.map((t) => (
                  <span
                    key={t}
                    className="bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-400 border border-slate-150 dark:border-slate-800 px-2 py-0.5 rounded-lg text-[9px] font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Indicators Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-850 pt-3">
              <div className="flex gap-2">
                <Cpu className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Runtime</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{problem.runtime}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <HardDrive className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Memory</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{problem.memory}</span>
                </div>
              </div>
            </div>

            {/* Integration Details */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4 flex flex-col gap-3.5 text-xs text-slate-650 dark:text-slate-350 font-medium">
              <div className="flex gap-2">
                <GitBranch className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Target Repository</span>
                  <a
                    href={`https://github.com/parthkprogrammer/${problem.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-primary-500 font-bold block mt-0.5"
                  >
                    {problem.repository}
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Repository Filepath</span>
                  <span className="font-mono text-[10px] text-slate-500 truncate block mt-0.5" title={problem.solutionPath}>
                    {problem.solutionPath}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Tab Viewers */}
        <div className="lg:col-span-2">
          <ProblemDetailsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            solutionElement={
              <SolutionCodeViewer
                code={problem.solutionCode || '// Code contents missing'}
                language={problem.language}
              />
            }
            aiExplanationText={problem.aiExplanation}
            personalNotesText={problem.personalNotes}
          />
        </div>

      </div>

    </div>
  );
}
