import { useMemo } from 'react';
import { Card } from '../../../components/ui/Card/Card';
import type { CodingTopic } from '../types/profile.types';

interface CodingTopicsProps {
  topics: CodingTopic[];
}

export function CodingTopics({ topics }: CodingTopicsProps) {
  // Sort topics by mastery percentage descending
  const sortedTopics = useMemo(() => {
    return [...topics].sort((a, b) => b.masteryPercentage - a.masteryPercentage);
  }, [topics]);

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Coding Topics Mastery
        </h3>
        <span className="text-[10px] text-slate-400">Mastery levels calculated from accepts counts</span>
      </Card.Header>

      <Card.Content className="space-y-4 flex-1 select-none">
        {sortedTopics.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No topics records linked to profile.
          </div>
        ) : (
          sortedTopics.map((topic) => (
            <div key={topic.name} className="space-y-1.5">
              
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-850 dark:text-slate-200">{topic.name}</span>
                <div className="space-x-1.5">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {topic.problemsSolved} solved
                  </span>
                  <span className="text-primary-500 font-black">
                    {topic.masteryPercentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 dark:bg-slate-800 overflow-hidden">
                <div
                  className="bg-primary-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${topic.masteryPercentage}%` }}
                />
              </div>

            </div>
          ))
        )}
      </Card.Content>
    </Card>
  );
}
