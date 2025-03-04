import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import type { MutateCallback } from '@learnway/shared';

import type { AuthUser } from '../../../types';
import { queryKeys, queryOptions, mutateOptions } from './authorization.queries';

export const authUserQueryKeys = queryKeys;

export function useFetchAuthUser<T = AuthUser>() {
  return useQuery<unknown, unknown, T>(queryOptions.authUser());
}

export function useLoginUser(mutationOptions = {}) {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.login(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.setQueryData(queryKeys.authUser, data);
    },
    ...mutationOptions,
  });

  return {
    login: (payload: any, callback?: MutateCallback<any[]>) => {
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
      router.navigate({ to: '/login' });
    },
    ...mutationOptions,
  });

  return {
    logout: (callback?: MutateCallback<any[]>) => {
      mutate();
    },
    isSuccess,
    isError,
  };
}

export function useUpdateUser(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    updateLanguage: (languageCode: string): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      queryClient.setQueryData(queryKeys.authUser, { ...user, userLanguageSetCode: languageCode });
    },
    updateMenu: (menus: any): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      const updateUser = { ...user, menus };
      queryClient.setQueryData(queryKeys.authUser, updateUser);
      return updateUser as AuthUser;
    },
  };
}
/*
export function useAuth() {
  const [activeTenant] = useAtom(activeTenantAtom);
  console.log(activeTenant);
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: AuthorizationService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });

  // const { data: tenant } = useQuery({
  //   queryKey: ['tenant', activeTenant],
  //   queryFn: () => TenantService.fetchTenantsByUser(user?.data.accountId),
  //   enabled: !!activeTenant,
  // });

  return { user, activeTenant };
}*/
