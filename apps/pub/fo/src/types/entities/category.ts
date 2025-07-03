import { Hierarchy } from '@learnway/shared';

export interface Category extends Hierarchy<Category> {
  categoryId: number;
  companyId: number;
  name: string;
  sortSeq: number;
  categoryType: any; //미정
}
