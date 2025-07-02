import { useQuery, useQueryClient } from '@tanstack/react-query';

import { contentQueryOptions } from './content.queries';

export function useGetContentDetail(contentUuid?: string) {
  return useQuery(contentQueryOptions.detail(contentUuid));
}
