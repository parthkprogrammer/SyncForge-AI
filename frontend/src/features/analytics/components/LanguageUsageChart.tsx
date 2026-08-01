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
import type { LanguageUsage } from '../types/analytics.types';

interface LanguageUsageChartProps {
  data: LanguageUsage[];
}

export function LanguageUsageChart({ data }: LanguageUsageChartProps) {
  const COLORS = ['#8c44ff', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 text-left">
          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">
            {item.language}
          </p>
          <p className="text-sm font-black text-slate-800 dark:text-white mt-0.5">
            {item.solved} <span className="text-xs font-semibold text-slate-500">solutions synced</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-[320px]">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Language Usage
        </h3>
        <span className="text-xs text-slate-400">Total solutions solved per programming language</span>
      </Card.Header>

      <Card.Content className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
          >
            <XAxis
              dataKey="language"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Bar
              dataKey="solved"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            >
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${entry.language}`}
                  fill={COLORS[idx % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}
