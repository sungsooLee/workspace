import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class TenantMenuManageService {
  /**
   * 테넌트 메뉴 수정
   * @param tenantMappingMenuId
   * @param payload
   * @returns
   */
  static updateMenuTenant(payload: any): Promise<any> {
    return httpService.put<any>(
      `${PMSApiPrefix()}/menus/tenant/${payload.tenantMappingMenuId}`,
      payload.menuData,
    );
  }

  /**
   * 테넌트 메뉴 추가
   * @param payload
   * @returns
   */
  static createMenuTenant(payload: any) {
    const reqbody = createTenantMenuCreateByAny(payload);
    console.log(reqbody);
    return httpService.post<any>(`${PMSApiPrefix()}/menus/tenant/${payload.tenantId}`, reqbody);
  }

  /**
   * 터넨트 메뉴 삭제
   * @param tenantMappingMenuId
   * @returns
   */
  static deleteMenuTenant(payload: any): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/menus/tenant/${payload.tenantMappingMenuId}`);
  }

  /**
   *  터넨트 메뉴 트리 조회
   * @param tenantId 터넨트 ID
   * @param menuScope  FO / BO
   * @returns
   */
  static findMenuTenantMappingTree(tenantId: number, menuScope: string): Promise<any> {
    // console.log(`${tenantId}  ${deviceType}`);
    return httpService.get<any>(`${PMSApiPrefix()}/menus/tenantMappingTree`, {
      tenantId: tenantId,
      menuScope: menuScope,
    });
  }
}

let a = {
  menuId: 34,
  sortOrder: 10,
  isUsed: true,
  isMobileExposed: true,
  isWebExposed: false,
  tenantId: 1,
  menuCode: 'menu1_4',
  isShortCutArea: true,
  menuScope: 'FO',
  parentId: '1',
};
/* 

*/
function createTenantMenuCreateByAny(data: any) {
  return {
    menuId: data.menuId,
    sortOrder: data.sortOrder,
    isUsed: data.isUsed,
    isDeleted: data.isDeleted,
    isMobileExposed: data.isMobileExposed,
    isWebExposed: data.isWebExposed,
    tenantId: data.tenantId,
    menuCode: data.menuCode,
    path: data.path,
    depth: data.depth,
    isShortCutArea: data.isShortCutArea,
    isPersoninfoInclusion: data.isPersoninfoInclusion,
    menuScope: data.menuScope,
    menuStartDate: data.menuStartDate,
    menuEndDate: data.menuEndDate,
    parentId: data.parentId,
  };
}

export interface MenuInfo {
  menuId: number;
  menuCode: string;
  menuName: string;
  path: string;
  depth: number;
  sortOrder: number;
  isShortCutArea: boolean;
  isUsed: boolean;
  isDeleted: boolean;
  isPersoninfoInclusion: boolean;
  isMobileExposed: boolean;
  isWebExposed: boolean;
  menuDesc: string;
  isHiddenMenu: boolean;
  parentId: number;
  parentCode: string;
  parentName: string;
  apiMappingMenuList: ApiMappingMenuList[];
}

export interface ApiMappingMenuList {
  apiMappingMenuId: number;
  apiId: number;
  apiUuid: string;
  menuId: number;
  apiName: string;
}
