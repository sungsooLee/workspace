import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import ScormRteService from '../api/scorm-rte';

export const scormRteQueryKeys = {
  all: ['scorm-rte'] as const,
  scoUrl: (param: any) => [...scormRteQueryKeys.all, ...Object.values(param)] as const,
};

export const scormRteQueryOptions = {
  scoInfo: (param?: any) =>
    param
      ? {
          queryKey: scormRteQueryKeys.scoUrl(param),
          queryFn: () => ScormRteService.getScoInfo(param),
        }
      : getQuerySkipToken<any>(),
};
