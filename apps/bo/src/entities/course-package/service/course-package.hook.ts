import { useMutation, useQuery } from '@tanstack/react-query';

import { mutateOptions, queryOptions } from './course-package.queries';

export function useFetchCoursePackages(params: any) {
  return useQuery(queryOptions.coursePackages(params));
}

export function useCreateCoursePackage(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.createCoursePackage(),
    ...options,
  });

  return {
    createCoursePackage: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}
