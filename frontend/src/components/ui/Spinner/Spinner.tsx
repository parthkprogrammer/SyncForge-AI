import { forwardRef } from 'react';
import type { SpinnerProps } from './Spinner.types';
import { cn } from '../../../utils/cn';

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizes = {
      sm: 'h-4 w-4 border-2',
      md: 'h-8 w-8 border-3',
      lg: 'h-12 w-12 border-4',
    };

    const colors = {
      primary: 'border-slate-200 border-t-primary-500 dark:border-slate-800 dark:border-t-primary-400',
      secondary: 'border-slate-200 border-t-slate-600 dark:border-slate-800 dark:border-t-slate-400',
      white: 'border-white/20 border-t-white',
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'animate-spin rounded-full border-solid',
          sizes[size],
          colors[color],
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
