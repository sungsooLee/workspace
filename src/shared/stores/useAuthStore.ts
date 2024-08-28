import create from 'zustand';
import { persist } from 'zustand/middleware';
import { login, refreshAccessToken } from '@/app/auth/api/authService';
import { useCallApi } from '../hooks/useCallApi';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  email?: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  checkAuth: () => void;
  refreshAccessToken: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearToken: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      setAccessToken: (token: string | null) => set({ accessToken: token }),
      setRefreshToken: (token: string | null) => set({ refreshToken: token }),
      clearToken: () =>
        set({ accessToken: null, refreshToken: null, isAuthenticated: false }),
      signIn: async (email: string, password: string) => {
        try {
          const { accessToken, refreshToken } = await login(email, password);
          // const data = useCallApi(['api'], () => login(email, password));
          // console.log(data);
          // const { accessToken, refreshToken } = data.data;

          set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            email: email,
          });
        } catch (error: any) {
          set({ error, isLoading: false });
          throw error;
        }
      },

      signOut: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      refreshAccessToken: async () => {
        try {
          const refreshToken = useAuthStore.getState().refreshToken;
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }
          const { accessToken } = await refreshAccessToken(refreshToken);
          set({ accessToken, isLoading: false, error: null });
        } catch (error: any) {
          set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      checkAuth: () => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-store',
      getStorage: () => sessionStorage, // sessionStorage에 상태 저장
    }
  )
);
