import type { MutateOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mutateOptions, queryOptions } from './sequence.queries';
import { SequenceResponse, SequencesRequest } from '../../../types';

export function useFetchCourses(params: SequencesRequest) {
  return useQuery(queryOptions.all(params));
}

export function useFetchCourse(id: string) {
  return useQuery(queryOptions.get(id));
}

export function useCreateCourse(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
    },
    ...mutationOptions,
  });

  return {
    create: (
      payload: SequenceResponse,
      callback?: MutateOptions<unknown, unknown, SequenceResponse>,
    ) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
