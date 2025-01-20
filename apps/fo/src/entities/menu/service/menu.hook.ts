import { useQuery } from '@tanstack/react-query';

import { queryOptions } from './menu.queries';
import { FetchMenusParams } from '../../../types';

export function useFetchMenus(params: FetchMenusParams) {
  return useQuery(queryOptions.all(params));
}

export function useFetchMenu({ menuId }: { menuId: string }) {
  return useQuery(queryOptions.detail(menuId));
}
