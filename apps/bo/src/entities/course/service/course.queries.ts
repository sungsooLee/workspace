import CourseService from '../api/course';
import { Course, CourseQueryParams } from '../../../types';

export const queryKeys = {
  all: ['courses'] as const,
  get: (id: number) => ['course', id] as const,
};

export const queryOptions = {
  all: (params: CourseQueryParams) => ({
    queryKey: queryKeys.all,
    queryFn: () => CourseService.fetchAll(params),
  }),
  get: (id: number) => ({
    queryKey: queryKeys.get(id),
    queryFn: () => CourseService.fetch(id),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Course) => CourseService.create(payload),
  }),
  update: () => ({
    mutationFn: (payload: Course) => CourseService.update(payload),
  }),
  delete: () => ({
    mutationFn: (id: number) => CourseService.delete(id),
  }),
};
