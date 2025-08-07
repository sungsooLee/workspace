import { cn } from '@learnway/shared';
import { forwardRef, ReactNode, useEffect, useState } from 'react';

import * as Primitive from '@radix-ui/react-popover';
import styles from './popover.module.css';

import { useModalStore } from '../stores/useModalStore';

interface PopoverComponentProps extends Primitive.PopoverContentProps {
  children: ReactNode;
  popoverContent?: ReactNode;
  className?: string;
  open?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  centered?: boolean; // 센터인 경우
  onOpenChange?: (open: boolean) => void;
  container?: HTMLElement;
  // modal 에서 popover 사용 시 FocusOutside 이벤트 예외 처리
  forceCloseFocusOutside?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
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
      side = 'bottom',
      centered,
      onOpenChange,
      forceCloseFocusOutside = false,
      container,
      autoClose = false, // 자동으로 닫히기 위한 boolean값
      autoCloseDelay = 3000, // 자동으로 닫히는 딜레이
      ...props
    },
    ref,
  ) => {
    const { activeModal } = useModalStore();
    const currentActiveModal = activeModal();

    const [isOpen, setIsOpen] = useState(open || false);

    useEffect(() => {
      if (open === undefined) return;
      setIsOpen(open);
    }, [open]);

    return (
      <Primitive.Root
        open={isOpen}
        onOpenChange={(op) => {
          onOpenChange?.(op);

          // 자동으로 사라지기 위한 딜레이 설정
          setIsOpen(op);
          if (autoClose && op) {
            setTimeout(() => {
              setIsOpen(false);
            }, autoCloseDelay);
          }
        }}
      >
        <Primitive.PopoverTrigger className={cn('nlp--popover-trigger', className)}>
          {children}
        </Primitive.PopoverTrigger>
        <Primitive.Portal
          // modal 내 popover 활성화 시 z-index 이슈에 대한 예외처리
          container={
            (container ?? currentActiveModal)
              ? document.getElementById(`nlp--modal-${currentActiveModal?.id}`)
              : undefined
          }
        >
          <Primitive.Content
            side={side}
            avoidCollisions={true} // 충돌 방지 활성화
            sideOffset={10}
            className={cn(
              styles.popover_content,
              centered && styles.centered,
              'nlp--popover-content',
              className,
            )}
            {...props}
            onInteractOutside={(e) => {
              // popover open 상태에서 modal open 시 modal content event 버블링 문제
              if (!forceCloseFocusOutside && currentActiveModal) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onFocusOutside={(e) => {
              // popover open 상태에서 modal open 시 modal content event 버블링 문제
              if (!forceCloseFocusOutside && currentActiveModal) {
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
  Close: Primitive.Close,
});
