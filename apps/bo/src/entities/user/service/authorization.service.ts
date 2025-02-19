import type { AxiosResponse } from 'axios';

import { cookieService } from '@learnway/shared';

export function setAuthorization(data: AxiosResponse) {
  cookieService.clear();

  const user = data.data;
  const { userId, tenantIds } = user;
  cookieService.set('LOGIN_USER_ID', userId);
  cookieService.set('LOGIN_TENANT_ID', tenantIds[0]);
  //cookieService.set('LOGIN_ROLE_ID', roles[0]['roleId']);
  cookieService.set('ACCESS-TOKEN', data.headers['access-token']);
  cookieService.set('REFRESH-TOKEN', data.headers['refresh-token']);

  return {
    ...user,
    activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
    //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
  };
}

export function removeAuthorization() {
  cookieService.clear();

  cookieService.remove('LOGIN_USER_ID');
  cookieService.remove('LOGIN_TENANT_ID');
  //cookieService.set('LOGIN_ROLE_ID');
  cookieService.remove('ACCESS-TOKEN');
  cookieService.remove('REFRESH-TOKEN');
}
