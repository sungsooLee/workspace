import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import type { MutateCallback } from '@learnway/shared';

import type { AuthUser } from '../../../types';
import { queryKeys, queryOptions, mutateOptions } from './authorization.queries';

export const authUserQueryKeys = queryKeys;

export function useFetchAuthUser<T = AuthUser>() {
  return useQuery<unknown, unknown, T>(queryOptions.authUser());
}

export function useUpdateAuthUser<T = AuthUser>() {
  const queryClient = useQueryClient();
  return {
    update: (payload: any): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      queryClient.setQueryData(queryKeys.authUser, { ...user, ...payload });

      return { ...user, ...payload } as AuthUser;
    },
  };
}

export function useLoginUser(mutationOptions = {}) {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.login(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.setQueryData(queryKeys.authUser, data);
      console.log();
    },
    ...mutationOptions,
  });

  return {
    login: (payload: any, callback?: MutateCallback<any>) => {
      return mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useReissue(mutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.reissue(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.setQueryData(queryKeys.authUser, data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
      router.navigate({ to: '/login' });
    },
    ...mutationOptions,
  });

  return {
    reissue: () => {
      return mutateAsync();
    },
    isSuccess,
    isError,
  };
}

export function useLogoutUser(mutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.logout(),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
    },
    ...mutationOptions,
  });

  return {
    logout: (payload?: any, callback?: MutateCallback<any>) => {
      // callback?.onSuccess가 정의가 없는 경우 default로 login 페이지로 이동
      if (!callback?.onSuccess) {
        mutate(payload, {
          ...callback,
          onSuccess: (data) => {
            router.navigate({ to: '/login' });
          },
        });
        return;
      }

      // callback?.onSuccess 정의가 있는 경우 navigate 처리까지 callback에 일임
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
