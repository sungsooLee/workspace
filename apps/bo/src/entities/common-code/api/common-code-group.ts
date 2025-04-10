import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '../../../../../../libs/config/src';
import { CreateCommonCodeGroup } from '../../../types/entities/common-code';

/**
 * PMS > 공통 코드 그룹 관리 API 모음
 */
export default class CommonCodeGroupService {
  /**
   * 공통코드그룹 목록 조회
   */
  static fetchCodeGroups(
    page: number,
    size: number,
    cdGroupNo = '',
    cdGroupName = '',
    cdGroupAbbreviatonEnglishName = '',
    cdGroupContent = '',
    validityYn = true,
    cdName = '',
  ): Promise<any> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      cdGroupNo,
      cdGroupName,
      cdGroupAbbreviatonEnglishName,
      cdGroupContent,
      validityYn: validityYn.toString(),
      cdName,
    });

    return httpService.get<any>(`${PMSApiPrefix()}/code-groups?${params.toString()}`);
  }

  /**
   * 공통코드그룹 단건 조회
   * @param cdGroupNo 공통 코드 그룹 번호
   * @returns
   */
  static fetchCodeGroup(cdGroupNo: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/code-groups/${cdGroupNo}`);
  }

  static createCodeGroup(payload: CreateCommonCodeGroup): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/code-groups`, payload);
  }

  static updateCodeGroup(payload: CreateCommonCodeGroup): Promise<any> {
    return httpService.put<any>(`${PMSApiPrefix()}/code-groups/${payload.cdGroupNo}`, payload);
  }
}
