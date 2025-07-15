import { CMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { PageableContent, ContentsListSearchParams, ContentsListSearchResponse } from '@types';

export class ContentsService {
  /**
   * 학습자원 목록 조회
   */
  static getContentsList(
    param: ContentsListSearchParams,
  ): Promise<PageableContent<ContentsListSearchResponse>> {
    return httpService.get<PageableContent<ContentsListSearchResponse>>(
      `${CMSApiPrefix()}/contents`,
      param,
    );
  }
}
