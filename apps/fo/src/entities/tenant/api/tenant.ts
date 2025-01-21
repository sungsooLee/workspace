import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../model/tenant';

import tenantsMock from '../../mock/tenants.json';
import tenantsMockByUser from '../../mock/tenantsByUser.json';

export default class TenantService {
  static fetchTenant(id: number) {
    //return httpService.get<Tenant>(`${PMSApiPrefix()}/tenants/${id}`);
    return new Promise((resolve) => setTimeout(() => resolve(tenantsMock as any)));
  }

  static fetchTenantsByUser(id: string) {
    return new Promise((resolve) => setTimeout(() => resolve(tenantsMockByUser as any)));
  }

  static createTenant(payload: any) {
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, payload);
  }

  static updateTenant(payload: any) {
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, payload);
  }

  static deleteTenant(id: number) {
    return httpService.post<Tenant>(`${PMSApiPrefix()}/tenants`, { id });
  }
}
