import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  mutateOptions,
  queryKeys,
  menuManageQueryOptions as queryOptions,
} from './menu-manage.queries';
import { useApiMutation, useApiQuery } from '../../../shared/lib/use-authorized-query';
import { MenuManageApi } from '../api/menu-manage';
import { MenuDetail } from '../../../types/entities/menu';
import { useState } from 'react';
import { callbackify } from 'util';

export function useMenuMangeFetchMenus() {
  return useQuery(queryOptions.all());
}

export function useMenuManageFetchTree(menuScopeCode: string, locale: string) {
  return useQuery(queryOptions.tree(menuScopeCode, locale));
}

export function useMenuTree(menuScopeCode: string, locale: string, options?: any) {
  return useApiQuery<any, { menuScopeCode: string; locale: string }>(
    MenuManageApi.menuTree,
    { menuScopeCode, locale },
    queryKeys.menuTree(menuScopeCode, locale),
    options,
  );
}

export function useFetchMenuFavorites(payload: any) {
  return useQuery(queryOptions.allFavorites(payload));
}

export function useCreateMenu(options: any) {
  const mutation = useApiMutation(MenuManageApi.create, undefined, {
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    invalidateQueries: [queryKeys.all],
    ...options,
  });
  return {
    ...mutation,
    create: mutation.mutate,
  };
}

export function useUpdateMenu(options: any) {
  const mutation = useApiMutation(MenuManageApi.update, undefined, {
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    invalidateQueries: [queryKeys.all],
    ...options,
  });
  return {
    ...mutation,
    update: mutation.mutate,
  };
}

export function useMenuManageDetail(menuId: string, options?: any) {
  return useApiQuery<MenuDetail, { menuId: string }>(
    MenuManageApi.detail,
    { menuId },
    queryKeys.detail(menuId),
    options,
  );
}

export function useCheckExistsMenu(options?: {
  onSuccess?: (data: boolean) => void;
  onError?: (error: any) => void;
}) {
  const [queryParams, setQueryParams] = useState<{
    menuScopeCode: string;
    menuCode: string;
  } | null>(null);

  const queryKey = queryParams
    ? queryKeys.checkDuplicate(queryParams.menuScopeCode, queryParams.menuCode)
    : ['checkDuplicate', 'initial'];

  const queryResult = useApiQuery<boolean, { menuScopeCode: string; menuCode: string }>(
    MenuManageApi.checkDuplicate,
    queryParams || undefined,
    queryKey,
    {
      enabled: false,
    },
  );

  const checkExistsMenu = (payload: { menuScopeCode: string; menuCode: string }) => {
    setQueryParams(payload);

    setTimeout(() => {
      queryResult
        .refetch()
        .then((result: any) => {
          if (result.isSuccess && options?.onSuccess) {
            options.onSuccess(result.data);
          }
        })
        .catch((error) => {
          if (options?.onError) {
            options.onError(error);
          }
        });
    }, 0);
  };

  return {
    ...queryResult,
    checkExistsMenu,
  };
}

export function useDeleteMenu(options: any) {
  const mutation = useApiMutation(MenuManageApi.delete, undefined, {
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    invalidateQueries: [queryKeys.all],
    ...options,
  });

  return {
    ...mutation,
    delete: mutation.mutate,
  };
}

export function useMoveMenu(options: any) {
  const mutation = useApiMutation(MenuManageApi.move, undefined, {
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    invalidateQueries: [queryKeys.all],
    ...options,
  });
  return {
    ...mutation,
    move: mutation.mutate,
  };
}

export function useCreateMenuFavorites(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.createFavorites(),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    ...mutation,
    createMenuFavorites: (payload: any, callback?: any) => {
      console.log('### createMenuFavorites', payload);
      mutation.mutate(payload, callback);
    },
  };
}

export function useDeleteMenuFavorites(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.deleteFavorites(),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    ...mutation,
    deleteMenuFavorites: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
  };
}
