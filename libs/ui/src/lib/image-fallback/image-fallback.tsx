import React, { forwardRef, ReactNode } from 'react';

import * as Primitive from '@radix-ui/react-avatar';

import { cn } from '@learnway/shared';

import styles from './image-fallback.module.css';

interface ImageFallBackComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  imageUrl?: string;
  fallback?: ReactNode;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  stacked?: boolean;
}

const ImageFallBackComponent = forwardRef<
  React.ElementRef<typeof Primitive.Avatar>,
  ImageFallBackComponentProps
>(({ imageUrl, className, imageClassName, fallbackClassName, fallback, stacked = false }, ref) => {
  return (
    <Primitive.Root className={cn(styles.start, stacked && styles.stacked, className)}>
      <Primitive.Image className={cn(styles.img, imageClassName)} src={imageUrl} alt="" />
      <Primitive.Fallback delayMs={600}>
        <div className={cn(styles.fallback, fallbackClassName)}>
          {fallback ? fallback : 'Not Found'}
        </div>
      </Primitive.Fallback>
    </Primitive.Root>
  );
});

export const ImageFallBack = ImageFallBackComponent;
