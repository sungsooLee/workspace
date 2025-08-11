import { Category } from '@entities/category';
import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { TenantCategoryDetail } from '../model/tenant-category.types';

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

  /**
   * [BO] 과정 생성 카테고리 팝업
   * http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/lms-module/swagger-ui/index.html#/%5BBO%5D%20%EA%B3%BC%EC%A0%95%20%EC%83%9D%EC%84%B1%20%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%20%ED%8C%9D%EC%97%85/findTenantsCategoryTree
   * @param tenantId
   */
  static fetchTenantCategoryTreePopup(tenantIds: Array<number>): Promise<Category> {
    return httpService.get<Category>(
      `${LMSApiPrefix()}/tenant/${tenantIds.join(',')}/category/tree/popup`,
    );
  }
}
