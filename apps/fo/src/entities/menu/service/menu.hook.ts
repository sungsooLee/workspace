import { useQuery, useQueryClient } from '@tanstack/react-query';

import { convertHierarchyToList } from '@learnway/shared';

import { queryOptions } from './menu.queries';
import { FetchMenusParams } from '../../../types/entities/menu';

export function useFetchMenus(params: FetchMenusParams) {
  return useQuery(queryOptions.all(params));
}

export function useFetchMenu({ menuId }: { menuId: string }) {
  return useQuery(queryOptions.detail(menuId));
}

export function useAsycFetchMenus(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    asyncMenus: async (params: any) => {
      const menus = await queryClient.fetchQuery(queryOptions.all(params));

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
