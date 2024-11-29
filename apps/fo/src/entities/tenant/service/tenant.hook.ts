import { useQuery, skipToken } from '@tanstack/react-query';

import { queryOptions } from './tenant.queries';
import { Tenant } from '../model/tenant';

export function useFetchTenant(tenantId?: number) {
  return useQuery(queryOptions.detail(tenantId));
}
