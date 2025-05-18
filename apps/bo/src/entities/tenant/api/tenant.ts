import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../../../types/entities/tenant';

export default class TenantService {
  static fetchAllTenant(payload: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/tenants`, payload);
  }
  static fetchTenant(id: number) {
    return httpService.get<Tenant>(`${PMSApiPrefix()}/tenants/${id}`);
  }

  static createTenant(payload: any) {
    const reqbody = genTenantCreate(payload);
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, reqbody);
  }

  static updateTenant(payload: any) {
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, payload);
  }

  static deleteTenant(id: number) {
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, { id });
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
