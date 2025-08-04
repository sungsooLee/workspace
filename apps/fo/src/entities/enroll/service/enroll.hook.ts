import { queryOptions } from '@entities/enroll';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { EnrollDeleteRequest, EnrollRequest } from '@types';

export function useFetchCourseRegistrationDetails(sequenceUuid: string) {
  return useQuery(queryOptions.courseRegistrationDetails(sequenceUuid));
}

export function useFetchCourseRegistrationStatus(enrollQueueId: number) {
  return useQuery(queryOptions.courseRegistrationStatus(enrollQueueId));
}

export function useCreateSingleCourseApplicationQueue(body: EnrollRequest) {
  return useMutation(queryOptions.singleCourseApplicationQueue(body));
}

export function useDeleteCourseApplication(
  options?: UseMutationOptions<unknown, unknown, EnrollDeleteRequest>,
) {
  const mutation = useMutation<unknown, unknown, EnrollDeleteRequest>({
    ...queryOptions.deleteCourseApplication(),
    ...options,
  });
  return {
    deleteCourseApplication: async (payload: EnrollDeleteRequest, callback?: any) => {
      return await mutation.mutateAsync(payload, callback);
    },
    ...mutation,
  };
}
