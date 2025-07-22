import { queryOptions } from '@entities/enroll';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EnrollRequest } from '@types';

export function useFetchCourseRegistrationDetails(sequenceUuid: string) {
  return useQuery(queryOptions.courseRegistrationDetails(sequenceUuid));
}

export function useCreateSingleCourseApplicationQueue(body: EnrollRequest) {
  return useMutation(queryOptions.singleCourseApplicationQueue(body));
}
