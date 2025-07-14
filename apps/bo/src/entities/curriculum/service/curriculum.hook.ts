import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutateOptions, queryKeys, queryOptions } from './curriculum.queries';
import { CurriculumSearchParams } from '@types';

export function useGetCurriculumList(param: CurriculumSearchParams) {
  return useQuery(queryOptions.list(param));
}

export function useGetCurriculumDetail(curriculumId: number) {
  return useQuery(queryOptions.detail(curriculumId));
}

export function useCreateCurriculum(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
