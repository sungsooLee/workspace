import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../model/tenant';

export default class TenantService {
  static fetchTenant(id: number) {
    return httpService.get<Tenant>(`${PMSApiPrefix()}/tenants/${id}`);
  }
}
