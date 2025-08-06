import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

/**
 * 채널 구독자 서비스
 */
export default class ChannelSubscriberService {
  /**
   * 채널 구독자 목록 조회
   * @param params
   */
  static async getChannelSubscriptions(params: any) {
    return httpService.get<any>(
      `${PMSApiPrefix()}/channel/${params.channelUuid}/subscriptions`,
      params,
    );
  }
}
