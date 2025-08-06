import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PageableContent } from '@shared/types/page-meta';
import { Department, DepartmentUser } from '../model/department.types';

export class HmgDepartmentService {
  static getDepartmentTree(companyCode: string[]): Promise<Department> {
    return httpService.get<Department>(`${PMSApiPrefix()}/hmg/department/tree`, {
      companyCodeList: companyCode,
    });
  }

  /**
   * 회사 부서의 (하위부서포함) 유저 목록 정보를 조회한다.
   * @param param
   * @returns
   */
  static getDepartmentUserList(param: any): Promise<PageableContent<DepartmentUser>> {
    return httpService.get<PageableContent<DepartmentUser>>(
      `${PMSApiPrefix()}/hmg/department/user`,
      param,
    );
  }

  static getDepartmentChildDepartmentList(param: any): Promise<PageableContent<Department>> {
    return httpService.get<PageableContent<Department>>(
      `${PMSApiPrefix()}/hmg/department/child`,
      param,
    );
  }
}
