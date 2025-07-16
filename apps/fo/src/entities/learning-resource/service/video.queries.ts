import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { VideoService } from '../api/video';

export const videoQueryKeys = {
  all: ['video'] as const,
  watchInitialize: (param: any) => [...videoQueryKeys.all, ...Object.values(param)] as const,
};

export const vidoeQueryOptions = {
  watchInitialize: (param?: any) =>
    param
      ? {
          queryKey: videoQueryKeys.watchInitialize(param),
          queryFn: () => VideoService.watchInitialize(param),
        }
      : getQuerySkipToken<any>(),
};

export const videoMutateOptions = {
  watchLog: () => ({
    mutationFn: (payload: any) => VideoService.watchLog(payload),
  }),
};
