import { forwardRef, memo, ReactNode } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-popover';

interface PopoverProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  popoverContent?: ReactNode;
  className?: string;
}

const PopoverComponent = forwardRef<React.ElementRef<typeof Primitive.Popover>, PopoverProps>(
  ({ children, className, popoverContent, ...props }, ref) => {
    return (
      <Primitive.Popover>
        <Primitive.PopoverTrigger className={cn('nlp--popover-trigger')}>
          {children}
        </Primitive.PopoverTrigger>
        <Primitive.PopoverContent className={cn('nlp--popover-content', className)} {...props}>
          {popoverContent}
        </Primitive.PopoverContent>
      </Primitive.Popover>
    );
  },
);

export const Popover = memo(PopoverComponent);
