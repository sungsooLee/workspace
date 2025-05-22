import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../../../types/entities/tenant';
import { PageableContent } from '@types';

export default class TenantService {
  static fetchTenant(tenantId: number) {
    return httpService.get<any>(`${PMSApiPrefix()}/tenants/${tenantId}`);
  }

  static updateTenant(payload: any) {
    const tenantId = payload.tenantId;
    return httpService.put<Tenant>(`${PMSApiPrefix()}/tenants/${tenantId}`, payload);
  }

  static deleteTenant(tenantId: number) {
    return httpService.delete<Tenant>(`${PMSApiPrefix()}/tenants${tenantId}`);
  }

  static fetchListTenant(params: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/tenants`, params);
  }

  static createTenant(payload: any) {
    const reqbody = genTenantCreate(payload);
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, reqbody);
  }

  static existTenant(name: string) {
    return httpService.get<boolean>(`${PMSApiPrefix()}/tenants/exists`, { name: name });
  }

  //전체 목록 가지고 오기 임시 (size 값으로)
  static async fetchAllTenant() {
    const data = await httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/tenants`, {
      size: 100000,
    });

    return data.content;
  }
}

function genTenantCreate(payload: any) {
  return {
    tenantName: payload.tenantName,
    logoImageUrl: payload.logoImageUrl,
    tenantMappingRoleList: payload.tenantMappingRoleList,
    tenantBillingTag: payload.tenantBillingTag,
    companyTenantList: payload.companyTenantList,
    isUsed: payload.isUsed,
    tenantDesc: payload.tenantDesc,
    isPc: payload.isPc,
    isMobile: payload.isMobile,
    isApp: payload.isApp,
    isCommonCategory: payload.isCommonCategory,
    isTenantCategory: payload.isTenantCategory,
    tenantMappingLanguageTypeList: payload.tenantMappingLanguageTypeList,
    tenantMappingUserList: payload.tenantMappingUserList,
  };
}
