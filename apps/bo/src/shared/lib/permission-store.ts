import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import permissionMock from '../../entities/mock/user-permission.json';

interface PermissionState {
  apis: Record<string, boolean>;
  loading: boolean;
  initialized: boolean;

  setApiPermissions: (permissions: Record<string, boolean>) => void;
  fetchPermissions: () => Promise<void>;
  hasApiAccess: (apiKey: string) => boolean;
}

export const usePermissionStore = create<PermissionState>()(
  devtools(
    persist(
      (set, get) => ({
        apis: {},
        loading: false,
        initialized: false,

        setApiPermissions: (permissions: Record<string, boolean>) => {
          set({ apis: permissions });
        },

        fetchPermissions: async () => {
          set({ loading: true });

          try {
            // 서버에서 권한 데이터 가져오기
            const data = permissionMock;

            // API 권한 처리
            const apiPermissions: Record<string, boolean> = {};

            // 서버 응답에 맞게 조정 필요
            data.apis.forEach((api: any) => {
              apiPermissions[api.key] = api.hasAccess;
            });
            console.log(apiPermissions);
            set({
              apis: apiPermissions,
              loading: false,
              initialized: true,
            });
          } catch (error) {
            set({ loading: false });
          }
        },

        hasApiAccess: (apiKey: string) => {
          const state = get();
          if (!state.initialized || state.loading) return false;
          return state.apis[apiKey] || false;
        },
      }),
      {
        name: 'permission-storage',
        partialize: (state) => ({
          apis: state.apis,
          initialized: state.initialized,
        }),
      },
    ),
  ),
);
