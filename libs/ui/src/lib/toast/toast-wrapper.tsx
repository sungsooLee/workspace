import { useToastStore } from '../stores/useToastStore';
import { ToastContainer } from './toast-container';
import * as Primitive from '@radix-ui/react-toast';
import React from 'react';

interface ToastContainerProps {
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const ToastWrapperComponent = ({
  swipeDirection = 'right',
  duration = 3000,
}: ToastContainerProps) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <Primitive.ToastProvider swipeDirection={swipeDirection} duration={duration}>
      {/* Viewport */}
      <Primitive.Viewport
        className="toast-viewport"
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8, // 토스트 간 간격
          zIndex: 1000,
        }}
      />

      {/* loop Toast */}
      {Array.from(toasts.entries()).map(([index, toastConfig]) => (
        <ToastContainer index={index} key={index} config={toastConfig} />
      ))}
    </Primitive.ToastProvider>
  );
};
export const ToastWrapper = ToastWrapperComponent;
