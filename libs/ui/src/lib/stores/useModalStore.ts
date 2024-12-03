import { create } from 'zustand';
import { ModalClose, ModalConfig, ModalData } from '../modal/type';
import { ReactNode } from 'react';

interface ModalStore {
  modals: ModalData[];
  open: <T>(
    content: ReactNode,
    config?: ModalConfig,
    onClose?: (data?: ModalClose<T>) => void,
  ) => void;
  close: <T>(index: number, data?: ModalClose<T>) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],
  open: (content, config, onClose) => {
    set((state) => ({
      modals: [...state.modals, { content, config, onClose }],
    }));
  },
  close: (index: number, data?: any) => {
    const modal = get().modals[index];

    if (modal.onClose) modal.onClose?.(data);
    else modal?.resolver?.(data);

    set((state) => ({
      modals: state.modals.filter((_, i) => i !== index),
    }));
  },
}));
