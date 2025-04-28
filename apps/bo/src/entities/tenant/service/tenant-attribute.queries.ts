import TenantAttributeService from '../api/tenant-attribute';

export const queryKeys = {
  all: ['tenant-attribute'] as const,
};

export const tenantAttributeQueryOptions = {
  all: (tenantId: string) => ({
    queryKey: [...queryKeys.all],
    queryFn: () => TenantAttributeService.findTenantAttributeCompany(tenantId),
  }),
};
