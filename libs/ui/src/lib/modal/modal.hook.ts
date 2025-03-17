import { createElement, useCallback } from 'react';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalConfig, useModalReturnValue } from './type';
import { getRandomId } from '@learnway/shared';

const useModal = (): useModalReturnValue => {
  const { modals, open: openModal, close: closeModal, closeAll: closeAllModal } = useModalStore();

  const open = useCallback(
    (config: ModalConfig): Promise<any> => {
      return new Promise((resolve, reject) => {
        const newConfig: ModalConfig = {
          ...config,
          id: getRandomId(),
          width: config.width || 'md', // modal 은 기본 width 'md'
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
    alert,
    confirm,
    modals,
  };
};

export { useModal };
