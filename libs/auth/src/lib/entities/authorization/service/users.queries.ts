import { StringOrTemplateHeader } from '@tanstack/react-table';

import { getQuerySkipToken } from '@learnway/shared';
import UsersService from '../api/users';
import { UserRes } from '@types';

export const queryKeys = {
  all: ['user'] as const,
  detail: () => ['user-me'] as const,
};

export const queryOptions = {
  // all: () => ({
  //   queryKey: queryKeys.all,
  //   queryFn: async () => {
  //     const data = await UsersService.getUser();

  //     if (!data) return null;
  //     return data;
  //   },
  // }),
  detail: () => ({
    queryKey: queryKeys.detail(),
    queryFn: async (): Promise<UserRes | null> => {
      const data = await UsersService.getUser();
      console.log('## get user detail :: ', data);
      if (!data) return null;
      return data;
    },
  }),
};

// : getQuerySkipToken<any>(),

export const mutateOptions = {
  verifySMS: () => ({
    mutationFn: (payload: any) => UsersService.verifySMS(payload),
  }),
  sendVerifySMS: () => ({
    mutationFn: (payload: any) => UsersService.sendVerifySMS(payload),
  }),
  updatePhoneNumber: () => ({
    mutationFn: (payload: any) => UsersService.updatePhoneNumber(payload),
  }),
  updatePassword: () => ({
    mutationFn: (payload: any) => UsersService.updatePassword(payload),
  }),
  verifyPassword: () => ({
    mutationFn: (payload: string) => UsersService.verifyPassword(payload),
  }),
  deleteUser: () => ({
    mutationFn: () => UsersService.deleteUser(),
  }),
};
