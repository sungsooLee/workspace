import { mutateOptions, queryOptions } from '@entities/course';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mapCourseDetail } from './course.service';

// 과정 기본 정보 조회
export function useCourseDetail(id: number) {
  return useQuery<any>(queryOptions.detail(id));
}
// 과정 차수 불러오기
export function useCourseSequences(id: number, reqDto: any) {
  return useQuery<any>(queryOptions.courseSequences(id, reqDto));
}
// 과정 차수 단건 불러오기
export function useCourseSequenceOne(sequenceId: string) {
  return useQuery(queryOptions.courseSequenceOne(sequenceId));
}
// 과정 패키지 리스트 불러오기 - 미정
// export function useCoursePackage(uuid: string) {
//   return useQuery<any>(queryOptions.coursePackage(uuid));
// }
// 과정 패키지별 아이템 불러오기 - 미정
// export function useCoursePackageItems(uuid: string, packageId: string) {
//   return useQuery<any>(queryOptions.coursePackageItems(uuid, packageId));
// }
// 과정 대시보드 불러오기 - 미정
// export function useCourseDashboardData(uuid: string) {
//   return useQuery<any>(queryOptions.courseDashboardData(uuid));
// }

// 과정 전체 정보 불러오기
export function useCourseFullDetail(id: number) {
  const { data: courseData, isLoading, isError } = useCourseDetail(id);

  const data = courseData && mapCourseDetail(courseData);

  return { data, isLoading, isError };
}

// 수강신청
// export function useCourseEnroll(options: any) {
//   const mutation = useMutation({
//     ...mutateOptions.enrollRequest(),
//     ...options,
//   });
//   return {
//     enrollRequest: (payload: any, callback?: any) => {
//       mutation.mutate(payload, callback);
//     },
//     ...mutation,
//   };
// }
// 수강취소신청
export function useCourseEnrollCancle(options: any) {
  const mutation = useMutation({
    ...mutateOptions.enrollCancleRequest(),
    ...options,
  });
  return {
    enrollCancleRequest: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
// 수강대기신청
export function useCourseEnrollWaiting(options: any) {
  const mutation = useMutation({
    ...mutateOptions.enrollWaitingRequest(),
    ...options,
  });
  return {
    enrollWaitingRequest: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
// 수강대기취소신청
export function useCourseEnrollWaitingCancle(options: any) {
  const mutation = useMutation({
    ...mutateOptions.enrollWaitingCancleRequest(),
    ...options,
  });
  return {
    enrollWaitingCancleRequest: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
// 과정찜하기
export function useCourseLike(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.courseLikeRequest(),
    ...options,
  });
  return {
    courseLikeRequest: async (payload: any, callback?: any) => {
      return await mutation.mutateAsync(payload, callback);
    },
    ...mutation,
  };
}

// 대시보드
export function useCourseDashboardData(options?: any) {
  return useQuery(queryOptions.courseDashboardData(options));
}
