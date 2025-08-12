import { PMSApiPrefix } from "@learnway/config";
import { httpService } from "@learnway/shared";

export default class ChannelService {
  // 채널 정보 조회
  static async fetch(uuid: string) {
    return await httpService.get(`${PMSApiPrefix()}/channel/${uuid}`);
  }
  // 채널 구독
  static async subscription(uuid: string) {
    return await httpService.post(`${PMSApiPrefix()}/channel/${uuid}/subscription`, {});
  }

  // 채널 구독 취소
  static async unsubscription(uuid: string) {
    return await httpService.delete(`${PMSApiPrefix()}/channel/${uuid}/subscription`);
  }
}
