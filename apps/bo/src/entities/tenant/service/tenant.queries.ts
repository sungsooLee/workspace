import { skipToken, UseQueryOptions } from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import CompaniesService from '@entities/companies/api/companies';

import TenantService from '../api/tenant';
import { PaginationResponse, Tenant, TenantByRoleId } from '@types';

export const tenantQueryKeys = {
  all: ['tenants'] as const,
  list: ['tenants-page'] as const,
  detail: (tenantId: number) => [...tenantQueryKeys.list, tenantId] as const,
  tenantCompanys: (tenantIds: number[]) => ['tenants-companys', ...tenantIds],
  tenantByRoleId: (roleId: number) => ['tenants-by-role-id', roleId],
};

export const tenantQueryOptions = {
  all: () => ({
    queryKey: tenantQueryKeys.all,
    queryFn: async (): Promise<any> => TenantService.fetchAllTenant(),
  }),
  list: (params: any) => ({
    queryKey: tenantQueryKeys.list,
    queryFn: () => TenantService.fetchListTenant(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (tenantId?: number) =>
    tenantId
      ? {
          queryKey: tenantQueryKeys.detail(tenantId),
          queryFn: (): Promise<any> => TenantService.fetchTenant(tenantId),
        }
      : getQuerySkipToken<Tenant>(),
  tenantCompanys: (tenantIds?: number[]) =>
    tenantIds && tenantIds.length > 0
      ? {
          queryKey: tenantQueryKeys.tenantCompanys(tenantIds),
          queryFn: async () => {
            const tenantPromise = TenantService.fetchAllTenant();
            const companys = (await CompaniesService.fetchAll({})).content;
            const tenantList = (await tenantPromise).filter((item) =>
              tenantIds.includes(item.tenantId),
            );
            const allCompanyIds: any[] = [];
            for (const i of tenantList) {
              allCompanyIds.push(...i.companyTenantList.map((item: any) => item.companyId));
            }
            return companys.filter((item: any) => allCompanyIds.includes(item.companyId));
          },
        }
      : getQuerySkipToken<any[]>(),
  tenantByRoleId: <T = TenantByRoleId>(roleId: number): UseQueryOptions<PaginationResponse<T>> => ({
    queryKey: tenantQueryKeys.tenantByRoleId(roleId),
    queryFn: async (): Promise<PaginationResponse<T>> => TenantService.fetchTenantByRoleId(roleId),
  }),
};

export const tenantMutateOptions = {
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
