import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  mutateOptions,
  queryKeys,
  menuManagerQueryOptions as queryOptions,
} from './menu-manager.queries';

export function useMenuMangerFetchMenus() {
  return useQuery(queryOptions.all());
}

export function useMenuManagerFetchTree(menuScopeCode: string, locale: string) {
  return useQuery(queryOptions.tree(menuScopeCode, locale));
}

export function useMenuManagerDetail(menuId: string) {
  return useQuery({
    ...queryOptions.detail(menuId),
    // menuId가 유효한 경우에만 쿼리 활성화
    enabled: !!menuId,
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

export function useCheckExistsMenu(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.checkExistsMenu(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...mutateOptions,
  });

  return {
    checkExistsMenu: (payload: any, callback?: any) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
