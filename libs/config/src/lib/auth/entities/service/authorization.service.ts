import type { AxiosResponse } from 'axios';

import { AuthUser, AuthSSOHealthcheck } from '../../../types';
import { tokenService } from './token.service';
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
  const user = data.data;
  const { tenantIds } = user;
  return {
    ...user,
    activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
    //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
  };
}

export function getHMGSSORedirectUrl(data: AuthSSOHealthcheck): string {
  return `${import.meta.env.VITE_HMG_SSO_DOMAIN}/SPI/sso/oidc/authorize?response_type=code&scope=openid&client_id=${encodeURIComponent(data.clientId)}&redirect_uri=${encodeURIComponent(data.redirectUri)}&state=${encodeURIComponent(data.state)}`;
}
