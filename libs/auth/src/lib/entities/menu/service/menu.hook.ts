import { useQuery, useQueryClient } from '@tanstack/react-query';

import { convertHierarchyToList } from '@learnway/shared';

import { queryOptions } from './menu.queries';

export function useFetchMenus(tenantId?: number) {
  return useQuery(queryOptions.all(tenantId));
}

export function useFetchMenu({ menuId }: { menuId: string }) {
  return useQuery(queryOptions.detail(menuId));
}

export function useAsycFetchMenus(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    asyncMenus: async (tenantId: number) => {
      const menus = await queryClient.fetchQuery(queryOptions.all(tenantId));
      console.log(
        'convertHierarchyToList',
        menus,
        convertHierarchyToList(
          menus,
          /*
  (node: any, depth: number, index: number, parentNode?: any) => {
    node['depth'] = depth;
    node['parentNode'] = parentNode;
    node['key'] = getRandomId();
    return node;
  },*/
        ),
      );
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
