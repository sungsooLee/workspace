import categoryMock from '../../mock/category.json';
import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';

export default class CategoryService {
  static getCategories(params: any) {
    return new Promise((resolve) => setTimeout(() => resolve(categoryMock as any)));
  }

  static getCategoryTree(tenantId: number) {
    return httpService.get<any>(`${LMSApiPrefix()}/tenant-category/tree/${tenantId}`);
  }

  static getCategoryDetail(categoryId: number) {
    return httpService.get<any>(`${LMSApiPrefix()}/category/${categoryId}`);
  }
}
