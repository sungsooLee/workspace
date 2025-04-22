export interface Program {
  apiName: string;
  apiDesc: string;
  apiUrl: string;
  apiScope: string;
  apiNodeType: string;
  apiMethod: string;
  apiUuid: string;
  depth: number;
  sortOrder: number;
  isUsed: boolean;
  isDeleted: boolean;
  parentId: number;
}
