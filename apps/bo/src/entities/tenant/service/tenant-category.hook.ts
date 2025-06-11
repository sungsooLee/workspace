import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryOptions, mutateOptions, queryKeys } from './tenant-category.queries';

export function useFetchTenantCategory(tenantId: number) {
  return useQuery(queryOptions.all(tenantId));
}

export function useFetchTenantCategoryDetail(tenantId: number, id: number) {
  return useQuery({ ...queryOptions.detail(tenantId, id) });
}

export function useCreateTenantCategory(tenantId: number, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all(tenantId) });

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

export function useDeleteTenantCategory(tenantId: number, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.delete(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all(tenantId) });

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

export function useUpdateTenantCategory(tenantId: number, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all(tenantId) });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.all(tenantId), data] });

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

export function useMoveTenantCategory(tenantId: number, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.move(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all(tenantId) });

      // 외부에서 제공된 onSuccess 콜백이 있으면 실행
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    move: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useMappingTenantCategory(tenantId: number, options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.mapping(),
    onSuccess: async (data, variables, context) => {
      // 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all(tenantId) });

      // 외부에서 제공된 onSuccess 콜백이 있으면 실행
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    mapping: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
