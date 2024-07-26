import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_TYPES, ThemeState } from '../types/theme';

const { THEME_LIGHT, THEME_DARK } = THEME_TYPES;

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: THEME_LIGHT,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
        })),
    }),
    {
      name: 'theme',
    }
  )
);

export default useThemeStore;
