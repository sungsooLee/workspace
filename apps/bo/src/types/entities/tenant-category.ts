export interface Combine {
  combineType: string;
  combineValue: number;
}
export interface WhiteList {
  groupId: number;
  mappingId: number;
  blackAndWhiteType: string;
  groupMappingType: string;
  combineOperator: string;
  combines: Combine[];
}

export interface TenantCategoryDetail {
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  categoryContent: string;
  categoryPath: string;
  isUsed: boolean;
  whiteList: WhiteList;
}

export interface TenantCategoryCreate {
  name: string;
  categoryCode: string;
  categoryContent: string;
  categoryType: string;
  sortSeq: number;
  parentId: number;
  whiteList: Combine[];
}

export interface TenantCategoryUpdate {
  name: string;
  categoryCode: string;
  categoryContent: string;
  isUsed: boolean;
  whiteList: Combine[];
}

export interface TenantCategoryMove {
  destinationParentId: number;
  sortSeq: number;
}
