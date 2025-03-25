import { ReactNode } from 'react';
import { AlertComponentProps } from '../alert/alert';

export type ModalSize = 'auto' | 's' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'm_full'; // s : 400px , sm : 600px , md : 800px, lg : 1024px, xl : 1400px, m_full : 모바일 full
export type ModalHeight = 'auto' | 'sm' | 'md' | 'lg' | 'full';

export interface ModalConfig<T = any> {
  content: ReactNode;
  id?: string; // modal.hook 에서 open시 자동생성
  width?: ModalSize;
  height?: ModalHeight;
  hideCloseButton?: boolean;
  onClose?: (data?: ModalClose<T>) => void;
}

export interface ModalClose<T = any> {
  data?: T;
}

export interface useModalReturnValue {
  modals: ModalConfig[];
  open: (props: ModalConfig) => Promise<any>;
  close: (data?: any) => void;
  closeAll: () => void;
  alert: (props: AlertComponentProps | string) => Promise<boolean>;
  confirm: (props: AlertComponentProps | string) => Promise<boolean>;
}
