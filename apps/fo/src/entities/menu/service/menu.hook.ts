import { useQuery, useQueryClient } from '@tanstack/react-query';

import { convertHierarchyToList } from '@learnway/shared';

import { Role } from '@learnway/auth/types';
import { queryOptions } from './menu.queries';

export function useFetchMenus(tenantId?: number, roles?: Role[]) {
  return useQuery(queryOptions.all(tenantId, roles));
}

export function useFetchMenu({ menuId }: { menuId: number }) {
  return useQuery(queryOptions.detail(menuId));
}

export function useAsyncFetchMenus(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    asyncMenus: async (tenantId: number) => {
      const menus = await queryClient.fetchQuery(queryOptions.all(tenantId));

      return convertHierarchyToList(
        menus,
        /*
        (node: any, depth: number, index: number, parentNode?: any) => {
          node['depth'] = depth;
          node['parentNode'] = parentNode;
          node['key'] = getRandomId();
          return node;
        },*/
      );
    },
  };
}
