import { createElement, useCallback } from 'react';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalConfig, ModalControl } from './type';
import { getRandomId } from '@learnway/shared';

// TODO: rename : useModal > useModal
const useModal = (): ModalControl => {
  const { modals, open: openModal, close: closeModal, closeAll: closeAllModal } = useModalStore();

  const open = useCallback(
    (config: ModalConfig) => {
      const newConfig: ModalConfig = {
        ...config,
        id: getRandomId(),
      };
      openModal(newConfig);
    },
    [openModal],
  );

  const openAsync = useCallback(
    (config: ModalConfig): Promise<any> => {
      return new Promise((resolve, reject) => {
        const newConfig: ModalConfig = {
          ...config,
          id: getRandomId(),
          onClose: (data?: any) => {
            config?.onClose?.(data);
            resolve(data);
          },
        };
        openModal(newConfig);
      });
    },
    [openModal],
  );

  const close = useCallback((data?: any) => closeModal(data), [closeModal]);

  const closeAll = useCallback(() => closeAllModal(), [closeAllModal]);

  const alert = useCallback(
    (props: AlertComponentProps) => {
      const config: ModalConfig = {
        content: createElement(Alert, props),
        hideCloseButton: true,
        onClose: props.onClose,
      };
      openModal(config);
    },
    [openModal],
  );

  const confirm = useCallback(
    (props: AlertComponentProps) => {
      const config = {
        content: createElement(Alert, { ...props, isConfirm: true }),
        hideCloseButton: true,
        onClose: props.onClose,
      };
      openModal(config);
    },
    [openModal],
  );

  return {
    open,
    close,
    closeAll,
    openAsync, // 언제 사용?
    alert,
    confirm,
    modals,
  };
};

export { useModal };
