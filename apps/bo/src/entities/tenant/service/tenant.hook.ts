import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import CompaniesService from '@entities/companies/api/companies';

import { Tenant, TenantByRoleId } from '../model/tenant.types';
import TenantService from '../api/tenant';

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
          queryFn: (): Promise<Tenant> => TenantService.fetchTenant(tenantId),
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
  tenantByRoleId: <T = TenantByRoleId[]>(roleId: number): UseQueryOptions<T> => ({
    queryKey: tenantQueryKeys.tenantByRoleId(roleId),
    queryFn: async (): Promise<T> => TenantService.fetchTenantByRoleId(roleId),
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
      tenantId ? TenantService.deleteTenant(tenantId) : getQuerySkipToken<Tenant>(),
  }),
};

export function useFetchTenant(tenantId?: number) {
  return useQuery(tenantQueryOptions.detail(tenantId));
}

/**
 * 테넌트 목록 조회 ( 역할 기준 )
 * @param roleId - 역할
 * @param options - 추가 쿼리 옵션.
 */
export const useFetchTenantByRoleId = <T = TenantByRoleId[]>(
  roleId: number,
  options?: UseQueryOptions<T, Error>,
): UseQueryResult<T, Error> => {
  return useQuery({
    ...tenantQueryOptions.tenantByRoleId<T>(roleId),
    ...options,
    staleTime: Infinity,
  });
};

export function useCreateTenant(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...tenantMutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.list });
      console.log('aaaaaaaa');
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateTenant(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...tenantMutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.list });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
