import { useQuery, useQueryClient } from '@tanstack/react-query';

import { html5QueryOptions } from './html5.queries';

export function useGetHtml5Resource(contentUuid?: string) {
  return useQuery(html5QueryOptions.resource(contentUuid));
}
