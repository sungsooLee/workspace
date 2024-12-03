import { ReactNode } from 'react';

export interface ModalConfig {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  width?: string;
  height?: string;
  preventBackdropClose?: boolean;
  isClosable?: boolean;
}

export interface ModalClose<T = any> {
  data?: T;
}
export interface ModalData {
  content: React.ReactNode;
  config?: ModalConfig;
  onClose?: (data?: ModalClose) => void;
  resolver?: (data?: ModalClose) => void;
}

export interface ModalContainerProps {
  index: number;
  data: ModalData;
}

export interface BaseModalProps extends ModalConfig {
  onClose?: (data?: any) => void;
  children: React.ReactNode;
}

export interface ModalControl {
  open: <T = any>(
    content: ReactNode,
    config?: ModalConfig,
    onClose?: (data?: ModalClose<T>) => void,
  ) => void;
  openAsync: <T = any>(content: ReactNode, config?: ModalConfig) => Promise<ModalClose<T>>;
}
