import React, { forwardRef, memo, ReactNode } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from "@radix-ui/react-tooltip";

import styles from './tooltip.module.scss';

interface TooltipComponentProps extends Primitive.TooltipProps {
  children: ReactNode;
  content: ReactNode | string;
  className?: string;
}

const TooltipComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, TooltipComponentProps>(
  ({ children, className, content, ...props }, ref) => {
    return (
      <Primitive.Provider>
        <Primitive.Root>
          <Primitive.Trigger asChild>
            {children}
          </Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content className={styles.start} sideOffset={5}>
              {content}
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      </Primitive.Provider>
    );
  },
);

export const Tooltip = memo(TooltipComponent);
