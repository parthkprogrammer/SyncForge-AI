import { useState } from 'react';
import { MapPin, Globe, Calendar, Edit3, Share2, Eye, Camera } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge/Badge';
import type { DeveloperProfile } from '../types/profile.types';
import toast from 'react-hot-toast';

// Custom inline GithubIcon to prevent lucide brand deprecation issues
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

interface ProfileHeaderProps {
  profile: DeveloperProfile;
  onEditTrigger: () => void;
  onAvatarUpload: () => void;
  isGitHubConnected: boolean;
  isPublicPreview?: boolean;
}

export function ProfileHeader({
  profile,
  onEditTrigger,
  onAvatarUpload,
  isGitHubConnected,
  isPublicPreview = false,
}: ProfileHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);

  const formattedDate = new Date(profile.joinedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handleShareProfile = async () => {
    // Generate public url matching the exact dynamic pattern `/u/username`
    const origin = window.location.origin;
    const shareUrl = `${origin}/u/${profile.username}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast.success('Profile link copied');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-left flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      
      {/* Left side: Avatar & Bio */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 min-w-0 flex-1">
        
        {/* Avatar picture container */}
        <div className="relative group shrink-0 select-none">
          <img
            src={profile.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256'}
            alt={`${profile.displayName} profile`}
            className="h-20 w-20 rounded-2xl border-2 border-slate-100 dark:border-slate-800 object-cover shadow-sm bg-slate-50"
          />
          {!isPublicPreview && (
            <button
              onClick={onAvatarUpload}
              className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
              title="Change Profile Photo"
            >
              <Camera className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Bio information */}
        <div className="min-w-0 flex-1 text-center sm:text-left space-y-2">
          
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-black text-slate-850 dark:text-white leading-tight">
                {profile.displayName}
              </h2>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-semibold text-slate-450 dark:text-slate-500">
                  @{profile.username}
                </span>

                {isGitHubConnected && (
                  <Badge variant="neutral" size="sm" className="bg-slate-50 border border-slate-200 text-slate-600 dark:bg-slate-950/20 dark:border-slate-800 dark:text-slate-400 flex items-center gap-1 normal-case text-[9px] py-0 px-1.5 font-bold">
                    <GithubIcon className="h-2.5 w-2.5" />
                    <span>GitHub Linked</span>
                  </Badge>
                )}
              </div>
            </div>

            {profile.bio && (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 max-w-xl select-text">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Social details list */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-semibold select-none">
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{profile.location}</span>
              </span>
            )}
            
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{profile.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}

            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Joined {formattedDate}</span>
            </span>
          </div>

        </div>

      </div>

      {/* Right side: Header actions buttons */}
      {!isPublicPreview && (
        <div className="flex items-center gap-2 justify-center sm:justify-start self-center md:self-auto shrink-0 select-none">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditTrigger}
            className="border-slate-200 dark:border-slate-800 h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShareProfile}
            className="border-slate-200 dark:border-slate-800 h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 text-slate-650 hover:text-slate-850 dark:hover:text-slate-250"
            title="Share Public Profile Link"
          >
            <Share2 className="h-4 w-4" />
            <span>{isCopied ? 'Copied' : 'Share'}</span>
          </Button>

          <a href={`/u/${profile.username}`} target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              size="sm"
              className="h-9 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Eye className="h-4 w-4" />
              <span>Public Preview</span>
            </Button>
          </a>
        </div>
      )}

      {/* Share profile button for public previews */}
      {isPublicPreview && (
        <div className="flex justify-center shrink-0 select-none">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareProfile}
            className="border-slate-200 dark:border-slate-800 h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Share2 className="h-4 w-4" />
            <span>{isCopied ? 'Link Copied' : 'Share Portfolio'}</span>
          </Button>
        </div>
      )}

    </div>
  );
}
