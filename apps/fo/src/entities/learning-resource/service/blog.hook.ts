import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { blogApi } from '../api/blog';

export const blogQueryKeys = {
  all: ['blog'] as const,
  resouce: (contentUuid: string) => [...blogQueryKeys.all, contentUuid] as const,
};

export const blogQueryOptions = {
  resource: (contentUuid?: string) =>
    contentUuid
      ? {
          queryKey: blogQueryKeys.resouce(contentUuid),
          queryFn: () => blogApi.getBlogResource(contentUuid),
        }
      : getQuerySkipToken<any>(),

  // detail: (menuId: number) => ({
  //   queryKey: scormRteQueryKeys.detail(menuId),
  //   queryFn: () => MenuService.getMenu(menuId),
  // }),
};

export function useGetBlogResource(contentUuid?: string) {
  return useQuery(blogQueryOptions.resource(contentUuid));
}
