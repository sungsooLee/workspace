import { ReactNode } from 'react';
import { AlertComponentProps } from '../alert/alert';
//import { ConfirmComponentProps } from '../confirm/confirm';

export type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full'; // sm : 600px , md : 800px, lg : 1024px, xl : 1400px
export type ModalHeight = 'auto' | 'sm' | 'md' | 'lg' | 'full';
export type FooterButtonType = 'cancel' | 'confirm' | 'reset';

export interface BaseModalProps {
  setModalData: (data: any) => void;
  onClose?: (data?: any) => void;
  children: React.ReactNode;
}

export interface ModalConfig<T = any> {
  content: ReactNode;
  id?: string; // modal.hook 에서 open시 자동생성
  title?: string;
  description?: string;
  width?: ModalSize;
  height?: ModalHeight;
  preventBackdropClose?: boolean;
  hideCloseButton?: boolean;
  onClose?: (data?: ModalClose<T>) => void;
  children?: React.ReactNode;
  footer?: React.ReactNode | boolean; // true 설정시 default footer 사용
  // footerButton?: Button[];
  params?: any; // modal 에 보낼 parameter
}

export interface ModalClose<T = any> {
  data?: T;
}

export interface ModalContainerProps {
  index: number;
  config: ModalConfig;
}

// TODO: rename : ModalControl > useModalReturnValue
export interface ModalControl {
  modals: ModalConfig[];
  open: (props: ModalConfig) => void;
  close: (data?: any) => void;
  closeAll: () => void;
  alert: (props: AlertComponentProps) => void;
  confirm: (props: any) => void;
  openAsync: <T = any>(props: ModalConfig) => Promise<ModalClose<T>>;
}
