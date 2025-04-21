import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';

import type {
  Category,
  CategoryCreate,
  CategoryDetail,
  CategoryMove,
  CategoryUpdate,
} from '@types';

export default class CategoryService {
  static getCategory(): Promise<Category> {
    return httpService.get<Category>(`${LMSApiPrefix()}/category/tree`);
  }

  static getCategoryDetail(id: number): Promise<CategoryDetail> {
    return httpService.get(`${LMSApiPrefix()}/category/${id}`);
  }

  static createCategory(category: CategoryCreate) {
    return httpService.post<any>(`${LMSApiPrefix()}/category/save`, category);
  }

  static updateCategory({ name, categoryCode, categoryContent, id }: CategoryUpdate) {
    const body = {
      name,
      categoryCode,
      categoryContent,
    };
    return httpService.post<any>(`${LMSApiPrefix()}/category/${id}/update`, body);
  }

  static deleteCategory(categoryId: string) {
    return httpService.post<any>(`${LMSApiPrefix()}/category/${categoryId}/delete`, {});
  }

  static moveCategory({ id, destinationParentId, sortSeq }: CategoryMove) {
    const body = {
      destinationParentId,
      sortSeq,
    };
    return httpService.post<any>(`${LMSApiPrefix()}/category/${id}/dnd`, body);
  }

  static existsCategory(code: string) {
    return httpService.get<any>(`${LMSApiPrefix()}/category/${code}/validation`);
  }
}

/*
API 인터페이스 규칙
- http method rule
    - GET: 단건, 복수건 조회
    - POST: 등록 or 수정
    - PATCH: 수정 > 사용 여부
    - DELETE: 삭제
- naming rule
    - 단수: 단건 조회, 수정, 삭제
    - 복수: 복수건 조회, 수정, 삭제
    ex) 
        get> user: 단건 사용자 조회
        get> users: 여러건 사용자 조회
        delete> user: 단건 사용자 삭제
        delete> users: 여러건 사용자 삭제
        post> user: 단건 사용자 등록
        post> users: 여러건 사용자 등록
*/
