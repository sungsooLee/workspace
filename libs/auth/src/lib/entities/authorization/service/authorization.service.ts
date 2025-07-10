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

// TODO Active BO, FO 체크 추가
export function convertToAuthUser(data: AxiosResponse): AuthUser {
  console.log('### convertToAuthUser', data);
  const user = data.data;
  const { tenants, roles } = user;

  const APP_INFO = getConfig().APP_INFO;

  console.log('### APP_INFO', APP_INFO);

  const tenantId = APP_INFO === 'BO' ? user.lastVisitedBoTenantId : user.lastVisitedFoTenantId;
  const roleId = APP_INFO === 'BO' ? user.lastVisitedBoRoleId : user.lastVisitedFoRoleId;

  console.log('### LAST 테넌트 : ', tenantId);
  console.log('### LAST 롤: ', roleId);

  const tenant = tenants?.find((tenant: { tenantId: any }) => tenant.tenantId === tenantId);
  const role = roles?.find((role: { roleId: any }) => role.roleId === roleId);

  return {
    ...user,
    activeTenant: tenant ? tenant : user.tenants?.length > 0 ? tenants?.[0] : null,
    activeRole: role ? role : roles?.roles?.length > 0 ? roles?.roles?.[0] : null,
    phoneNumberNationCode: user?.phoneNumberNationCode ?? 'KR',
    accessToken: data.headers['access-token'],
    refreshToken: data.headers['refresh-token'],
    exp: data.headers['refresh-token-exp'],
    //passwordExpireDate: '2025-04-14T14:03:35.000+00:00',
    //activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
    //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
  };
}

export function getHMGSSORedirectUrl(data: AuthSSOHealthcheck): string {
  return `${import.meta.env.VITE_HMG_SSO_DOMAIN}/SPI/sso/oidc/authorize?response_type=code&scope=openid&client_id=${encodeURIComponent(data.clientId)}&redirect_uri=${encodeURIComponent(data.redirectUri)}&state=${encodeURIComponent(data.state)}`;
}
