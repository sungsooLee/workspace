import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import { Category, CategoryDetail } from '@types';

export default class TenantCategoryService {
  static getTenantCategory(tenantId: number): Promise<Category> {
    return httpService.get<Category>(`${LMSApiPrefix()}/tenant/${tenantId}/category/tree`);
  }

  static getTenantCategoryDetail(tenantId: number, id: number): Promise<CategoryDetail> {
    return httpService.get(`${LMSApiPrefix()}/tenant/${tenantId}/category/${id}`);
  }
}
