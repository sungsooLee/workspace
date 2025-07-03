import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  mutateOptions,
  queryKeys,
  programManageQueryOptions as queryOptions,
} from './program-manage.queries';
import { useModal } from '@learnway/ui';

type MutationHookOptions<TData = any, TError = Error, TVariables = any, TContext = unknown> = {
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables, context: TContext | undefined) => void | Promise<void>;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void | Promise<void>;
  onMutate?: (variables: TVariables) => Promise<TContext> | TContext | void;
};

export function useFetchPrograms(apiScopeCode: string) {
  return useQuery(queryOptions.all(apiScopeCode));
}

export function useFetchProgram(apiUuid: string) {
  return useQuery({ ...queryOptions.getProgram(apiUuid), enabled: !!apiUuid });
}

export const useCreateProgram = (
  apiScope?: string,
  options?: MutationHookOptions,
): UseMutationResult<any, Error, any, unknown> => {
  const queryClient = useQueryClient();
  const { showSaveComplete } = useModal();
  
  return useMutation({
    ...mutateOptions.create(),
    ...options,
    onSuccess: async (data, variables, context) => {
      showSaveComplete();
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }
    },
  });
};

export const useUpdateProgram = (
  apiScope?: string,
  options?: MutationHookOptions,
): UseMutationResult<any, Error, any, unknown> => {
  const queryClient = useQueryClient();
  const { showUpdateComplete } = useModal();
  
  return useMutation({
    ...mutateOptions.update(),
    ...options,
    onSuccess: async (data, variables, context) => {
      showUpdateComplete();
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }
    },
  });
};

export const useDeleteProgram = (
  apiScope?: string,
  options?: MutationHookOptions,
): UseMutationResult<any, Error, any, unknown> => {
  const queryClient = useQueryClient();
  const { showDeleteComplete } = useModal();
  
  return useMutation({
    ...mutateOptions.delete(),
    ...options,
    onSuccess: async (data, variables, context) => {
      showDeleteComplete();
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }
    },
  });
};

export const useDndProgram = (
  apiScope?: string,
  options?: MutationHookOptions,
): UseMutationResult<any, Error, any, unknown> => {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...mutateOptions.dnd(),
    ...options,
    onSuccess: async (data, variables, context) => {
      if (apiScope) {
        await queryClient.invalidateQueries({
          queryKey: [...queryKeys.all, apiScope],
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.all,
        });
      }
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }
    },
  });
};
