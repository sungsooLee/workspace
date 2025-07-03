import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export class UserGroupCompanyService {
  /**
   * 회사별 유저그룹 검색 팝업 조회 (직군/직무/호칭/보직)
   * @param param
   * @returns
   */
  static getCompanyUserGroups(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/company/user-groups`, param);
  }

  /**
   * 회사별 유저그룹 조직 트리 조회
   * @param companyId
   * @returns
   */
  static getCompanyOrganizationTree(companyId: number): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/company/organization-tree`, {
      companyId: companyId,
    });
  }

  /**
   * 유저그룹 유저 조회 (하위조직 대상자 포함)
   * @param param
   * @returns
   */
  static getSubdirectoryUsers(param: any): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/userGroup/subdirectory/users`, param);
  }
}
