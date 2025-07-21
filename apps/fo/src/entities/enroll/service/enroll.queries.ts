import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import EnrollService from '../api/enroll';
import { CourseEnrollResponse, EnrollRequest } from '@types';

export const queryKeys = {
  courseRegistrationDetails: (sequenceUuid: string) =>
    ['courseRegistrationDetails', sequenceUuid] as const,
  singleCourseApplicationQueue: ['singleCourseApplicationQueue'] as const,
};

export const queryOptions = {
  courseRegistrationDetails: (sequenceUuid: string): UseQueryOptions<CourseEnrollResponse> => ({
    queryKey: queryKeys.courseRegistrationDetails(sequenceUuid),
    queryFn: () => EnrollService.fetchEnroll(sequenceUuid),
  }),

  singleCourseApplicationQueue: (body: EnrollRequest): UseMutationOptions<void> => ({
    mutationKey: queryKeys.singleCourseApplicationQueue,
    mutationFn: () => EnrollService.createEnroll(body),
    onSuccess: (data) => {
      // console.log(data);
    },
  }),
};
