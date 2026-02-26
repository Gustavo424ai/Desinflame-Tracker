import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth = false, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-verde text-white hover:bg-verde-escuro shadow-[0_4px_12px_rgba(76,175,80,0.3)] border-transparent',
      secondary: 'bg-laranja text-white hover:bg-laranja-escuro shadow-[0_4px_12px_rgba(255,152,0,0.3)] border-transparent',
      outline: 'bg-transparent border-2 border-verde text-verde hover:bg-verde-claro',
      ghost: 'bg-transparent text-texto-medio hover:bg-gray-100 border-transparent shadow-none',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-2 px-4 py-4 rounded-[14px] font-display font-bold text-[15px] transition-all duration-200 active:scale-95 border',
          variants[variant],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
