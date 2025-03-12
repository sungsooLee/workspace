import { createElement, useCallback } from 'react';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalConfig, ModalControl } from './type';
import { getRandomId } from '@learnway/shared';

// TODO: rename : useModal > useModal
const useModal = (): ModalControl => {
  const { modals, open: openModal, close: closeModal, closeAll: closeAllModal } = useModalStore();

  const open = useCallback(
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

  // open 만 사용 예정
  const openAsync = useCallback(
    (config: ModalConfig): Promise<any> => {
      return open(config);
    },
    [openModal],
  );

  const close = useCallback((data?: any) => closeModal(data), [closeModal]);

  const closeAll = useCallback(() => closeAllModal(), [closeAllModal]);

  const alert = useCallback(
    (props: AlertComponentProps | string): Promise<any> => {
      return new Promise((resolve, reject) => {
        const defaultProps =
          typeof props === 'string'
            ? {
                title: props,
                onClose: () => null,
              }
            : {
                ...props,
              };
        const config: ModalConfig = {
          content: createElement(Alert, defaultProps),
          hideCloseButton: true,
          onClose: (value: any) => {
            defaultProps?.onClose?.(value);
            resolve(value);
          },
        };
        openModal(config);
      });
    },
    [openModal],
  );

  const confirm = useCallback(
    (props: AlertComponentProps | string): Promise<any> => {
      return new Promise((resolve, reject) => {
        const defaultProps =
          typeof props === 'string'
            ? {
                title: props,
                isConfirm: true,
                onClose: () => null,
              }
            : {
                ...props,
                isConfirm: true,
              };
        const config = {
          content: createElement(Alert, defaultProps),
          hideCloseButton: true,
          onClose: (value: any) => {
            defaultProps?.onClose?.(value);
            resolve(value);
          },
        };
        openModal(config);
      });
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
