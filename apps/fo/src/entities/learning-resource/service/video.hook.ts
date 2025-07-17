import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { vidoeQueryOptions, videoMutateOptions } from './video.queries';

export function useVideoWatchLog(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const watch = useMutation({
    ...videoMutateOptions.watchLog(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      // queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
    ...mutationOptions,
  });

  const statics = useMutation({ ...videoMutateOptions.watchLogStatistics(), ...mutationOptions });

  return {
    watch,
    statics,
    watchLog: (payload: any, options?: MutateOptions<unknown, unknown, any>) => {
      watch.mutate(payload, options);
    },
    watchLogStatistics: (payload: any, options?: MutateOptions<unknown, unknown, any>) => {
      statics.mutate(payload, options);
    },
  };
}

export function useVideoWatchInitialize(payload?: any) {
  return useQuery(vidoeQueryOptions.watchInitialize(payload));
}
