import { create } from 'zustand';
import { CodeStore } from './types';
import { fetchCodeGroup } from './utils';

export const useCodeStore = create<CodeStore>((set, get) => ({
  code: {},

  setCode: (group, data) => {
    set((state) => ({
      code: {
        ...state.code,
        [group]: data,
      },
    }));
  },
  getCode: async (group) => {
    const cached = get().code[group];
    if (cached && cached.length > 0) {
      return cached;
    }
    const data = await fetchCodeGroup(group);
    get().setCode(group, data);
    return data;
  },

  reset: () => {
    set({ code: {} });
  },
}));
