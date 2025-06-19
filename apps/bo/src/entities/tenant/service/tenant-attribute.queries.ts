import TenantAttributeService from '../api/tenant-attribute';
import { getQuerySkipToken } from '@learnway/shared';

export const tenantAttributeQueryKeys = {
  all: ['tenant-attribute'] as const,
};

export const tenantAttributeQueryOptions = {
  all: (tenantId: number) => ({
    queryKey: [...tenantAttributeQueryKeys.all],
    queryFn: () =>
      tenantId ? TenantAttributeService.findTenantAttributeCompany(tenantId) : getQuerySkipToken(),
  }),
};

export const tenantAttributeMutateOptions = {
  update: () => ({
    mutationFn: ({ tenantId, body }: { tenantId: number; body: any }) =>
      TenantAttributeService.modifyTenantAttributeCompany(tenantId, body),
  }),
};
