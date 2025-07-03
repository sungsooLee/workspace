import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export class HmgDepartmentService {
  static getDepartmentTree(companyCode: string[]): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/hmg/department/tree`, {
      companyCodeList: companyCode,
    });
  }

  /**
   * 회사 부서의 (하위부서포함) 유저 목록 정보를 조회한다.
   * @param param
   * @returns
   */
  static getDepartmentUserList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/department/user`, param);
  }

  static getDepartmentChildDepartmentList(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/hmg/department/child`, param);
  }
}
