import TenantCategoryService from '@entities/tenant/api/tenant-category';
import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  all: (tenantId: number) => ['tenant-category', tenantId] as const,
  detail: (tenantId: number, id: number) => ['tenant-category', tenantId, id] as const,
};

export const queryOptions = {
  all: (tenantId: number) => ({
    queryKey: queryKeys.all(tenantId),
    queryFn: async () => {
      if (tenantId) {
        const data = await TenantCategoryService.getTenantCategory(tenantId);
        console.log('## get tenant category :: ', data);

        if (!data) return null;
        return data;
      }
      return getQuerySkipToken();
    },
  }),
  detail: (tenantId: number, id: number) => ({
    queryKey: queryKeys.detail(tenantId, id),
    queryFn: async () => {
      if (tenantId && id) {
        const data = await TenantCategoryService.getTenantCategoryDetail(tenantId, id);
        console.log('## get tenant category detail :: ', data);
        if (!data) return null;
        return data;
      }
      return getQuerySkipToken();
    },
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
