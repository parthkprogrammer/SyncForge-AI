import { useState, useEffect } from 'react';
import { useProfile } from '../../features/profile/hooks/useProfile';
import { motion } from 'framer-motion';

// Mock Data
import {
  initialCodingTopics,
  initialLanguages,
  initialPlatforms,
  initialAchievements,
  initialRecentActivity,
} from '../../features/profile/data/profileMockData';

// UI Components
import {
  ProfileHeader,
  DeveloperStats,
  CodingTopics,
  ProgrammingLanguages,
  PlatformActivity,
  Achievements,
  ProfileRecentActivity,
  ConnectedAccounts,
  EditProfileDialog,
  ProfileCompletion,
  ProfileSkeleton,
} from '../../features/profile/components';

export default function ProfilePage() {
  const {
    profile,
    connectedAccounts,
    updateProfile,
    connectAccount,
    disconnectAccount,
    uploadAvatarSimulated,
  } = useProfile();

  const [isLoading, setIsLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  // Static/Mock collections
  const [topics] = useState(initialCodingTopics);
  const [languages] = useState(initialLanguages);
  const [platforms] = useState(initialPlatforms);
  const [achievements] = useState(initialAchievements);
  const [recentActivity] = useState(initialRecentActivity);

  // Trigger loading skeleton on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const isGitHubConnected = connectedAccounts.find((a) => a.provider === 'GitHub')?.isConnected || false;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12 text-left"
    >
      
      {/* 1. Profile header details */}
      <ProfileHeader
        profile={profile}
        onEditTrigger={() => setEditOpen(true)}
        onAvatarUpload={uploadAvatarSimulated}
        isGitHubConnected={isGitHubConnected}
      />

      {/* 2. Dynamic Profile Completion Bar */}
      <ProfileCompletion
        profile={profile}
        connectedAccounts={connectedAccounts}
      />

      {/* 3. Developer Statistics summary grid */}
      <DeveloperStats profile={profile} />

      {/* 4. Details Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Topics, Languages, Platforms, Connections */}
        <div className="lg:col-span-1 space-y-6">
          <CodingTopics topics={topics} />
          
          <ProgrammingLanguages languages={languages} />
          
          <ConnectedAccounts
            accounts={connectedAccounts}
            onConnect={connectAccount}
            onDisconnect={disconnectAccount}
          />
          
          <PlatformActivity platforms={platforms} />
        </div>

        {/* Right Column: Achievements & Activities logs */}
        <div className="lg:col-span-2 space-y-6">
          <Achievements achievements={achievements} />
          
          <ProfileRecentActivity activity={recentActivity} />
        </div>

      </div>

      {/* 5. Dialogs overlays */}
      <EditProfileDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onUpdate={updateProfile}
      />

    </motion.div>
  );
}
