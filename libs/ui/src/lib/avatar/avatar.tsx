import React, { forwardRef } from 'react';

import * as Primitive from "@radix-ui/react-avatar";

import { cn } from '@learnway/shared';

import styles from './avatar.module.scss';

interface AvatarComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  imageUrl: string;
  fallback?: string;
  className?: string;
}

const AvatarComponent = forwardRef<React.ElementRef<typeof Primitive.Avatar>, AvatarComponentProps>(
  ({ imageUrl, className, fallback = '' }, ref) => {
    return (
      <Primitive.Root className={cn('nlp--avatar', className, styles.start)}>
        <Primitive.Image
          className={styles.image}
          src={imageUrl}
        />
        <Primitive.Fallback className={styles.fallback} delayMs={600}>
          {fallback}
        </Primitive.Fallback>
      </Primitive.Root>
    );
  },
);

export const Avatar = AvatarComponent;
