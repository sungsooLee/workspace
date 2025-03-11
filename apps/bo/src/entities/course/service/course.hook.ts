import type { MutateOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mutateOptions, queryOptions } from './course.queries';
import { CourseResponse, CoursesRequest } from '../../../types';

export function useFetchCourses(params: CoursesRequest) {
  return useQuery(queryOptions.all(params));
}

export function useFetchCourse(id: string) {
  return useQuery(queryOptions.get(id));
}

export function useCreateCourse(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
    },
    ...mutationOptions,
  });

  return {
    create: (
      payload: CourseResponse,
      callback?: MutateOptions<unknown, unknown, CourseResponse>,
    ) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
