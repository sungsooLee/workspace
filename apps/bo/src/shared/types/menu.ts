export interface MenuDetail {
  menuId: number | string;
  /**
   * 메뉴코드
   */
  menuCode: string;
  /**
   * 메뉴명
   */
  menuName: string;
  /**
   * 디바이스 노출여부 - PC
   */
  isWebExposed: boolean;
  /**
   * 디바이스 노출여부 - 모바일
   */
  isMobileExposed: boolean;
  //
  deviceNames?: string[];
  code?: { fieldValue: string };
  /**
   * 경로
   */
  path: string;
  /**
   * 정렬순서
   */
  sortOrder: number;
  /**
   * 바로가기영역여부
   */
  isShortCutArea: boolean;
  /**
   * 사용여부
   */
  isUsed: boolean;
  isDeleted: boolean;
  /**
   * 개인정보포함여부
   */
  isPersoninfoInclusion: boolean;
  /**
   * 메뉴 설명
   */
  menuDesc: string;
  /**
   * 숨김 여부
   */
  isHiddenMenu: boolean;
  /**
   * 상위메뉴번호
   */
  parentId: number;
  parentCode: string;
  parentName: string;
  apiMappingMenuList: ApiMappingMenuDetail[];
  fullPath?: string;
}

export type ApiMappingMenuDetail = {
  /**
   * api 맵핑메뉴 번호
   */
  apiMappingMenuId?: number;
  /**
   * api 번호
   */
  apiId?: number;
  /**
   * api uuid
   */
  apiUuid?: string;
  /**
   * 메뉴 번호
   */
  menuId?: number;
  /**
   * api name
   */
  apiName?: string;
};

export enum MenuScope {
  FO = 'FO',
  BO = 'BO',
  EX = 'EX' }

export type MenuTreeResponse = {
  parentId?: number;
  children?: Array<Record<string, MenuDetail>>;
  menuId?: number;
  menuCode?: string;
  menuName?: string;
  path?: string;
  sortOrder?: number;
  isShortCutArea?: boolean;
  isUsed?: boolean;
  isPersoninfoInclusion?: boolean;
  isMobileExposed?: boolean;
  isWebExposed?: boolean;
  menuScope?: MenuScope;
  menuStartDate?: string;
  menuEndDate?: string;
  menuDesc?: string;
  isHiddenMenu?: boolean;
  roles?: string;
};
