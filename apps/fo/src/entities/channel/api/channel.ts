import { PMSApiPrefix } from "@learnway/config";
import { httpService } from "@learnway/shared";


export default class ChannelService {
  // 채널 정보 조회
  static async fetch(uuid: string) {
    return await httpService.get(`${PMSApiPrefix()}/channel/${uuid}`);
  }
}