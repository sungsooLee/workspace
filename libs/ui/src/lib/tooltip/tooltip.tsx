import React, { forwardRef, memo, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import { IcoTooltipArrow } from '@learnway/icons';

import * as Primitive from '@radix-ui/react-tooltip';
import styles from './tooltip.module.css';

interface TooltipComponentProps extends Primitive.TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  sideOffset?: number;
}

const TooltipComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, TooltipComponentProps>(
  (
    { children, className, content, side = 'bottom', align = 'start', sideOffset = 5, ...props },
    ref,
  ) => {
    return (
      <Primitive.Provider>
        <Primitive.Root>
          <Primitive.Trigger className={styles.tooltip_btn}>{children}</Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content
              side={side}
              align={align}
              className={cn(styles.start, styles.tooltip_content)}
              sideOffset={10}>
              {content}
              <span className={styles.arrow}>
                <IcoTooltipArrow width={10} height={10} fill="#333333" />
              </span>
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);

export const Tooltip = memo(TooltipComponent);
