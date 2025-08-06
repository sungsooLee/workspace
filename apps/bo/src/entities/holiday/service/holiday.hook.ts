import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  holidayQueryOptions as queryOptions,
  holidayMutateOptions
} from './holiday.queries';

export const useFetchHoliday = (holidayId: number) => {
  return useQuery(queryOptions.detail(holidayId));
}

export const useCreateHoliday = (options: any) => {
  const mutation = useMutation({
    ...holidayMutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data
  };
}

export const useUpdateHoliday = (options: any) => {
  const mutation = useMutation({
    ...holidayMutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data
  };
}
