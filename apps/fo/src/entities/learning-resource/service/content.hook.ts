import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { contentApi } from '../api/content';

export const contentQueryKeys = {
  all: ['content'] as const,
  detail: (contentUuid: string) => [...contentQueryKeys.all, contentUuid] as const,
  progressMulti: (payload: any) => [...contentQueryKeys.all, ...Object.values(payload)],
};

export const contentQueryOptions = {
  detail: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: contentQueryKeys.detail(contentUuid),
          queryFn: () => contentApi.getDetail(contentUuid),
        }
      : getQuerySkipToken<any>(),

  progressMulti: (payload: any) =>
    payload
      ? {
          queryKey: contentQueryKeys.progressMulti(payload),
          queryFn: () => contentApi.getProgressMulti(payload),
        }
      : getQuerySkipToken<any>(),
};

export function useGetContentDetail(contentUuid?: string) {
  return useQuery(contentQueryOptions.detail(contentUuid));
}
