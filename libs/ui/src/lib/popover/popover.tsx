import { forwardRef, ReactNode } from 'react';
import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-popover';
import styles from './popover.module.css';

import { useModalStore } from '../stores/useModalStore';

interface PopoverComponentProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  popoverContent?: ReactNode;
  className?: string;
  open?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  onOpenChange?: (open: boolean) => void;
  // modal 에서 popover 사용 시 FocusOutside 이벤트 예외 처리
  forceCloseFocusOutside?: boolean;
}

const PopoverComponent = forwardRef<
  React.ElementRef<typeof Primitive.Popover>,
  PopoverComponentProps
>(
  (
    {
      children,
      className,
      popoverContent,
      open,
      onOpenChange,
      forceCloseFocusOutside = false,
      ...props
    },
    ref,
  ) => {
    const { modals } = useModalStore();

    return (
      <Primitive.Root
        open={open}
        onOpenChange={(op) => {
          onOpenChange?.(op);
        }}
      >
        <Primitive.PopoverTrigger className={cn('nlp--popover-trigger', className)}>
          {children}
        </Primitive.PopoverTrigger>
        <Primitive.Portal>
          <Primitive.Content
            className={cn(styles.popover_content, 'nlp--popover-content', className)}
            {...props}
            onInteractOutside={(e) => {
              // popover open 상태에서 modal open 시 modal content event 버블링 문제
              if (!forceCloseFocusOutside && modals?.length > 0) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onFocusOutside={(e) => {
              // popover open 상태에서 modal open 시 modal content event 버블링 문제
              if (!forceCloseFocusOutside && modals?.length > 0) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {popoverContent}
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    );
  },
);

const PopoverRoot = PopoverComponent;
export const Popover = Object.assign(PopoverRoot, {
  Trigger: Primitive.PopoverTrigger,
  Content: Primitive.PopoverContent,
});
