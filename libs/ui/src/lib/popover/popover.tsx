import { forwardRef, ReactNode } from 'react';
import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-popover';
import styles from './popover.module.css';

interface PopoverComponentProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  popoverContent?: ReactNode;
  className?: string;
  open?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  onOpenChange?: (open: boolean) => void;
}

const PopoverComponent = forwardRef<
  React.ElementRef<typeof Primitive.Popover>,
  PopoverComponentProps
>(({ children, className, popoverContent, open, onOpenChange, ...props }, ref) => {
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      <Primitive.PopoverTrigger className={cn('nlp--popover-trigger', className)}>
        {children}
      </Primitive.PopoverTrigger>
      <Primitive.Portal>
        <Primitive.Content
          className={cn(styles.popover_content, 'nlp--popover-content', className)}
          {...props}>
          {popoverContent}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
});

const PopoverRoot = PopoverComponent;
export const Popover = Object.assign(PopoverRoot, {
  Trigger: Primitive.PopoverTrigger,
  Content: Primitive.PopoverContent,
});
