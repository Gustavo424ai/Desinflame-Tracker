import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="flex items-center gap-1 mb-1.5 text-[13px] font-semibold text-texto-medio">
            {icon && <span>{icon}</span>}
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-[52px] px-4 rounded-[14px] border-[1.5px] border-gray-200 bg-bg text-texto font-sans font-semibold text-base outline-none transition-all focus:border-verde focus:bg-white placeholder:text-gray-400',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, icon, children, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="flex items-center gap-1 mb-1.5 text-[13px] font-semibold text-texto-medio">
            {icon && <span>{icon}</span>}
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full h-[52px] px-4 rounded-[14px] border-[1.5px] border-gray-200 bg-bg text-texto font-sans font-semibold text-base outline-none transition-all focus:border-verde focus:bg-white',
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);
