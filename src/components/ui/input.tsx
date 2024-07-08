import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    if (className === 'commentInput') {
      return (
        <div className='relative'>
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-bodybackground px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <div
            className={`absolute left-0 right-0 bottom-0 h-0.5 bg-gray-400`}
            style={{
              transformOrigin: 'center',
            }}
          ></div>
          <div
            className={`absolute left-0 right-0 bottom-0 h-0.5 bg-black transition-transform duration-300`}
            style={{
              transform: isFocused ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'center',
            }}
          ></div>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
