import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { videoApi } from '../api/video';
import { CmsVideoContentInfoResDto } from '@learnway/types';

export const videoQueryKeys = {
  all: ['video'] as const,
  watchInitialize: (param: any) => [...videoQueryKeys.all, ...Object.values(param)] as const,
};

export const vidoeQueryOptions = {
  watchInitialize: (param?: any) =>
    param
      ? {
          queryKey: videoQueryKeys.watchInitialize(param),
          queryFn: () => videoApi.watchInitialize(param),
        }
      : getQuerySkipToken<CmsVideoContentInfoResDto>(),
};

export const videoMutateOptions = {
  watchLog: () => ({
    mutationFn: (payload: any) => videoApi.watchLog(payload),
  }),

  watchLogStatistics: () => ({
    mutationFn: (payload: any) => videoApi.watchLogStatistics(payload),
  }),
};

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
