import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys, queryOptions, mutateOptions } from './space.queries';

export function useFetchSpace(id: number) {
  return useQuery({ ...queryOptions.detail(id) });
}

export function useCreateSpace(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: queryKeys.list });
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

export function useCheckExistsSpaceCode(options: any) {
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
    checkExistsSpaceCode: (payload: any, callback?: any) => {
      mutate(payload, callback);
      options?.onSuccess?.(false);
    },
    isSuccess,
    isError,
  };
}
