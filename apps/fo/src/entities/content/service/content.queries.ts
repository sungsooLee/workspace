import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import ContentService from '../api/content';

export const contentQueryKeys = {
  all: ['content'] as const,
  detail: (contentUuid: string) => [...contentQueryKeys.all, contentUuid] as const,
};

export const contentQueryOptions = {
  detail: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: contentQueryKeys.detail(contentUuid),
          queryFn: () => ContentService.getDetail(contentUuid),
        }
      : getQuerySkipToken<any>(),

  // detail: (menuId: number) => ({
  //   queryKey: scormRteQueryKeys.detail(menuId),
  //   queryFn: () => MenuService.getMenu(menuId),
  // }),
};
