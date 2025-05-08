import { StringOrTemplateHeader } from '@tanstack/react-table';
import UsersService from '../api/users';

export const queryKeys = {};

export const queryOptions = {};

export const mutateOptions = {
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
