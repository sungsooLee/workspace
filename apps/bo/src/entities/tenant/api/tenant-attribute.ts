import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class TenantAttributeService {
  // 테스트 용 API
  static findTenantAttributeCompany(tenantId: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/tenants/company-setting/${tenantId}`);
  }
}
