import React, { forwardRef, memo, ReactNode, useState } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-tooltip';

import styles from './tooltip.module.css';

interface TooltipComponentProps extends Primitive.TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  isClickAble?: boolean; // 클릭일 경우 케이스 추가
  className?: string;
  sideOffset?: number;
  avoidCollisions?: boolean;
}

const TooltipComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, TooltipComponentProps>(
  (
    {
      children,
      className,
      content,
      side = 'top',
      align = 'end',
      isClickAble = false,
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false); // 클릭 시 툴팁 열기/닫기 상태 관리

    const toggleTooltip = () => {
      if (isClickAble) {
        setIsOpen((prev) => !prev); // 클릭 시 툴팁 열고 닫기
      }
    };
    return (
      <Primitive.Provider>
        <Primitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <Primitive.Trigger className={styles.tooltip_btn} asChild>
            <div className={styles.tooltip_item} onClick={toggleTooltip}>
              {children}
            </div>
          </Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content
              side={side}
              align={align}
              className={cn(styles.start, styles.tooltip_content)}
              sideOffset={5}>
              {content}
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);

export const Tooltip = memo(TooltipComponent);
