import { create } from 'zustand';
import { CodeOption, CodeStore } from './types';
import { fetchCodeGroup } from './utils';
import { codeOptions } from './config';

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
  getCode: async (group, filter) => {
    const codeOption = codeOptions[group];
    let data = [] as CodeOption[];
    // CodeOptions 에 캐시를 사용하지 않는다면 무조건 재 조회
    if (codeOption && codeOption.disableCache) {
      data = await fetchCodeGroup(group, filter);
      return data;
    } else {
      const cached = get().code[group];
      if (cached && cached.length > 0) {
        return cached;
      }
      data = await fetchCodeGroup(group);
      get().setCode(group, data);
      return data;
    }
  },

  reset: () => {
    set({ code: {} });
  },
}));
