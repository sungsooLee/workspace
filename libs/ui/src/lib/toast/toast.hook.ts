import { useCallback } from 'react';
import { useToastStore } from '../stores/useToastStore';
import { ToastConfig, useToastReturnValue } from './type';

const useToast = (): useToastReturnValue => {
  const { open: openToast, closeAll: closeAllToast } = useToastStore();

  const open = useCallback(
    (config: ToastConfig) => openToast(config),
    [openToast]
  );

  const closeAll = useCallback(
    () => closeAllToast(),
    [closeAllToast]
  )

  return {
    open,
    closeAll,
  };
};

export { useToast };
