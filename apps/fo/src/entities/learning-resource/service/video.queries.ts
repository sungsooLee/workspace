import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { VideoService } from '../api/video';

export const videoQueryKeys = {
  all: ['video'] as const,
  scoUrl: (param: any) => [...videoQueryKeys.all, ...Object.values(param)] as const,
};

export const scormRteQueryOptions = {
  // scoInfo: (param?: any) =>
  //   param
  //     ? {
  //         queryKey: videoQueryKeys.scoUrl(param),
  //         queryFn: () => VideoService.getScoInfo(param),
  //       }
  //     : getQuerySkipToken<any>(),
};

export const videoMutateOptions = {
  watchLog: () => ({
    mutationFn: (payload: any) => VideoService.watichLog(payload),
  }),
};
