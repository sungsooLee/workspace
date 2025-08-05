import { queryOptions } from '@entities/user';
import { useMutation } from '@tanstack/react-query';
import {
  MutateQueryOption,
  UpdateChangePhoneNumberRequest,
  UpdateVerificationsChangePasswordRequest,
} from '@types';

export function useChangePassword(
  option: MutateQueryOption<UpdateVerificationsChangePasswordRequest>,
) {
  return useMutation(queryOptions.changePassword(option));
}

export function useChangePhoneNumber(option: MutateQueryOption<UpdateChangePhoneNumberRequest>) {
  return useMutation(queryOptions.changePhoneNumber(option));
}
