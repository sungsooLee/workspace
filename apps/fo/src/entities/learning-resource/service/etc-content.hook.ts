import { useQuery } from '@tanstack/react-query';
import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { etcContentApi } from '../api/etc-content';

export const etcContentQueryKeys = {
  all: ['etc-content'] as const,
  resource: (contentUuid: string) => [...etcContentQueryKeys.all, contentUuid] as const,
};

export const etcContentQueryOptions = {
  resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: etcContentQueryKeys.resource(contentUuid),
          queryFn: () => etcContentApi.getEtcContentResource(contentUuid),
        }
      : getQuerySkipToken<any>(),
};

/**
 * Etc content Download용
 * @returns
 */
export const useEtcContentManager = () => {
  const download = (param: any) => etcContentApi.download(param);
  return {
    download,
  };
};

export function useGetEtcContentResource(contentUuid?: string) {
  return useQuery(etcContentQueryOptions.resource(contentUuid));
}
