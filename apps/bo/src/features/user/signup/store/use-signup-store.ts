import { SignupTypeCP, SignupTypeAdmin } from '@types';
import { create } from 'zustand';

interface StoreData {
  businessCode: string;
  cpPage: SignupTypeCP;
  adminPage: SignupTypeAdmin;
}

const initalData: StoreData = {
  businessCode: '',
  cpPage: 'check',
  adminPage: 'check',
};

interface CPStore extends StoreData {
  reset: () => void;
  setBusinessCode: (v: string) => void;
  setCpPage: (v: SignupTypeCP) => void;
  setAdminPage: (v: SignupTypeAdmin) => void;
}

export const useSignupStore = create<CPStore>((set, get) => ({
  businessCode: '',
  cpPage: 'check',
  adminPage: 'check',
  setBusinessCode: (v: string) => {
    set((state) => ({
      ...state,
      businessCode: v,
    }));
  },
  setCpPage: (v: SignupTypeCP) => {
    set((state) => ({
      ...state,
      cpPage: v,
    }));
  },
  setAdminPage: (v: SignupTypeAdmin) => {
    set((state) => ({
      ...state,
      adminPage: v,
    }));
  },
  reset: () => {
    set({ ...initalData });
  },
}));
