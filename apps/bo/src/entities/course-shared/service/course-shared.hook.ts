import { useMutation } from '@tanstack/react-query';

import { mutateOptions } from './course-shared.queries';

export function useCourseShare(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.courseShare(),
    ...options,
  });

  return {
    courseShare: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}

export function useCopyCourseShared(options: any) {
  const { mutate, isSuccess, isError, data } = useMutation({
    ...mutateOptions.copyCourseShared(),
    ...options,
  });

  return {
    copyCourseShared: async (payload: any, callback?: any) => {
      await mutate(payload, callback);
    },
    isSuccess,
    isError,
    data,
  };
}
