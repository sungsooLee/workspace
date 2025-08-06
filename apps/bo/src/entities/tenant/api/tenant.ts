import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

import { PageableContent } from '@shared/types/page-meta';
import { Tenant, TenantByRoleId } from '../model/tenant.types';

export const tenantApi = {
  fetchTenant: (tenantId: number) => {
    return httpService.get<any>(`${PMSApiPrefix()}/tenants/${tenantId}`);
  },

  updateTenant: (payload: any) => {
    const tenantId = payload.tenantId;
    const reqBody = genTenantUpdate(payload);
    return httpService.put<Tenant>(`${PMSApiPrefix()}/tenants/${tenantId}`, reqBody);
  },
  deleteTenant: (tenantId: number) => {
    return httpService.delete<Tenant>(`${PMSApiPrefix()}/tenants${tenantId}`);
  },
  fetchListTenant: (params: any) => {
    return httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/tenants`, params);
  },
  createTenant: (payload: any) => {
    const reqbody = genTenantCreate(payload);
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, reqbody);
  },
  existTenant: (tenantName: string, tenantId?: number) => {
    return httpService.get<boolean>(`${PMSApiPrefix()}/tenants/exists`, {
      tenantName,
      tenantId,
    });
  },
  //전체 목록 가지고 오기 임시 (size 값으로)
  fetchAllTenant: async () => {
    const data = await httpService.get<PageableContent<any>>(`${PMSApiPrefix()}/tenants`, {
      size: 100000,
    });

    return data.content;
  },
  /**
   * @description 테넌트 목록조회 ( 역할 기준 )
   * @param roleId
   * @returns TenantByRoleId[]
   */
  fetchTenantByRoleId: <T = TenantByRoleId[]>(roleId: number) => {
    return httpService.get<T>(`${PMSApiPrefix()}/tenants/role/${roleId}`);
  },
};

function genTenantCreate(payload: any) {
  return {
    tenantName: payload.tenantName,
    logoImageUrl: payload.logoImageUrl,
    tenantUserList: payload.tenantUserList,
    tenantTagList: payload.tenantTagList,
    companyTenantList: payload.companyTenantList,
    isSecurityPledge: payload.isSecurityPledge,
    isUsed: payload.isUsed,
    tenantDesc: payload.tenantDesc,
    isPc: payload.isPc,
    isMobile: payload.isMobile,
    isApp: payload.isApp,
    isCommonCategory: payload.isCommonCategory,
    isTenantCategory: payload.isTenantCategory,
    langCountryCodeTypeList: payload.langCountryCodeTypeList,
    fileStorageTypeChannelList: payload.fileStorageTypeChannelList,
    fileStorageTypeBase: payload.fileStorageTypeBase,
    flatformProperties: {
      isUseEnrollOption: payload.isEnrollOption,
      isUseTextBookOption: payload.isTextBookOption,
      isUseInstructorOption: payload.isInstructorOption,
      isUsePassOption: payload.isPassOption,
      isUseCommunicationOption: payload.isCommunicationOption,
      isUseLearningEnvOption: payload.isLearningEnvOption,
      isUseLearningControlOption: payload.isLearningControlOption,
      isUseRelatedCourseOption: payload.isRelatedCourseOption,
      isUseAdminDataOption: payload.isAdminDataOption,
      isUseCarTenantCustomOption: payload.isCarTenantCustomOption,
      isUseRotemTenantCustomOption: payload.isRotemTenantCustomOption,
      isUseOutsourcingTenantCustomOption: payload.isOutsourcingTenantCustomOption,
      isUseWiaTenantCustomOption: payload.isWiaTenantCustomOption,
      isUseAutoeverTenantCustomOption: payload.isAutoeverTenantCustomOption,
    },
  };
}

function genTenantUpdate(payload: any) {
  return {
    tenantId: payload.tenantId,
    tenantName: payload.tenantName,
    logoImageUrl: payload.logoImageUrl,
    tenantUserList: payload.tenantUserList,
    tenantTagList: payload.tenantTagList,
    companyTenantList: payload.companyTenantList,
    isSecurityPledge: payload.isSecurityPledge,
    isUsed: payload.isUsed,
    tenantDesc: payload.tenantDesc,
    isPc: payload.isPc,
    isMobile: payload.isMobile,
    isApp: payload.isApp,
    isCommonCategory: payload.isCommonCategory,
    isTenantCategory: payload.isTenantCategory,
    langCountryCodeTypeList: payload.langCountryCodeTypeList,
    fileStorageTypeChannelList: payload.fileStorageTypeChannelList,
    fileStorageTypeBase: payload.fileStorageTypeBase,
    flatformProperties: {
      tenantId: payload.tenantId,
      isUseEnrollOption: payload.isEnrollOption,
      isUseTextBookOption: payload.isTextBookOption,
      isUseInstructorOption: payload.isInstructorOption,
      isUsePassOption: payload.isPassOption,
      isUseCommunicationOption: payload.isCommunicationOption,
      isUseLearningEnvOption: payload.isLearningEnvOption,
      isUseLearningControlOption: payload.isLearningControlOption,
      isUseRelatedCourseOption: payload.isRelatedCourseOption,
      isUseAdminDataOption: payload.isAdminDataOption,
      isUseCarTenantCustomOption: payload.isCarTenantCustomOption,
      isUseRotemTenantCustomOption: payload.isRotemTenantCustomOption,
      isUseOutsourcingTenantCustomOption: payload.isOutsourcingTenantCustomOption,
      isUseWiaTenantCustomOption: payload.isWiaTenantCustomOption,
      isUseAutoeverTenantCustomOption: payload.isAutoeverTenantCustomOption,
    },
  };
}
