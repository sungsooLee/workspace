import { getQuerySkipToken } from '@learnway/shared';
import { UseQueryOptions } from '@tanstack/react-query';
import CourseService from '../api/course';

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
  sequences: (id: number, openingYear: string, isAll: boolean) =>
    ['sequences', id, openingYear, isAll] as const,
  sequenceOne: (sequenceId: string) => ['sequence', sequenceId] as const,
  package: (id: string) => ['package', id] as const,
  packageItems: (id: string, packageId: string) => ['packageItems', id, packageId] as const,
  dashboard: (option: any) => ['dashboard', option.courseId] as const,
};
export const queryOptions = {
  // 과정 정보 조회
  detail: (id: number): UseQueryOptions => ({
    queryKey: queryKeys.course(id),
    queryFn: async () => CourseService.fetch(id),
  }),
  // 과정 차수 불러오기
  courseSequences: (
    id: number,
    reqDto: { openingYear: string; isAll: boolean },
  ): UseQueryOptions => ({
    queryKey: queryKeys.sequences(id, reqDto.openingYear, reqDto.isAll),
    queryFn: () =>
      CourseService.fetchSequences(id, { openingYear: reqDto.openingYear, isAll: reqDto.isAll }),
  }),
  // 과정 차수 단건 불러오기
  courseSequenceOne: (sequenceId: string) => ({
    queryKey: queryKeys.sequenceOne(sequenceId),
    queryFn: () => CourseService.fetchSequenceOne(sequenceId),
  }),
  // 과정 패키지 리스트 불러오기
  coursePackage: (id: string): UseQueryOptions => ({
    queryKey: queryKeys.package(id),
    queryFn: () => CourseService.fetchCoursePackage(id),
  }),
  // 과정 패키지 아이템 불러오기
  coursePackageItems: (id: string, packageId: string): UseQueryOptions => ({
    queryKey: queryKeys.packageItems(id, packageId),
    queryFn: () => CourseService.fetchCoursePackageItems(id, packageId),
  }),
  // 과정 대시보드 불러오기
  courseDashboardData: (option: any): UseQueryOptions => ({
    queryKey: queryKeys.dashboard(option),
    queryFn: () => CourseService.postDashboardLearningProgress(option),
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

  // 나의 학습 진행율 조회
  dashboardLearningProgress: () => ({
    mutationFn: (payload: any) => CourseService.postDashboardLearningProgress(payload),
  }),
};
