import { skipToken } from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import TenantService from '../api/tenant';
import { Tenant } from '../../../types';

export const queryKeys = {
  all: ['tenants'] as const,
  detail: (tenantNo: number) => [...queryKeys.all, tenantNo] as const,
  // 유저 ID 기반으로 특정 유저의 테넌트를 가져오는 쿼리 키
  byUser: (accountId: string) => ['tenants', 'byUser', accountId] as const,
};

export const queryOptions = {
  detail: (tenantNo?: number) =>
    tenantNo
      ? {
          queryKey: queryKeys.detail(tenantNo),
          queryFn: (): Promise<any> => TenantService.fetchTenant(tenantNo),
        }
      : getQuerySkipToken<Tenant>(),
  // 유저 ID에 따른 테넌트 리스트 쿼리 옵션
  byUser: (userId: string) =>
    userId
      ? {
          queryKey: queryKeys.byUser(userId),
          queryFn: (): Promise<any> => TenantService.fetchTenantsByUser(userId),
        }
      : getQuerySkipToken<Tenant[]>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Tenant) => TenantService.createTenant(payload),
  }),
  update: () => ({
    mutationFn: (payload: Tenant) => TenantService.updateTenant(payload),
  }),
  delete: () => ({
    mutationFn: (tenantNo?: number) =>
      tenantNo ? TenantService.deleteTenant(tenantNo) : skipToken,
  }),
};
