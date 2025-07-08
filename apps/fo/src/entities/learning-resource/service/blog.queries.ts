import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { BlogService } from '../api/blog';

export const blogQueryKeys = {
  all: ['blog'] as const,
  resouce: (contentUuid: string) => [...blogQueryKeys.all, contentUuid] as const,
};

export const blogQueryOptions = {
  resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: blogQueryKeys.resouce(contentUuid),
          queryFn: () => BlogService.getBlogResource(contentUuid),
        }
      : getQuerySkipToken<any>(),

  // detail: (menuId: number) => ({
  //   queryKey: scormRteQueryKeys.detail(menuId),
  //   queryFn: () => MenuService.getMenu(menuId),
  // }),
};
