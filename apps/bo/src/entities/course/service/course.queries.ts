import CourseService from '../api/course';
import { CourseResponse, CoursesRequest } from '../../../types';

export const queryKeys = {
  all: ['course-all'] as const,
  get: ['course'] as const,
};

export const queryOptions = {
  all: (params: CoursesRequest) => ({
    queryKey: queryKeys.all,
    queryFn: () => CourseService.fetchCourses(params),
  }),
  get: (id: string) => ({
    queryKey: queryKeys.get,
    queryFn: () => CourseService.fetchCourse(id),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: CourseResponse) => CourseService.createCourse(payload),
  }),
  update: () => ({
    mutationFn: (payload: CourseResponse) => CourseService.updateCourse(payload),
  }),
  delete: () => ({
    mutationFn: (id: string) => CourseService.deleteCourse(id),
  }),
};
