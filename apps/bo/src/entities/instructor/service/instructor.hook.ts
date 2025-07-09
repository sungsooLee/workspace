import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys, queryOptions, mutateOptions } from './instructor.queries';

export function useFetchInstructors(param: any) {
  return useQuery(queryOptions.all(param));
}

export function useCreateInstructor(options: any) {
  const mutation = useMutation({
    ...mutateOptions.create(),
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

export function useUpdateInstructor(options: any) {
  const mutation = useMutation({
    ...mutateOptions.update(),
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

export function useDeleteInstructor(options: any) {
  const mutation = useMutation({
    ...mutateOptions.delete(),
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
