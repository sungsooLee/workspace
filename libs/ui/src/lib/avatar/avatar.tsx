import { forwardRef, memo } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from './avatar.shadcn';

interface AvatarProps {
  imageUrl: string;
  fallback?: string;
  className?: string;
}

const AvatarComponent = forwardRef<React.ElementRef<typeof Primitive.Avatar>, AvatarProps>(
  ({ imageUrl, className, fallback = '' }, ref) => {
    return (
      <Primitive.Avatar className={cn('nlp--avatar', className)}>
        <Primitive.AvatarImage src={imageUrl} />
        <Primitive.AvatarFallback>{fallback}</Primitive.AvatarFallback>
      </Primitive.Avatar>
    );
  },
);

export const Avatar = memo(AvatarComponent);
