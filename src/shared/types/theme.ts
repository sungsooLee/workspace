export const THEME_TYPES = {
  THEME_DARK: 'dark',
  THEME_LIGHT: 'light',
};

export type Theme = (typeof THEME_TYPES)[keyof typeof THEME_TYPES];

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}
