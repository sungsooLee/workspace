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

    if (modal?.onClose) modal.onClose?.(data);
    else if (modal?.resolver) modal.resolver?.(data); // 팝업 닫을때 error 발생해서 조건 추가, (modal = undefined)

    set((state) => ({
      modals: state.modals.filter((_, i) => i !== index),
    }));
  },
}));
