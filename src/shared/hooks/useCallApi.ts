import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query';

export type ApiFunction<T> = (param?: string) => Promise<T>;

export const useCallApi = <T>(
  queryKey: QueryKey,
  apiFunction: ApiFunction<T>,
  param?: string
) => {
  const { data, isLoading } = useSuspenseQuery<T>({
    queryKey: param ? [...queryKey, param] : queryKey,
    queryFn: async () => {
      const response = await apiFunction(param);
      return response;
    },
  });

  return { data, isLoading };
};
