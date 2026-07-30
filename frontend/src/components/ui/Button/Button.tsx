import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { cn } from '../../../utils/cn';
import { Spinner } from '../Spinner/Spinner';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Core Tailwind styling mapping
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-md shadow-primary-500/10 focus:ring-primary-500 dark:focus:ring-offset-slate-900',
      secondary: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 focus:ring-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-650 dark:focus:ring-offset-slate-900',
      outline: 'border border-slate-350 hover:bg-slate-50 text-slate-700 focus:ring-primary-500 dark:border-slate-700 dark:hover:bg-slate-800/50 dark:text-slate-300 dark:focus:ring-offset-slate-900',
      ghost: 'hover:bg-slate-50 text-slate-700 focus:ring-slate-300 dark:hover:bg-slate-800 dark:text-slate-350 dark:focus:ring-offset-slate-900',
      danger: 'bg-error-500 hover:bg-error-600 active:bg-error-700 text-white shadow-md shadow-error-500/10 focus:ring-error-500 dark:focus:ring-offset-slate-900',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && 'cursor-wait opacity-80',
          className
        )}
        {...props}
      >
        {isLoading && (
          <Spinner
            size="sm"
            className={cn(
              'mr-2 border-current',
              variant === 'outline' || variant === 'ghost' ? 'text-primary-500' : 'text-white'
            )}
          />
        )}
        
        {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        
        <span>{children}</span>
        
        {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
