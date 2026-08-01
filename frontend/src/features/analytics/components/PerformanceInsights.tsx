import { Card } from '../../../components/ui/Card';
import { Calendar, Star, AlertCircle, Code, Award } from 'lucide-react';
import type { PerformanceInsight } from '../types/analytics.types';

interface PerformanceInsightsProps {
  insights: PerformanceInsight[];
}

export function PerformanceInsights({ insights }: PerformanceInsightsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'productive-day':
        return <Calendar className="h-5 w-5 text-emerald-500" />;
      case 'strongest-topic':
        return <Star className="h-5 w-5 text-yellow-500 fill-yellow-500/10" />;
      case 'needs-practice':
        return <AlertCircle className="h-5 w-5 text-rose-500" />;
      case 'preferred-lang':
        return <Code className="h-5 w-5 text-primary-500" />;
      case 'weekly-avg':
      default:
        return <Award className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-between">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Performance Insights
        </h3>
        <span className="text-xs text-slate-400">AI-suggested improvements based on coding patterns</span>
      </Card.Header>

      <Card.Content className="flex flex-col gap-4 mt-2">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-950/20"
          >
            <div className="shrink-0 mt-0.5">
              {getIcon(insight.id)}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {insight.label}
              </h4>
              <span className="text-sm font-black text-slate-800 dark:text-white block mt-0.5">
                {insight.value}
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
