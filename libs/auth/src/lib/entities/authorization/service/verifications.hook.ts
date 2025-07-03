import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import type { MutateCallback } from '@learnway/shared';

import { mutateOptions } from './authorization.queries';

interface VerifyPhoneNumber {
  name: string;
  birthday: string;
  phoneNumber: string;
  phoneNumberLocale?: string;
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

export function useAsyncFetchEmail(mutationOptions = {}) {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.fetchEmail(),
    ...mutationOptions,
  });

  return {
    asyncFetch: (payload: any, callback?: MutateCallback<any[]>) => {
      return mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useUpdatePasswordByPhoneNumber(mutationOptions = {}) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.updatePasswordByPhoneNumber(),
    ...mutationOptions,
  });

  return {
    update: (payload: any, callback?: MutateOptions<unknown, unknown, VerifyEmail>) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useUpdatePasswordByEmail(mutationOptions = {}) {
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.updatePasswordByEmail(),
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

export function useExistsEmail(mutationOptions = {}) {
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.existsEmail(),
    ...mutationOptions,
  });

  return {
    existsEmail: (payload: string, callback?: MutateCallback<any>) => {
      return mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
  };
}
