import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';

// Mock Data Load
import {
  initialProfile,
  initialCodingTopics,
  initialLanguages,
  initialAchievements,
  initialRecentActivity,
} from '../../features/profile/data/profileMockData';

// UI Components
import {
  ProfileHeader,
  DeveloperStats,
  CodingTopics,
  ProgrammingLanguages,
  Achievements,
  ProfileRecentActivity,
  ProfileSkeleton,
} from '../../features/profile/components';

// Types
import type { DeveloperProfile } from '../../features/profile/types/profile.types';

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState(true);

  // Check if profile exists in database simulation
  const profileExists = useMemo(() => {
    if (username?.toLowerCase() === 'alexdev') return true;
    try {
      const stored = localStorage.getItem('sf_profile');
      if (stored) {
        const parsed = JSON.parse(stored) as DeveloperProfile;
        if (parsed.username.toLowerCase() === username?.toLowerCase()) {
          return true;
        }
      }
    } catch {
      return false;
    }
    return false;
  }, [username]);

  // Load profile from localStorage if it matches, otherwise use default mock data
  const profile: DeveloperProfile = useMemo(() => {
    if (profileExists) {
      try {
        const stored = localStorage.getItem('sf_profile');
        if (stored) {
          const parsed = JSON.parse(stored) as DeveloperProfile;
          if (parsed.username.toLowerCase() === username?.toLowerCase()) {
            return parsed;
          }
        }
      } catch {
        // Fallback below
      }
    }
    const defaultProf = initialProfile();
    defaultProf.username = username || 'alexdev';
    return defaultProf;
  }, [username, profileExists]);

  // Loading skeleton simulation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const topics = useMemo(() => initialCodingTopics(), []);
  const languages = useMemo(() => initialLanguages(), []);
  const achievements = useMemo(() => initialAchievements(), []);
  const recentActivity = useMemo(() => initialRecentActivity(), []);

  const isPrivate = profile.profileVisibility === 'private';

  if (!profileExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-white">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-850 p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="h-14 w-14 rounded-full bg-rose-50 dark:bg-rose-955/10 text-rose-500 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Profile Not Found</h2>
          <p className="text-xs text-slate-450 dark:text-slate-400 mt-2.5 leading-relaxed">
            The developer profile for <strong className="text-slate-750 dark:text-slate-200">@{username}</strong> could not be located in SyncForge AI.
          </p>
          <div className="flex gap-3 mt-6 w-full justify-center">
            <Link
              to="/profile"
              className="w-1/2 inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 dark:hover:bg-slate-700 h-9 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-250 transition-colors"
            >
              Go to Profile Setup
            </Link>
            <Link
              to="/"
              className="w-1/2 inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white h-9 px-4 rounded-xl text-xs font-bold transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-6 md:p-12">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-6 md:p-12 text-left min-h-screen bg-slate-50/50 dark:bg-slate-950/20"
    >
      
      {/* 1. Header Navigation Back Link */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 select-none">
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Profile Setup</span>
        </Link>
        
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Public Developer Portfolio
        </span>
      </div>

      {/* 2. Privacy Mode Check / Alerts */}
      {isPrivate && (
        <div className="flex items-start gap-3 p-4 bg-yellow-500/[0.04] border border-yellow-500/25 rounded-2xl text-xs text-yellow-600 dark:text-yellow-400 select-none">
          <Lock className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-extrabold">Private Developer Profile Mode</h4>
            <p className="leading-relaxed opacity-90 text-[11px]">
              This profile is currently configured as <strong>private</strong>. It will be hidden from public directories, and only visible on your dashboard setup. This preview is visible to you as the owner.
            </p>
          </div>
        </div>
      )}

      {/* 3. Profile Header */}
      <ProfileHeader
        profile={profile}
        onEditTrigger={() => {}}
        onAvatarUpload={() => {}}
        isGitHubConnected={true}
        isPublicPreview={true}
      />

      {/* 4. Statistics Dashboard */}
      <DeveloperStats profile={profile} />

      {/* 5. Details Columns Splits (Hiding private configs, emails, repository controls!) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Topics and Languages */}
        <div className="lg:col-span-1 space-y-6">
          <CodingTopics topics={topics} />
          
          <ProgrammingLanguages languages={languages} />
        </div>

        {/* Right Column: Achievements & Activities logs */}
        <div className="lg:col-span-2 space-y-6">
          <Achievements achievements={achievements} />
          
          <ProfileRecentActivity activity={recentActivity} />
        </div>

      </div>

      {/* Footer Branding */}
      <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 select-none">
        <p>SyncForge AI © 2026. Developer Portfolio Platform Integration.</p>
      </div>

    </motion.div>
  );
}
