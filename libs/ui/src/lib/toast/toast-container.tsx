import { useToastStore } from '../stores/useToastStore';
import { Toast } from './toast';
import * as Primitive from "@radix-ui/react-toast";

import { ToastConfig } from './type';
import React from 'react';

interface ToastContainerProps {
  index: number;
  config: ToastConfig;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const ToastContainerComponent = ({ index, config, swipeDirection = 'right', duration = 3000 }: ToastContainerProps) => {
  const close = useToastStore((state) => state.close);

  const handleClose = () => {
    close(index);
  };

  return (
    <Primitive.ToastProvider swipeDirection={swipeDirection} duration={duration}>
      <Toast config={config} onClose={handleClose} />
    </Primitive.ToastProvider>
  );
};

ToastContainerComponent.displayName = 'ToastContainer';

export const ToastContainer =  ToastContainerComponent;
