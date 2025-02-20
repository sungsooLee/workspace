import { ReactNode } from 'react';
import { AlertComponentProps } from '../alert/alert';
//import { ConfirmComponentProps } from '../confirm/confirm';

export type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full'; // sm : 600px , md : 800px, lg : 1024px, xl : 1400px
export type ModalHeight = 'auto' | 'sm' | 'md' | 'lg' | 'full';

export interface BaseModalProps extends ModalConfig {
  onClose?: (data?: any) => void;
  children: React.ReactNode;
}

export interface ModalConfig<T = any> {
  content: ReactNode;
  title?: string;
  description?: string;
  width?: ModalSize;
  height?: ModalHeight;
  preventBackdropClose?: boolean;
  hideCloseButton?: boolean;
  onClose?: (data?: ModalClose<T>) => void;
  children?: React.ReactNode;
  hideFooter?: boolean;
  footer?:
    | React.ReactNode
    | {
        resetLabel?: string; // 초기화 버튼 label, 기본값: '초기화'
        cancelLabel?: string; // 취소 버튼 label, 기본값: '취소'
        confirmLabel?: string; // 확인 버튼 label, 기본값: '확인'
      };
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
  open: <T = any>(props: ModalConfig) => void;
  alert: (props: AlertComponentProps) => void;
  confirm: (props: any) => void;
  openAsync: <T = any>(props: ModalConfig) => Promise<ModalClose<T>>;
}
