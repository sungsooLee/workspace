import React, { forwardRef, ReactNode } from 'react';

import * as Primitive from '@radix-ui/react-avatar';

import { cn } from '@learnway/shared';

interface ImageFallBackComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  imageUrl?: string;
  fallback?: ReactNode;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}

const ImageFallBackComponent = forwardRef<
  React.ElementRef<typeof Primitive.Avatar>,
  ImageFallBackComponentProps
>(({ imageUrl, className, imageClassName, fallbackClassName, fallback }, ref) => {
  return (
    <Primitive.Root className={cn(className)}>
      <Primitive.Image className={cn(imageClassName)} src={imageUrl} alt="" />
      <Primitive.Fallback delayMs={600}>
        <div className={cn(fallbackClassName)}>{fallback ? fallback : 'Not Found'}</div>
      </Primitive.Fallback>
    </Primitive.Root>
  );
});

export const ImageFallBack = ImageFallBackComponent;
