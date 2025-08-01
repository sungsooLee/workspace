import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { CourseEnrollQueueStateIdResponse, CourseEnrollResponse, EnrollRequest } from '@types';
import EnrollService from '../api/enroll';

export const queryKeys = {
  courseRegistrationDetails: (sequenceUuid: string) =>
    ['courseRegistrationDetails', sequenceUuid] as const,
  courseRegistrationStatus: (enrollQueueId: number) =>
    ['courseRegistrationStatus', enrollQueueId] as const,
  singleCourseApplicationQueue: ['singleCourseApplicationQueue'] as const,
};

export const queryOptions = {
  courseRegistrationDetails: (sequenceUuid: string): UseQueryOptions<CourseEnrollResponse> => ({
    queryKey: queryKeys.courseRegistrationDetails(sequenceUuid),
    queryFn: () => EnrollService.fetchEnroll(sequenceUuid),
  }),

  courseRegistrationStatus: (
    enrollQueueId: number,
  ): UseQueryOptions<CourseEnrollQueueStateIdResponse> => ({
    queryKey: queryKeys.courseRegistrationStatus(enrollQueueId),
    queryFn: () => EnrollService.fetchEnrollQueueStateId(enrollQueueId),
    refetchInterval: 3000,
  }),

  singleCourseApplicationQueue: (body: EnrollRequest): UseMutationOptions<number> => ({
    mutationKey: queryKeys.singleCourseApplicationQueue,
    mutationFn: () => EnrollService.createEnroll(body),
    onSuccess: (data) => {
      // console.log(data);
    },
  }),
};
