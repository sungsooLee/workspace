import { useQuery, useQueryClient } from '@tanstack/react-query';

import { blogQueryOptions } from './blog.queries';

export function useGetBlogResource(contentUuid?: string) {
  return useQuery(blogQueryOptions.resource(contentUuid));
}
