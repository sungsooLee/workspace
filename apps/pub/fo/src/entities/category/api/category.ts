import categoryMock from '../../mock/category.json';

export default class CategoryService {
  static getCategories(params: any) {
    return new Promise((resolve) => setTimeout(() => resolve(categoryMock as any)));
  }
}
