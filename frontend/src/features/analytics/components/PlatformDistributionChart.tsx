import { Card } from '../../../components/ui/Card';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import type { PlatformUsage } from '../types/analytics.types';

interface PlatformDistributionChartProps {
  data: PlatformUsage[];
}

export function PlatformDistributionChart({ data }: PlatformDistributionChartProps) {
  const COLORS = ['#8c44ff', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];
  const total = data.reduce((acc, curr) => acc + curr.solved, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = Math.round((item.value / total) * 100);
      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 text-left">
          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
            {item.name} Platform
          </p>
          <p className="text-sm font-black text-slate-800 dark:text-white mt-0.5">
            {item.value} <span className="text-xs font-normal text-slate-500">solved ({percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-[320px]">
      <Card.Header className="border-none pb-0 mb-2">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Platform Distribution
        </h3>
        <span className="text-xs text-slate-400">Total solved problems partitioned by source platform</span>
      </Card.Header>

      <Card.Content className="flex-1 w-full min-h-0 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="48%"
              innerRadius="58%"
              outerRadius="78%"
              paddingAngle={3}
              dataKey="solved"
              nameKey="platform"
            >
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${entry.platform}`}
                  fill={COLORS[idx % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend
              verticalAlign="bottom"
              iconSize={8}
              iconType="circle"
              formatter={(value) => {
                const item = data.find((d) => d.platform === value);
                const count = item ? item.solved : 0;
                return (
                  <span className="text-xs font-semibold text-slate-550 dark:text-slate-400">
                    {value} ({count})
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">
            {total}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Solutions
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}
