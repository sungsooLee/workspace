import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

/**
 * 채널 홈 배너 서비스
 */
export default class ChannelBannerService {
  /**
   * 채널 홈 배너 목록 조회
   * @param params
   * @returns
   */
  static async getChannelBannerList(params: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/channel/${params.channelUuid}/banners`, params);
  }

  /**
   * 채널 홈 배너 노출여부 변경
   * @param params
   * @returns
   */
  static async putChannelBannerDisplayToggle(params: any) {
    return httpService.put<any>(
      `${PMSApiPrefix()}/channel/${params.channelUuid}/banner/${params.bannerId}/displayed/toggle`,
      {},
    );
  }

  /**
   * 채널 홈 배너 순서변경
   * @param payload
   * @returns
   */
  static async putChannelBannerDnd(payload: any) {
    return httpService.put<any>(
      `${PMSApiPrefix()}/channel/${payload.channelUuid}/banner/${payload.bannerId}/dnd`,
      {
        sortOrder: payload.sortOrder,
      },
    );
  }

  /**
   * 채널 홈 배너 신규 등록
   * @param payload
   * @returns
   */
  static async postChannelBanner(payload: any) {
    return httpService.post<any>(
      `${PMSApiPrefix()}/channel/${payload.channelUuid}/banner`,
      payload,
    );
  }

  /**
   * 채널 홈 배너 정보 변경
   * @param payload
   * @returns
   */
  static async putChannelBanner(payload: any) {
    return httpService.put<any>(
      `${PMSApiPrefix()}/channel/${payload.channelUuid}/banner/${payload.bannerId}`,
      payload,
    );
  }

  /**
   * 채널 홈 배너 상세 조회
   * @param params
   * @returns
   */
  static async getChannelBanner(params: any) {
    return httpService.get<any>(
      `${PMSApiPrefix()}/channel/${params.channelUuid}/banner/${params.bannerId}`,
    );
  }

  /**
   * 채널 홈 배너 정보 삭제
   * @param payload
   * @returns
   */
  static async deleteChannelBannerList(payload: any) {
    return httpService.delete<any>(
      `${PMSApiPrefix()}/channel/${payload.channelUuid}/banners`,
      payload,
    );
  }
}
