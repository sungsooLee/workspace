import React, { useState } from 'react';
import { InputProps } from './input';
import { cn } from '@/shared/utils/utils';

const GnbInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-black px-3 py-2 text-sm text-white placeholder:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <img
          src='/assets/icons/ic_search_fill.svg'
          className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white'
        />
      </div>
    );
  }
);

GnbInput.displayName = 'GnbInput';

export { GnbInput };
