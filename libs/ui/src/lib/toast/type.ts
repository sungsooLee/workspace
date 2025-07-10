import React, { ReactNode } from 'react';

export interface ToastConfig {
  title?: string;
  description?: string | ReactNode;
  type?: 'success' | 'error'; // 기획 나오면 재정의
  duration?: number;
  onClose?: () => void;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
}

export interface ToastData {
  config?: ToastConfig;
  onClose?: () => void;
}

export interface useToastReturnValue {
  open: (config: ToastConfig) => void;
  closeAll: () => void;
}
