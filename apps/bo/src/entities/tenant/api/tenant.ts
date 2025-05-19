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

  static fetchPageTenant(payload: any) {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/tenants`);
  }

  static createTenant(payload: any) {
    const reqbody = genTenantCreate(payload);
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, reqbody);
  }

  static existTenant(name: string) {
    return httpService.get<boolean>(`${PMSApiPrefix()}/tenants`, { name: name });
  }

  //목록을 변형 하여 전체 목록 가지고 오기
  static fetchAllTenant(payload: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/tenants`, { size: 100000 });
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
  };
}
