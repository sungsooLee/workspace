import { CPSignupType } from '@types';
import { create } from 'zustand';

interface StoreData {
  businessCode: string;
  page: CPSignupType;
}

const initalData: StoreData = {
  businessCode: '',
  page: 'check',
};

interface CPStore extends StoreData {
  reset: () => void;
  setBusinessCode: (v: string) => void;
  setPage: (v: CPSignupType) => void;
}

export const useCPStore = create<CPStore>((set, get) => ({
  businessCode: '',
  page: 'check',
  setBusinessCode: (v: string) => {
    set((state) => ({
      ...state,
      businessCode: v,
    }));
  },
  setPage: (v: CPSignupType) => {
    set((state) => ({
      ...state,
      page: v,
    }));
  },
  reset: () => {
    set({ ...initalData });
  },
}));
