import { forwardRef } from 'react';
import { DividerProps } from './Divider.types';
import { cn } from '../../../utils/cn';

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';

    if (isHorizontal && label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex items-center w-full my-4', className)}
          {...props}
        >
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="px-3 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {label}
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          isHorizontal
            ? 'w-full h-px bg-slate-200 dark:bg-slate-800 my-4'
            : 'h-full w-px bg-slate-200 dark:bg-slate-800 mx-4 self-stretch',
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
