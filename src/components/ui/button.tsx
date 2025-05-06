'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import {
  buttonVariants,
  buttonSizes,
  ButtonVariant,
  ButtonSize,
} from '@/lib/ui/button-variants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center cursor-pointer';

    const isDisabled = disabled || isLoading;

    return (
      <button
        className={cn(
          baseStyles,
          buttonVariants[variant],
          buttonSizes[size],
          isDisabled && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4 text-current'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
