import { useToastStore } from '../stores/useToastStore';
import { Toast } from './toast';
import * as Primitive from '@radix-ui/react-toast';

import { ToastConfig } from './type';
import React from 'react';

interface ToastContainerProps {
  index: number;
  config: ToastConfig;
}

const ToastContainerComponent = ({
  index,
  config,
}: ToastContainerProps) => {
  const close = useToastStore((state) => state.close);

  const handleClose = () => {
    close(index);
  };

  return (
    <Toast config={config} onClose={handleClose} />
  );
};

ToastContainerComponent.displayName = 'ToastContainer';

export const ToastContainer = ToastContainerComponent;
