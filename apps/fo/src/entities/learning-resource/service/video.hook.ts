import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { videoMutateOptions } from './video.queries';

export function useVideoWatchLog(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...videoMutateOptions.watchLog(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      // queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
    ...mutationOptions,
  });

  return {
    watchLog: (payload: any, callback?: MutateOptions<unknown, unknown, any>) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
