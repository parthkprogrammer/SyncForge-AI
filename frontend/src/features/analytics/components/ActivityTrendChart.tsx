import { Card } from '../../../components/ui/Card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { ActivityData } from '../types/analytics.types';

interface ActivityTrendChartProps {
  data: ActivityData[];
}

export function ActivityTrendChart({ data }: ActivityTrendChartProps) {
  // Format dates chronologically for cleaner axis presentation
  const chartData = data.map((item) => {
    const d = new Date(item.date);
    return {
      ...item,
      formattedDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 text-left">
          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
            {item.formattedDate}
          </p>
          <p className="text-sm font-black text-slate-800 dark:text-white mt-0.5">
            {item.problemsSolved} <span className="text-xs font-semibold text-slate-500">Solved</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-[320px]">
      <Card.Header className="border-none pb-0 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
            Activity Trend
          </h3>
          <span className="text-xs text-slate-400">Coding solutions solved over the selected time slice</span>
        </div>
      </Card.Header>

      <Card.Content className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
          >
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8c44ff" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8c44ff" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-850" />
            
            <XAxis
              dataKey="formattedDate"
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
              // Hide intermediate labels on longer datasets to prevent overlapping labels
              interval={chartData.length > 30 ? Math.floor(chartData.length / 6) : 4}
            />
            
            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="problemsSolved"
              stroke="#8c44ff"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#activityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}
