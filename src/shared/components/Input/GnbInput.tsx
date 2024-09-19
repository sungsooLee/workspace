import React, { useState } from 'react';
import { InputProps } from '../ui/input';
import { cn } from '@/shared/utils/utils';

const GnbInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            // 'bg-primary-3 placeholder:text-primary-6 border-primary-3 flex h-[34px] w-full border-[1px] border-solid px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'flex h-[34px] w-[250px] border-[1px] border-solid border-primary-3 bg-primary-3 px-3 py-2 text-sm text-black placeholder:text-primary-6 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <div className='absolute inset-y-0 right-0 flex items-center bg-point-light_blue p-[7px]'>
          <img
            src='/assets/icons/navbar/ic_gnb_inputSearch.svg'
            className='h-[20px] w-[20px] items-center justify-center'
          />
        </div>
      </div>
    );
  }
);

GnbInput.displayName = 'GnbInput';

export { GnbInput };
