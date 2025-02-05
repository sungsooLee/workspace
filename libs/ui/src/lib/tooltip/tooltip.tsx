import React, { forwardRef, memo, ReactNode, useState } from 'react';
import { IcoTooltipArrow } from '@learnway/icons';
import { cn } from '@learnway/shared';

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
    { children, className, content, side = 'right', align = 'start', sideOffset = 5, ...props },
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
              sideOffset={5}>
              {content}
              <Primitive.Arrow className={styles.tooltip_arrow} />
              {/* <Primitive.Arrow className={styles.tooltip_arrow} asChild>
                <IcoTooltipArrow width={10} height={11} fill="#333333" />
              </Primitive.Arrow> */}
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);

export const Tooltip = memo(TooltipComponent);
