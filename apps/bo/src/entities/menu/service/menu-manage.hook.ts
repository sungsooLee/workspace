import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MenuMangerService from '../api/menu-manage';
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

export function useMenuTree(menuScopeCode: string, locale: string) {
  return useQuery(queryOptions.tree(menuScopeCode, locale));
}

export function useMenuManageDetail(menuId: string) {
  return useQuery(queryOptions.detail(menuId));
}

export function useFetchMenuFavorites(payload: any) {
  return useQuery(queryOptions.allFavorites(payload));
}

export function useCreateMenu(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: any) => MenuMangerService.createMenu(payload),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    ...mutation,
    create: mutation.mutate,
  };
}

export function useUpdateMenu(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: any) => MenuMangerService.updateMenu(payload),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    ...mutation,
    update: mutation.mutate,
  };
}

export function useCheckExistsMenu() {
  const queryClient = useQueryClient();

  const checkExists = async (menuScopeCode: string, menuCode: string) => {
    if (!menuScopeCode || !menuCode) {
      throw new Error('menuScopeCode and menuCode are required');
    }

    return await queryClient.fetchQuery(queryOptions.checkDuplicate(menuScopeCode, menuCode));
  };

  return {
    checkExists,
  };
}

export function useDeleteMenu(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: any) => MenuMangerService.deleteMenu(payload),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    ...mutation,
    delete: (payload: any, callback?: any) => mutation.mutate(payload, callback),
  };
}

export function useMoveMenu(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: any) => MenuMangerService.moveMenu(payload),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    ...mutation,
    move: (payload: any, callback?: any) => mutation.mutate(payload, callback),
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

export function useMoveMenuFavorites(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.moveMenuFavorites(),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    ...mutation,
    moveMenuFavorites: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
  };
}
