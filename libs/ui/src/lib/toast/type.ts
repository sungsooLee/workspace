import React, { ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-toast';

export interface ToastConfig {
  title?: string;
  description?: string | ReactNode;
  type?: 'info' | 'success' | 'warning'; // 기획 나오면 재정의
  onClose?: () => void;
}

export interface ToastData {
  config?: ToastConfig;
  onClose?: () => void;
}

export interface useToastReturnValue {
  open: (config: ToastConfig) => void;
  closeAll: () => void;
}
