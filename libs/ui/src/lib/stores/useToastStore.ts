import { create } from 'zustand';
import { ToastConfig } from '../toast/type';

interface ToastStore {
  toasts: ToastConfig[];
  open: (config: ToastConfig) => void;
  close: <T>(index: number, data?: any) => void;
  closeAll: () => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  open: (toast: ToastConfig) => {
    set((state) => ({
      toasts: [...state.toasts, toast],
    }));
  },
  close: (index: number, data?: any) => {
    const modal = get().toasts[index];
    modal?.onClose && modal.onClose();

    set((state) => ({
      toasts: state.toasts.filter((_, i) => i !== index),
    }));
  },
  closeAll: () => {
    set((state) => ({
      toasts: [],
    }));
  },
}));

export const showToast = (config: ToastConfig): void => {
  useToastStore.getState().open(config);
};

export const closeToast = (index: number, data?: any): void => {
  useToastStore.getState().close(index, data);
};

export const closeAllToasts = (): void => {
  useToastStore.getState().closeAll();
};
