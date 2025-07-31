import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { imageApi } from '../api/image';
import { CmsImageContent } from '@learnway/types';

export const imageQueryKeys = {
  all: ['image'] as const,
  resouce: (contentUuid: string) => [...imageQueryKeys.all, contentUuid] as const,
};

export const imageQueryOptions = {
  resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: imageQueryKeys.resouce(contentUuid),
          queryFn: () => imageApi.getImageResource(contentUuid),
        }
      : getQuerySkipToken<CmsImageContent>(),
};

export function useGetImageResource(contentUuid?: string) {
  return useQuery(imageQueryOptions.resource(contentUuid));
}
