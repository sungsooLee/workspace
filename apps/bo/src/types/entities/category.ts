export interface Category {
  id: number;
  name: string;
  categoryType: string;
  sortSeq: number;
  depth: number;
  children?: Children[];
}

export interface Children {
  id: number;
  name: string;
  categoryType: string;
  sortSeq: number;
  depth: number;
  children?: Children[];
}

export interface CategoryDetail {
  name: string;
  categoryCode: string;
  categoryContent: string;
  categoryPath: string;
  isUsed?: boolean;
}

export interface CategoryCreate {
  name: string;
  sortSeq: number;
  parentId: number;
  categoryCode: string;
  categoryType: string;
  tenantId: number;
}

export interface CategoryUpdate {
  name: string;
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
