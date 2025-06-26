import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import { IcoTooltipArrow, IcoTooltipArrow02 } from '@learnway/icons';

import * as Primitive from '@radix-ui/react-tooltip';
import styles from './tooltip.module.css';

interface TooltipComponentProps extends Primitive.TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  sideOffset?: number;
  arrowType?: 'gray' | 'black';
}

const TooltipComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, TooltipComponentProps>(
  (
    {
      children,
      className,
      content,
      side = 'bottom',
      align = 'start',
      sideOffset = 5,
      arrowType,
      ...props
    },
    ref,
  ) => {
    return (
      <Primitive.Provider>
        <Primitive.Root open>
          <Primitive.Trigger className={cn(styles.tooltip_btn, className)}>
            {children}
          </Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content
              side={side}
              align={align}
              className={cn(styles.start, styles.tooltip_content)}
              sideOffset={10}
            >
              {content}
              <span className={styles.arrow}>
                {arrowType !== 'gray' ? (
                  <IcoTooltipArrow width={10} height={10} />
                ) : (
                  <IcoTooltipArrow02 width={10} height={10} />
                )}
              </span>
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);

export const Tooltip = TooltipComponent;
