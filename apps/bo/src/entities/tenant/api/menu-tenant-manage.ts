import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class TenantMenuManageService {
  /**
   * 터넨트 메뉴 수정
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
   * @param deviceType  FO / BO
   * @returns
   */
  static findMenuTenantTree(tenantId: string, deviceType: string): Promise<any> {
    // console.log(`${tenantId}  ${deviceType}`);
    return httpService.get<any>(`${PMSApiPrefix()}/menus/tenantTree`, {
      tenantId: tenantId,
      deviceType: deviceType,
    });
  }
}
