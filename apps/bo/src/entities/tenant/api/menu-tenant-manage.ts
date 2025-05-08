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
    console.log(payload);
    const tenantMappingMenuId = payload.tenantMappingMenuId;
    const reqbody = createTenantMenuCreateByAny(payload);
    return httpService.put<any>(`${PMSApiPrefix()}/menus/tenant/${tenantMappingMenuId}`, reqbody);
  }

  /**
   * 테넌트 메뉴 추가
   * @param payload
   * @returns
   */
  static createMenuTenant(payload: any): Promise<any> {
    const reqbody = [];
    for (const item of payload.contents) {
      const menu = createTenantMenuCreateByAny(item);
      reqbody.push(menu);
    }
    console.log(reqbody);
    return httpService.post<any>(`${PMSApiPrefix()}/menus/tenant/${payload.tenantId}`, reqbody);
  }

  /**
   * 테넌트 메뉴 삭제
   * @param tenantMappingMenuId
   * @returns
   */
  static deleteMenuTenant(payload: any): Promise<any> {
    console.log(payload);
    return httpService.delete<any>(`${PMSApiPrefix()}/menus/tenant/${payload.tenantMappingMenuId}`);
  }

  /**
   * 테넌트 메뉴 상세 조회
   * @param tenantMappingMenuId
   * @returns
   */
  static findMenuTenantDetail(tenantMappingMenuId: number) {
    return httpService.get<any>(`${PMSApiPrefix()}/menus/tenant/detail/${tenantMappingMenuId}`);
  }

  /**
   *  테넌트 메뉴 트리 조회
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

  static changeMenuTenantDnd(payload: any): Promise<any> {
    const tenantMappingMenuId = payload.tenantMappingMenuId;
    const reqBody = createTenantMenuDnd(payload);
    return httpService.post<any>(
      `${PMSApiPrefix()}/menus/tenant/${tenantMappingMenuId}/dnd`,
      reqBody,
    );
  }
}

/* 
payload 로부터 필요 없는 값을 제거 하여 전달 하기
*/
function createTenantMenuCreateByAny(data: any) {
  return {
    menuId: data.menuId,
    sortOrder: data.sortOrder,
    isUsed: data.isUsed,
    isMobileExposed: data.isMobileExposed,
    isWebExposed: data.isWebExposed,
    menuScope: data.menuScope,
    tenantId: data.tenantId,
    parentMenuId: data.parentMenuId,
  };
}

function createTenantMenuDnd(data: any) {
  return {
    destinationParentId: data.destinationParentId,
    sortOrder: data.sortOrder,
    menuScopeCode: data.menuScopeCode,
  };
}
