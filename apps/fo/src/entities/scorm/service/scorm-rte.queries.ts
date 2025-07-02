import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import ScormRteService from '../api/scorm-rte';

export const scormRteQueryKeys = {
  all: ['scorm-rte'] as const,
};

export const scormRteQueryOptions = {
  // detail: (menuId: number) => ({
  //   queryKey: scormRteQueryKeys.detail(menuId),
  //   queryFn: () => MenuService.getMenu(menuId),
  // }),
};
