import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Code2, BarChart3, Bot, GitBranch, ArrowRight } from 'lucide-react';
import { ROUTE_PATHS } from '../../../routes/routePaths';

export function QuickActions() {
  const actions = [
    {
      title: 'View Problems',
      desc: 'Explore coding logic challenges and solutions.',
      path: ROUTE_PATHS.PROBLEMS,
      icon: Code2,
      color: 'bg-primary-50 text-primary-500 ring-primary-500/5',
    },
    {
      title: 'Open Analytics',
      desc: 'View synchronization metrics and throughput logs.',
      path: ROUTE_PATHS.ANALYTICS,
      icon: BarChart3,
      color: 'bg-emerald-50 text-emerald-500 ring-emerald-500/5',
    },
    {
      title: 'Ask AI Assistant',
      desc: 'Generate connector queries and write code.',
      path: ROUTE_PATHS.AI_ASSISTANT,
      icon: Bot,
      color: 'bg-accent-50 text-accent-500 ring-accent-500/5',
    },
    {
      title: 'Manage Repositories',
      desc: 'Configure synchronization GitHub repositories.',
      path: ROUTE_PATHS.REPOSITORIES,
      icon: GitBranch,
      color: 'bg-amber-50 text-amber-500 ring-amber-500/5',
    },
  ];

  return (
    <div className="flex flex-col gap-4 text-left">
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase px-1">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((act) => {
          const Icon = act.icon;

          return (
            <Link key={act.title} to={act.path} className="outline-none group">
              <Card hoverable className="p-5 flex flex-col justify-between h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-200">
                <Card.Content className="p-0 flex items-start gap-4">
                  {/* Icon Block */}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-4 ${act.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  {/* Text Block */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5 group-hover:text-primary-500 transition-colors">
                      <span>{act.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary-500" />
                    </h4>
                    <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
