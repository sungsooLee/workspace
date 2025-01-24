import { createElement, ReactNode, useCallback } from 'react';
import { reject } from 'lodash';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { AlertData, ModalClose, ModalConfig, ModalControl } from './type';

// TODO: rename : useModalControl > useModal
const useModalControl = (): ModalControl => {
  const { open: openModal } = useModalStore();

  const open = useCallback(
    (content: ReactNode, config?: ModalConfig, onClose?: (data?: any) => void) => {
      openModal(content, config, onClose);
    },
    [openModal],
  );

  const openAsync = useCallback(
    <T = any>(content: ReactNode, config?: ModalConfig): Promise<ModalClose<T>> => {
      return new Promise((resolve) => {
        const wrapper = (data?: ModalClose<T>) => {
          if (data) resolve(data);
          else reject(new Error('ERROR Async Modal'));
        };
        openModal(content, config, wrapper);
      });
    },
    [openModal],
  );

  const alert = useCallback(
    (props: AlertComponentProps) => {
      openModal(createElement(Alert, props));
      // openModal(<h1></h1>, props.config, props.onClose);
    },
    [openModal],
  );

  return {
    open,
    openAsync,
    alert,
    // confirm,
  };
};

export { useModalControl };
