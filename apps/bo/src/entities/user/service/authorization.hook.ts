import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { queryKeys, queryOptions, mutateOptions } from './authorization.queries';
import { User } from '../model/user';

export interface IMutateCallback<TVariables> {
  onSuccess?: (data: any, variables: TVariables, context: any) => void;
  onSettled?: (
    data: any | undefined,
    error: any | null,
    variables: TVariables,
    context: any | undefined,
  ) => void;
  onError?: (err: any, variables: TVariables, context: any | undefined) => void;
}

export function useFetchAuthUser<T = User>() {
  return useQuery<unknown, unknown, T>(queryOptions.authUser());
}

export function useLoginUser(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.login(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.setQueryData(queryKeys.authUser, data);
    },
    ...mutationOptions,
  });

  return {
    login: (payload: any, callback?: IMutateCallback<any[]>) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useReissue(mutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
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
      mutate();
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
      router.navigate({ to: '/login' });
    },
    ...mutationOptions,
  });

  return {
    logout: (callback?: IMutateCallback<any[]>) => {
      mutate();
    },
    isSuccess,
    isError,
  };
}

export function useUpdateUser(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    updateLanguage: (languageCode: string, callback?: IMutateCallback<any[]>) => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      queryClient.setQueryData(queryKeys.authUser, { ...user, userLanguageSetCode: languageCode });
    },
  };
}
