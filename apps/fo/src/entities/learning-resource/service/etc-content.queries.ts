import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { EtcContentService } from '../api/etc-content';

export const etcContentQueryKeys = {
  all: ['etc-content'] as const,
  resource: (contentUuid: string) => [...etcContentQueryKeys.all, contentUuid] as const,
};

export const etcContentQueryOptions = {
  resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: etcContentQueryKeys.resource(contentUuid),
          queryFn: () => EtcContentService.getEtcContentResource(contentUuid),
        }
      : getQuerySkipToken<any>(),
};
