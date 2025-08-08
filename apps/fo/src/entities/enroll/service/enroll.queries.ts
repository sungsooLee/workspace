import {
  CourseEnrollQueueStateIdResponse,
  CourseEnrollResponse,
  EnrollDeleteRequest,
  EnrollRequest,
  EnrollStatusCheckResponse,
} from '@entities/enroll';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import EnrollService from '../api/enroll';

export const queryKeys = {
  courseRegistrationDetails: (sequenceUuid: string) =>
    ['courseRegistrationDetails', sequenceUuid] as const,
  enrollStatusCheck: (sequenceId: number) => ['enrollStatusCheck', sequenceId] as const,
  courseRegistrationStatus: (enrollQueueId: number) =>
    ['courseRegistrationStatus', enrollQueueId] as const,
  singleCourseApplicationQueue: ['singleCourseApplicationQueue'] as const,
  deleteCourseApplication: ['deleteCourseApplication'] as const,
  postCourseWaiting: ['postCourseWaiting'] as const,
  deleteCourseWaiting: ['deleteCourseWaiting'] as const,
};

export const queryOptions = {
  courseRegistrationDetails: (sequenceUuid: string): UseQueryOptions<CourseEnrollResponse> => ({
    queryKey: queryKeys.courseRegistrationDetails(sequenceUuid),
    queryFn: () => EnrollService.fetchEnroll(sequenceUuid),
  }),

  enrollStatusCheck: (sequenceId: number): UseQueryOptions<EnrollStatusCheckResponse> => ({
    queryKey: queryKeys.enrollStatusCheck(sequenceId),
    queryFn: () => EnrollService.fetchEnrollStatusCheck(sequenceId),
  }),

  courseRegistrationStatus: (
    enrollQueueId: number,
  ): UseQueryOptions<CourseEnrollQueueStateIdResponse> => ({
    queryKey: queryKeys.courseRegistrationStatus(enrollQueueId),
    queryFn: () => EnrollService.fetchEnrollQueueStateId(enrollQueueId),
    refetchInterval: (data) => {
      if (data && data.state.data?.enrollQueueStatusType !== 'QUEUE') {
        return false; // refetch 멈춤
      }
      return 3000; // 3초마다 polling
    },
  }),

  singleCourseApplicationQueue: (body: EnrollRequest): UseMutationOptions<number> => ({
    mutationKey: queryKeys.singleCourseApplicationQueue,
    mutationFn: () => EnrollService.createEnroll(body),
    onSuccess: (data) => {
      // console.log(data);
    },
  }),

  deleteCourseApplication: (): UseMutationOptions<unknown, unknown, EnrollDeleteRequest> => ({
    mutationFn: (body: EnrollDeleteRequest) => EnrollService.deleteEnroll(body),
  }),

  postCourseWaiting: (body: number): UseMutationOptions<number> => ({
    mutationKey: queryKeys.postCourseWaiting,
    mutationFn: () => EnrollService.createEnrollWaiting(body),
    onSuccess: (data) => {
      // console.log(data);
    },
  }),

  deleteCourseWaiting: (body: number): UseMutationOptions<number> => ({
    mutationKey: queryKeys.deleteCourseWaiting,
    mutationFn: () => EnrollService.deleteEnrollWaiting(body),
    onSuccess: (data) => {
      // console.log(data);
    },
  }),
};
