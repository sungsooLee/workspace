import React, { forwardRef, ReactNode } from 'react';

import * as Primitive from '@radix-ui/react-avatar';

import { cn } from '@learnway/shared';

import styles from './avatar.module.css';

type AvatarSizeType = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

interface AvatarComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  imageUrl?: string;
  fallback?: ReactNode;
  className?: string;
  size?: AvatarSizeType;
}

const AvatarComponent = forwardRef<React.ElementRef<typeof Primitive.Avatar>, AvatarComponentProps>(
  ({ imageUrl, className, fallback, size = 'md' }, ref) => {
    return (
      <Primitive.Root
        ref={ref}
        className={cn('nlp--avatar', className, styles.start, styles[`size--${size}`])}
      >
        <Primitive.Image className={styles.image} src={imageUrl} alt="User avatar" />
        <Primitive.Fallback className={styles.fallback} delayMs={600}>
          {fallback}
        </Primitive.Fallback>
      </Primitive.Root>
    );
  },
);

export const Avatar = AvatarComponent;
