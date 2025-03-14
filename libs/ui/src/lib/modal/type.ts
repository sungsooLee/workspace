import { ReactNode } from 'react';
import { AlertComponentProps } from '../alert/alert';

export type ModalSize = 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'm_full'; // sm : 600px , md : 800px, lg : 1024px, xl : 1400px, m_full : 모바일 full
export type ModalHeight = 'auto' | 'sm' | 'md' | 'lg' | 'full';

export interface ModalConfig<T = any> {
  content: ReactNode;
  id?: string; // modal.hook 에서 open시 자동생성
  title?: string;
  description?: string;
  width?: ModalSize;
  height?: ModalHeight;
  hideCloseButton?: boolean;
  onClose?: (data?: ModalClose<T>) => void;
  children?: React.ReactNode;
}

export interface ModalClose<T = any> {
  data?: T;
}

export interface useModalReturnValue {
  modals: ModalConfig[];
  open: (props: ModalConfig) => Promise<any>;
  close: (data?: any) => void;
  closeAll: () => void;
  alert: (props: AlertComponentProps | string) => void;
  confirm: (props: AlertComponentProps | string) => void;
  openAsync: <T = any>(props: ModalConfig) => Promise<any>;
}
