import { useQuery, useQueryClient } from '@tanstack/react-query';

import { imageQueryOptions } from './image.queries';

export function useGetImageResource(contentUuid?: string) {
  return useQuery(imageQueryOptions.resource(contentUuid));
}
