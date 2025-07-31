import { httpService } from '@learnway/shared';
import { CMSApiPrefix } from '@learnway/config';

export const contentApi = {
  /**
   * 컨텐츠 상세 조회
   * @param contentUuid
   * @returns
   */
  getDetail: (contentUuid: string) =>
    httpService.get<any>(`${CMSApiPrefix()}/content/${contentUuid}`),

  /**
   * 여러 컨텐츠의 진행율 조회
   * @param payload
   * @returns
   */
  getProgressMulti: (payload: any) =>
    httpService.post<any>(`${CMSApiPrefix()}/content/progress/multi`, payload),
};
