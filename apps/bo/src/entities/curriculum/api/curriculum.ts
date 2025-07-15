import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';
import {
  CurriculumCreateRequest,
  CurriculumDetailResponse,
  CurriculumResponse,
  CurriculumSearchParams,
  PageableContent,
} from '@types';

export class CurriculumService {
  /**
   * 커리큘럼 목록 조회
   * @param param
   * @returns
   */
  static getCurriculumList(
    param: CurriculumSearchParams,
  ): Promise<PageableContent<CurriculumResponse>> {
    return httpService.get<PageableContent<CurriculumResponse>>(
      `${CMSApiPrefix()}/curriculums`,
      param,
    );
  }

  /**
   * 커리큘럼 상세 조회
   */
  static getCurriculumDetail(curriculumId: number): Promise<CurriculumDetailResponse> {
    return httpService.get<CurriculumDetailResponse>(
      `${CMSApiPrefix()}/curriculum/${curriculumId}`,
    );
  }

  /**
   *  커리큘럼 등록
   */
  static createCurriculum(data: CurriculumCreateRequest): Promise<CurriculumResponse> {
    return httpService.post(`${CMSApiPrefix()}/curriculum`, data);
  }
}
