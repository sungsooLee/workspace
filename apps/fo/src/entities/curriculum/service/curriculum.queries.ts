import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import { CurriculumService } from '../api/curriculum';

export const curriculumQueryKeys = {
  all: ['curriculum'] as const,
  detail: (curriculumId: string) => [...curriculumQueryKeys.all, curriculumId] as const,
};

export const curriculumnQueryOptions = {
  detail: (curriculumId?: string) =>
    curriculumId
      ? {
          queryKey: curriculumQueryKeys.detail(curriculumId),
          queryFn: () => CurriculumService.getDetail(curriculumId),
        }
      : getQuerySkipToken<any>(),
};
