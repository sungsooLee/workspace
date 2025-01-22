import { forwardRef, memo, ReactNode } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from './popover.shadcn';

interface PopoverProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  popoverContent?: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PopoverComponent = forwardRef<React.ElementRef<typeof Primitive.Popover>, PopoverProps>(
  ({ children, className, popoverContent, open, onOpenChange, ...props }, ref) => {
    return (
      <Primitive.Popover open={open} onOpenChange={onOpenChange}>
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

const PopoverRoot = memo(PopoverComponent);
export const Popover = Object.assign(PopoverRoot, {
  Trigger: Primitive.PopoverTrigger,
  Content: Primitive.PopoverContent,
});
