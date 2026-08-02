import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input/Input';
import type { DeveloperProfile, EditProfileFormData } from '../types/profile.types';

const profileSchema = z.object({
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name cannot exceed 50 characters')
    .trim(),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores')
    .trim(),
  bio: z.string().max(300, 'Bio cannot exceed 300 characters').trim(),
  location: z.string().max(100, 'Location cannot exceed 100 characters').trim(),
  website: z.string()
    .refine((val) => {
      if (!val) return true;
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: 'Must be a valid URL (including http/https)' })
    .trim(),
  primaryLanguage: z.string().min(1, 'Primary language is required').trim(),
  profileVisibility: z.enum(['public', 'private']),
});

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
  onUpdate: (data: EditProfileFormData) => void;
}

export function EditProfileDialog({
  isOpen,
  onClose,
  profile,
  onUpdate,
}: EditProfileDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: profile.displayName || '',
      username: profile.username || '',
      bio: profile.bio || '',
      location: profile.location || '',
      website: profile.website || '',
      primaryLanguage: profile.primaryLanguage || '',
      profileVisibility: profile.profileVisibility || 'public',
    },
  });

  const onSubmitForm = (data: EditProfileFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-850 select-none">
              <div className="flex items-center gap-2">
                <User2 className="h-5 w-5 text-primary-500" />
                <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                  Edit Developer Profile
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-450 hover:text-slate-650 dark:hover:text-slate-200"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  placeholder="e.g. Alex Developer"
                  error={errors.displayName?.message}
                  {...register('displayName')}
                />

                <Input
                  label="Username"
                  placeholder="e.g. alexdev"
                  error={errors.username?.message}
                  {...register('username')}
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                  Bio (Developer Headline)
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a brief professional summary about your coding experiences and interests."
                  className="w-full bg-white border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none leading-relaxed placeholder-slate-450"
                  {...register('bio')}
                />
                {errors.bio && (
                  <span className="text-xs font-medium text-error-600 dark:text-error-400">
                    {errors.bio.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  placeholder="e.g. San Francisco, CA"
                  error={errors.location?.message}
                  {...register('location')}
                />

                <Input
                  label="Website Portfolio URL"
                  placeholder="e.g. https://alexdev.io"
                  error={errors.website?.message}
                  {...register('website')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Primary Language"
                  placeholder="e.g. TypeScript"
                  error={errors.primaryLanguage?.message}
                  {...register('primaryLanguage')}
                />

                {/* Profile Visibility */}
                <div className="flex flex-col gap-1.5 text-left select-none">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                    Profile Visibility Setting
                  </label>
                  <select
                    {...register('profileVisibility')}
                    className="w-full bg-white border border-slate-350 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary-500"
                  >
                    <option value="public">Public (Shareable Portfolio)</option>
                    <option value="private">Private (Owner Only)</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-850 select-none">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="border-slate-200 dark:border-slate-800 rounded-xl h-9 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmitting}
                  className="rounded-xl h-9 px-4 text-xs font-bold"
                >
                  Update Profile
                </Button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
