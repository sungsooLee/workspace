import { forwardRef, memo, ReactNode } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from "@radix-ui/react-popover";

import styles from './popover.module.scss';

interface PopoverComponentProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  popoverContent?: ReactNode;
  className?: string;
}

const PopoverComponent = forwardRef<React.ElementRef<typeof Primitive.Popover>, PopoverComponentProps>(
  ({ children, className, popoverContent, ...props }, ref) => {
    return (
      <Primitive.Root>
        <Primitive.Trigger asChild>
          {children}
        </Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content className={styles.start} sideOffset={5}>
            {popoverContent}
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    );
  },
);

export const Popover = memo(PopoverComponent);
