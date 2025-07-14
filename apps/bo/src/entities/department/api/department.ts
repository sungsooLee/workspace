import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { Department, DepartmentUser } from 'src/types/entities/department';
import { PageableContent } from '@types';

export class DepartmentService {
  /**
   * 회사 부서 목록 조회
   * @param param
   * @returns
   */
  static getDepartmentList(param: any): Promise<PageableContent<Department>> {
    return httpService.get<PageableContent<Department>>(`${PMSApiPrefix()}/department`, param);
  }

  /**
   * 회사 부서 상세 조회한다.
   * @param deptId
   * @returns
   */
  static getDepartmentDetail(deptId: number): Promise<any> {
    return httpService.get<Department>(`${PMSApiPrefix()}/department/${deptId}`);
  }

  /**
   * 회사 부서의 (하위부서포함) 유저 목록 정보를 조회한다.
   * @param param
   * @returns
   */
  static getDepartmentUserList(param: any): Promise<PageableContent<DepartmentUser>> {
    return httpService.get<PageableContent<DepartmentUser>>(
      `${PMSApiPrefix()}/department/user`,
      param,
    );
  }
  /**
   * 회사 부서 목록을 트리 구조로 조회한다.
   * @param companyCode
   * @returns
   */
  static getDepartmentTree(companyCode: string[]): Promise<Department> {
    return httpService.get<Department>(`${PMSApiPrefix()}/department/tree`, {
      companyCodeList: companyCode,
    });
  }

  /**
   * 회사 부서의 하위 목록 정보를 조회한다.
   * @param param
   * @returns
   */
  static getDepartmentChildDepartmentList(param: any): Promise<PageableContent<Department>> {
    return httpService.get<PageableContent<Department>>(
      `${PMSApiPrefix()}/department/child`,
      param,
    );
  }

  /**
   * 부서명 중복 체크
   * @param params
   * @returns
   */
  static existDepartmentName(params: any) {
    return httpService.get<boolean>(`${PMSApiPrefix()}/department/companyName/exist`, params);
  }

  /**
   * 회사 부서 등록
   * @param payload
   * @returns
   */
  static createDepartment(payload: any) {
    return httpService.post<Department>(`${PMSApiPrefix()}/department`, payload);
  }

  /**
   * 회사 부서 수정
   * @param payload
   * @returns
   */
  static updateDepartment(payload: any) {
    return httpService.put<Department>(`${PMSApiPrefix()}/department/${payload.deptId}`, payload);
  }

  /**
   * 회사 부서 삭제
   * @param payload
   * @returns
   */
  static deleteDepartment(payload: any) {
    return httpService.delete<any>(`${PMSApiPrefix()}/department/remove`, payload);
  }

  /**
   * 회사 부서 순서 변경
   * @param payload
   * @returns
   */
  static moveDepartment(payload: any) {
    return httpService.put<Department>(
      `${PMSApiPrefix()}/department/${payload.deptId}/dnd`,
      payload,
    );
  }
}
