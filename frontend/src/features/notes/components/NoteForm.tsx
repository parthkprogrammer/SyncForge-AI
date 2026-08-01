import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button';
import { TagInput } from './TagInput';
import { mockLinkedProblems } from '../data/notesMockData';
import type { NoteFormData } from '../types/note.types';

const noteSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .trim(),
  problemId: z.string().nullable().optional(),
  revisionStatus: z.enum(['new', 'learning', 'review', 'mastered']),
  tags: z.array(z.string()).max(5, 'Maximum of 5 tags allowed'),
});

interface NoteFormProps {
  initialValues?: Partial<NoteFormData>;
  onSubmit: (data: NoteFormData) => void;
  submitLabel?: string;
  onCancel?: () => void;
}

export function NoteForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save Note',
  onCancel,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: initialValues?.title || '',
      content: initialValues?.content || '',
      problemId: initialValues?.problemId || '',
      revisionStatus: initialValues?.revisionStatus || 'new',
      tags: initialValues?.tags || [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left select-none">
      
      {/* 1. Note Title */}
      <Input
        label="Note Title"
        placeholder="e.g. Binary Search Template"
        error={errors.title?.message}
        {...register('title')}
      />

      {/* 2. Linked Problem and Revision Status row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Select Problem dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
            Linked Coding Challenge
          </label>
          <select
            {...register('problemId')}
            className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">-- None (No Link) --</option>
            {mockLinkedProblems.map((prob) => (
              <option key={prob.id} value={prob.id}>
                {prob.title}
              </option>
            ))}
          </select>
        </div>

        {/* Select Revision Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
            Revision Status
          </label>
          <select
            {...register('revisionStatus')}
            className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="new">New</option>
            <option value="learning">Learning</option>
            <option value="review">Review</option>
            <option value="mastered">Mastered</option>
          </select>
        </div>

      </div>

      {/* 3. Custom Tags Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
          Tags
        </label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              tags={field.value}
              onChange={field.onChange}
              maxTags={5}
            />
          )}
        />
        {errors.tags && (
          <span className="text-xs font-medium text-error-600 dark:text-error-400">
            {errors.tags.message}
          </span>
        )}
      </div>

      {/* 4. Note Content Textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-350 tracking-wide uppercase">
          Content (Markdown Supported)
        </label>
        <textarea
          rows={6}
          placeholder="Write your revision note details here. You can use markdown like ### Headings, * list items, and `code` blocks."
          className="w-full bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-900 text-slate-850 dark:text-white rounded-xl px-4 py-3 text-xs outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-y leading-relaxed font-sans placeholder-slate-400"
          {...register('content')}
        />
        {errors.content && (
          <span className="text-xs font-medium text-error-600 dark:text-error-400">
            {errors.content.message}
          </span>
        )}
      </div>

      {/* 5. Submit & Action Buttons */}
      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-850">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-slate-200 dark:border-slate-800 rounded-xl h-9 px-4 text-xs font-bold"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSubmitting}
          className="rounded-xl h-9 px-4 text-xs font-bold"
        >
          {submitLabel}
        </Button>
      </div>

    </form>
  );
}
