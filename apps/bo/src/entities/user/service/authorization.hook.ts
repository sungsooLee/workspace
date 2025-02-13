import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { AxiosResponse } from 'axios';

import { cookieService } from '@learnway/shared';

import { queryKeys, queryOptions, mutateOptions } from './authorization.queries';
import { User } from '../model/user';
import { useCreation } from 'ahooks';

import loginMock from '../../mock/login.json';

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
  //return useQuery<unknown, unknown, T>(queryOptions.authUser());

  const { data } = useQuery<unknown, unknown, T>(queryOptions.authUser());

  const queryClient = useQueryClient();
  return {
    data: useCreation(() => {
      if (!data) {
        const user = loginMock.data.data;
        const { accountId, tenants, roles } = user;
        //cookieService.set('LOGIN_TOKEN', data.headers['access-token']);
        cookieService.set('LOGIN_USER_ID', accountId);
        cookieService.set('LOGIN_TENANT_ID', tenants[0]['tenantId']);
        cookieService.set('LOGIN_ROLE_ID', roles[0]['roleId']);
        //cookieService.set('REFRESH_LOGIN_TOKEN', refresh_token);

        //queryClient.clear();
        const userData = {
          ...user,
          activeTenantId: user.tenants?.length > 0 ? user.tenants[0].tenantId : undefined,
          activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : undefined,
        };
        queryClient.setQueryData(queryKeys.authUser, userData);
        return userData;
      }
      return data;
    }, [data]),
  };
}

export function useLoginUser(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.login(),
    onSuccess: async (data: AxiosResponse, variables, context) => {
      cookieService.clear();

      const user = data.data.data;
      const { accountId, tenants, roles } = user;
      cookieService.set('LOGIN_TOKEN', data.headers['access-token']);
      cookieService.set('LOGIN_USER_ID', accountId);
      cookieService.set('LOGIN_TENANT_ID', tenants[0]['tenantId']);
      cookieService.set('LOGIN_ROLE_ID', roles[0]['roleId']);

      queryClient.setQueryData(queryKeys.authUser, {
        ...user,
        activeTenantId: user.tenants?.length > 0 ? user.tenants[0].tenantId : null,
        activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
      });
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
    onSuccess: async (data: AxiosResponse, variables, context) => {
      console.log('reissue', data);
      //cookieService.clear();

      //queryClient.clear();
      //queryClient.invalidateQueries({ queryKey: queryKeys.authUser });

      //router.navigate({ to: '/login' });
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
      cookieService.clear();

      //queryClient.clear();
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });

      //router.navigate({ to: '/login' });
    },
    ...mutationOptions,
  });

  return {
    logout: () => {
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
