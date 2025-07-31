import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { Department, DepartmentUser } from 'src/types/entities/department';
import { PageableContent } from '@types';

export class HmgDepartmentService {
  static getDepartmentTree(companyCode: string[]): Promise<Department> {
    return httpService.get<Department>(`${PMSApiPrefix()}/hmg/department/tree`, {
      companyCodeList: companyCode });
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
