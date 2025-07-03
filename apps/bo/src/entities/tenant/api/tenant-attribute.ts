import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class TenantAttributeService {
  // 테스트 용 API

  static findTenantAttributeCompany(tenantId: number) {
    return httpService.get<any>(`${PMSApiPrefix()}/tenants/${tenantId}/properties`);
  }

  static modifyTenantAttributeCompany(tenantId: number, body: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/tenants/${tenantId}/properties`, body);
  }
}
