import { create } from 'zustand';
import { ModalClose, ModalConfig } from '../modal/type';

interface ModalStore {
  modals: ModalConfig[];
  open: <T>(config: ModalConfig) => void;
  close: <T>(index: number, data?: ModalClose<T>) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],
  open: (config: ModalConfig) => {
    set((state) => ({
      modals: [...state.modals, config],
    }));
  },
  close: (index: number, data?: any) => {
    const modal = get().modals[index];

    modal?.onClose?.(data);

    set((state) => ({
      modals: state.modals.filter((_, i) => i !== index),
    }));
  },
}));
