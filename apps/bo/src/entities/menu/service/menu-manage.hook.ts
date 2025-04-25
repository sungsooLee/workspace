import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  mutateOptions,
  queryKeys,
  menuManageQueryOptions as queryOptions,
} from './menu-manage.queries';

export function useMenuMangeFetchMenus() {
  return useQuery(queryOptions.all());
}

export function useMenuManageFetchTree(menuScopeCode: string, locale: string) {
  return useQuery(queryOptions.tree(menuScopeCode, locale));
}

export function useMenuManageDetail(menuId: string, enabled?: boolean) {
  return useQuery({
    ...queryOptions.detail(menuId),
    // menuId가 유효한 경우에만 쿼리 활성화
    enabled: !!menuId,
    placeholderData: keepPreviousData,
  });
}

export function useCreateMenu(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });

      // 외부에서 제공된 onSuccess 콜백이 있으면 실행
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateMenu(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateMenu(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });
      // await queryClient.invalidateQueries({ queryKey: queryKeys.detail(data.menuId) });
    },
    ...options,
  });
  return {
    updateMenu: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useCheckExistsMenu(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.checkExistsMenu(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    checkExistsMenu: (payload: any, callback?: any) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
export function useDeleteMenu(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.deleteMenu(),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    deleteMenu: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useMoveMenu(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.moveMenu(),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    moveMenu: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
