import { useQuery, useQueryClient } from '@tanstack/react-query';

import { scormRteQueryOptions } from './scorm-rte.queries';

export function useGetScormRteScoUrl(param?: any) {
  return useQuery(scormRteQueryOptions.scoUrl(param));
}
