import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../../../types/entities/tenant';

export default class TenantService {
  static fetchAllTenant(payload: any) {
    return httpService.get<Tenant>(`${PMSApiPrefix()}/tenants/`, payload);
  }
  static fetchTenant(id: number) {
    return httpService.get<Tenant>(`${PMSApiPrefix()}/tenants/${id}`);
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
