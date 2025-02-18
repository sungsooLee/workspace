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
  /*
  const { data } = useQuery<unknown, unknown, T>(queryOptions.authUser());

  const { reissue } = useReissue();

  const user = useCreation(() => {
    if (user) {
      return user;
    }

    reissue();
  }, [data]);

  return {
    data: user,
  };
  */

  const { data } = useQuery<unknown, unknown, T>(queryOptions.authUser());

  const queryClient = useQueryClient();
  return {
    data: useCreation(() => {
      if (!data) {
        const user = loginMock.data.data;
        const { userId, tenantIds } = user as any;
        cookieService.set('LOGIN_USER_ID', userId);
        cookieService.set('LOGIN_TENANT_ID', tenantIds?.[0]);

        //queryClient.clear();
        const userData = {
          ...user,
          activeTenantId: tenantIds?.length > 0 ? tenantIds[0] : null,
          //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
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

      const user = data.data;
      const { userId, tenantIds } = user;
      cookieService.set('LOGIN_USER_ID', userId);
      cookieService.set('LOGIN_TENANT_ID', tenantIds[0]);
      //cookieService.set('LOGIN_ROLE_ID', roles[0]['roleId']);
      cookieService.set('ACCESS-TOKEN', data.headers['access-token']);
      cookieService.set('REFRESH-TOKEN', data.headers['refresh-token']);

      queryClient.setQueryData(queryKeys.authUser, {
        ...user,
        activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
        //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
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
      cookieService.clear();

      const user = data.data;
      const { userId, tenantIds } = user;
      cookieService.set('LOGIN_USER_ID', userId);
      cookieService.set('LOGIN_TENANT_ID', tenantIds[0]);
      //cookieService.set('LOGIN_ROLE_ID', roles[0]['roleId']);
      cookieService.set('ACCESS-TOKEN', data.headers['access-token']);
      cookieService.set('REFRESH-TOKEN', data.headers['refresh-token']);

      queryClient.setQueryData(queryKeys.authUser, {
        ...user,
        activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
        //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
      });
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
