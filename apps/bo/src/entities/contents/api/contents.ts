import { CMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PageableContent, ContentsListSearchParams, ContentsListSearchResponse } from '@types';

export class ContentsService {
  /**
   * 교육자원 목록 조회
   */
  static getContentsList(
    param: ContentsListSearchParams,
  ): Promise<PageableContent<ContentsListSearchResponse>> {
    return httpService.get<PageableContent<ContentsListSearchResponse>>(
      `${CMSApiPrefix()}/contents`,
      param,
    );
  }

  /**
   * SCORM 콘텐츠 리소스 조회
   */
  static getScormDetail(contentUuid?: string): Promise<any> {
    return httpService.get<any>(`${CMSApiPrefix()}/scorm/${contentUuid}/resource`);
  }
}
