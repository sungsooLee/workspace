import type { AxiosResponse } from 'axios';

import { tokenService } from '@learnway/config';

import { AuthUser, AuthSSOHealthcheck } from '../../../types';
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

export function convertToAuthUser(data: AxiosResponse): AuthUser {
  console.log('convertToAuthUser', data);
  const user = data.data;
  const { tenants } = user;
  return {
    ...user,
    activeTenant: user.tenants?.length > 0 ? tenants?.[0] : null,
    //passwordExpireDate: '2025-04-14T14:03:35.000+00:00',
    //activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
    //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
  };
}

export function getHMGSSORedirectUrl(data: AuthSSOHealthcheck): string {
  return `${import.meta.env.VITE_HMG_SSO_DOMAIN}/SPI/sso/oidc/authorize?response_type=code&scope=openid&client_id=${encodeURIComponent(data.clientId)}&redirect_uri=${encodeURIComponent(data.redirectUri)}&state=${encodeURIComponent(data.state)}`;
}
