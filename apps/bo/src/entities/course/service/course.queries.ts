import CourseService from '../api/course';
import { Course, CoursesQueryParams, PaginationResponse } from '../../../types';

export const queryKeys = {
  all: ['courses'] as const,
  get: (id: number) => ['course', id] as const,
};

export const queryOptions = {
  all: <T = Course>(params: CoursesQueryParams) => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<PaginationResponse<T>> => CourseService.fetchAll(params),
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
  updateWizard1: () => ({
    mutationFn: (payload: Course) => CourseService.updateWizard1(payload),
  }),
  updateWizard2: () => ({
    mutationFn: (payload: Course) => CourseService.updateWizard2(payload),
  }),
  updateWizard3: () => ({
    mutationFn: (payload: Course) => CourseService.updateWizard3(payload),
  }),
};
