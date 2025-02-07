import React, { forwardRef, memo, ReactNode } from 'react';
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
              <Primitive.Arrow
                className="fill-gray-900"
                style={{
                  width: '10px',
                  height: '10px',
                  transform: 'rotate(0deg)',
                  borderRadius: '3px', // 둥근 끝
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', // 직각삼각형
                }}
              />
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);

export const Tooltip = memo(TooltipComponent);
