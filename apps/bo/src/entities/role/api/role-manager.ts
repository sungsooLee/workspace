import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { Role } from '../../../types/entities/role';

/**
 * PMS > 역할관리 API 모음
 */
export default class RoleManagerService {
  /**
   * 역할 목록 트리 조회
   * @returns 역할 목록 트리
   */
  static fetchRoles(): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles`);
  }

  /**
   * 특정 역할 조회
   * @param roleId 역할 ID
   * @returns 역할 정보
   */
  static fetchRole(roleId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleId}`);
  }

  /**
   * 역할 생성
   * @param payload 역할 데이터
   * @returns 생성된 역할 정보
   */
  static createRole(payload: Role): Promise<any> {
    return httpService.post<Role>(`${PMSApiPrefix()}/roles`, payload);
  }

  /**
   * 역할 삭제
   * @param roleId 역할 ID
   * @returns 삭제 결과
   */
  static deleteRole(roleId: string): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/roles/${roleId}`);
  }

  /**
   * 역할 수정
   * @param payload 역할 데이터
   * @returns 수정된 역할 정보
   */
  static updateRole(payload: Role): Promise<any> {
    return httpService.put<Role>(`${PMSApiPrefix()}/roles/${payload.roleUuid}`, payload);
  }

  /**
   * 메뉴 목록 트리 조회
   * @returns 메뉴 목록 트리
   */
  static fetchMenus(): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/menus/tree`);
  }

  /**
   * 역할에 할당된 메뉴 목록 조회
   * @param roleId 역할 ID
   * @returns 역할에 할당된 메뉴 목록
   */
  static fetchRoleMenus(roleId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleId}/menus`);
  }

  /**
   * 역할에 메뉴 할당
   * @param roleId 역할 ID
   * @param menuIds 메뉴 ID 배열
   * @returns 할당 결과
   */
  static assignMenusToRole(roleId: string, menuIds: string[]): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/roles/${roleId}/menus`, { menuIds });
  }

  /**
   * 메뉴에 속한 API 목록 조회
   * @param menuId 메뉴 ID
   * @returns 메뉴에 속한 API 목록
   */
  static fetchMenuApis(menuId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/menus/${menuId}/apis`);
  }

  /**
   * 역할에 API 할당
   * @param roleId 역할 ID
   * @param apiIds API ID 배열
   * @returns 할당 결과
   */
  static assignApisToRole(roleId: string, apiIds: string[]): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/roles/${roleId}/apis`, { apiIds });
  }

  /**
   * 역할에 할당된 API 목록 조회
   * @param roleId 역할 ID
   * @returns 역할에 할당된 API 목록
   */
  static fetchRoleApis(roleId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleId}/apis`);
  }
}
