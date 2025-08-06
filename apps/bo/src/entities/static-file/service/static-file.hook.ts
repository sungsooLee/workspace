import { useMutation, useQuery } from '@tanstack/react-query';
import { staticFileMutateOptions, staticFileQueryOptions as queryOptions } from '@entities/static-file';

export const useFetchStaticFile = (fileUuid: string) => {
  return useQuery({...queryOptions.detail(fileUuid)});
}

export const useCreateStaticFile = (options: any) => {
  const mutation = useMutation({
    ...staticFileMutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data
  };
}

export const useUpdateStaticFile = (options: any) => {
  const mutation = useMutation({
    ...staticFileMutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data
  };
}

export const useDeleteStaticFile = (options: any) => {
  const mutation = useMutation({
    ...staticFileMutateOptions.delete(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options
  })

  return {
    delete: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data
  }
}
