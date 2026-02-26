import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleIcon?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, titleIcon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-[20px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200',
          className
        )}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-2 mb-4 font-display text-sm font-bold text-texto-medio uppercase tracking-wide">
            {titleIcon && <span>{titleIcon}</span>}
            {title}
          </div>
        )}
        {children}
      </div>
    );
  }
);
