import { UseMutationOptions } from '@tanstack/react-query';
import {
  MutateQueryOption,
  UpdateChangePhoneNumberRequest,
  UpdateVerificationsChangePasswordRequest,
} from '@types';
import UserService from '../api/user';

export const queryKeys = {
  changePassword: ['changePassword'] as const,
  changePhoneNumber: ['changePhoneNumber'] as const,
};

export const queryOptions = {
  changePassword: ({
    body,
    onSuccess,
    onError,
  }: MutateQueryOption<UpdateVerificationsChangePasswordRequest>): UseMutationOptions<void> => ({
    mutationKey: queryKeys.changePassword,
    mutationFn: () => UserService.updateVerificationsChangePassword(body),
    onSuccess,
    onError,
  }),
  changePhoneNumber: ({
    body,
    onSuccess,
    onError,
  }: MutateQueryOption<UpdateChangePhoneNumberRequest>): UseMutationOptions<void> => ({
    mutationKey: queryKeys.changePhoneNumber,
    mutationFn: () => UserService.updateChangePhoneNumber(body),
    onSuccess,
    onError,
  }),
};
