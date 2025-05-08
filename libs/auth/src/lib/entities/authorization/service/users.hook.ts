import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { cookieService } from '@learnway/shared';
import type { MutateCallback } from '@learnway/shared';
import type { PhoneNumberValue } from '@learnway/ui';

import { mutateOptions } from './users.queries';
import { useUpdateAuthUser } from './authorization.hook';

import type { AuthUser, Tenant } from '../../../types';

interface phoneNumberPayload {
  name: string;
  birthday: string;
  currentPhoneNumber: string;
  currentPhoneNumberNationCode?: string;
  newPhoneNumber: string;
  newPhoneNumberNationCode?: string;
}

export function useUpdatePhoneNumber(mutationOptions = {}) {
  const { updatePhoneNumber } = useUpdateUser();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.updatePhoneNumber(),
    onSuccess: async (data: any, variables, context) => {
      updatePhoneNumber({
        number: variables.newPhoneNumber,
        nationCode: variables.newPhoneNumberLocale,
      });
    },
    ...mutationOptions,
  });

  return {
    update: (
      payload: phoneNumberPayload,
      callback?: MutateOptions<unknown, unknown, phoneNumberPayload>,
    ) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useUpdatePassword(mutationOptions = {}) {
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.updatePassword(),
    ...mutationOptions,
  });

  return {
    update: (payload: any, callback?: MutateCallback<any[]>) => {
      return mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useUpdateUser() {
  const { update } = useUpdateAuthUser();

  return {
    updateLanguage: (languageCode: string): AuthUser | undefined => {
      return update({ userLanguageSetCode: languageCode });
    },
    updateMenu: (menus: any): AuthUser | undefined => {
      return update({ menus });
    },
    updateActiveTenant: (tenant: Tenant): AuthUser | undefined => {
      return update({ activeTenant: tenant });
    },
    updateMainTenant: (tenantId: number): AuthUser | undefined => {
      return update({ mainTenantId: tenantId });
    },
    updateEmail: (email: string): AuthUser | undefined => {
      return update({ email });
    },
    updatePhoneNumber: (payload: PhoneNumberValue): AuthUser | undefined => {
      return update({ phoneNumber: payload.number, PhoneNumberNationCode: payload.nationCode });
    },
    updateLatestLoginDateTime: (latestLoginDatetime: Date): AuthUser | undefined => {
      cookieService.set('LATEST_LOGIN_DATETIME', latestLoginDatetime);
      return update({ latestLoginDatetime });
    },
  };
}

export function useDeleteUser(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.deleteUser(),
    //onSuccess: async (data: any, variables, context) => {},
    ...mutationOptions,
  });

  return {
    remove: (callback?: MutateCallback<any>) => {
      return mutateAsync(undefined, callback);
    },
    isSuccess,
    isError,
  };
}

export function useVerifyPassword(mutationOptions = {}) {
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.verifyPassword(),
    //onSuccess: async (data: any, variables, context) => {},
    ...mutationOptions,
  });

  return {
    verify: (payload: string, callback?: MutateCallback<any>) => {
      return mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
  };
}
