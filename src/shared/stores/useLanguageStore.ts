import i18n, { initI18n } from '@/app/i18n/i18n';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: string;
  setLanguage: (newLanguage: string) => void;
}

const useLanguageStore = create(
  persist<LanguageState>(
    (set) => ({
      language: i18n.language,
      setLanguage: (newLanguage: string) => {
        i18n.changeLanguage(newLanguage);
        set({ language: newLanguage });
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            initI18n(state.language);
          }
        };
      },
    }
  )
);

export default useLanguageStore;
