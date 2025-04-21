import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryOptions, mutateOptions, queryKeys } from './category.queries';
import { CategoryDetail } from '@types';

export function useFetchCategory() {
  return useQuery(queryOptions.all());
}

export function useFetchCategoryDetail(id: number, mode: string) {
  return useQuery(queryOptions.detail(id, mode));
}

export function useCreateCategory(options: any) {
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

export function useDeleteCategory(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.delete(),
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
    delete: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateCategory(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data, variables, context) => {
      // 메뉴 트리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.all, data] });

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

export function useCheckExistsCategory(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.checkExists(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...mutateOptions,
  });

  return {
    checkExistsCategory: (payload: any, callback?: any) => {
      mutate(payload, callback);
      options?.onSuccess?.(false);
    },
    isSuccess,
    isError,
  };
}

export function useMoveCategory(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.move(),
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
    move: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
