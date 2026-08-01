import { Card } from '../../../components/ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { WeeklyActivity } from '../types/dashboard.types';

interface WeeklyActivityChartProps {
  data: WeeklyActivity[];
}

export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  return (
    <Card className="p-6 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col h-[320px]">
      <Card.Header className="border-none pb-0 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
            Weekly Activity
          </h3>
          <span className="text-xs text-slate-400">Activity index for the current week</span>
        </div>
      </Card.Header>

      <Card.Content className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
          >
            {/* Grid background lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-850" />
            
            <XAxis
              dataKey="day"
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
            
            {/* Custom Tooltip */}
            <Tooltip
              cursor={{ fill: 'rgba(140, 68, 255, 0.04)', radius: 8 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-sm text-left dark:border-slate-800 dark:bg-slate-900/95">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {payload[0].payload.day} Activity
                      </p>
                      <p className="text-sm font-black text-slate-800 dark:text-white mt-1">
                        {payload[0].value} <span className="text-xs font-semibold text-slate-450 dark:text-slate-400">Problems Solved</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Bar
              dataKey="solved"
              fill="#8c44ff" // brand primary color
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}
