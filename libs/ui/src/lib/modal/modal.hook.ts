import { createElement, useCallback } from 'react';
import { reject } from 'lodash';
import { useModalStore } from '../stores/useModalStore';
import { Alert, AlertComponentProps } from '../alert/alert';
import { ModalClose, ModalConfig, ModalControl } from './type';

// TODO: rename : useModalControl > useModal
const useModalControl = (): ModalControl => {
  const { open: openModal } = useModalStore();

  const open = useCallback(
    (config: ModalConfig) => {
      openModal(config);
    },
    [openModal],
  );

  const openAsync = useCallback(
    <T = any>(config: ModalConfig): Promise<ModalClose<T>> => {
      return new Promise((resolve) => {
        const wrapper = (data?: ModalClose<T>) => {
          if (data) resolve(data);
          else reject(new Error('ERROR Async Modal'));
        };
        openModal(config);
      });
    },
    [openModal],
  );

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
    openAsync,
    alert,
    confirm,
  };
};

export { useModalControl };
