import { Card } from '../../../components/ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import type { TopicMastery } from '../types/analytics.types';

interface TopicMasteryChartProps {
  data: TopicMastery[];
}

export function TopicMasteryChart({ data }: TopicMasteryChartProps) {
  // Sort data dynamically by mastery percentages
  const sortedData = [...data].sort((a, b) => b.masteryPercentage - a.masteryPercentage);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 text-left">
          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
            {item.topic} Mastery
          </p>
          <p className="text-sm font-black text-slate-800 dark:text-white mt-1">
            {item.masteryPercentage}% <span className="text-xs font-semibold text-slate-500">mastery level</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Solved {item.solved} out of {item.attempted} solutions attempted.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-[360px]">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Topic Mastery
        </h3>
        <span className="text-xs text-slate-400">Mastery ratios by algorithm topic area</span>
      </Card.Header>

      <Card.Content className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
          >
            <XAxis
              type="number"
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
            />
            
            <YAxis
              dataKey="topic"
              type="category"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={85}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Bar
              dataKey="masteryPercentage"
              fill="#8c44ff"
              radius={[0, 4, 4, 0]}
              maxBarSize={16}
            >
              {sortedData.map((entry, idx) => {
                // Gradient colors from primary brand purple to accent colors based on values
                const opacity = 1 - idx * 0.08;
                return (
                  <Cell
                    key={`cell-${entry.topic}`}
                    fill={`rgba(140, 68, 255, ${Math.max(opacity, 0.4)})`}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}
