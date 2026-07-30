import { forwardRef, useId } from 'react';
import { InputProps } from './Input.types';
import { cn } from '../../../utils/cn';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, type = 'text', ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-slate-450 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={!!error}
            aria-describedby={
              cn(
                error && errorId,
                helperText && helperId
              ) || undefined
            }
            className={cn(
              'w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:bg-slate-50 disabled:pointer-events-none',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <span className="absolute right-3.5 text-slate-450 pointer-events-none flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <span
            id={errorId}
            role="alert"
            className="text-xs font-medium text-error-600 dark:text-error-400 transition-all duration-150"
          >
            {error}
          </span>
        )}

        {!error && helperText && (
          <span
            id={helperId}
            className="text-xs text-slate-450 leading-relaxed"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
