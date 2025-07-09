import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { Html5Service } from '../api/html5';

export const html5QueryKeys = {
  all: ['html5'] as const,
  resouce: (contentUuid: string) => [...html5QueryKeys.all, contentUuid] as const,
};

export const html5QueryOptions = {
  resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: html5QueryKeys.resouce(contentUuid),
          queryFn: () => Html5Service.getHtml5Resource(contentUuid),
        }
      : getQuerySkipToken<any>(),

  // detail: (menuId: number) => ({
  //   queryKey: scormRteQueryKeys.detail(menuId),
  //   queryFn: () => MenuService.getMenu(menuId),
  // }),
};
