import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { mutateOptions, queryOptions } from './label-messages.queries';
import { LabelMessage, MutationHookOptions } from '@types';

export const useFetchLabelMessages = () => {
  return useQuery(queryOptions.all());
};

export const useFetchLabelMessage = (id: number) => {
  return useQuery<LabelMessage>(queryOptions.detail(id));
};

export const useCreateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.create(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 공통 로직 필요한 경우 onSuccess 수행 후 재호출
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

export const useUpdateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.update(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 공통 로직 필요한 경우 onSuccess 수행 후 재호출
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
