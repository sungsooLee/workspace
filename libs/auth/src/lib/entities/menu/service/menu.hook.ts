import { useQuery, useQueryClient } from '@tanstack/react-query';

import { convertHierarchyToList } from '@learnway/shared';

import { queryOptions, queryKeys } from './menu.queries';

export function useFetchMenus(tenantId?: number, roleId?: number) {
  return useQuery(queryOptions.all(tenantId, roleId));
}

export function useFetchMenu({ menuId }: { menuId: number }) {
  return useQuery(queryOptions.detail(menuId));
}

export function useAsycFetchMenus(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    asyncMenus: async (tenantId: number, roleId: number) => {
      // console.log('#### asyncMenus', tenantId, roleId);

      // TODO 롤 체크 추가 ( FO 로그인 정책 추가 후 )
      // tenantId, roleId 없을때 예외처리
      // if (!tenantId || !roleId) return [];
      if (!tenantId) return [];

      try {
        await queryClient.invalidateQueries({ queryKey: queryKeys.all });
        const menus = await queryClient.fetchQuery(queryOptions.all(tenantId, roleId));
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
      } catch (error) {
        console.warn('## MENU ERROR ##', error);
        return [];
      }
    },
  };
}

export function useAsycFetchMenusForceRefatch(mutationOptions = {}) {
  const queryClient = useQueryClient();

  return {
    asyncMenus: async (tenantId: number, roleId: number) => {
      // TODO 롤 체크 추가 ( FO 로그인 정책 추가 후 )
      // tenantId, roleId 없을때 예외처리
      // if (!tenantId || !roleId) return [];
      if (!tenantId) return [];

      console.log('useAsycFetchMenusForceRefatch');

      try {
        await queryClient.invalidateQueries({ queryKey: queryKeys.all });
        const menus = await queryClient.fetchQuery(queryOptions.all(tenantId, roleId));

        console.log('### menus', menus);

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
      } catch (error) {
        console.warn('## MENU ERROR ##', error);
        return [];
      }
    },
  };
}
