import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys, usersQueryOptions as queryOptions, mutateOptions } from './users.queries';

export function useFetchUser(userUuid: string) {
  return useQuery(queryOptions.detail(userUuid));
}

/** 사용자 생성 뮤테이션  */
export function useCreateUser(options: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.all });
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

export function useUnlockUser(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.unlock(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...mutateOptions,
  });

  return {
    unlock: (payload: any, callback?: any) => {
      mutate(payload, callback);
      options?.onSuccess?.(false);
    },
    isSuccess,
    isError,
  };
}

export function useApproveAccountUser(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.approve(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...mutateOptions
  });

  return {
    approve: (payload: any, callback?: any) => {
      mutate(payload, callback);
      options?.onSuccess?.(false);
    },
    isSuccess,
    isError,
  }
}

export function useRejectAccountUser(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.reject(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...mutateOptions
  });

  return {
    reject: (payload: any, callback?: any) => {
      mutate(payload, callback);
      options?.onSuccess?.(false);
    },
    isSuccess,
    isError,
  }
}

export function useUpdateUser(options: any) {
  const mutation = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data, variables, context) => {
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
