import { getDefaultLang } from '@learnway/config';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type LanguageStore = {
  lang: string; // 최근본 메뉴
  setLang: (lang: string) => void;
  getLang: () => string;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: getDefaultLang(),
      setLang: (data: string) => {
        set((state) => ({ ...state, lang: data }));
      },
      getLang: () => {
        const lang = get().lang;
        return lang;
      },
    }),
    {
      name: 'language-store', // localStorage 키
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lang: state.lang }),
    },
  ),
);
