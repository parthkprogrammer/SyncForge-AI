import { FileCode, Flame, Trophy, GitFork, Play, ShieldAlert } from 'lucide-react';
import type { DeveloperProfile } from '../types/profile.types';

interface DeveloperStatsProps {
  profile: DeveloperProfile;
}

export function DeveloperStats({ profile }: DeveloperStatsProps) {
  const stats = [
    { label: 'Problems Solved', value: profile.totalProblems, icon: FileCode, color: 'text-primary-500', bg: 'bg-primary-500/5' },
    { label: 'Current Streak', value: `${profile.currentStreak} days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/5' },
    { label: 'Longest Streak', value: `${profile.longestStreak} days`, icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/5' },
    { label: 'Repositories', value: profile.totalRepositories, icon: GitFork, color: 'text-blue-500', bg: 'bg-blue-500/5' },
    { label: 'GitHub Syncs', value: profile.totalSyncs, icon: Play, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
    { label: 'AI Explanations', value: profile.aiExplanations, icon: ShieldAlert, color: 'text-indigo-500', bg: 'bg-indigo-500/5' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left select-none">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-4.5 shadow-sm flex flex-col justify-between"
          >
            <div className={`p-2 rounded-xl w-fit ${stat.bg}`}>
              <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
            </div>
            
            <div className="mt-4">
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-lg font-black text-slate-800 dark:text-white block mt-1 leading-none">
                {stat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
