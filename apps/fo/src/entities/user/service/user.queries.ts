import {
  UpdateChangePhoneNumberRequest,
  UpdateVerificationsChangePasswordRequest,
} from '@entities/user';
import { MutateQueryOption } from '@shared/types/api';
import { UseMutationOptions } from '@tanstack/react-query';
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
