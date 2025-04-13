import { PMSApiPrefix } from '../../../../../../libs/config/src';
import { httpService } from '../../../../../../libs/shared/src';
import { CommonCodeResponse } from '../../../types/entities/common-code';

/**
 * PMS > 공통 코드 관리 API 모음
 */
export default class CommonCodeService {
  /**
   * 공통코드 목록 조회
   */
  static fetchCodes(
    page: number,
    size: number,
    // sort?: string[],
    cdGroupId = '',
    cdGroupName = '',
    cdGroupContent = '',
    isUsed = true,
    cdName = '',
  ): Promise<any> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      cdGroupId,
      cdGroupName,
      cdGroupContent,
      isUsed: isUsed.toString(),
      cdName,
    });

    return httpService.get<any>(`${PMSApiPrefix()}/codes?${params.toString()}`);
  }

  /**
   * 공통 코드 단건 조회
   */
  static fetchCode(cdGroupId: string, cdId: string): Promise<any> {
    return httpService.get<any>(`${PMSApiPrefix()}/codes/${cdGroupId}/${cdId}`);
  }

  /**
   * 공통 코드 생성
   */
  static createCode(payload: any) {
    return httpService.post<CommonCodeResponse>(`${PMSApiPrefix()}/codes`, payload);
  }

  /**
   * 공통 코드 업데이트
   */
  static updateCode(payload: any) {
    return httpService.put<CommonCodeResponse>(
      `${PMSApiPrefix()}/codes/${payload.cdGroupId}/${payload.cdId}`,
      payload,
    );
  }
}
