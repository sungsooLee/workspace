import { last } from 'lodash-es';
import { create } from 'zustand';
import { ModalConfig } from '../modal/type';

interface ModalStore {
  modals: ModalConfig[]; // modal stack
  openModal: (config: ModalConfig) => void;
  closeModal: (data?: any) => void;
  closeAllModal: () => void;
  activeModal: () => ModalConfig | undefined;
  getModal: (id: string) => ModalConfig | undefined;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],
  openModal: (config: ModalConfig) => {
    set((state) => ({
      modals: [...state.modals, config],
    }));
  },
  closeModal: (data?: any) => {
    const modal = get().modals?.at(-1); // 마지막 모달 (현재 떠있는 모달)

    modal?.onClose?.(data);

    set((state) => ({
      modals: state.modals?.slice(0, -1), // 마지막 모달만 제외한 새로운 배열 반환
    }));
  },
  activeModal: () => {
    return last(get().modals);
  },
  closeAllModal: () => set({ modals: [] }),
  getModal: (id: string) => {
    return get().modals?.find((d: ModalConfig) => d.id === id); // 마지막 모달 (현재 떠있는 모달)
  },
}));
