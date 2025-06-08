import { useToastStore } from '../stores/useToastStore';
import { ToastContainer } from './toast-container';
import * as Primitive from '@radix-ui/react-toast';
import { cn } from '@learnway/shared';
import React from 'react';
import styles from './toast.module.css';

export interface ToastContainerProps {
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

const ToastWrapperComponent = ({
  swipeDirection = 'down',
  duration = 3000,
  position = 'bottom-center',
}: ToastContainerProps) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <Primitive.ToastProvider swipeDirection={swipeDirection} duration={duration}>
      {/* Viewport */}
      <Primitive.Viewport
        className={cn(
          styles.start,
          styles.toast_wrap,
          'toast-viewport',
          swipeDirection && styles[swipeDirection],
          position && styles[position],
        )}
      />

      {/* loop Toast */}
      {Array.from(toasts.entries()).map(([index, toastConfig]) => (
        <ToastContainer index={index} key={index} config={toastConfig} />
      ))}
    </Primitive.ToastProvider>
  );
};
export const ToastWrapper = ToastWrapperComponent;
