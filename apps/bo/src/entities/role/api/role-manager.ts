import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { Role } from '../../../types/entities/role';

/**
 * PMS > 역할관리 API 모음
 */
export default class RoleManagerService {
  /**
   * 특정 역할 조회
   * @param roleCode 역할 코드
   * @returns 역할 정보
   */
  static fetchRole(roleCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}`);
  }

  /**
   * 역할 수정
   * @param payload 역할 데이터
   * @returns 수정된 역할 정보
   */
  static updateRole(payload: Role): Promise<any> {
    const body = genCreateRole(payload);
    return httpService.put<Role>(`${PMSApiPrefix()}/roles/${payload.roleCode}`, body);
  }

  /**
   * 역할 삭제
   * @param roleCode 역할 코드
   * @returns 삭제 결과
   */
  static deleteRole(roleCode: string): Promise<any> {
    return httpService.delete<any>(`${PMSApiPrefix()}/roles/${roleCode}`);
  }

  /**
   * 역할 목록  조회
   * @returns 역할 목록
   */
  static fetchRolesList(params: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles`, params);
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
   *역할 코드의 사용자 추가 삭제
   * @param roleCode 역할 코드
   * @param body request body : role 사용자(추가/삭제) , 회사 사용자(추가/삭제), 체널 사용자(추가/삭제), 팀(조직) 사용자 (추가/삭제)
   * @returns
   */
  static modifyUserToRole(roleCode: string, body: any): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/roles/${roleCode}/save-users`, body);
  }

  /**
   * 역할에 유저 그룹 추가 삭제 처리
   * @param roleCode 역할 코드
   * @param body userGroup 추가, 삭제 자료
   */

  static modifyUserGroupToRole(roleCode: string, body: any): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/roles/${roleCode}/save-user-groups`, body);
  }

  /**
   * 역할에 메뉴 api 할당
   * @param roleCode 역할 코드
   * @param body 메뉴, api 수정 정보
   * @returns 할당 결과
   */
  static modifyMenusAndApiToRole(roleCode: string, body: any): Promise<any> {
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
   * 역할에 할당된 사용자 목록 조회
   * @param param 조회 조건
   * @returns
   */
  static fetchRoleUserList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${param.roleCode}/users`, param);
  }

  /**
   * 역할에 할당된 사용자 그룹 목록 조회
   * @param roleCode 역할 코드
   * @returns
   */
  static fetchRoleUserGroups(roleCode: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}/user-groups`);
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
   * 메뉴에 속한 API 목록 조회
   * @param menuId 메뉴 ID
   * @returns 메뉴에 속한 API 목록
   */
  static fetchRoleMenuApis(roleCode: string, menuId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/roles/${roleCode}/apis`, { menuId: menuId });
  }
  /**
   * 역할 tree 조회
   * @param tenantId  테넌트 ID
   * @param siteScope (FO/BO)
   * @returns
   */
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
