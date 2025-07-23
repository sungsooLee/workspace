import { UseQueryOptions } from '@tanstack/react-query';
import { Course } from '@types';
import CourseService from '../api/course';
import { getQuerySkipToken } from '@learnway/shared';

// import CourseService, { TreeService } from "../api/course"
// export const treeKeys = {
//   tree: (tenantId: number) => ['tree', tenantId] as const
// }
// export const treeOption = {
//   getTree: <T = any>(tenantId: number, deviceType: string): UseQueryOptions<T> => ({
//     queryKey: queryKeys.get(tenantId),
//     queryFn: () => TreeService.fetch(tenantId, deviceType),
//   }),
// }

export const queryKeys = {
  course: (id: number) => ['course', id] as const,
  sequences: (uuid: string) => ['sequences', uuid] as const,
};
export const queryOptions = {
  // 과정 상세 조회
  detail: (id: number): UseQueryOptions => ({
    queryKey: queryKeys.course(id),
    queryFn: () => CourseService.fetch(id),
  }),

  // 과정 차수 기능
  courseSequences: <T = any>(uuid: string): UseQueryOptions<T> => ({
    queryKey: queryKeys.sequences(uuid),
    queryFn: () => CourseService.fetchSequnces(uuid),
  }),

  courseDetail: (courseId: number) =>
    courseId
      ? {
          queryKey: queryKeys.course(courseId),
          queryFn: () => CourseService.fetchCourse(courseId),
        }
      : getQuerySkipToken<any>(),
};
