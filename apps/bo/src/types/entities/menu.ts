export interface MenuDetail {
  menuId: number | string;
  menuCode: string;
  menuName: string;
  isWebExposed: boolean;
  isMobileExposed: boolean;
  path: string;
  sortOrder: number;
  isShortCutArea: boolean;
  isUsed: boolean;
  isDeleted: boolean;
  isPersoninfoInclusion: boolean;
  menuDesc: string;
  isHiddenMenu: boolean;
  parentId: number;
  parentCode: string;
  parentName: string;
  apiMappingMenuList: {
    apiMappingMenuId: number;
    apiId: number;
    apiUuid: string;
    menuId: number;
    apiName: string;
  }[];
}
