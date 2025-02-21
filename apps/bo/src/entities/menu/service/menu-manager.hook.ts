import { useQuery } from '@tanstack/react-query';
import { menuManagerQueryOptions as queryOptions } from './menu-manager.queries';

export function useMenuMangerFetchMenus() {
  return useQuery(queryOptions.all());
}
