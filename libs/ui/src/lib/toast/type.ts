import React, { ReactNode } from 'react';

export interface ToastConfig {
  title?: string;
  description?: string | ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error'; // 기획 나오면 재정의
  duration?: number;
  onClose?: () => void;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}

export interface ToastData {
  config?: ToastConfig;
  onClose?: () => void;
}

export interface useToastReturnValue {
  open: (config: ToastConfig) => void;
  closeAll: () => void;
}
