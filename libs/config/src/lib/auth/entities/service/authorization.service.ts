import type { AxiosResponse } from 'axios';

import { AuthUser } from '../../../types';

export function assignToken(data: AxiosResponse) {
  try {
    localStorage.clear();
    localStorage.setItem('ACCESS-TOKEN', data.headers['access-token']);
    localStorage.setItem('REFRESH-TOKEN', data.headers['refresh-token']);
  } catch (e) {
    localStorage.clear();
  }
}

export function removeToken() {
  localStorage.clear();
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
