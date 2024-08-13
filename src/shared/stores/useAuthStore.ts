import create from 'zustand';
import { persist } from 'zustand/middleware';
import { login, refreshAccessToken } from '@/app/auth/api/authService';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
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
          set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
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

// import create from 'zustand';
// import { persist } from 'zustand/middleware';
// import { login, refreshAccessToken } from '@/app/auth/api/authService';

// interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: Error | null;
//   signIn: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
//   checkAuth: () => void;
//   refreshAccessToken: () => Promise<void>;
//   setAccessToken: (token: string | null) => void;
// }

// export const useAuthStore = create(
//   persist<AuthState>(
//     (set) => ({
//       accessToken: null,
//       refreshToken: null,
//       isAuthenticated: false,
//       isLoading: true,
//       error: null,
//       setAccessToken: (token: string | null) => {
//         set({ accessToken: token });
//         sessionStorage.setItem('accessToken', token!);
//       },
//       signIn: async (email: string, password: string) => {
//         try {
//           const { accessToken, refreshToken } = await login(email, password);
//           set({
//             accessToken,
//             refreshToken,
//             isAuthenticated: true,
//             isLoading: false,
//             error: null,
//           });
//           sessionStorage.setItem('accessToken', accessToken);
//           sessionStorage.setItem('refreshToken', refreshToken);
//         } catch (error: any) {
//           set({ error, isLoading: false });
//           throw error;
//         }
//       },

//       signOut: () => {
//         set({
//           accessToken: null,
//           refreshToken: null,
//           isAuthenticated: false,
//           isLoading: false,
//           error: null,
//         });
//         sessionStorage.removeItem('accessToken');
//         sessionStorage.removeItem('refreshToken');
//       },
//       refreshAccessToken: async () => {
//         try {
//           const refreshToken = sessionStorage.getItem('refreshToken');
//           if (!refreshToken) {
//             throw new Error('No refresh token available');
//           }
//           const { accessToken } = await refreshAccessToken(
//             refreshToken as string
//           );
//           set({ accessToken, isLoading: false, error: null });
//           sessionStorage.setItem('accessToken', accessToken);
//         } catch (error: any) {
//           set({
//             accessToken: null,
//             refreshToken: null,
//             isAuthenticated: false,
//           });
//           sessionStorage.removeItem('accessToken');
//           sessionStorage.removeItem('refreshToken');
//           throw error; // 오류를 던져서 상위 로직에서 처리하도록 함
//         }
//       },
//       checkAuth: async () => {
//         try {
//           const accessToken = sessionStorage.getItem('accessToken');
//           console.log(accessToken);
//           if (accessToken) {
//             set({ isAuthenticated: true });
//           } else {
//             set({ isAuthenticated: false });
//           }
//         } catch (error) {
//           set({ isAuthenticated: false });
//           set({ accessToken: null, refreshToken: null }); // 인증 실패 시 로그아웃 처리
//           sessionStorage.removeItem('accessToken');
//           sessionStorage.removeItem('refreshToken');
//         }
//       },
//     }),
//     {
//       name: 'auth-store',
//       getStorage: () => sessionStorage,
//     }
//   )
// );
