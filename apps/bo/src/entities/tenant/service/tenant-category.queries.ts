import TenantCategoryService from '@entities/tenant/api/tenant-category';

export const queryKeys = {
  all: (tenantId: number) => ['tenant-category', tenantId] as const,
  detail: (tenantId: number, id: number) => ['tenant-category', tenantId, id] as const,
};

export const queryOptions = {
  all: (tenantId: number) => ({
    queryKey: queryKeys.all(tenantId),
    queryFn: async () => {
      const data = await TenantCategoryService.getTenantCategory(tenantId);
      console.log('## get tenant category :: ', data);

      if (!data) return null;
      return data;
    },
    enabled: !!tenantId,
  }),
  detail: (tenantId: number, id: number) => ({
    queryKey: queryKeys.detail(tenantId, id),
    queryFn: async () => {
      const data = await TenantCategoryService.getTenantCategoryDetail(tenantId, id);
      console.log('## get tenant category detail :: ', data);
      if (!data) return null;
      return data;
    },
    enabled: !!tenantId && !!id,
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => TenantCategoryService.createTenantCategory(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => TenantCategoryService.updateTenantCategory(payload),
  }),
  delete: () => ({
    mutationFn: (payload: any) => TenantCategoryService.deleteTenantCategory(payload),
  }),
  move: () => ({
    mutationFn: (payload: any) => TenantCategoryService.moveTenantCategory(payload),
  }),
  mapping: () => ({
    mutationFn: (payload: any) => TenantCategoryService.mappingTenantCategory(payload),
  }),
};
