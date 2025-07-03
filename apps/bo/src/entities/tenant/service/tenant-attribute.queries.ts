import TenantAttributeService from '../api/tenant-attribute';
import { getQuerySkipToken } from '@learnway/shared';

export const tenantAttributeQueryKeys = {
  all: ['tenant-attribute'] as const,
};

export const tenantAttributeQueryOptions = {
  all: (tenantId?: number) =>
    tenantId
      ? {
          queryKey: [...tenantAttributeQueryKeys.all],
          queryFn: () => TenantAttributeService.findTenantAttributeCompany(tenantId),
        }
      : getQuerySkipToken<any>(),
};

export const tenantAttributeMutateOptions = {
  update: () => ({
    mutationFn: ({ tenantId, body }: { tenantId: number; body: any }) =>
      TenantAttributeService.modifyTenantAttributeCompany(tenantId, body),
  }),
};
