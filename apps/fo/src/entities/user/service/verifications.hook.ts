import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { queryKeys, queryOptions, mutateOptions } from './verifications.queries';

interface VerifyPhoneNumber {
  name: string;
  birthday: string;
  phoneNumber: string;
  verificationCode?: string;
}

interface VerifyEmail {
  name: string;
  birthday: string;
  email: string;
  verificationCode?: string;
}

export function useSendVerifyPhoneNumber(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.sendVerifyPhoneNumber(),
    ...mutationOptions,
  });

  return {
    send: (
      payload: VerifyPhoneNumber,
      callback?: MutateOptions<unknown, unknown, VerifyPhoneNumber>,
    ) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useSendVerifyEmail(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.sendVerifyEmail(),
    ...mutationOptions,
  });

  return {
    send: (payload: VerifyEmail, callback?: MutateOptions<unknown, unknown, VerifyEmail>) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useVerifyPhoneNumber(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.verifyPhoneNumber(),
    ...mutationOptions,
  });

  return {
    verify: (
      payload: VerifyPhoneNumber,
      callback?: MutateOptions<unknown, unknown, VerifyPhoneNumber>,
    ) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useVerifyEmail(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.verifyEmail(),
    ...mutationOptions,
  });

  return {
    verify: (payload: VerifyEmail, callback?: MutateOptions<unknown, unknown, VerifyEmail>) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
