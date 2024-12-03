import { ReactNode, useCallback } from 'react';
import { reject } from 'lodash';
import { useModalStore } from '../stores/useModalStore';
import { ModalClose, ModalConfig, ModalControl } from './type';

const useModalControl = (): ModalControl => {
  const { open: openModal } = useModalStore();

  const open = useCallback(
    <T = any>(
      content: ReactNode,
      config?: ModalConfig,
      onClose?: (data?: ModalClose<T>) => void,
    ) => {
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

  return {
    open,
    openAsync,
  };
};

export default useModalControl;
