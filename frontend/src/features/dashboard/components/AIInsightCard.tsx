import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Brain, Star, TrendingUp } from 'lucide-react';
import type { AIInsight } from '../types/dashboard.types';
import { ROUTE_PATHS } from '../../../routes/routePaths';

interface AIInsightCardProps {
  insights: AIInsight[];
}

export function AIInsightCard({ insights }: AIInsightCardProps) {
  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-full justify-between">
      
      {/* Header */}
      <Card.Header className="border-none pb-0 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-50 text-accent-500 ring-4 ring-accent-500/5">
            <Brain className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
            AI Learning Insights
          </h3>
        </div>
      </Card.Header>

      {/* Body: Map over the mock insights */}
      <Card.Content className="flex flex-col gap-4">
        {insights.map((insight) => {
          const isStrength = insight.type === 'strength';
          
          return (
            <div
              key={insight.id}
              className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-950/20"
            >
              <div className="shrink-0 mt-0.5">
                {isStrength ? (
                  <Star className="h-4.5 w-4.5 text-yellow-500 fill-yellow-500/10" />
                ) : (
                  <TrendingUp className="h-4.5 w-4.5 text-primary-500" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-750 dark:text-slate-250">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1 leading-relaxed">
                  {insight.content}
                </p>
              </div>
            </div>
          );
        })}
      </Card.Content>

      {/* Footer action */}
      <Card.Footer className="border-none pt-0 mt-5 flex justify-end">
        <Link to={ROUTE_PATHS.AI_ASSISTANT} className="w-full">
          <Button variant="outline" className="w-full">
            Ask AI Assistant
          </Button>
        </Link>
      </Card.Footer>

    </Card>
  );
}
