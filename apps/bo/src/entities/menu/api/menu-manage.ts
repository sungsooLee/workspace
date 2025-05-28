import menuMock from '../../mock/menu.json';
import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { createPmsUrl, registerApi } from '../../../shared/lib/use-authorized-query';

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
   * 메뉴 중복 확인
   * @param menuCode 메뉴 코드
   */
  static existsMenu(menuScopeCode: string, menuCode: string): Promise<boolean> {
    return httpService.get<any>(
      `${PMSApiPrefix()}/menus/exists?menuScopeCode=${menuScopeCode}&menuCode=${menuCode}`,
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

  /**
   * 메뉴 수정
   */
  static updateMenu(payload: any): Promise<any> {
    return httpService.put<any>(`${PMSApiPrefix()}/menus/${payload.menuId}`, payload);
  }

  /**
   * 메뉴 삭제
   */
  static deleteMenu(payload: any): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/menus/${payload.menuId}`, payload);
  }

  /**
   * 메뉴 이동
   */
  static moveMenu(payload: any): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/menus/${payload.menuId}/dnd`, payload);
  }
  /**
   * 메뉴 즐겨찾기 조회
   *
   * @param tenantId
   * @param userNo
   */
  static fetchMenuFavorites(payload: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/menus/favorites`, payload);
  }

  /**
   * 메뉴 즐겨찾기 등록
   * @param menuId
   * @param tenantId
   * @param userId
   */
  static createMenuFavorites(payload: any): Promise<any> {
    console.log('##### createMenuFavorites');
    return httpService.post<any>(`${PMSApiPrefix()}/menus/favorites`, payload);
  }

  /**
   * 메뉴 즐겨찾기 삭제
   */
  static deleteMenuFavorites(favoritesMenuId: any): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/menus/favorites/${favoritesMenuId}`);
  }
}

export const MenuManageApi = {
  list: registerApi('menuManage.list', 'GET', createPmsUrl('/menus/'), '메뉴 관리 목록 조회'),
  menuTree: registerApi(
    'menuManage.menuTree',
    'GET',
    createPmsUrl('/menus/tree'),
    '메뉴 트리 조회',
  ),
  detail: registerApi(
    'menuManage.detail',
    'GET',
    createPmsUrl('/menus/:menuId/detail'),
    '메뉴 상세 조회',
  ),
  create: registerApi('menuManage.create', 'POST', createPmsUrl('/menus'), '메뉴 생성'),
  checkDuplicate: registerApi(
    'menuManage.checkDuplicate',
    'GET',
    createPmsUrl('/menus/exists'),
    '메뉴 중복 확인',
  ),
  update: registerApi('menuManage.update', 'PUT', createPmsUrl('/menus/:menuId'), '메뉴 수정'),
  delete: registerApi('menuManage.delete', 'DELETE', createPmsUrl('/menus/:menuId'), '메뉴 삭제'),
  move: registerApi('menuManage.move', 'POST', createPmsUrl('/menus/:menuId/dnd'), '메뉴 DND'),
};
