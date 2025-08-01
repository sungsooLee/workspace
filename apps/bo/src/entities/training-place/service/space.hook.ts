import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys, queryOptions, mutateOptions } from './space.queries';

export function useFetchSpace(id: number) {
  return useQuery({ ...queryOptions.detail(id) });
}

export function useSpaceMutation(type: 'create' | 'update' | 'delete', options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...mutateOptions[type](),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list });
      if (options.onSuccess) await options.onSuccess(data, variables, context);
    },
    ...options });

  return {
    mutate: (payload: any, callback?: any) => mutation.mutate(payload, callback),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data };
}

export function useCheckExistsSpaceCode(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.checkExists(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    } });

  return {
    checkExistsSpaceCode: (payload: any, callback?: any) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError };
}
