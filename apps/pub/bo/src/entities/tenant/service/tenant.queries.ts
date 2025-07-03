import { skipToken } from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import TenantService from '../api/tenant';
import { Tenant } from '../../../types/entities/tenant';

export const queryKeys = {
  all: ['tenants'] as const,
  detail: (tenantId: number) => [...queryKeys.all, tenantId] as const,
};

export const queryOptions = {
  detail: (tenantId?: number) =>
    tenantId
      ? {
          queryKey: queryKeys.detail(tenantId),
          queryFn: (): Promise<any> => TenantService.fetchTenant(tenantId),
        }
      : getQuerySkipToken<Tenant>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Tenant) => TenantService.createTenant(payload),
  }),
  update: () => ({
    mutationFn: (payload: Tenant) => TenantService.updateTenant(payload),
  }),
  delete: () => ({
    mutationFn: (tenantId?: number) =>
      tenantId ? TenantService.deleteTenant(tenantId) : skipToken,
  }),
};
