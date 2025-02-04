import { ReactNode } from 'react';
import { AlertComponentProps } from '../alert/alert';
//import { ConfirmComponentProps } from '../confirm/confirm';

export type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full'; // sm : 600px , md : 800px, lg : 1024px, xl : 1400px
export type ModalHeight = 'auto' | 'sm' | 'md' | 'lg' | 'full';
export interface ModalConfig {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  width?: ModalSize;
  height?: ModalHeight;
  preventBackdropClose?: boolean;
  hideCloseButton?: boolean;
}

export interface BaseModalProps extends ModalConfig {
  onClose?: (data?: any) => void;
  children: React.ReactNode;
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

// TODO: rename : ModalControl > useModalReturnValue
export interface ModalControl {
  // TODO: open: (modal: ModalData) => void
  open: <T = any>(
    content: ReactNode,
    config?: ModalConfig,
    onClose?: (data?: ModalClose<T>) => void,
  ) => void;
  alert: (props: AlertComponentProps) => void;
  confirm: (props: any) => void;
  openAsync: <T = any>(content: ReactNode, config?: ModalConfig) => Promise<ModalClose<T>>;
}

export interface AlertData {
  title?: string | ReactNode;
  description?: string | ReactNode;
  content?: string | ReactNode;
  onClose?: (data?: ModalClose) => void;
}
