import menuMock from '../../mock/menu.json';
import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

/**
 * PMS > 메뉴관리 API 모음
 */
export default class MenuMangerService {
  /**
   * 메뉴 목록 조회
   */
  static fetchMenus(): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/menus/`);
  }

  /**
   * 메뉴 단건 상세 조회
   * @param menuId
   * @returns
   */
  static fetchMenuDetail(menuId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/menus/` + menuId + `/detail`);
  }
  /**
   * FO/BO 메뉴 목록 트리 조회
   */
  static fetchMenuTree(menuScopeCode: string, locale: string): Promise<any> {
    return httpService.get<any>(
      `${PMSApiPrefix()}/menus/tree?menuScopeCode=${menuScopeCode}&locale=${locale}`,
    );
  }

  /**
   * 메뉴 트리 조회
   * @param tenantId
   */
  // static fetchMenuTree(tenantId?: any): Promise<any> {
  //   return httpService.get<any>(
  //     `${PMSApiPrefix()}/menus${tenantId ? `?tenantId=${tenantId}` : ''}`,
  //   );
  // }
  /**
   * 메뉴 중복 확인
   * @param menuCode 메뉴 코드
   */
  static existsMenu(menuCode: string, parentId: string): Promise<boolean> {
    return httpService.get<any>(
      `${PMSApiPrefix()}/menus/exists?menuCode=${menuCode}&parentId=${parentId}`,
    );
    // return httpService.get<boolean>(`${PMSApiPrefix()}/menus/exists/?menuCode=${menuCode}`);
  }

  /**
   * 메뉴 등록
   * @param tenantId 테넌트 아이디가 존재하면 테넌트 메뉴 등록 없으면 기본 메뉴 등록
   */
  static saveMenu(tenantId?: any): Promise<any> {
    return httpService.post<any>(
      `${PMSApiPrefix()}/menus${tenantId ? `/${tenantId}` : ''}`,
      menuMock,
    );
  }

  /**
   * 메뉴 등록
   */
  static createMenu(payload: any): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/menus`, payload);
  }
}
