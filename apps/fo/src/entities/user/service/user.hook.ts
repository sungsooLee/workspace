import {
  queryOptions,
  UpdateChangePhoneNumberRequest,
  UpdateVerificationsChangePasswordRequest,
} from '@entities/user';
import { MutateQueryOption } from '@shared/types/api';
import { useMutation } from '@tanstack/react-query';

export function useChangePassword(
  option: MutateQueryOption<UpdateVerificationsChangePasswordRequest>,
) {
  return useMutation(queryOptions.changePassword(option));
}

export function useChangePhoneNumber(option: MutateQueryOption<UpdateChangePhoneNumberRequest>) {
  return useMutation(queryOptions.changePhoneNumber(option));
}
