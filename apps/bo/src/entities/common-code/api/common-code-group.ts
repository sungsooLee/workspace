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
    sort = '',
    cdGroupId = '',
    cdGroupName = '',
    isUsed = true,
    cdName = '',
  ): Promise<any> {
    const baseUrl = `${PMSApiPrefix()}/code-groups`;

    // 쿼리 파라미터 객체로 전달
    const queryParams: any = {
      page,
      size,
      sort,
      cdGroupId: cdGroupId || undefined,
      cdGroupName: cdGroupName || undefined,
      isUsed: isUsed !== undefined ? isUsed : undefined,
      cdName: cdName || undefined,
    };

    // 값이 없는 파라미터 제거
    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key],
    );

    return httpService.get(baseUrl, queryParams);
  }

  /**
   * 공통코드그룹 단건 조회
   * @param cdGroupId 공통 코드 그룹 번호
   * @returns
   */
  static fetchCodeGroup(cdGroupId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/code-groups/${cdGroupId}`);
  }

  static createCodeGroup(payload: CreateCommonCodeGroup): Promise<any> {
    return httpService.post<any>(`${PMSApiPrefix()}/code-groups`, payload);
  }

  static updateCodeGroup(payload: CreateCommonCodeGroup): Promise<any> {
    return httpService.put<any>(`${PMSApiPrefix()}/code-groups/${payload.cdGroupId}`, payload);
  }
}
