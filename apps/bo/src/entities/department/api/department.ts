import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export class DepartmentService {
  /**
   * 회사 부서 목록 조회
   * @param param
   * @returns
   */
  static getDepartmentList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department`, param);
  }

  /**
   * 회사 부서 상세 조회한다.
   * @param deptId
   * @returns
   */
  static getDepartmentDetail(deptId: number): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department/${deptId}`);
  }

  /**
   * 회사 부서의 (하위부서포함) 유저 목록 정보를 조회한다.
   * @param param
   * @returns
   */
  static getDepartmentUserList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department/user`, param);
  }
  /**
   * 회사 부서 목록을 트리 구조로 조회한다.
   * @param companyCode
   * @returns
   */
  static getDepartmentTree(companyCode: string[]): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department/tree`, {
      companyCodeList: companyCode,
    });
  }

  /**
   * 회사 부서의 하위 목록 정보를 조회한다.
   * @param param
   * @returns
   */
  static getDepartmentChildDepartmentList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department`, param);
  }

  /**
   * 부서명 중복 체크
   * @param params
   * @returns
   */
  static existDepartmentName(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/department/companyName/exist`, params);
  }

  /**
   * 회사 부서 등록
   * @param payload
   * @returns
   */
  static createDepartment(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/department`, payload);
  }

  /**
   * 회사 부서 수정
   * @param payload
   * @returns
   */
  static updateDepartment(payload: any) {
    return httpService.put<any>(`${PMSApiPrefix()}/department/${payload.deptId}`, payload);
  }
}
