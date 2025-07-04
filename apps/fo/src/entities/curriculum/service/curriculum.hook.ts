import { useQuery, useQueryClient } from '@tanstack/react-query';

import { curriculumnQueryOptions } from './curriculum.queries';

export function useGetCurriculumnDetail(curriculumId?: number) {
  return useQuery(curriculumnQueryOptions.detail(curriculumId));
}
