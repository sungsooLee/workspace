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
  static fetchRoles(tenantId: number, siteScope: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles`, {
      tenantId: tenantId,
      siteScope: siteScope,
    });
  }

  /**
   * 특정 역할 조회
   * @param roleCode 역할 코드
   * @returns 역할 정보
   */
  static fetchRole(roleCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}`);
  }

  /**
   * 역할 생성
   * @param payload 역할 데이터
   * @returns 생성된 역할 정보
   */
  static createRole(payload: Role): Promise<any> {
    return httpService.post<Role>(`${PMSApiPrefix()}/roles`, genCreateRole(payload));
  }

  /**
   * 역할 삭제
   * @param roleCode 역할 ID
   * @returns 삭제 결과
   */
  static deleteRole(roleCode: string): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/roles/${roleCode}`);
  }

  /**
   * 역할 수정
   * @param payload 역할 데이터
   * @returns 수정된 역할 정보
   */
  static updateRole(payload: Role): Promise<any> {
    return httpService.put<Role>(`${PMSApiPrefix()}/roles/${payload.roleCode}`, payload);
  }

  /**
   * 역할에 할당된 메뉴 목록 조회
   * @param roleCode 역할 ID
   * @returns 역할에 할당된 메뉴 목록
   */
  static fetchRoleMenus(roleCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}/menus`);
  }

  /**
   * 역할에 메뉴 할당
   * @param roleCode 역할 ID
   * @param menuIds 메뉴 ID 배열
   * @returns 할당 결과
   */
  static modifyMenusAndApiToRole(roleCode: string, body: any): Promise<any> {
    // const payload = { addMenuIds: addMenuIds };
    // console.log('assignMenu', payload, addMenuIds);
    return httpService.post<any>(`${PMSApiPrefix()}/roles/${roleCode}/save-menu-apis`, body);
  }

  /**
   * 역할 tree 위치 이동
   * @param roleCode
   * @param body
   * @returns
   */
  static modifyRolePosition(roleCode: string, body: any): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/roles/${roleCode}/move`, body);
  }
  /**
   * 메뉴에 속한 API 목록 조회
   * @param menuId 메뉴 ID
   * @returns 메뉴에 속한 API 목록
   */
  static fetchRoleMenuApis(roleCode: string, menuId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}/apis`, { menuId: menuId });
  }

  /**
   * 역할에 할당된 API 목록 조회
   * @param roleCode 역할 ID
   * @returns 역할에 할당된 API 목록
   */
  static fetchRoleApis(roleCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}/apis`);
  }

  static fetchRoleTree(tenantId: number, siteScope: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/tree`, {
      tenantId: tenantId,
      siteScope: siteScope,
    });
  }
}

function genCreateRole(payload: any) {
  const retval = { ...payload };

  //Object 를 id 값으로 전달 하도록 변경
  if (retval.companyIds?.length > 0) {
    retval.companyIds = retval.companyIds.map((item: any) => item.companyId);
  }
  if (retval.channelIds?.length > 0) {
    retval.channelIds = retval.channelIds.map((item: any) => item.channelId);
  }
  if (retval.deptIds?.length > 0) {
    retval.deptIds = retval.deptIds.map((item: any) => item.deptIds);
  }
  return retval;
}
