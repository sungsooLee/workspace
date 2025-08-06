export interface Category {
  id: number;
  categoryName: string;
  categoryType: string;
  sortSeq: number;
  depth: number;
  children?: Children[];
}

export interface Children {
  id: number;
  categoryName: string;
  categoryType: string;
  sortSeq: number;
  depth: number;
  children?: Children[];
}

export interface CategoryDetail {
  categoryName: string;
  categoryCode: string;
  categoryContent: string;
  categoryPath: string;
  isUsed?: boolean;
  parentCategoryName?: string;
}

export interface CategoryCreate {
  categoryName: string;
  sortSeq: number;
  parentId: number;
  categoryCode: string;
  categoryType: string;
  tenantId: number;
}

export interface CategoryUpdate {
  categoryName: string;
  categoryCode: string;
  categoryContent: string;
  id: string;
  isUsed: boolean;
}

export interface CategoryMove {
  id: number;
  destinationParentId: number;
  sortSeq: number;
}
