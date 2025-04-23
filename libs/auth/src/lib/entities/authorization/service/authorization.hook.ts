import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import type { MutateCallback } from '@learnway/shared';

import type { AuthUser, Tenant } from '../../../types';
import { queryKeys, queryOptions, mutateOptions } from './authorization.queries';
import { useSessionIntervalState } from '../state/session-interval.state';

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
  const [sessionIntervalId] = useSessionIntervalState();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.logout(),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
      clearInterval(sessionIntervalId);
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
    updateActiveTenant: (tenant: Tenant): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      const updateUser = { ...user, activeTenant: tenant };
      queryClient.setQueryData(queryKeys.authUser, updateUser);
      return updateUser as AuthUser;
    },
    updateMainTenant: (tenantId: number): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      const updateUser = { ...user, mainTenantId: tenantId };
      queryClient.setQueryData(queryKeys.authUser, updateUser);
      return updateUser as AuthUser;
    },
    updateEmail: (email: string): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      queryClient.setQueryData(queryKeys.authUser, { ...user, email });
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
