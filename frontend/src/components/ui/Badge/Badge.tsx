import { forwardRef } from 'react';
import { BadgeProps } from './Badge.types';
import { cn } from '../../../utils/cn';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, variant = 'neutral', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full select-none leading-none tracking-wide uppercase';

    const variants = {
      primary: 'bg-primary-50 text-primary-600 border border-primary-200 dark:bg-primary-900/10 dark:text-primary-400 dark:border-primary-800/50',
      secondary: 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700',
      success: 'bg-success-50 text-success-600 border border-success-200 dark:bg-success-900/10 dark:text-success-400 dark:border-success-800/30',
      warning: 'bg-warning-50 text-warning-600 border border-warning-200 dark:bg-warning-900/10 dark:text-warning-400 dark:border-warning-800/30',
      error: 'bg-error-50 text-error-600 border border-error-200 dark:bg-error-900/10 dark:text-error-400 dark:border-error-800/30',
      info: 'bg-info-50 text-info-600 border border-info-200 dark:bg-info-900/10 dark:text-info-400 dark:border-info-800/30',
      neutral: 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-850 dark:text-slate-400 dark:border-slate-800',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-2.5 py-1 text-xs',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
