import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { ImageService } from '../api/image';
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
          queryFn: () => ImageService.getImageResource(contentUuid),
        }
      : getQuerySkipToken<CmsImageContent>(),
};
