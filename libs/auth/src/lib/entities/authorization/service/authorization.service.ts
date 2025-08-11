import type { AxiosResponse } from 'axios';

import { getConfig, tokenService } from '@learnway/config';

import { AuthSSOHealthcheck, AuthUser } from '../../../types';
import { queryOptions } from './authorization.queries';

export { queryOptions as authSSOQueryOptions };

export function assignToken(data: AxiosResponse) {
  try {
    tokenService.clear();
    tokenService.accessToken = data.headers['access-token'];
    tokenService.refreshToken = data.headers['refresh-token'];
  } catch (e) {
    tokenService.clear();
  }
}

export function removeToken() {
  tokenService.clear();
}

/**
 * @description 로그인 데이터를 변경 처리
 * @param data (AxiosResponse)
 * @returns AuthUser
 */
export function convertToAuthUser(data: AxiosResponse): AuthUser {
  // console.log('### convertToAuthUser', data);
  const user = data.data as AuthUser;
  const { tenants, roles: rolesAll } = user;

  const APP_INFO = getConfig().APP_INFO;

  // console.log('### APP_INFO', APP_INFO);

  // 마지막 저장된 테넌트, 롤 정보
  const tenantId = APP_INFO === 'BO' ? user.lastVisitedBoTenantId : user.lastVisitedFoTenantId;
  const roleId = APP_INFO === 'BO' ? user.lastVisitedBoRoleId : user.lastVisitedFoRoleId;

  // 로그인 데이터 중 siteScope에 맞는 역할 필터링
  const roles = rolesAll?.filter((role) => role.siteScope === APP_INFO);

  // // console.log('### LAST 테넌트 : ', tenantId);
  // // console.log('### LAST 롤: ', roleId);

  const tenant = tenants?.find((tenant: { tenantId: any }) => tenant.tenantId === tenantId);
  const role = roles.find((role: { roleId: any }) => role.roleId === roleId);

  const activeTenant = tenant ? tenant : tenants?.length > 0 ? tenants?.[0] : undefined;
  const activeRole = role ? role : roles?.length > 0 ? roles?.[0] : undefined;

  if (activeTenant) {
    localStorage.setItem('GNB_TENANT_ID', String(activeTenant.tenantId));
  }
  if (activeRole) {
    localStorage.setItem('GNB_ROLE_ID', String(activeRole.roleId));
  }

  return {
    ...user,
    roles,
    activeTenant,
    activeRole,
    phoneNumberNationCode: user?.phoneNumberNationCode ?? 'KR',
    exp: data.headers['refresh-token-exp'],
    // accessToken: data.headers['access-token'],
    // refreshToken: data.headers['refresh-token'],
    // passwordExpireDate: '2025-04-14T14:03:35.000+00:00',
    // activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
    // activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
  };
}

export function getHMGSSORedirectUrl(data: AuthSSOHealthcheck): string {
  return `${import.meta.env.VITE_HMG_SSO_DOMAIN}/SPI/sso/oidc/authorize?response_type=code&scope=openid&client_id=${encodeURIComponent(data.clientId)}&redirect_uri=${encodeURIComponent(data.redirectUri)}&state=${encodeURIComponent(data.state)}`;
}
