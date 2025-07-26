import { UseQueryOptions } from '@tanstack/react-query';
import { CourseResponse } from '@types';
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
  sequenceOne: (sequenceId: string) => ['sequence', sequenceId] as const,
  package: (uuid: string) => ['package', uuid] as const,
  packageItems: (uuid: string, packageId: string) => ['packageItems', uuid, packageId] as const,
  dashboard: (uuid: string) => ['dashboard', uuid] as const,
};
export const queryOptions = {
  // 과정 정보 조회
  detail: (id: number): UseQueryOptions => ({
    queryKey: queryKeys.course(id),
    queryFn: async () => CourseService.fetch(id),
  }),
  // 과정 차수 불러오기
  courseSequences: (id: string): UseQueryOptions => ({
    queryKey: queryKeys.sequences(id),
    queryFn: () => CourseService.fetchSequences(id),
  }),
  // 과정 차수 단건 불러오기
  courseSequenceOne: (sequenceId: string): UseQueryOptions => ({
    queryKey: queryKeys.sequences(sequenceId),
    queryFn: () => CourseService.fetchSequenceOne(sequenceId),
  }),
  // 과정 패키지 리스트 불러오기
  coursePackage: (uuid: string): UseQueryOptions => ({
    queryKey: queryKeys.package(uuid),
    queryFn: () => CourseService.fetchCoursePackage(uuid),
  }),
  // 과정 패키지 아이템 불러오기
  coursePackageItems: (uuid: string, packageId: string): UseQueryOptions => ({
    queryKey: queryKeys.packageItems(uuid, packageId),
    queryFn: () => CourseService.fetchCoursePackageItems(uuid, packageId),
  }),
  // 과정 대시보드 불러오기
  courseDashboardData: (uuid: string): UseQueryOptions => ({
    queryKey: queryKeys.dashboard(uuid),
    queryFn: () => CourseService.fetchDashboard(uuid),
  }),
};

export const mutateOptions = {
  // 수강신청
  // enrollRequest: () => ({
  //   mutationFn: (payload: any) => CourseService.postCourseEnroll(payload),
  // }),
  // 수강취소신청
  enrollCancleRequest: () => ({
    mutationFn: (payload: any) => CourseService.postCourseEnrollCancle(payload),
  }),
  // 수강대기신청
  enrollWaitingRequest: () => ({
    mutationFn: (payload: any) => CourseService.postCourseEnrollWaiting(payload),
  }),
  // 수강대기취소신청
  enrollWaitingCancleRequest: () => ({
    mutationFn: (payload: any) => CourseService.postCourseEnrollWaitingCancle(payload),
  }),
  // 과정찜하기
  courseLikeRequest: () => ({
    mutationFn: (courseId: number) => CourseService.postCourseLike(courseId),
  }),
  courseDetail: (courseId: number) =>
    courseId
      ? {
          queryKey: queryKeys.course(courseId),
          queryFn: () => CourseService.fetchCourse(courseId),
        }
      : getQuerySkipToken<any>(),
};
