import { useMemo } from 'react';
import type { DeveloperProfile, ConnectedAccount } from '../types/profile.types';

interface ProfileCompletionProps {
  profile: DeveloperProfile;
  connectedAccounts: ConnectedAccount[];
}

export function ProfileCompletion({ profile, connectedAccounts }: ProfileCompletionProps) {
  const completionInfo = useMemo(() => {
    let score = 0;
    const details = [];

    // 1. Avatar (15%)
    if (profile.avatarUrl) {
      score += 15;
      details.push({ label: 'Profile avatar photo', done: true, points: 15 });
    } else {
      details.push({ label: 'Profile avatar photo', done: false, points: 15 });
    }

    // 2. Bio (15%)
    if (profile.bio && profile.bio.trim().length > 0) {
      score += 15;
      details.push({ label: 'Short bio description', done: true, points: 15 });
    } else {
      details.push({ label: 'Short bio description', done: false, points: 15 });
    }

    // 3. Location (15%)
    if (profile.location && profile.location.trim().length > 0) {
      score += 15;
      details.push({ label: 'Office/Home location', done: true, points: 15 });
    } else {
      details.push({ label: 'Office/Home location', done: false, points: 15 });
    }

    // 4. Website (15%)
    if (profile.website && profile.website.trim().length > 0) {
      score += 15;
      details.push({ label: 'Personal website link', done: true, points: 15 });
    } else {
      details.push({ label: 'Personal website link', done: false, points: 15 });
    }

    // 5. Primary Language (20%)
    if (profile.primaryLanguage) {
      score += 20;
      details.push({ label: 'Preferred coding language', done: true, points: 20 });
    } else {
      details.push({ label: 'Preferred coding language', done: false, points: 20 });
    }

    // 6. GitHub Connection (20%)
    const github = connectedAccounts.find((a) => a.provider === 'GitHub');
    if (github && github.isConnected) {
      score += 20;
      details.push({ label: 'GitHub account link', done: true, points: 20 });
    } else {
      details.push({ label: 'GitHub account link', done: false, points: 20 });
    }

    return { score, details };
  }, [profile, connectedAccounts]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 dark:bg-slate-900 dark:border-slate-800 text-left select-none">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider">
          Profile Setup Progress
        </h4>
        <span className="text-sm font-black text-primary-500">
          {completionInfo.score}% Complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 dark:bg-slate-800 overflow-hidden">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${completionInfo.score}%` }}
        />
      </div>

      {/* Setup check items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-850">
        {completionInfo.details.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-[10px] font-semibold">
            <span className={`inline-block w-2 h-2 rounded-full ${item.done ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
            <span className={item.done ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}>
              {item.label} (+{item.points}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
