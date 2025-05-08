import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import { Category, CategoryDetail } from '@types';
import { TenantCategoryDetail } from 'src/types/entities/tenant-category';

export default class TenantCategoryService {
  static getTenantCategory(tenantId: number): Promise<Category> {
    return httpService.get<Category>(`${LMSApiPrefix()}/tenant/${tenantId}/category/tree`);
  }

  static getTenantCategoryDetail(tenantId: number, id: number): Promise<TenantCategoryDetail> {
    return httpService.get(`${LMSApiPrefix()}/tenant/${tenantId}/category/${id}`);
  }

  static createTenantCategory(payload: any) {
    return httpService.post<any>(
      `${LMSApiPrefix()}/tenant/${payload.tenantId}/category/save-and-mapping`,
      payload.data,
    );
  }

  static updateTenantCategory(payload: any) {
    return httpService.put<any>(
      `${LMSApiPrefix()}/tenant/${payload.tenantId}/category/${payload.categoryId}/update`,
      payload.data,
    );
  }

  static deleteTenantCategory(payload: any) {
    return httpService.delete<any>(
      `${LMSApiPrefix()}/tenant/${payload.tenantId}/category/${payload.categoryId}/delete`,
      {},
    );
  }

  static moveTenantCategory(payload: any) {
    return httpService.put<any>(
      `${LMSApiPrefix()}/tenant/${payload.tenantId}/category/${payload.categoryId}/dnd`,
      payload.data,
    );
  }

  static mappingTenantCategory(payload: any) {
    return httpService.post<any>(
      `${LMSApiPrefix()}/tenant/${payload.tenantId}/category/${payload.categoryId}/common-mapping`,
      payload.data,
    );
  }
}
