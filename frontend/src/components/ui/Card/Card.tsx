import { forwardRef } from 'react';
import { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './Card.types';
import { cn } from '../../../utils/cn';

// Root Card Component
export const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col',
          hoverable && 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer active:scale-[0.99]',
          className
        )}
        {...props}
      />
    );
  }
);
CardRoot.displayName = 'Card';

// Card Header Subcomponent
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4', className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

// Card Content Subcomponent
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 text-sm text-slate-650 dark:text-slate-350 leading-relaxed', className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

// Card Footer Subcomponent
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-end gap-3', className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

// Composite Object Export for compound component usage
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
