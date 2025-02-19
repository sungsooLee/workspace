import { createElement, ReactNode, useCallback } from 'react';
import { reject } from 'lodash';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalClose, ModalConfig, ModalConfig2, ModalControl } from './type';

// TODO: rename : useModalControl > useModal
const useModalControl = (): ModalControl => {
  const { open: openModal, open2: openModal2 } = useModalStore();

  const open = useCallback(
    (content: ReactNode, config?: ModalConfig, onClose?: (data?: any) => void) => {
      openModal(content, config, onClose);
    },
    [openModal],
  );

  const open2 = useCallback(
    (config: ModalConfig2) => {
      openModal2(config);
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
    open2,
    openAsync,
    alert,
    confirm,
  };
};

export { useModalControl };
