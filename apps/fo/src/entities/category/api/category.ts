import categoryMock from '../../mock/category.json';
import { httpService } from '@learnway/shared';
import { LMSApiPrefix } from '@learnway/config';
import { CurriculumService } from '@entities/curriculum';

export default class CategoryService {
  static getCategories(params: any) {
    return new Promise((resolve) => setTimeout(() => resolve(categoryMock as any)));
  }

  static getFetchCategoryTree(tenantId: number) {
    return httpService.get<any>(`${LMSApiPrefix()}/tenant-category/tree/${tenantId}`);
  }

  static getFetchCategoryDetail(categoryId: number) {
    return httpService.get<any>(`${LMSApiPrefix()}/category/${categoryId}`);
  }

  static getFetchCoursesCategory(payload: any) {
    return httpService.get<any>(`${LMSApiPrefix()}/courses/category`, payload);
  }

  static getFetchCategoryRecent() {
    return httpService.get<any>(`${LMSApiPrefix()}/category/recent`);
  }

  static createRecentCategory(payload: any) {
    console.log('### category.ts => ', payload.categoryId);
    return httpService.post<any>(`${LMSApiPrefix()}/category/${payload.categoryId}/recent`, {});
  }

  static async getFetchRecentCategory(tenantId: number) {
    const categoryTree = await this.getFetchCategoryTree(tenantId);
    const recentCategory = await this.getFetchCategoryRecent();
    return {
      tree: categoryTree,
      recent: recentCategory,
    };
  }

  static async getFetchCoursesCategoryList(payload: any) {
    const courses = await this.getFetchCoursesCategory(payload);
    const fileGroupUuid = new Set<string>();
    const curriculumIds = new Set<number>();
    if( courses.content && courses.content.length > 0 ) {
      courses.content.map((item: any) => {
        if( item.thumbnailFileGroupUuid ) {
          fileGroupUuid.add(item.thumbnailFileGroupUuid)
        }
        if( item.curriculumId ) {
          curriculumIds.add(item.curriculumId)
        }
      });
    }
    console.log('#### File Group Uuid => ', Array.from(fileGroupUuid));
    const curriculums = await CurriculumService.getFetchCurriculumDuration(Array.from(curriculumIds))
  }
}
