import { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from './avatar.shadcn';
import styles from './avatar.module.css';

interface AvatarProps {
  imageUrl: string;
  fallback?: string;
  className?: string;
}

const AvatarComponent = forwardRef<React.ElementRef<typeof Primitive.Avatar>, AvatarProps>(
  ({ imageUrl, className, fallback = '' }, ref) => {
    return (
      <Primitive.Avatar className={cn(styles.start, className, 'nlp--avatar')}>
        <Primitive.AvatarImage src={imageUrl} className={cn(styles.avatar)} />
        <Primitive.AvatarFallback>{fallback}</Primitive.AvatarFallback>
      </Primitive.Avatar>
    );
  },
);

export const Avatar = AvatarComponent;
