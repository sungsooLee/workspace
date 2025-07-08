import { useQuery, useQueryClient } from '@tanstack/react-query';

import { scormRteQueryOptions } from '../../scorm/service/scorm-rte.queries';

export function useGetScormRteScoInfo(param?: any) {
  return useQuery(scormRteQueryOptions.scoInfo(param));
}
