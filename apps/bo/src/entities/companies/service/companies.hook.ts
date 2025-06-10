import { useMutation, useQuery } from '@tanstack/react-query';

import { queryOptions, mutateOptions } from './companies.queries';

export function useFetchCompanies() {
  return useQuery(queryOptions.all());
}

export function useCheckExistsCompanyCode(options: any) {
  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.checkExists(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...mutateOptions,
  });

  return {
    checkExistsCompanyCode: (payload: any, callback?: any) => {
      mutate(payload, callback);
      options?.onSuccess?.(false);
    },
    isSuccess,
    isError,
  };
}
