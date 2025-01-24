import { createElement, ReactNode, useCallback } from 'react';
import { reject } from 'lodash';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalClose, ModalConfig, ModalControl } from './type';

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
      const modalContent = createElement(Alert, props);
      const modalConfig = {
        hideCloseButton: true,
      };
      const onClose = props.onClose;
      openModal(modalContent, modalConfig, onClose);
    },
    [openModal],
  );

  const confirm = useCallback(
    (props: AlertComponentProps) => {
      const modalContent = createElement(Alert, { ...props, isConfirm: true });
      const modalConfig = {
        hideCloseButton: true,
      };
      const onClose = props.onClose;
      openModal(modalContent, modalConfig, onClose);
    },
    [openModal],
  );

  return {
    open,
    openAsync,
    alert,
    confirm,
  };
};

export { useModalControl };
