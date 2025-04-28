import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  queryKeys,
  tenantMenuManageQueryOptions as queryOptions,
  mutateOptions,
} from './tenant-menu-manage.queries';

export function useMenuTenantMappingTreeFetch(tenantId: number, deviceType: string) {
  return useQuery(queryOptions.tree(tenantId, deviceType));
}

export function useMenuTenantManageDetail(menuId: string) {
  return useQuery({ ...queryOptions.detail(menuId), enabled: !!menuId });
}

export function useCreateMenuTenant(tenantId: number, menuScope: string, options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...mutateOptions.createMenuTenent(),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.tree, tenantId, menuScope],
      });
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
  };
}

export function useUpdateMenuTenant(tenantId: string, menuScope: string, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateMenuTenent(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: [queryKeys.tree, tenantId, menuScope] });

      // 외부에서 제공된 onSuccess 콜백이 있으면 실행
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useDeleteMenuTenent(tenantId: string, deviceType: string, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.deleteMenuTenent(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: [queryKeys.tree, tenantId, deviceType] });

      // 외부에서 제공된 onSuccess 콜백이 있으면 실행
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    delete: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
