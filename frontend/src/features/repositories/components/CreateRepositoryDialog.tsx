import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Info } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input/Input';
import type { CreateRepositoryFormData } from '../types/repository.types';

const repoSchema = z.object({
  name: z.string()
    .min(3, 'Repository name must be at least 3 characters')
    .max(100, 'Repository name cannot exceed 100 characters')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Only letters, numbers, dashes, dots, and underscores allowed')
    .trim(),
  description: z.string().max(250, 'Description cannot exceed 250 characters').trim(),
  visibility: z.enum(['public', 'private']),
  initializeReadme: z.boolean(),
});

interface CreateRepositoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateRepositoryFormData) => void;
}

export function CreateRepositoryDialog({
  isOpen,
  onClose,
  onCreate,
}: CreateRepositoryDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateRepositoryFormData>({
    resolver: zodResolver(repoSchema),
    defaultValues: {
      name: '',
      description: '',
      visibility: 'public',
      initializeReadme: true,
    },
  });

  const onSubmitForm = (data: CreateRepositoryFormData) => {
    onCreate(data);
    reset();
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
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-850 select-none">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary-500" />
                <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                  Create GitHub Repository
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-450 hover:text-slate-650 dark:hover:text-slate-200"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Note description banner */}
            <div className="flex items-start gap-2 p-3 bg-primary-50/50 dark:bg-primary-950/10 border border-primary-100 dark:border-primary-900/30 rounded-xl mb-4 text-[11px] text-slate-500 leading-relaxed select-none">
              <Info className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
              <span>
                <strong>Frontend simulation only.</strong> Creating this repository adds a local record to compile folders preview strategies. It does not perform actual GitHub operations.
              </span>
            </div>

            {/* Form fields */}
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              
              <Input
                label="Repository Name"
                placeholder="e.g. syncforge-leetcode-solutions"
                error={errors.name?.message}
                {...register('name')}
              />

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Optional brief description of this solutions backup repository."
                  className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-850 dark:text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none leading-relaxed placeholder-slate-400"
                  {...register('description')}
                />
                {errors.description && (
                  <span className="text-xs font-medium text-error-600 dark:text-error-400">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* Visibility selection row */}
              <div className="flex flex-col gap-1.5 text-left select-none">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
                  Visibility
                </label>
                
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 cursor-pointer">
                    <input
                      type="radio"
                      value="public"
                      defaultChecked
                      className="text-primary-500 focus:ring-primary-500/20"
                      {...register('visibility')}
                    />
                    <span>Public</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 cursor-pointer">
                    <input
                      type="radio"
                      value="private"
                      className="text-primary-500 focus:ring-primary-500/20"
                      {...register('visibility')}
                    />
                    <span>Private</span>
                  </label>
                </div>
              </div>

              {/* Checkbox initialize readme */}
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-350 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 dark:border-slate-800 text-primary-500 focus:ring-primary-500/20"
                  {...register('initializeReadme')}
                />
                <span>Initialize this repository with a README</span>
              </label>

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
                  Create Repo
                </Button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
