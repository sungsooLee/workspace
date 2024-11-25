import { useQuery } from '@tanstack/react-query';

import { queryOptions } from './menu.queries';

export function useMenus({ parentMenuId }: { parentMenuId?: string }) {
  return useQuery(queryOptions.all(parentMenuId));
}

export function useMenu({ menuId }: { menuId: string }) {
  return useQuery(queryOptions.detail(menuId));
}
