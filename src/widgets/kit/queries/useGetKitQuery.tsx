import { axiosInstance } from '@/app/api/instance';
import { useSuspenseQuery } from '@tanstack/react-query';

export const QUERY_KEY = ['getKit'];

const fetcher = (param: number) =>
  axiosInstance.get(`/cms-module/api/v1/kits`, {
    params: {
      courseId: 1,
      sequenceId: 1,
      kitId: param,
    },
  });

const useGetKitQuery = (param: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(param),
  });
};

export default useGetKitQuery;
